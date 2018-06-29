var apn = require('apn');
var apns = require('node_apns');
var gcm = require('node-gcm');
var mySQLConn = require('../config/database');
var logger = require('../utils/logger');


exports.sendPush1 = function (token, message, deviceType) {
    var service = new apn.Provider({
        cert: "certificates/cert.pem",
        key: "certificates/key.pem",
    });
    var note = new apn.Notification();
    note.alert = "alert for notification";

    // The topic is usually the bundle identifier of your application.
    note.topic = "Topic";

    console.log("sending to device");

    service.send(note, '66c6a304f987129f4041580008761caa867e03a3a9f8e9e137d72507e5a5231e');
}
var apnError1 = function (err) {
    console.log("APN Error:", err);
}
function sendIOSPush1(token, message) {
    var status = true;
    var msg;
    var desc;
    /*deviceUsers.findOne({deviceUser:receiverId,deviceType:'iPhone'}).select({deviceToken:1}).exec(function (err, token){
     if(err) return err;
     try{
     if(token){*/
    console.log(token);
    var options = {
        //"pfx": "E:/software/iOS Push certificate/aps_development.p12",
        "pfx": "./certificates/DEVPushCert.pem",
        "passphrase": "1234",
        "gateway": "gateway.sandbox.push.apple.com",
        "port": 2195,
        "enhanced": true,
        "cacheLength": 5
    };


    //options.errorCallback = apnError;
    console.log('123')
    var apnConnection = new apn.Connection(options);
    //var myDevice = new apn.Device("606a9f3e90ce1703c58f1516c5a8839a0fd06b6c25bbdfcbc075aca25a945d87");
    var myDevice = new apn.Device(token);
    var note = new apn.Notification();

    note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
    note.badge = 3;
    note.sound = "ping.aiff";
    note.alert = "\uD83D\uDCE7 \u2709 You have a new message";
    note.payload = {'messageFrom': message};

    if (apnConnection) {
        console.log('in');
        apnConnection.pushNotification(note, myDevice);
    }
    console.log('out');
    apnConnection.on("transmitted", function (notification, device) {
        console.log("Notification transmitted to:" + device.token.toString("hex"));
        console.log("Notification Detail: " + JSON.stringify(notification));
        msg = "Notification transmitted to:" + device.token.toString("hex");
        status = true;
        //sendJSON(msg,null);
    });

    apnConnection.on("transmissionError", function (errCode, notification, device) {
        console.error("Notification caused error: " + errCode + " for device ", device, notification);
        msg = "Notification caused error: " + errCode + " for device ";
        if (errCode === 8) {
            console.log("A error code of 8 indicates that the device token is invalid. This could be for a number of reasons - are you using the correct environment? i.e. Production vs. Sandbox");
            desc = "A error code of 8 indicates that the device token is invalid";
            status = false;
            //sendJSON(msg,desc);
        }
    });

    apnConnection.on("timeout", function () {
        console.log("Connection Timeout");
    });

    apnConnection.on("disconnected", function () {
        console.log("Disconnected from APNS");
    });

    apnConnection.on("socketError", console.error);
    //TODO: No need to send json as apn is already handeling this. Some kind of test tool to be created to test push from rest client

    //TODO: Need to improve more logging

}

function sendAndroidPush1(token, message) {
    //var message = new gcm.Message();
    /*deviceUsers.findOne({deviceUser:receiverId,deviceType:'Android'}).select({deviceToken:1}).exec(function (err, token){
     if (err) return err;
     */
    try {
        /*if(token) {*/
        var message = new gcm.Message({
            collapseKey: 'eventmost push notification',
            delayWhileIdle: true,
            timeToLive: 3,
            data: {
                type: 'pong',
                message: message
            },
            notification: {
                title: "New Message",
                icon: "ic_launcher",
                body: 'You have a new message '
            }
        });
        //message.addData('key1', message);
        //message.addNotification('title', 'You have a new message from senderId ' + senderId);
        console.log(token);
        var regIds = [];

        regIds.push(token);

        //TODO: Need an android app key
        var sender = new gcm.Sender('AIzaSyC8r1IGFX_dfSHP1d8O1m__88zAA1QtkVU');

        sender.send(message, regIds, function (err, result) {
            if (err) console.error(err);
            else    console.log(result);
        });

        sender.sendNoRetry(message, regIds, function (err, result) {
            if (err) console.error(err);
            else    console.log(result);
        });
        /* } else {
         res.format({
         json: function() {
         res.send({
         status: 404,
         messages: "No token found against the receiverId"
         })
         }
         })
         }*/
    } catch (e) {
        console.log(e);
    }

    //})
}

