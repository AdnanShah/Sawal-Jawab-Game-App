var express = require("express");
var router = express.Router();
var mysql = require("../../config/database.js");
var database = require("../../config/database.js");
var helper = require("../../utils/helper.js");
var config = require("../../config/configuration.js");
var jwt = require("jsonwebtoken");
var logger = require("../../utils/logger");
var moment = require("moment");
var async = require("async");
const Promise = require("bluebird");
var bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const cloudinary = require("cloudinary");

router.post("/contactus", (req, res) => {
  console.log("req", req.body);
  
  req.checkBody("name").notEmpty();
  // req.checkBody("email").notEmpty();
  // req.checkBody("number").notEmpty();
  // req.checkBody("reason").notEmpty();
  // req.checkBody("details").notEmpty();
  req.getValidationResult().then(error => {
    if (!error.isEmpty()) {
      res.json({
        status: 403,
        message: "ServerMandatoryParameterMissing",
        error: error
      });
    } else {
      let data = {
        name: req.body.name,
        number: req.body.number,
        reason: req.body.reason,
        details: req.body.details,
        email: req.body.email
      };

      var smtpTrans = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "fameenkhan12345@gmail.com",
          pass: "fameenkhan"
        }
      });
      var mailOptions = {
        to: "fameenkhan12345@gmail.com",
        from: "admin@admin.admin",
        subject: "Contact request from Fame Entertainment",
        text: `Contact request from the user
        name:${req.body.name} 
        -------------------------
        number:${req.body.number} 
        -------------------------
        reason:${req.body.reason} 
        -------------------------
        email:${req.body.email} `
      };
      smtpTrans
        .sendMail(mailOptions)
        .then(() => {
          res.json({
            status: 200,
            message: "User Registered And Email Sent Successfully"
          });
        })
        .catch(err => {
          res.json({
            status: 401,
            message: "Email not sent",
            Error: err
          });
        });
    }
  });
});

router.post("/apply", (req, res) => {
  req.checkBody("artist").notEmpty();
  req.checkBody("f_name").notEmpty();
  req.checkBody("cnic").notEmpty();
  req.checkBody("date_of_birth").notEmpty();
  req.checkBody("age").notEmpty();
  req.checkBody("gender").notEmpty();
  req.checkBody("status").notEmpty();
  req.checkBody("height").notEmpty();
  req.checkBody("weight").notEmpty();
  req.checkBody("chest").notEmpty();
  req.checkBody("qualification").notEmpty();
  req.checkBody("institution").notEmpty();
  req.checkBody("contact").notEmpty();
  req.checkBody("whatsapp").notEmpty();
  req
    .checkBody("email")
    .notEmpty()
    .isEmail();
  req.checkBody("fb_ID").notEmpty();
  req.checkBody("address").notEmpty();
  req.checkBody("artist_cat").notEmpty();
  req.getValidationResult().then(error => {
    if (!error.isEmpty()) {
      res.json({
        status: 403,
        message: "ServerMandatoryParameterMissing",
        error: error
      });
    } else {
      let data = {
        artist: req.body.artist,
        f_name: req.body.f_name,
        cnic: req.body.cnic,
        date_of_birth: req.body.date_of_birth,
        age: req.body.age,
        gender: req.body.gender,
        status: req.body.status,
        height: req.body.height,
        weight: req.body.weight,
        chest: req.body.chest,
        qualification: req.body.qualification,
        institution: req.body.institution,
        contact: req.body.contact,
        whatsapp: req.body.whatsapp,
        email: req.body.email,
        fb_ID: req.body.fb_ID,
        address: req.body.address,
        artist_cat: req.body.artist_cat
      };

      var smtpTrans = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "fameenkhan12345@gmail.com",
          pass: "fameenkhan"
        }
      });
      var mailOptions = {
        to: "fameenkhan12345@gmail.com",
        from: "admin@admin.admin",
        subject: "F.A.M.E Entertainment MEMBERSHIP (NEW TALENT)",
        text: `MEMBER DETAILS:
        -------------------------------------------
        Artist:            ${req.body.artist} 
        -------------------------------------------
        Father's/Husband's:${req.body.f_name} 
        -------------------------------------------
        CNIC:              ${req.body.cnic} 
        -------------------------------------------
        Date of Birth:     ${req.body.date_of_birth} 
        --------------------------------------------
        Age:               ${req.body.age} 
        --------------------------------------------
        Gender:            ${req.body.gender} 
        --------------------------------------------
        Status:            ${req.body.status} 
        --------------------------------------------
        Height:            ${req.body.height} 
        --------------------------------------------
        Weight:            ${req.body.weight} 
        --------------------------------------------
        Chest:             ${req.body.chest} 
        --------------------------------------------
        Qualification:     ${req.body.qualification} 
        --------------------------------------------
        Institution:       ${req.body.institution} 
        --------------------------------------------
        Contact No:        ${req.body.contact} 
        --------------------------------------------
        WhatsApp No:       ${req.body.whatsapp} 
        --------------------------------------------
        Email:             ${req.body.email} 
        --------------------------------------------
        Facebook ID:       ${req.body.fb_ID} 
        --------------------------------------------
        Address:           ${req.body.address} 
        --------------------------------------------
        Artist Category:   ${req.body.artist_cat} 
        --------------------------------------------
       `
      };
      smtpTrans
        .sendMail(mailOptions)
        .then(() => {
          res.json({
            status: 200,
            message: "User Registered And Email Sent Successfully"
          });
        })
        .catch(err => {
          res.json({
            status: 401,
            message: "Email not sent",
            Error: err
          });
        });
    }
  });
});

module.exports = router;
