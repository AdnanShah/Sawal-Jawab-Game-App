/**
 * Created by crom on 2/16/2016.
 */

/*
 * @name:    Validate email
 * @param {string} email address
 * @returns {boolean} true|false
 * @author: mmubasher
 */
var moment = require('moment');
function ValidateEmail(email) {
    this.email = email;
}
ValidateEmail.prototype.validate = function() {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(this.email);
};

function GetFullURL(req) {
    //this.req = req;
    return req.protocol + '://' + req.get('host') + req.originalUrl;
}

function returnDate() {
    return moment().format('D, MMM YYYY');
    //return moment().format('YYYY-MM-DD');
}

function returnDateWithParam(date) {
    return moment(date).format('D, MMM YYYY')
    //return moment(date).format('YYYY-MM-DD')
}

function isEmpty(obj) {

    if (obj == null) return true;

    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}
/*GetFullURL.prototype.getFullURL = function() {
    return this.req.protocol + '://' + this.req.get('host') + this.req.originalUrl;
};*/

module.exports.ValidateEmail = ValidateEmail;
module.exports.GetFullURL = GetFullURL;
module.exports.returnDate = returnDate;
module.exports.returnDateWithParam = returnDateWithParam;
module.exports.isEmpty = isEmpty;