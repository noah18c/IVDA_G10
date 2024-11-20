import pandas as pd
from src import app
import os
from flask import send_from_directory


@app.route('/')
def home():
    return "Hello from Flask!"

@app.route('/api/data', methods=['GET'])
def get_data():
    return {"message": "Hello from a modular Flask app!"}


@app.route('/data/pictures/<filename>')
def serve_picture(filename):
    return send_from_directory('../data/pictures', filename)



@app.route('/api/cards', methods=['GET'])
def get_cards():
    # Path to the CSV file and pictures folder
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