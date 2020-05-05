const express = require('express');
const path = require('path');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const postController = require('../controllers/postController');

const router = express.Router();


/* GET home page. */

router.get('/', authController.create);

router.get('/login', authController.create);
router.post('/login', authController.store);

router.get('/registrar', userController.create);
router.post('/registrar', userController.store);

router.get('/publicar', postController.create);
router.post('/publicar', postController.store);

router.get("/home", function (req, res, next) {
  res.render("index");
});

module.exports = router;
