var axios = jest.fn(function(config) {
    return new Promise(function(resolve, reject) {
        if (config.url.toLowerCase().indexOf('success') > -1) {
            resolve({success: true})
        } else {
            reject({success: false})
        }
    })
});

module.exports = axios;