const express = require('express');
const router = express.Router();
const mysql = require('../../config/database.js');
const database = require('../../config/database.js');
const helper = require('../../utils/helper.js');
const config = require('../../config/configuration.js');
const logger = require('../../utils/logger');
const moment = require('moment');
const async = require('async');
const Promise = require('bluebird');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const util = require('util');
const fs = require('fs');
var base64Img = require('base64-img');
const FCM = require('fcm-push');


const serverKey = `AAAATrkUl9Y:APA91bHmjHuBdbSwJ3RzOsjX7w8lt
                HXbVH8G6EcMKJ3Fe3R1dQz3tPpuTSZZFnJhaKf-fF4WfR
                tOc32DGR7GJuUZLipHmmMu0USHcrizgwKaWpdTHHMWadu
                fx_zG7SSBjmLS4mwFLGy-`;
router.post('/sendPush', (req,res) => {
    let fcm = new FCM(serverKey);
    let message = {
        to : req.body.device_id,
        data : {

        },
        notification : {
            title : 'MY LMUP',
            body : 'LMU body'
        },
    };
    fcm.send(message).then((response) => {
        res.json({status : 200, message : 'Successfully Sent With response', response});
    }).catch(err => {
        res.json({status : 500, message : 'ErrorinFCM' + err});
    });
});



module.exports = router;