/*exports.sendPush = function (senderId, receiverId, message, deviceType) {
 if (deviceType === 'iPhone') {
 console.log("in iphone function.");
 sendIOSPush(senderId, receiverId, message);
 } else if (deviceType === 'Android') {
 sendAndroidPush(senderId, receiverId, message);
 }
 }*/

exports.sendPush = function (token, message, deviceType) {
    if (deviceType === 'iPhone') {
        console.log("in iphone function.");
        sendIOSPush(token, message, null);
    } else if (deviceType === 'Android') {
        sendAndroidPush(token, message, null);
    }
}
var apnError = function (err) {
    console.log("APN Error:", err);
    return callback();
}
function sendIOSPush2(receiverId, message) {
    var status = true;
    var msg;
    var desc;
    mySQLConn.pool(function (err, conn) {
        if (err) {
            throw err;
        } else {
            conn.query('select * from zw_device_users where user_id = ?', [receiverId], function (err, user) {
                if (err) {
                    conn.release();
                    throw err;
                } else {
                    if (user.length != 0) {
                        try {
                            //if (token) {
                            var options = {
                                "pfx": "public/certificate/Certificates.p12",
                                "passphrase": "zw123",
                                "gateway": "gateway.sandbox.push.apple.com",
                                "port": 2195,
                                "enhanced": true,
                                "cacheLength": 5
                            };
                            //options.errorCallback = apnError;

                            var apnConnection = new apn.Connection(options);
                            //var myDevice = new apn.Device("606a9f3e90ce1703c58f1516c5a8839a0fd06b6c25bbdfcbc075aca25a945d87");
                            var myDevice = new apn.Device(user[0].device_token);
                            var note = new apn.Notification();

                            note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
                            note.badge = 3;
                            note.sound = "ping.aiff";
                            note.alert = "\uD83D\uDCE7 \u2709 You have a new message";
                            note.payload = {'message': message};

                            if (apnConnection) {
                                apnConnection.pushNotification(note, myDevice);
                            }

                            apnConnection.on("transmitted", function (notification, device) {
                                conn.release();
                                //console.log("Notification transmitted to:" + device.token.toString("hex"));
                                console.log("Notification Detail: " + JSON.stringify(notification));
                                msg = "Notification transmitted to:" + device.token.toString("hex");
                                status = true;
                                //sendJSON(msg,null);
                            });

                            apnConnection.on("transmissionError", function (errCode, notification, device) {
                                conn.release();
                                console.error("Notification caused error: " + errCode + " for device ", device, notification);
                                msg = "Notification caused error: " + errCode + " for device ";
                                if (errCode === 8) {
                                    console.log("A error code of 8 indicates that the device token is invalid. This could be for a number of reasons - are you using the correct environment? i.e. Production vs. Sandbox");
                                    desc = "A error code of 8 indicates that the device token is invalid";
                                    status = false;
                                    //sendJSON(msg,desc);
                                }
                            });

                            apnConnection.on("timeout", function () {
                                conn.release();
                                console.log("Connection Timeout");
                            });

                            apnConnection.on("disconnected", function () {
                                conn.release();
                                console.log("Disconnected from APNS");
                            });

                            apnConnection.on("socketError", console.error);
                            //TODO: No need to send json as apn is already handeling this. Some kind of test tool to be created to test push from rest client
                            function sendJSON(msg, desc) {
                                //return function(){
                                if (status) {
                                    res.format({
                                        json: function () {
                                            res.send({
                                                status: 200,
                                                messages: msg
                                            })
                                        }
                                    })
                                } else {
                                    res.format({
                                        json: function () {
                                            res.send({
                                                status: 404,
                                                messages: msg,
                                                description: desc
                                            })
                                        }
                                    })
                                }
                                //}

                            }

                            //TODO: Need to improve more logging
                            /*function log(type) {
                             return function() {
                             console.log(type, arguments);
                             if(type == 'transmissionError') {
                             res.send(arguments);
                             }
                             }
                             }

                             apnConnection.on('error', log('error'));
                             apnConnection.on('transmitted', log('transmitted'));
                             apnConnection.on('timeout', log('timeout'));
                             apnConnection.on('connected', log('connected'));
                             apnConnection.on('disconnected', log('disconnected'));
                             apnConnection.on('socketError', log('socketError'));
                             apnConnection.on('transmissionError', log('transmissionError'));
                             apnConnection.on('cacheTooSmall', log('cacheTooSmall'));*/
                            /*} else {
                             res.format({
                             json: function () {
                             res.send({
                             status: 404,
                             messages: "No token found against the receiverId"
                             })
                             }
                             })
                             }*/
                        } catch (ex) {
                            console.log(ex);
                        }
                    } else {
                        console.log("No token found against the user");
                    }
                }
            });
        }
    });
}

