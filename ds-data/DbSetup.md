# Database Setup

After running the python script to push the data to mongoDB, it's necssary to create an index for the bounding_box field for every city document. That way we can use it for in our API to find an intersection with the user's geolocation.



1. connect to mongodb with mongosh (macOS)
    `mongosh "<connectionstring">`

2. switch to the citysurf database
    `use CitySurf`

3. run createIndex
    `db.cities.createIndex({ boundingbox: "2dsphere" })`
