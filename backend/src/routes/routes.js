const express = require('express');
const {  celebrate, Joi, Segments } = require('celebrate');//Validacoes
const router = express.Router();

const OngsController = require('../controllers/OngsController');
const IncidentsController = require('../controllers/IncidentsController');
const ProfileController = require('../controllers/ProfileController')
const SessionController = require('../controllers/SessionController')
const Middleware = require('./middleware')

router.post('/sessions', SessionController.create );

router.post('/ongs', Middleware.ongsCreate() , OngsController.create );
router.get('/ongs', OngsController.index );

router.post('/incidents', IncidentsController.create );
router.get('/incidents', Middleware.incidentsIndex(), IncidentsController.index );
router.delete('/incidents/:id', Middleware.incidentsDelete()  , IncidentsController.delete );

router.get('/profile', Middleware.profileIndex(),ProfileController.index );



module.exports = router;