function sendIOSPush(token, message,userObject) {
    var status = true;
    var msg;
    var desc;

    try {
        //if (token) {
        var options = {
            cert: __dirname+"/certificates/cert.pem",
            key: __dirname+"/certificates/key.pem",
            passphrase: "1234",
            production: true,
            "gateway": "gateway.push.apple.com",//"gateway": "gateway.sandbox.push.apple.com",
            "port": 2195,
        };

        var apnConnection = new apn.Connection(options);
        //var myDevice = new apn.Device("606a9f3e90ce1703c58f1516c5a8839a0fd06b6c25bbdfcbc075aca25a945d87");
        var myDevice = new apn.Device(token);
        var note = new apn.Notification();

        note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
        note.badge = 1;
        note.sound = "ping.aiff";
        note.alert =  message;
        note.payload = {'message': message,'user':userObject};
        console.log(note);
        if (apnConnection) {
            apnConnection.pushNotification(note, myDevice);
        }

        apnConnection.on("transmitted", function (notification, device) {
            logger.info("Connection released.");
            //console.log("Notification transmitted to:" + device.token.toString("hex"));
            logger.info("Notification Detail: " + JSON.stringify(notification));
            //console.log("Notification Detail: " + JSON.stringify(notification));
            msg = "Notification transmitted to:" + device.token.toString("hex");
            logger.info("Notification transmitted to:" + device.token.toString("hex"));
            status = true;
            //sendJSON(msg,null);
        });

        apnConnection.on("transmissionError", function (errCode, notification, device) {
            logger.error("Notification caused error: " + errCode + " for device ", device, notification);
            //console.error("Notification caused error: " + errCode + " for device ", device, notification);
            msg = "Notification caused error: " + errCode + " for device ";
            if (errCode === 8) {
                console.log("A error code of 8 indicates that the device token is invalid. This could be for a number of reasons - are you using the correct environment? i.e. Production vs. Sandbox");
                desc = "A error code of 8 indicates that the device token is invalid";
                status = false;
                //sendJSON(msg,desc);
            }
        });

        apnConnection.on("timeout", function () {
            console.log("Connection Timeout");
        });

        apnConnection.on("disconnected", function () {
            console.log("Disconnected from APNS");
        });

        apnConnection.on("socketError", console.error);
        //TODO: No need to send json as apn is already handeling this. Some kind of test tool to be created to test push from rest client
        function sendJSON(msg, desc) {
            //return function(){
            if (status) {
                res.format({
                    json: function () {
                        res.send({
                            status: 200,
                            messages: msg
                        })
                    }
                })
            } else {
                res.format({
                    json: function () {
                        res.send({
                            status: 404,
                            messages: msg,
                            description: desc
                        })
                    }
                })
            }
            //}

        }


    } catch (ex) {
        console.log(ex);
    }

}






function sendAndroidPush(token, message, userObject) {
    //var message = new gcm.Message();
    try {
        //if (token) {
        var message = new gcm.Message({
            collapseKey: 'zeitwert-prp',
            delayWhileIdle: true,
            timeToLive: 3,
            data: {
                type: 'pong',
                message: message,
                user: userObject
            },
            notification: {
                title: "New Message",
                icon: "ic_launcher",
                body: message
            }
        });

        console.log(token);
        var regIds = [];

        regIds.push(token);

        //TODO: Need an android app key
        var sender = new gcm.Sender('AIzaSyA-ST2pRA1DZm48EVdTETvVidG53DIY3PY');

        sender.send(message, regIds,10, function (err, result) {
            if (err) logger.error(err);
            else    logger.info(result);
        });
    } catch (e) {
        console.log(e);
    }


}

