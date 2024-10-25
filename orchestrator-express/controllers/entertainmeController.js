const axios = require('axios')
const Redis = require("ioredis");
const redis = new Redis();

class EntertainmeController {
    static async findAll(req, res) {
        try {

            const movieRedis = await redis.get('movies')
            const seriesRedis = await redis.get('series')
            const movieData = JSON.parse(movieRedis)
            const seriesData = JSON.parse(seriesRedis)

            if (!movieRedis) {
                const getMovie = await axios.get(
                    'http://localhost:4001/movies'
                )
                let movie = getMovie.data
                await redis.set('movies', JSON.stringify(movie))
            }
            if (!seriesRedis) {
                const getSeries = await axios.get('http://localhost:4002/series')
                let series = getSeries.data
                await redis.set('series', JSON.stringify(series))
            }
            return res.status(200).json({movieData, seriesData})
        }
        catch(err) {
            console.log(err)
        }
    }   
}

module.exports = EntertainmeController