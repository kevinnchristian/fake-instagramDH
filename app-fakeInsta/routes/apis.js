const express = require('express');
const router = express.Router();

const userApiController = require('../controllers/apis/userApiController');

router.get('/', (req, res) => {
  return res.status(200).json({
    status: "Api funcionando",
    version: "1.0.0"
  });
});

router.get('/users', userApiController.index);
router.get('/user/:id', userApiController.show);
router.post('/user', userApiController.store);
router.put('/user/:id', userApiController.update);
router.delete('/user/:id', userApiController.delete);


module.exports = router;