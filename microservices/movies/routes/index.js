const router = require('express').Router()

const MovieController = require('../controllers/movieController')

router.get('/movies', MovieController.findAll)
router.get('/movies/:id', MovieController.findSpecificId)
router.post('/movies', MovieController.createMovie)
router.put('/movies/:id', MovieController.updateMovie)
router.delete('/movies/:id', MovieController.deleteMovie)

 


module.exports = router