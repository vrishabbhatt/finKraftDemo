const request = require('request');

//request helper file to be used to call zoho apis
module.exports = {
    getReq: function(url, queryStringObject){
        return new Promise((resolve, reject) => {
            request.get({url, qs: queryStringObject}, function(err, response, body){
                if(err){
                    reject(err);
                    return;
                }
                const {statusCode} = response
                if(statusCode !== 200){
                    reject(body);
                    return;
                }
                resolve(body);
            });
        });
    },

    postReq: function(url, headers, json){
        return new Promise((resolve, reject) => {
            request.post({url, headers, json}, (err, response, body) => {
                if(err){
                    reject(err);
                    return;
                }
                const {statusCode} = response;
                if(statusCode >= 200 && statusCode < 300){
                    resolve(body);
                    return;
                }
                reject(body);
            });
        })
    },

    putReq: function(url, headers, json){
        return new Promise((resolve, reject) => {
            request.put({url, headers, json}, (err, response, body) => {
                if(err){
                    reject(err);
                    return;
                }
                const {statusCode} = response;
                if(statusCode >= 200 && statusCode < 300){
                    resolve(body);
                    return;
                }
                reject(body);
            });
        });
    },

    deleteReq: function(url, queryStringObject){
        return new Promise((resolve, reject) => {
            request.delete({url, qs: queryStringObject}, function(err, response, body){
                if(err){
                    reject(err);
                    return;
                }
                const {statusCode} = response;
                if(statusCode >= 200 && statusCode < 300){
                    resolve(body);
                    return;
                }
                reject(body);
            });
        })
    }

}