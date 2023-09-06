const { Router } = require("express");

const usersRoutes = require("./users.routes");
const moviesRoutes = require("./movies.routes");
const tagsRoutes = require("./tags.routes");

const routes = Router();

// Users
routes.use('/users', usersRoutes);

// Movies
routes.use('/movies', moviesRoutes);

// Movies
routes.use('/tags', tagsRoutes);

module.exports = routes;