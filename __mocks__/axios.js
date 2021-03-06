var axios = jest.fn(function(config) {
    return new Promise(function(resolve, reject) {
        if (config.url.toLowerCase().indexOf('failure') > -1) {
            reject({data: {success: false}})
        } else {
            resolve({data: {success: true}})
        }
    })
});

module.exports = axios;
