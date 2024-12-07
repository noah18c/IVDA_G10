import os
import requests
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

def fetch_images(folder_path, subject="furniture", count=20):
    """
    Fetches `count` images of a specified subject from LoremFlickr and saves them to the specified folder.
    
    Args:
        folder_path (str): Path to the folder where images will be saved.
        subject (str): Subject of the images (e.g., "furniture", "cars").
        count (int): Number of images to fetch.
    """
    # Check if folder exists; if not, create it
    if not os.path.exists(folder_path):
        os.makedirs(folder_path)

    # Check if the folder is empty
    if len(os.listdir(folder_path)) == 0:
        print(f"Folder {folder_path} is empty. Fetching {count} '{subject}' images...")
        for i in range(1, count + 1):
            try:
                # Construct the LoremFlickr URL with the subject
                image_url = f"https://loremflickr.com/640/480/{subject}"
                
                # Fetch the image
                response = requests.get(image_url, stream=True)
                if response.status_code == 200:
                    # Save the image to the folder
                    image_path = os.path.join(folder_path, f"{subject}_{i}.jpg")
                    with open(image_path, 'wb') as img_file:
                        for chunk in response.iter_content(1024):
                            img_file.write(chunk)
                    print(f"Saved: {image_path}")
                else:
                    print(f"Failed to fetch image {i}: {response.status_code}")
            except Exception as e:
                print(f"Error fetching image {i}: {e}")
    else:
        print(f"Folder {folder_path} already contains images.")


#fetch_images(folder_path="images", subject="car?10309", count=1)



def fetch_images_selenium(names, folder_path):
    """
    Fetches the first image for each IKEA item name using Selenium.

    Args:
        names (list): List of product names to search for.
        folder_path (str): Folder where images will be saved.
    """
    driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

    for name in names:
        try:
            print(f"Fetching image for: {name}")
            driver.get(f"https://www.ikea.com/ch/de/search/?q={name}")
            try:
                #wait until site is loaded, max 4secs
                img_tag = WebDriverWait(driver, 2).until(
                    EC.presence_of_element_located((By.CSS_SELECTOR, "img.image.plp-product__image.plp-product__image--alt"))
                )
                img_url = img_tag.get_attribute("src")
            except Exception as e:
                print(f"Error: {e}")

            # Download 
            response = requests.get(img_url, stream=True)
            if response.status_code == 200:
                img_path = os.path.join(folder_path, f"{name}.jpg")
                with open(img_path, "wb") as img_file:
                    for chunk in response.iter_content(1024):
                        img_file.write(chunk)
                print(f"Image saved: {img_path}")
            else:
                print(f"Failed to download image for {name}")
        except Exception as e:
            print(f"Error fetching image for {name}: {e}")

    driver.quit()

def fetch_ikea_images(csv_path, folder_path="ikea_images"):
    """
    Reads a CSV file to extract unique IKEA product names and fetch their images.

    Args:
        csv_path (str): Path to the CSV file.
        folder_path (str): Folder where images will be saved.
    """

    if not os.path.exists(folder_path):
        os.makedirs(folder_path)
    else:
        # Check if pictures were already fetched
        if os.listdir(folder_path):
            print(f"Folder '{folder_path}' is not empty. Skipping fetch.")
            return

    df = pd.read_csv(csv_path)

    # Extract unique names from the 'name' column
    df["name"] = df["name"].str.split(" ").str[0] 
    unique_names = df["name"].unique().tolist()

    fetch_images_selenium(unique_names, folder_path)

