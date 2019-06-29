const customRequest = require('../request/customRequest');

const getAddressInfo = address => {
    const options = {
        uri: 'https://dapi.kakao.com/v2/local/search/address.json',
        qs: {
            query: address
        }
    };
    return new Promise((resolve, reject) => {
        customRequest.kakaoRequest(options, (err, res, body) => {
            if (err) {
                reject(err);
            }
            resolve(body);
        })
    })
}

module.exports = {
    getAddressInfo: getAddressInfo
}