const router = require('express').Router()

const MovieController = require('../controllers/movieController')
const SeriesController = require('../controllers/TvSeriesController')

router.get('/movies', MovieController.findAll)
router.get('/movies/:id', MovieController.findSpecificId)
router.post('/movies', MovieController.createMovie)
router.put('/movies/:id', MovieController.updateMovie)
router.delete('/movies/:id', MovieController.deleteMovie)
// CRUD
//delete dan update perlu getOne

router.get('/series', SeriesController.findAll)
router.get('/series/:id', SeriesController.findSpecificId)
router.post('/series', SeriesController.createSeries)
router.put('/series/:id', SeriesController.updateSeries)
router.delete('/series/:id', SeriesController.deleteSeries)
 


module.exports = router