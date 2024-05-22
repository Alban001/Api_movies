const express = require('express');
const routerActors = require('../routers/actors.router');
const routerDirectors = require('../routers/directors.router');
const routerGenres = require('../routers/genres.router');
const routerMovies = require('../routers/movies.router');
const Movies = require('../models/Movies');
const Actors = require('../models/Actors');
const Genres = require('../models/Genres');
const Directors = require('../models/Directors');
const router = express.Router();

// colocar las relaciones aquí

Movies.hasMany(Actors)
Actors.belongsTo(Movies)
Movies.belongsToMany(Genres , {through: "movies_genres"})
Genres.belongsToMany(Movies , {through: "movies_genres"})
Movies.hasMany(Directors)
Directors.belongsTo(Movies)

// colocar las rutas aquí
router.use(routerActors)
router.use(routerDirectors)
router.use(routerGenres)
router.use(routerMovies)




module.exports = router;