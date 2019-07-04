/* server/address */

const express = require('express');
const router = express.Router();

const pathController =  require('../controller/pathController');

// 좌표로 대중교통 길찾기
router.get('/search/location',pathController.searchPathBylocation);

// 주소로 대중교통 길찾기
router.get('/search/address',pathController.searchPathByAddress);

module.exports = router;