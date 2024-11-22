import os
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import NearestNeighbors
import models

class RecommendationModel:
    def __init__(self, data:models, picture_path):
        self.data = data
        self.picture_path = picture_path
        self.model = NearestNeighbors(n_neighbors=51, metric='cosine')
        self.df_model = None
        self.X_train = None
        self.distances = None
        self.similar_indices = None
        self.cosine_similarities = None
    
    def load_and_preprocess(self):
        # Load data
        self.df_model = pd.read_csv(self.csv_path)
        scaler = StandardScaler()
        self.df_model[['price_std', 'space_std']] = scaler.fit_transform(self.df_model[['price', 'space']])
        self.X_train = self.df_model.copy()
        
        self.X_train = pd.get_dummies(self.X_train, columns=['cluster']).drop(
            columns=['item_id', 'name', 'category', 'designer', 'price', 'space', 'rooms'])
    
    def train_model(self):
        self.model.fit(self.X_train)
        self.distances, self.similar_indices = self.model.kneighbors(self.X_train)
        self.cosine_similarities = 1 - self.distances  

        # drop the similarity of the instance itself
        self.cosine_similarities = self.cosine_similarities[:,1:]
        self.similar_indices = self.similar_indices[:,1:]

    def recommend_items(self, basket_indices, rec_num):
        """
        Generate recommendations for indices which are the csv indices for the liked items.
        """

        self.df_model['recommended'] = list(self.similar_indices)
        self.df_model['cosine_sim'] = list(self.cosine_similarities)

        idx_counts = {}
        idx_similarities = {}
        idx_basket_sim = {}

        for idx in basket_indices:
            for key, item in enumerate(self.similar_indices[idx]):
                if item not in basket_indices:
                    if item not in idx_counts:
                        idx_counts[item] = 1
                        idx_similarities[item] = [self.cosine_similarities[idx][key]]
                        idx_basket_sim[item] = [idx]
                    else:
                        idx_counts[item] += 1
                        idx_similarities[item].append(self.cosine_similarities[idx][key])
                        idx_basket_sim[item].append(idx)

        recommended_idx = sorted(idx_counts, key=idx_counts.get, reverse=True)[:100]

        df_recommended = pd.DataFrame()
        df_recommended['recommended_idx'] = recommended_idx
        df_recommended['sim'] = df_recommended['recommended_idx'].apply(lambda x: idx_similarities[x])
        df_recommended['avg_sim'] = df_recommended['recommended_idx'].apply(lambda x: np.mean(idx_similarities[x]))
        df_recommended['count'] = df_recommended['recommended_idx'].apply(lambda x: idx_counts[x])
        df_recommended['basket_sim'] = df_recommended['recommended_idx'].apply(lambda x: idx_basket_sim[x])
        df_recommended_sorted = df_recommended.sort_values(by=['count', 'avg_sim'], ascending=[False, False])

        rec_num = 5
        recommended_items = self.df_model.loc[df_recommended_sorted['recommended_idx'][:rec_num],['name','category','price','cluster']]

        return df_recommended_sorted
    
    def get_recommended_items

    def get_price_comparison_data(self, recommended_idx, basket_indices):
        """
        Returns price comparison data for the frontend.
        """
        recommended_item = self.df_model.loc[recommended_idx]
        basket_items = self.df_model.loc[basket_indices]

        return {
            "recommended": {
                "name": recommended_item["name"],
                "price": recommended_item["price"]
            },
            "basket": [
                {"name": row["name"], "price": row["price"]}
                for _, row in basket_items.iterrows()
            ]
        }

    def get_size_comparison_data(self, recommended_idx, basket_indices):
        """
        Returns size comparison data for the frontend.
        """
        recommended_item = self.df_model.loc[recommended_idx]
        basket_items = self.df_model.loc[basket_indices]

        return {
            "recommended": {
                "name": recommended_item["name"],
                "size": recommended_item["space"]
            },
            "basket": [
                {"name": row["name"], "size": row["space"]}
                for _, row in basket_items.iterrows()
            ]
        }

    def get_cluster_price_distribution_data(self, cluster, designer):
        """
        Returns price distribution data for the cluster.
        """
        cluster_data = self.df_model[self.df_model["cluster"] == cluster]
        designer_data = self.df_model[self.df_model["designer"] == designer]

        return {
            "cluster_prices": cluster_data["price"].tolist(),
            "designer_average_price": designer_data["price"].mean()
        }

    def get_designer_price_distribution_data(self, designer, recommended_item_id):
        """
        Returns price distribution data for the designer.
        """
        designer_data = self.df_model[self.df_model["designer"] == designer]
        recommended_item = self.df_model[self.df_model["item_id"] == recommended_item_id]

        return {
            "designer_prices": designer_data["price"].tolist(),
            "recommended_item_price": recommended_item["price"].iloc[0]
        }