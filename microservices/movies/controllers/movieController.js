const Movies = require('../models/movie')

class MovieController {
    static async findAll(req, res) {
        try {
            const movies = await Movies.find()
            // console.log(movies)
            // res.send(movies)
            res.status(200).json(movies)
        }
        catch(err) {
            console.log(err)
        }
    }

    static async findSpecificId(req, res) {
        try {
            const id = req.params.id
            const movies = await Movies.findById(id)
            // console.log(movies)
            // res.send(movies)
            res.status(200).json(movies)
        }
        catch(err) {
            console.log(err)
        }
    }

    static async createMovie(req, res) {
        try {
            const newMovie = req.body
            const movies = await Movies.create(newMovie)
            // console.log(movies)
            // res.send(movies)
            res.status(201).json(movies)
        }
        catch(err) {
            console.log(err)
        }
    }

    static async updateMovie(req, res) {
        try {
            const id = req.params.id
            // console.log(id)
            const updatedMovie = req.body
            // console.log(updatedMovie)
            const movies = await Movies.update(id, updatedMovie)
            // console.log(movies.value)
            // res.status(200).json(movies.value)
            res.status(200).json({
                "message": "Successfully updated"
            })
        }
        catch(err) {
            console.log(err)
        }
    }

    static async deleteMovie(req, res) {
        try {
            const id = req.params.id
            // console.log(id)
            const movies = await Movies.destroy(id)
            // res.send(movies)
            res.status(200).json({
                "message": "Successfully deleted"
            })
        }
        catch(err) {
            console.log(err)
        }
    }
}

module.exports = MovieController