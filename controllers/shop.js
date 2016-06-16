'use strict';

const 
    request = require('../lib/request'),
    xml = require('xml2js').parseString;

module.exports = (req, res) => {

    request.http({

        host: 'rest.ebay.com',
        path: '/epn/v1/find/item.rss?keyword=Rainier+Beer&categoryId1=11450&categoryId2=99&sortOrder=BestMatch&programid=1&campaignid=5337899037&toolid=10039&listingType1=All&lgeo=1&feedType=rss',
        method: 'GET'

    }).then(data => {

        xml(data, (err, result) => {

            if (err) {

                console.error(err);

            } else {
                
                let items = result.rss.channel[0].item;

                items.forEach(item => {

                    item.image = item.description[0].match(/<img.*?>/)[0];

                });

                res.render('shop', {

                    current: 'shop',
                    items: items

                });

            }

        });

    });

};