exports.sendPushToContact = function (receiverId, message,userObject) {
    console.log(receiverId);
    mySQLConn.pool(function (err, conn) {
        if (err) {
            throw err;
        } else {
            conn.query('select * from zw_device_users where user_id = ?', [receiverId], function (err, user) {
                if (err) {
                    throw err;
                    conn.release();
                } else {
                    if (user.length != 0) {
                        logger.info("Connection released.");
                        conn.release();
                        console.log(user);
                        if (user[0].device_type == 'iOS') {
                            sendIOSPush(user[0].device_token, message,userObject);
                        } else if (user[0].device_type == 'android') {
                            sendAndroidPush(user[0].device_token, message,userObject);
                        }
                    } else {
                        logger.info("Connection released.");
                        conn.release();
                        logger.info("No device user found");
                    }
                }
            });
        }
    });
}




exports.sendPushToZWContacts = function (receiverId, message,userObject,callback) {
    //console.log("rrr " + receiverId);
    mySQLConn.pool(function (err, conn) {
        if (err) {
            throw err;
        } else {
            conn.query('select * from zw_device_users where user_id = ?', [receiverId], function (err, user) {
                if (err) {
                    throw err;
                    conn.release();
                } else {
                    if (user.length != 0) {
                        logger.info("Connection released.");
                        conn.release();
                        if (user[0].device_type == 'iOS') {
                            sendIOSPushToZWContacts(user[0].device_token, message,userObject,function(){
                                return callback();
                            });
                        } else if (user[0].device_type == 'android') {
                            sendAndroidPushToZWContacts(user[0].device_token, message,userObject,function(){
                                return callback();
                            });
                        }
                    } else {
                        logger.info("Connection released.");
                        conn.release();
                        logger.info("No device user found");
                        return callback();
                    }
                }
            });
        }
    });
}

function sendIOSPushToZWContacts(token, message,userObject,callback) {
    var status = true;
    var msg;
    var desc;

    try {
        //if (token) {
        var options = {
            cert: __dirname+"/certificates/cert.pem",
            key: __dirname+"/certificates/key.pem",
            passphrase: "1234",
            production: true,
            "gateway": "gateway.push.apple.com",
            "port": 2195,
        };
        //options.errorCallback = apnError;

        var apnConnection = new apn.Connection(options);
        //var myDevice = new apn.Device("606a9f3e90ce1703c58f1516c5a8839a0fd06b6c25bbdfcbc075aca25a945d87");
        var myDevice = new apn.Device(token);
        var note = new apn.Notification();

        note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
        note.badge = 1;
        note.sound = "ping.aiff";
        note.alert =  message;
        note.payload = {'message': message,'user':userObject};

        if (apnConnection) {
            apnConnection.pushNotification(note, myDevice);
        }

        apnConnection.on("transmitted", function (notification, device) {
            status = true;
            return callback();
        });

        apnConnection.on("transmissionError", function (errCode, notification, device) {
            logger.error("Notification caused error: " + errCode + " for device ", device, notification);
            //console.error("Notification caused error: " + errCode + " for device ", device, notification);
            msg = "Notification caused error: " + errCode + " for device ";
            if (errCode === 8) {
                console.log("A error code of 8 indicates that the device token is invalid. This could be for a number of reasons - are you using the correct environment? i.e. Production vs. Sandbox");
                desc = "A error code of 8 indicates that the device token is invalid";
                status = false;
                return callback();
                //sendJSON(msg,desc);
            }
        });

        apnConnection.on("timeout", function () {
            console.log("Connection Timeout");
        });

        apnConnection.on("disconnected", function () {
            console.log("Disconnected from APNS");
        });

        apnConnection.on("socketError", console.error);
        //TODO: No need to send json as apn is already handeling this. Some kind of test tool to be created to test push from rest client
        function sendJSON(msg, desc) {
            //return function(){
            if (status) {
                res.format({
                    json: function () {
                        res.send({
                            status: 200,
                            messages: msg
                        })
                    }
                })
            } else {
                res.format({
                    json: function () {
                        res.send({
                            status: 404,
                            messages: msg,
                            description: desc
                        })
                    }
                })
            }
            //}

        }


    } catch (ex) {
        console.log(ex);
    }

}

