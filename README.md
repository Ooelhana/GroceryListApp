# Grocery List

## Description

This is a grocery list application. Users are able to add items to their grocery list with the name and desired quantity of the item. There is a checkbox to allow users to keep track of what they have already purchased. They can edit the name or quantity of the item and also delete the item.

## Running the application

I will be hosting this application on AWS until April 13:

http://3.233.229.170

In order to run the application with docker installed, clone the repository and run the docker-compose command:

```

git clone https://github.com/Ooelhana/GroceryListApp.git
cd GroceryListApp
docker-compose up

```

This will host the web application on port 80 of local host.

To run the api tests (with the grocery_backend container running):

```

docker exec -it grocery_backend python manage.py test

```

To run the frontend tests:

```

cd grocery_frontend
npm install
npm test

```

## Technical Details

The backend server hosts a REST API and was built using Django and Django Rest Framework. The data stored in this grocery list persists in a PosgreSQL relational database. API unit tests are written in `grocery_backend/grocery_items/tests_api.py` which help to ensure the REST API is functioning correctly.

The frontend was built using the React library with Typescript and Redux for state management. The folder structure is organized to separate different components of the application in `grocery_frontend/src/features` with the associated tests in the same folder. Api wrapper functions are stored in `grocery_frontend/src/api`.

The application is bundled and deployed using Docker containers which are managed by a Docker Compose config file allowing easy deployment on any cloud platform or on-premise servers.

## Future Enhancements

**Testing**

The frontend test coverage could be increased to account for more edge cases and end-to-end testing should be added using a webdriver such as Selenium to test the functionality of all of the individual parts of the application together.

**Authentication System**

Currently, there is only a single grocery list shared by all users of the application. Adding a login system would allow different users to login and manage their individual grocery lists while keeping their data safe from other users.

In addition, security could be improved by properly setting up CORS headers on the server to only allow requests to be received from the frontend application.

**Scalability**

As mentioned earlier, in order to properly implement scalability an account system would need to be implemented first to allow multiple users to store their list in the same database.

Then, we would be able to scale the application using a distributed architecture. Since the frontend is just serving static files, these servers could easily be scaled to meet demand by using a load balancer and increasing the number of servers that are serving the files. Alternatively and more simply, we could use a serverless file hosting service from a cloud provider that will automatically scale as needed such as AWS S3.

Since the backend server is using a RESTful architecture, it is also very easy to scale. One of the principles of REST is that a REST API should be stateless. This means that no state is stored on the server side and the response received from any backend server hosting the application should be identical for the same request. So the backend could easily be scaled using a load balancer and adding additional web servers.

Finally the database can be scaled by implementing database sharding. This database should be fairly easy to partition effectively because users should only be able to access the grocery items that are associated with their account. So we could increase the number of databases and shard based on a hash of the account IDs.

**User Interface**

While the application is relatively user-friendly and straightforward to understand, it could certainly use some colour and design to improve the user experience.
