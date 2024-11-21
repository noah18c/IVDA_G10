import os
import requests


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

