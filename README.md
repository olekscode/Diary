# Diary

## Folder structure
```
.
+-- doc/
+-- src/
|   +-- controllers/
|   +-- helpers/
|   +-- middlewares/
|   +-- models/
|   +-- public/
|       +-- css/
|       +-- img/
|       +-- lib/   
|   +-- tests/
|   +-- views/
+-- package.json
+-- README.md
```

### Description of src/ structure:
* **controllers/** – defines the app routes and their logic
* **helpers/** – code and functionality to be shared by different parts of the project
* **middlewares/** – Express middlewares which process the incoming requests before handling them down to the routes
* **models/** – represents data, implements business logic and handles storage
* **public/** – contains all static files like images, styles and javascript
* **views/** – provides templates which are rendered and served by the routes
* **tests/** – tests everything which is in the other folders
* **app.js** – initializes the app and glues everything together

> This structure was inspired by [Best practices for Express app structure](https://www.terlici.com/2014/08/25/best-practices-express-structure.html).
