/**
 * Created by abdul jabbar on 21/07/2017.
 */
var express = require('express');
var router = express.Router();
var mysql = require('../../config/database.js');
var database = require('../../config/database.js');
var helper = require('../../utils/helper.js');
var config = require('../../config/configuration.js');
var jwt = require('jsonwebtoken');
var logger = require('../../utils/logger');
var moment = require('moment');
var async = require('async');
const Promise = require('bluebird');
var bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const multer = require ('multer');
var cloudinary = require('cloudinary');
var cloudinaryStorage = require('multer-storage-cloudinary');
const translate = require('google-translate-api');


module.exports = router;