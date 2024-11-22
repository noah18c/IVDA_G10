import pandas as pd
from src import app
import os
import json
from flask import send_from_directory, session, jsonify, request
from src.models import FurnitureItem
from src.utils import process_furniture_data, knn_recommendations
import shutil


@app.route('/')
def home():
    return "Hello from Flask!"

@app.route('/api/data', methods=['GET'])
def get_data():
    return {"message": "Hello from a modular Flask app!"}


@app.route('/data/pictures/<filename>')
def serve_picture(filename):
    return send_from_directory('../data/pictures', filename)

@app.route('/api/test_items', methods=['GET'])
def get_test_items():
    # Define paths for the CSV file and pictures folder
    csv_path = os.path.join(os.path.dirname(__file__), '../data/IKEA_data_processed.csv')
    pictures_path = os.path.join(os.path.dirname(__file__), '../data/pictures')

    try:
        furniture_items = process_furniture_data(csv_path, pictures_path)
        response_data = [item.__dict__ for item in furniture_items]

        return jsonify({"items": response_data}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/liked_items', methods=['POST'])
def save_liked_items():
    try:
        temp_folder_path = os.path.join(os.path.dirname(__file__), '../data/temp')
        liked_items_path = os.path.join(temp_folder_path, 'liked_items.json')

        if not os.path.exists(temp_folder_path):
            os.makedirs(temp_folder_path)

        # Parse JSON data from the request
        liked_items = request.json.get('items', [])

        # Save liked items to a JSON file
        with open(liked_items_path, 'w') as f:
            json.dump(liked_items, f, indent=4)

        # Call the calculate_recommendations function
        calculate_recommendations()

        return jsonify({"message": "Liked items saved and recommendations calculated."}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/recommendations', methods=['POST'])
def calculate_recommendations():
    """
    Reads liked items from the temp folder and calculates recommendations using the KNN function.

    Returns:
        JSON: List of recommended FurnitureItem objects.
    """
    temp_folder_path = os.path.join(os.path.dirname(__file__), '../data/temp')
    liked_items_path = os.path.join(temp_folder_path, 'liked_items.json')

    try:
        # Check if liked_items.json exists
        if not os.path.exists(liked_items_path):
            return jsonify({"error": "No liked items found. Please add liked items first."}), 400

        # Read liked items from the file
        with open(liked_items_path, 'r') as f:
            liked_items = json.load(f)

        # Call the KNN function to calculate recommendations
        recommendations,_,_,_ = knn_recommendations(liked_items)

        # Convert FurnitureItem instances to dictionaries for JSON response
        response_data = [item.__dict__ for item in recommendations]

        return jsonify({"recommendations": response_data}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/api/recommendations', methods=['GET'])
def get_recommendations():
    """
    Reads the recommended tiems and returns them.

    Args:
        recommendations_path (str): Path to the Recommendation json file.

    Returns:
        list: A list of FurnitureItem Recommendations.
    """
    csv_path = os.path.join(os.path.dirname(__file__), '../data/IKEA_SA_Furniture_Web_Scrapings_sss.csv')
    pictures_path = os.path.join(os.path.dirname(__file__), '../data/pictures')

    try:
        # Read the CSV file
        data = pd.read_csv(csv_path)

        # Select 20 random rows
        sample_data = data.sample(n=20)

        # Get all picture file names
        pictures = os.listdir(pictures_path)

        # Assign pictures to cards cyclically
        sample_data['image'] = [
            f"http://127.0.0.1:5000/data/pictures/{pictures[i % len(pictures)]}" for i in range(len(sample_data))
        ]

        # Convert to a list of dictionaries (only the required columns)
        cards = sample_data[['item_id', 'name', 'category', 'price', 'image']].to_dict(orient='records')

        # Return the data as JSON
        return {"cards": cards}, 200
    except Exception as e:
        return {"error": str(e)}, 500
    

@app.route('/api/reset', methods=['POST'])
def reset_session_and_temp():
    try:
        # Path to the temp folder
        temp_folder_path = os.path.join(os.path.dirname(__file__), '../data/temp')

        # Delete all files in the temp folder
        if os.path.exists(temp_folder_path):
            shutil.rmtree(temp_folder_path)  # Remove the folder and its contents
            os.makedirs(temp_folder_path)   # Recreate the empty folder

        # Clear the session
        session.clear()

        return jsonify({"message": "Session and temp folder reset successfully."}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500