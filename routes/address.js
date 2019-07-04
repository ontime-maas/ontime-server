/* server/address */

const express = require('express');
const router = express.Router();


const addressController =  require('../controller/addressController');

// 주소에 대한 좌표를 얻기
router.get('/:id',addressController.getLocationByAddress);



module.exports = router;
