const { Router } = require("express");

const usersRoutes = require("./users.routes");
const moviesRoutes = require("./movies.routes");

const routes = Router();

// Users
routes.use('/users', usersRoutes);

// Movies
routes.use('/movies', moviesRoutes);

module.exports = routes;