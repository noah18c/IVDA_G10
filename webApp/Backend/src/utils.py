import os
import pandas as pd
from src.models import FurnitureItem
from src.recommender import RecommendationModel

def process_furniture_data(csv_path, pictures_path):
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

    # Select 20 random rows
    sample_data = data.sample(n=20)

    # Get all picture file names
    pictures = os.listdir(pictures_path)

    # Assign pictures to cards cyclically
    sample_data['image_path'] = [
        f"http://127.0.0.1:5000/data/pictures/{pictures[i % len(pictures)]}" for i in range(len(sample_data))
    ]

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


def knn_recommendations(liked_items, disliked_items=None, rec_num=10):
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

    csv_path = os.path.join(os.path.dirname(__file__), '../data/IKEA_data_processed.csv')

    # Initialize the RecommendationModel
    model = RecommendationModel(csv_path)
    model.load_and_preprocess()

    # Remove disliked items from training data (if any)
    model.train_model()

    # Get indices of liked items
    liked_indices = model.df_model[model.df_model['item_id'].isin(liked_items)].index.tolist()

    # Generate recommendations
    model.recommend_items(liked_indices)

    # Fetch top recommendations
    recommendations = model.get_topn_recommendations(rec_num=rec_num)
    price_comparison = model.get_price_comparison_data()
    size_comparison = model.get_size_comparison_data()
    explainable_texts = model.get_explainable_text(rec_num=rec_num)

    return recommendations, price_comparison, size_comparison, explainable_texts


