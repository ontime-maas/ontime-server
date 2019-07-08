/* server/address */

const express = require('express');
const router = express.Router();


const addressController = require('../controller/addressController');

// 주소에 대한 좌표를 얻기
router.get('/location', (req, res, next) => {
  let address = req.query.address
  addressService.getAddressInfo(address)
    .then((ret) => {
      ret = JSON.parse(ret);
      const responseObject = {
        x: ret.documents[0].x,
        y: ret.documents[0].y,
        param: address
      }
      res.send(responseObject);
    })
    .catch((e) => {
      res.send(e);
    })
});

module.exports = router;