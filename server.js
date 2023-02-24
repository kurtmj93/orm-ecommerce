// import and initialize express
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3001;

// import sequelize connection
const sequelize = require('./config/connection');

// express middleware for parsing JSON & html form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// import and use api routes
const routes = require('./routes');
app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening at ${PORT}`));
});
