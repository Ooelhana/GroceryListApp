# Grocery List

## Running the application

In order to run the application with docker installed, clone the repository and run the docker-compose command:

```
git clone https://github.com/Ooelhana/GroceryListApp.git
cd GroceryListApp
docker-compose up
```

To run the tests (with the containers running):

```
docker exec -it grocery_backend python manage.py test
```
