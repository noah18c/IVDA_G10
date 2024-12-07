import os
import pandas as pd
from src.models import FurnitureItem, FilterItem
from src.recommender import RecommendationModel
import shutil

def find_image_path(name, picture_path):
    """
    Finds the image path based on the first word of the furniture name.
    If no image is found, returns the path to a dummy image.
    
    Args:
        name (str): Name of the furniture item.
    
    Returns:
        str: Full URL to the image or the dummy image.
    """
    first_word = name.split(" ")[0]
    pictures = os.listdir(picture_path)
    
    for picture in pictures:
        if picture.startswith(first_word):
            return f"http://127.0.0.1:5000/data/ikea_images/{picture}"
    
    # Return the dummy image if no match is found
    return f"http://127.0.0.1:5000/data/Image-not-found.png"


def process_furniture_data(csv_path, pictures_path, filter=None):
    """
    Processes the CSV file and assigns pictures to generate 20 random instances of FurnitureItem.

    Args:
        csv_path (str): Path to the CSV file.
        pictures_path (str): Path to the folder containing images.

    Returns:
        list: A list of FurnitureItem instances.
    """
    # Read the CSV file
    data = pd.read_csv(csv_path)

    if filter is not None:
        filter_mapping = {
            'price_min': 'price', 'price_max': 'price',
            'height_min': 'height', 'height_max': 'height',
            'width_min': 'width', 'width_max': 'width',
            'depth_min': 'depth', 'depth_max': 'depth',
            'living_room': 'Living room', 'bedroom': 'Bedroom',
            'office': 'Office', 'kitchen': 'Kitchen', 
            'dining': 'Dining room', 'entrance': 'Entrance',
            'playroom': 'Playroom', 'nursery': 'Nursery', 
            'outdoor': 'Outdoor'
        }

        for filter_attr, column_name in filter_mapping.items():
            filter_value = getattr(filter, filter_attr)
            
            if filter_value is not None:
                # Ensure the filter_value is numeric when comparing with numeric columns
                if isinstance(filter_value, str):
                    try:
                        filter_value = float(filter_value)  # Try converting to float if it's a string
                    except ValueError:
                        pass  # If it's not convertible, keep the original value

                # Apply min/max filters for numerical values (e.g., price_min, price_max)
                if filter_attr.endswith('_min'):
                    data = data[data[column_name] >= filter_value]
                elif filter_attr.endswith('_max'):
                    data = data[data[column_name] <= filter_value]
                else:
                    # Apply binary filters (e.g., living_room, bedroom)
                    if filter_value:
                        data = data[data[column_name] == 1] 

    # Extract the first word from the 'name' column
    data['name'] = data['name'].str.split(' ').str[0]

    # Select 20 random rows
    if len(data) < 20:
        sample_data = data  # If there are fewer than 20 rows, use all available rows
    else:
        sample_data = data.sample(n=20) 

    # Get all picture file names
    pictures = os.listdir(pictures_path)

    def find_image(name):
        for picture in pictures:
            if picture.startswith(name):
                return f"http://127.0.0.1:5000/data/pictures/{picture}"
        return "http://127.0.0.1:5000/data/Image-not-found.png"

    sample_data['image_path'] = sample_data['name'].apply(find_image)

    furniture_items = []
    for _, row in sample_data.iterrows():
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
            rooms=row['rooms'],
            image_path=row['image_path']
        )
        furniture_items.append(item)

    return furniture_items


def knn_recommendations(liked_items, disliked_items=None, rec_num=10, filter=None):
    """
    Generate k-NN recommendations based on liked items.

    Args:
        csv_path (str): Path to the CSV file.
        liked_items (list): List of item IDs representing liked items.
        disliked_items (list, optional): List of item IDs representing disliked items. Defaults to None.
        rec_num (int, optional): Number of top recommendations to return. Defaults to 10.

    Returns:
        list: A list of recommended FurnitureItem objects.

    """

    if filter is None:
        filter = FilterItem()

    csv_path = os.path.join(os.path.dirname(__file__), '../data/IKEA_data_processed.csv')

    # Initialize the RecommendationModel
    model = RecommendationModel(csv_path)
    model.load()
    model.filter_data(filter)
    model.preprocess()
    model.train_model()

    liked_item_ids = [item['item_id'] for item in liked_items]

    # Step 2: Filter model.df_model to find matching item_ids
    matching_ids = model.df_model[model.df_model['item_id'].isin(liked_item_ids)]['item_id'].tolist()


    model.recommend_items(matching_ids)


    # Fetch top recommendations
    recommendations = model.get_topn_recommendations(rec_num=rec_num)
    price_comparison = model.get_price_comparison_data()
    size_comparison = model.get_size_comparison_data()
    explainable_texts = model.get_explainable_text(rec_num=rec_num)
    scatter_plot_data = model.get_scatter_plot_data()
    designer_count_data = model.get_designer_counts_data()

    return recommendations, price_comparison, size_comparison, explainable_texts,scatter_plot_data,designer_count_data


def reset_temp():
    try:
        # Path to the temp folder
        temp_folder_path = os.path.join(os.path.dirname(__file__), '../data/temp')

        # Delete all files in the temp folder
        if os.path.exists(temp_folder_path):
            shutil.rmtree(temp_folder_path)  # Remove the folder and its contents
            os.makedirs(temp_folder_path)   # Recreate the empty folder
    except Exception as e:
        print()
