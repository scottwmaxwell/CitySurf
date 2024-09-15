# Data Sources

Below contain the different sources of data for CitySurf and details regarding how the data was retrieved.

# Latitude and Longitude Values

The latitude and longitude values are very important to obtain for each city as they allow us to determine the See `Obtain Lat_Lon.ipynb` for specifics. 

# Housing

[Redfin](https://www.redfin.com/news/data-center/) provides free housing data a large historical dataset with many different cities [here](https://redfin-public-data.s3.us-west-2.amazonaws.com/redfin_market_tracker/city_market_tracker.tsv000.gz). 

See how this data is wrangled here in `housing.ipynb`.

# Population

This was retrieved from a [data set](https://www2.census.gov/programs-surveys/popest/tables/2010-2019/cities/totals/SUB-IP-EST2019-ANNRES.xlsx) provided by the Census Bureau. Here are more data sets are availble for [**City and Town Population Totals: 2010-2019**](https://www.census.gov/data/tables/time-series/demo/popest/2010s-total-cities-and-towns.html).

# Job Industry

# Salary

# Diversity

# Weather from Open-Meteo

[Open-Meteo](https://open-meteo.com/) provides weather free weather data. In our case, we are interested in the historical weather API.

Example of API use:
`https://archive-api.open-meteo.com/v1/archive?latitude=52.52&longitude=13.41&start_date=2020-12-31&end_date=2023-12-31&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean&temperature_unit=fahrenheit`

You can generate a URL using their [historical weather API tool](https://open-meteo.com/en/docs/historical-weather-api).