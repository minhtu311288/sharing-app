const express = require('express');
const router = express.Router();
const shareVideoController = require('../app/controller/shareVideoController');

router.get('/', shareVideoController.index);
router.post('/', shareVideoController.post);

module.exports = router;