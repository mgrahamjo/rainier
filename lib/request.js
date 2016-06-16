'use strict';

const https = require('https'),
	http = require('http');

function request(options, data, ssl) {

	options['User-Agent'] = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.109 Safari/537.36';

	options.Connection = 'keep-alive';

	return new Promise((resolve, reject) => {

		let callback = response => {

			let body = '';

		    response.on('data', function(d) {
		        body += d;
		    });

		    response.on('end', () => {

		    	if (response.statusCode >= 400) {

		    		reject(response.statusMessage);

		    	} else {

		    		resolve(body);

		    	}

		    });

		},

		req = ssl ? https.request(options, callback) : http.request(options, callback);

		req.write(data || '');

		req.end();

	});

}

function httpsRequest(options, data) {

	return request(options, data, true);

}

function httpRequest(options, data) {
	
	return request(options, data);

}

module.exports = {
	https: httpsRequest,
	http: httpRequest
};
