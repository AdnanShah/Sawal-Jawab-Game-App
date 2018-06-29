var express = require('express');
var router = express.Router();
var mysql = require('../../config/database.js');
var database = require('../../config/database.js');
var helper = require('../../utils/helper.js');
var config = require('../../config/configuration.js');
var logger = require('../../utils/logger');
var moment = require('moment');
var async = require('async');
const Promise = require('bluebird');
var QRCode = require('qrcode')

router.post('/generateQR', function (req, res, next) {
    req.checkBody('shop_id').notEmpty();

    req.getValidationResult().then(error => {
        if (!error.isEmpty()) {
            res.json({ status: 403, message: 'Please Provide Shop Id to generate QR', error: error });
        } else {
            let shopId = {
                shop_id: req.body.shop_id,
            }
            const insertShopId = `insert into Shops_data set ?`;
            var link = `https://mirzaqr.herokuapp.com/api/profile/hitQrLink?shop_id=${req.body.shop_id}`
            QRCode.toDataURL(link, function (err, url) {

                Promise.using(mysql.getSqlConn(), (conn) => {
                    conn.query(insertShopId, shopId).then(service => {
                        res.status(200).json({ message: "New Shop Added with Empty Qr", url })
                    }).catch(err => {
                        res.json({ status: 500, message: 'QueryError' + err });
                    });
                });
                console.log(url)
            })
        }

    })

});

router.get('/hitQrLink', function (req, res, next) {
    let getShopData=`select * from Shops_data where shop_id=${req.query.shop_id}`
    Promise.using(mysql.getSqlConn(), (conn) => {
        conn.query(getShopData ).then(service => {
            if(service.length!=0){
                res.render('viewUsers', { title: service[0].id })
            }else{
                res.render('viewUsers', { title: "No Shop Data for this id" })
            }
          
        }).catch(err => {
            res.json({ status: 500, message: 'QueryError' + err });
        });
    });
   // console.log("req.query.shop_id", req.query.shop_id);
    // res.render("Shop Info",req.query.shop_id)
});
module.exports = router;