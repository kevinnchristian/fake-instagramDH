const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const postController = require('../controllers/postController');
const auth = require('../middlewares/auth');

const upload = require('../configs/uploads');

router.get('/', authController.create);

router.get('/login', authController.create);
router.post('/login', authController.store);

router.get('/registrar', userController.create);
router.post('/registrar', userController.store);

router.get('/publicar', auth,postController.create);
router.post('/publicar', upload.any(),postController.store);
// Para salvar ele na pasta desejada usa o .any

router.get("/home", auth,function (req, res, next) {
  res.render("index");
});

module.exports = router;
