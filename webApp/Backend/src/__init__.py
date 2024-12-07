from flask import Flask
from flask_cors import CORS
from .image_api import fetch_images
from .image_api import fetch_ikea_images

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

#fetch_images(folder_path="./data/pictures", count=20)
fetch_ikea_images(csv_path = "./data/IKEA_SA_Furniture_Web_Scrapings_sss.csv", folder_path="./data/ikea_images")

from src import routes
from src import utils
utils.reset_temp()