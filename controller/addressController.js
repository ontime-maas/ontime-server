const addressService = require('../service/addressService');

const getLocationByAddress = (req, res, next) => {
    addressService.getAddressInfo(req.params.id)
        .then((ret) => {
            ret = JSON.parse(ret);
            const responseObject = {
                x: ret.documents[0].x,
                y: ret.documents[0].y,
                param: req.params.id
            }
            res.send(responseObject);
        })
        .catch((e) => {
            res.send(e);
        })

}

module.exports = {
    getLocationByAddress: getLocationByAddress
}