function sendAndroidPushToZWContacts(token, message, userObject,callback) {
    //var message = new gcm.Message();
    try {
        //if (token) {
        var message = new gcm.Message({
            collapseKey: 'zeitwert-prp',
            delayWhileIdle: true,
            timeToLive: 3,
            data: {
                type: 'pong',
                message: message,
                user: userObject
            },
            notification: {
                title: "New Message",
                icon: "ic_launcher",
                body: message
            }
        });

        console.log(token);
        var regIds = [];

        regIds.push(token);

        //TODO: Need an android app key
        var sender = new gcm.Sender('AIzaSyA-ST2pRA1DZm48EVdTETvVidG53DIY3PY');

        sender.send(message, regIds,10, function (err, result) {
            if (err != null) {
                logger.error(err);
                return callback();
            }
            else {
                logger.info(result);
                return callback();
            }
        });

    } catch (e) {
        console.log(e);
    }

}



exports.sendChatPush = function (receiverId, message,userObject) {
    console.log(receiverId);
    mySQLConn.pool(function (err, conn) {
        if (err) {
            throw err;
        } else {
            conn.query('select * from zw_device_users where user_id = ?', [receiverId], function (err, user) {
                if (err) {
                    throw err;
                    conn.release();
                } else {
                    if (user.length != 0) {
                        logger.info("Connection released.");
                        conn.release();
                        console.log(user);
                        if (user[0].device_type == 'iOS') {
                            sendIOSPushChat(user[0].device_token, message,userObject);
                        } else if (user[0].device_type == 'android') {
                            sendAndroidPush(user[0].device_token, message,userObject);
                        }
                    } else {
                        logger.info("Connection released.");
                        conn.release();
                        logger.info("No device user found");
                    }
                }
            });
        }
    });
}

function sendIOSPushChat(token, message,userObject) {
    var status = true;
    var msg;
    var desc;

    try {
        //if (token) {
        var options = {
            cert: __dirname+"/certificates/cert.pem",
            key: __dirname+"/certificates/key.pem",
            passphrase: "1234",
            production: true,
            "gateway": "gateway.push.apple.com",//"gateway": "gateway.sandbox.push.apple.com",
            "port": 2195,
        };

        var apnConnection = new apn.Connection(options);
        //var myDevice = new apn.Device("606a9f3e90ce1703c58f1516c5a8839a0fd06b6c25bbdfcbc075aca25a945d87");
        var myDevice = new apn.Device(token);
        var note = new apn.Notification();
        var alert = {};
        if(userObject != null){
            alert.title = userObject;
        }

        alert.body = message;
        note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
        note.badge = 1;
        note.sound = 'default';
        note.alert =  alert;
        note.title =  userObject;
        //note.payload = {'message': message,'user':userObject};

        if (apnConnection) {
            apnConnection.pushNotification(note, myDevice);
        }

        apnConnection.on("transmitted", function (notification, device) {
            logger.info("Connection released.");
            //console.log("Notification transmitted to:" + device.token.toString("hex"));
            logger.info("Notification Detail: " + JSON.stringify(notification));
            //console.log("Notification Detail: " + JSON.stringify(notification));
            msg = "Notification transmitted to:" + device.token.toString("hex");
            logger.info("Notification transmitted to:" + device.token.toString("hex"));
            status = true;
            //sendJSON(msg,null);
        });

        apnConnection.on("transmissionError", function (errCode, notification, device) {
            logger.error("Notification caused error: " + errCode + " for device ", device, notification);
            //console.error("Notification caused error: " + errCode + " for device ", device, notification);
            msg = "Notification caused error: " + errCode + " for device ";
            if (errCode === 8) {
                console.log("A error code of 8 indicates that the device token is invalid. This could be for a number of reasons - are you using the correct environment? i.e. Production vs. Sandbox");
                desc = "A error code of 8 indicates that the device token is invalid";
                status = false;
                //sendJSON(msg,desc);
            }
        });

        apnConnection.on("timeout", function () {
            console.log("Connection Timeout");
        });

        apnConnection.on("disconnected", function () {
            console.log("Disconnected from APNS");
        });

        apnConnection.on("socketError", console.error);
        //TODO: No need to send json as apn is already handeling this. Some kind of test tool to be created to test push from rest client
        function sendJSON(msg, desc) {
            //return function(){
            if (status) {
                res.format({
                    json: function () {
                        res.send({
                            status: 200,
                            messages: msg
                        })
                    }
                })
            } else {
                res.format({
                    json: function () {
                        res.send({
                            status: 404,
                            messages: msg,
                            description: desc
                        })
                    }
                })
            }
            //}

        }


    } catch (ex) {
        console.log(ex);
    }

}