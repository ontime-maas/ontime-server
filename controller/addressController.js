const addressService = require('../service/addressService')

const addressController = {};

addressController.getLocationByAddress= (req,res,next) => {
    let address = req.query.address
    addressService.getAddressInfo(address)
    .then((ret) => {
        ret = JSON.parse(ret);
        const responseObject = {
            x : ret.documents[0].x,
            y : ret.documents[0].y,
            param : address
        }
        res.send(responseObject);
    })
    .catch((e) => {
        res.send(e);
    })
}





module.exports = addressController;
