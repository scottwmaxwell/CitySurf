# This file is to download .csv files in bulk 

# Base URL for download found through:
# https://www.ncei.noaa.gov/products/land-based-station/us-climate-normals

# Stations list retrieved from:
# ncei.noaa.gov/data/normals-annualseasonal/2006-2020/access/

import os
import requests
import pandas as pd

# Path to the CSV file
csv_file_path = './data/stations.csv'

stations_df = pd.read_csv(csv_file_path)

print(stations_df.head())

stations = []
for station in stations_df["station_id"]:
    stations.append(station[:-4])


# Directory to save the downloaded files
download_dir = './data/NOAA'

# Create the directory if it does not exist
os.makedirs(download_dir, exist_ok=True)

def download_csv(url, download_dir):
    try:
        response = requests.get(url)
        response.raise_for_status()  # Check if the request was successful

        # Extract the filename from the URL
        filename = os.path.basename(url)
        file_path = os.path.join(download_dir, filename)

        # Write the content to a file
        with open(file_path, 'wb') as file:
            file.write(response.content)
        print(f"Downloaded {filename} to {download_dir}")
    except requests.exceptions.RequestException as e:
        print(f"Failed to download {url}. Error: {e}")

# Download from NOAA to NOAA folder
for station in stations:
    url = f"https://www.ncei.noaa.gov/access/services/data/v1?dataset=normals-monthly-2006-2020&stations={station}&format=csv&dataTypes=LATITUDE,LONGITUDE,MLY-TMAX-NORMAL,MLY-TMIN-NORMAL,MLY-TAVG-NORMAL,MLY-PRCP-NORMAL,MLY-SNOW-NORMAL"
    download_csv(url, download_dir)
