const TvSeries = require('../models/tvSeries')

class TvSeriesController {
    static async findAll(req, res) {
        try {
            const series = await TvSeries.find()
            // console.log(series)
            // res.send(series)
            res.status(200).json(series)
        }
        catch(err) {
            console.log(err)
        }
    }

    static async findSpecificId(req, res) {
        try {
            const id = req.params.id
            const series = await TvSeries.findById(id)
            // console.log(series)
            // res.send(series)
            res.status(200).json(series)
        }
        catch(err) {
            console.log(err)
        }
    }

    static async createSeries(req, res) {
        try {
            const newSeries = req.body
            const series = await TvSeries.create(newSeries)
            // console.log(series)
            // res.send(series)
            res.status(201).json(series)
        }
        catch(err) {
            console.log(err)
        }
    }

    static async updateSeries(req, res) {
        try {
            const id = req.params.id
            const updatedSeries = req.body
            const series = await TvSeries.update(id, updatedSeries)
            res.status(200).json({
                "message": "Successfully updated"
            })
        }
        catch(err) {
            console.log(err)
        }
    }

    static async deleteSeries(req, res) {
        try {
            const id = req.params.id
            // console.log(id)
            const series = await TvSeries.destroy(id)
            // res.send(series)
            res.status(200).json({
                "message": "Successfully deleted"
            })
        }
        catch(err) {
            console.log(err)
        }
    }
}

module.exports = TvSeriesController