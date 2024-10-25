const router = require('express').Router()

const SeriesController = require('../controllers/TvSeriesController')


router.get('/series', SeriesController.findAll)
router.get('/series/:id', SeriesController.findSpecificId)
router.post('/series', SeriesController.createSeries)
router.put('/series/:id', SeriesController.updateSeries)
router.delete('/series/:id', SeriesController.deleteSeries)

module.exports = router