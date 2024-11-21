from flask import Flask
from flask_cors import CORS
from .image_api import fetch_images

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

fetch_images(folder_path="./data/pictures", count=20)

from src import routes
