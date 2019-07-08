/* server/address */

const express = require('express');
const router = express.Router();

const pathService = require('../service/pathService');
const addressService = require('../service/addressService');


// 좌표로 대중교통 길찾기
router.get('/search/location', (req, res, next) => {
  let sx = req.query.sx;
  let sy = req.query.sy;
  let ex = req.query.ex;
  let ey = req.query.ey;
  let maxPath = req.query.maxPath;

  pathService.getPathByLocation(sx, sy, ex, ey)
    .then((ret) => {
      ret = JSON.parse(ret);

      for (let i = 0; i < ret.result.path.length; i++) {
        let firstPub = getFirstPub(ret.result.path[i].subPath);
        ret.result.path[i].firstPub = firstPub;
      }
      res.send(ret);
    })
    .catch((e) => {
      res.send(e);
    })
});

// 주소로 대중교통 길찾기
router.get('/search/address', (req, res, next) => {

  let start = req.query.startAddress;
  let end = req.query.endAddress;

  addressService.getAddressInfo(start)
    .then((ret) => {
      ret = JSON.parse(ret);
      const startObject = {
        x: ret.documents[0].x,
        y: ret.documents[0].y,
        param: address
      }
      addressService.getAddressInfo(end)
        .then((ret) => {
          ret = JSON.parse(ret);
          const endObject = {
            x: ret.documents[0].x,
            y: ret.documents[0].y,
            param: address
          }

          const resObject = {
            start: startObject,
            end: endObject
          };

          res.send(resObject);
        })
    })
    .catch((e) => {
      res.send(e);
    })


});

function getFirstPub(subPath) {
  for (let i = 0; i < subPath.length; i++) {
    if (subPath[i].trafficType == 1) {
      return "1"
    } else if (subPath[i].trafficType == 2) {
      return "2"
    }
  }
}

module.exports = router;