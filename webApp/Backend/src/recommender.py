import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors
from src.models import FurnitureItem
import math
from src.models import FilterItem

class RecommendationModel:
    def __init__(self, csv_path):
        self.csv_path = csv_path
        self.model = NearestNeighbors(n_neighbors=51, metric='cosine')
        self.df_model = None
        self.X_train = None
        self.distances = None
        self.similar_indices = None
        self.cosine_similarities = None
        self.df_recommended_sorted = None
        self.recommended_items = None
        self.idx_basket_sim = {}
        self.idx_similarities = {}
        self.idx_counts = {}
        self.basket = None
        self.topn_recommended_items = None
        self.filter = None

    def load(self):
        self.df_model = pd.read_csv(self.csv_path)

    def filter_data(self, filter:FilterItem):
        #print(self.df_model.columns)

        filter.living_room = 0

        self.df_model = self.df_model[(self.df_model['price'] >= filter.price_min) & (self.df_model['price'] <= filter.price_max)]

        # filter dimensions
        self.df_model = self.df_model[(self.df_model['height'] >= filter.height_min) & (self.df_model['height'] <= filter.height_max)]
        self.df_model = self.df_model[(self.df_model['width'] >= filter.width_min) & (self.df_model['width'] <= filter.width_max)]
        self.df_model = self.df_model[(self.df_model['depth'] >= filter.depth_min) & (self.df_model['depth'] <= filter.depth_max)]

        # filter location
        room_mapping = {
            'Living room': filter.living_room,
            'Bedroom': filter.bedroom,
            'Office': filter.office,
            'Kitchen': filter.kitchen,
            'Dining room': filter.dining,
            'Entrance': filter.entrance,
            'Playroom': filter.playroom,
            'Nursery': filter.nursery,
            'Outdoor': filter.outdoor,
        }
    
        print('size of df',len(self.df_model))
        for column, filter_value in room_mapping.items():
            if filter_value == 0:  # If the filter indicates the column should not be included
                print(f"Dropping rows where {column} == 1")
                self.df_model = self.df_model[self.df_model[column] != 1]  # Drop rows where column has value 1
                print(f"Size of df after filtering {column}: {len(self.df_model)}")
        self.df_model.reset_index(drop=True, inplace=True)

        if self.df_model.empty:
            print("Warning: No items match the filters applied.")    
        
    def preprocess(self):
        scaler = StandardScaler()
        self.df_model[['price_std', 'space_std']] = scaler.fit_transform(self.df_model[['price', 'space']])
        self.X_train = self.df_model.copy()
        
        self.X_train = self.X_train.drop(columns = ['item_id',
                                                   'name',
                                                   'category',
                                                   'price',
                                                   'old_price',
                                                   'sellable_online',
                                                   'link', 
                                                   'other_colors', 
                                                   'short_description', 
                                                   'designer',
                                                   'depth',
                                                    'height', 
                                                    'width' ,
                                                    'space',
                                                    'size_cluster',
                                                    'size_category',
                                                    'rooms'],errors='ignore')
        self.X_train = pd.get_dummies(self.X_train, columns=['cluster'])



    # TODO what type is disliked_items?
    def train_model(self):
        # TODO remove disliked items from the X_train

        self.model.fit(self.X_train)
        self.distances, self.similar_indices = self.model.kneighbors(self.X_train)
        self.cosine_similarities = 1 - self.distances  

        # drop the similarity of the instance itself
        self.cosine_similarities = self.cosine_similarities[:,1:]
        self.similar_indices = self.similar_indices[:,1:]

    # TODO what type is liked_items and disliked_items?
    def recommend_items(self, liked_item_ids):
        """
        Generate recommendations based on liked FurnitureItem objects.
        """
        # Extract item IDs from the liked_items

        # Filter the basket using the item IDs
        self.basket = self.df_model[self.df_model['item_id'].isin(liked_item_ids)]

        # TODO So here I need to basically create a basket having the structure of df_model, and filter it using the item_id's gained from the liked items.
        self.df_model['recommended'] = list(self.similar_indices)
        self.df_model['cosine_sim'] = list(self.cosine_similarities)

        for idx,row in self.basket.iterrows():
            for key, item in enumerate(self.similar_indices[idx]):
                if item not in list(self.basket.index):
                    if item not in self.idx_counts:
                        self.idx_counts[item] = 1
                        self.idx_similarities[item] = [self.cosine_similarities[idx][key]]
                        self.idx_basket_sim[item] = [idx]
                    else:
                        self.idx_counts[item] += 1
                        self.idx_similarities[item].append(self.cosine_similarities[idx][key])
                        self.idx_basket_sim[item].append(idx)

        recommended_idx = sorted(self.idx_counts, key=self.idx_counts.get, reverse=True)[:100]


        df_recommended = pd.DataFrame()
        df_recommended['recommended_idx'] = recommended_idx
        df_recommended['sim'] = df_recommended['recommended_idx'].apply(lambda x: self.idx_similarities[x])
        df_recommended['avg_sim'] = df_recommended['recommended_idx'].apply(lambda x: np.mean(self.idx_similarities[x]))
        df_recommended['count'] = df_recommended['recommended_idx'].apply(lambda x: self.idx_counts[x])
        df_recommended['basket_sim'] = df_recommended['recommended_idx'].apply(lambda x: self.idx_basket_sim[x])
        self.df_recommended_sorted = df_recommended.sort_values(by=['count', 'avg_sim'], ascending=[False, False])
        self.recommended_items =  self.df_model.loc[self.df_recommended_sorted['recommended_idx'][:],:]


    def get_topn_recommendations(self, rec_num:int=10):
        self.rec_num = rec_num
        self.topn_recommended_items = self.recommended_items.iloc[:rec_num]
        furniture_items = []
        for _, row in self.topn_recommended_items.iterrows():
            item = FurnitureItem(
                item_id=row['item_id'],
                name=row['name'],
                category=row['category'],
                price=row['price'],
                old_price=row['old_price'] if not pd.isnull(row['old_price']) else None,
                sellable_online=row['sellable_online'],
                link=row['link'],
                other_colors=row['other_colors'],
                short_description=row['short_description'],
                designer=row['designer'],
                depth=row['depth'] if not pd.isnull(row['depth']) else None,
                height=row['height'] if not pd.isnull(row['height']) else None,
                width=row['width'] if not pd.isnull(row['width']) else None,
                living_room=row['Living room'],
                bedroom=row['Bedroom'],
                office=row['Office'],
                kitchen=row['Kitchen'],
                dining_room=row['Dining room'],
                entrance=row['Entrance'],
                playroom=row['Playroom'],
                nursery=row['Nursery'],
                outdoor=row['Outdoor'],
                space=row['space'],
                size_cluster=row['size_cluster'],
                size_category=row['size_category'],
                cluster=row['cluster'],
                rooms=row['rooms']
            )
            furniture_items.append(item)

        print(furniture_items)

        return furniture_items
    
    def get_explainable_text(self, rec_num:int=10):
        explainable_texts = []
        for idx, row in self.topn_recommended_items.iterrows():
            # Gather details about the recommended item
            recommended_item = {
                "item_id":int(row["item_id"]),
                "name": row["name"],
                "category": row["category"],
                "price": row["price"],
                "designer": row["designer"],
                "rooms": row["rooms"]
            }

            # Calculate similarity and other metrics
            avg_similarity = math.floor(np.mean(self.idx_similarities[idx])*10000)/100
            similar_items = self.df_model.loc[self.idx_basket_sim[idx], ["name", "category", "price"]]
            # Generate explanation text
            explanation = {
                "recommended_item": recommended_item,
                "explanation": {
                    "reason": f"This recommended item is {avg_similarity}% similar to {len(similar_items)} items in your basket.",
                    "similar_items": [
                        {
                            "name": item["name"],
                            "category": item["category"],
                            "price": item["price"]
                        }
                        for _, item in similar_items.iterrows()
                    ],
                },
                "additional_info": {
                    "average_price_in_cluster": round(self.df_model[self.df_model["cluster"] == row["cluster"]]["price"].mean(),ndigits=2),
                    "designer_average_price": round(self.df_model[self.df_model["designer"] == row["designer"]]["price"].mean(),ndigits=2),
                }
            }

            explainable_texts.append(explanation)

        return explainable_texts


    def get_price_comparison_data(self):
        price_comparison_data = []
        for key,row in self.topn_recommended_items.iterrows():    
            sim_prices = self.df_model.loc[self.idx_basket_sim[key],'price'].values
            sim_names = self.df_model.loc[self.idx_basket_sim[key],'name'].values
            prod_price = self.df_model.loc[key,'price']
            prod_name = self.df_model.loc[key,'name']
            prod_id = int(self.df_model.loc[key,'item_id'])
            # Prepare the comparison data for this recommendation
            comparison_entry = {
                "recommended_item": {
                    "item_id": prod_id,
                    "name": prod_name,
                    "price": prod_price
                },
                "basket_items": [
                    {"name": name, "price": price}
                    for name, price in zip(sim_names, sim_prices)
                ]
            }

            price_comparison_data.append(comparison_entry)

        return price_comparison_data

    def get_size_comparison_data(self):
        size_comparison_data = []
        topn_recommended_items = self.recommended_items.iloc[:self.rec_num]

        for key,row in topn_recommended_items.iterrows():    
            sim_sizes = self.df_model.loc[self.idx_basket_sim[key],'space'].values
            sim_names = self.df_model.loc[self.idx_basket_sim[key],'name'].values
            prod_size = self.df_model.loc[key,'space']
            prod_name = self.df_model.loc[key,'name']
            prod_id = int(self.df_model.loc[key,'item_id'])
            # Prepare the comparison data for this recommendation
            comparison_entry = {
                "recommended_item": {
                    "item_id": prod_id,
                    "name": prod_name,
                    "size": prod_size

                },
                "basket_items": [
                    {"name": name, "size": size}
                    for name, size in zip(sim_names, sim_sizes)
                ]
            }

            size_comparison_data.append(comparison_entry)

        return size_comparison_data
    
    def get_scatter_plot_data(self):
        """
        Prepare data for a scatter plot of recommended and liked items.

        Returns:
            dict: Data formatted for frontend scatter plot.
        """        
        scatter_data = {
            "liked_items": [],
            "recommended_items": []
        }

        # Add data for liked items (basket)
        for key, row in self.basket.iterrows():
            scatter_data["liked_items"].append({
                "price": row['price'],
                "space": row['space'],
                "label": row['name']  # Add name for clarity in the plot
            })

        # Add data for recommended items
        for key, row in self.topn_recommended_items.iterrows():
            scatter_data["recommended_items"].append({
                "price": row['price'],
                "space": row['space'],
                "label": row['name']  # Add name for clarity in the plot
            })

        return scatter_data

    def get_designer_counts_data(self):
        """
        Prepare data for a bar chart showing the count of recommended items by designer.

        Returns:
            dict: Data formatted for frontend bar chart.

        """

        # Get value counts for designers
        designer_counts = self.topn_recommended_items['designer'].value_counts()

        # Prepare the data in dictionary format
        data = {
            "designers": designer_counts.index.tolist(),  # Designer names
            "counts": designer_counts.values.tolist()     # Count of items per designer
        }
        return data
