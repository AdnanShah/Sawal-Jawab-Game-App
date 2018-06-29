var exports= module.exports ={};
var express = require('express');
var router = express.Router();
var mysql = require('../../config/database.js');
var database = require('../../config/database.js');
const Promise = require('bluebird');
const translate = require('google-translate-api');
exports.EnglisToArabicTranslation = function(word){
    let search = JSON.stringify(word);
    let values={};
    let str,str1="";
   let dataSet='';
        Promise.using(mysql.getSqlConn(), conn => {
                console.log('in if');
                   const qry=`select * from dictionary where arabic_word = ${search}`;
                   conn.query(qry).then(items => {
                       if(items.length!=0){
                        console.log('word found',items[0].english_word);
                       dataSet= items[0].english_word;
                       return dataSet;      
                       }else{
                        translate(search, {to: 'en'}).then(trns => {
                            console.log('in else for trans');
                            str = trns.text.replace(/^"(.*)"$/, '$1');
                            str1=search.replace(/^"(.*)"$/, '$1');
                            values={
                                english_word:str,
                                arabic_word:str1
                            }
                            conn.query(`insert into dictionary set ?`,values).then(() => {
                              dataSet= str;
                              return dataSet;
                            }).catch(err => {
                               return 'false';
                            });
                        }).catch(err => {
                            return 'false';
                        });        
                       }
                    // return dataSet;  
                   }).catch(err => {
                      return 'false';
                })
            }).catch(err => {
                return 'false';
            });         
}
exports.ArabicToEnglishTranslation =function (word){
    Promise.using(mysql.getSqlConn(), conn => {
        const qry=`select * from dictionary where english_word = ${search}`;
            conn.query(qry).then(items => {   
                if(items.length!=0){
                    res.json({status:200, message:"data found",data:items[0].arabic_word})
                  }else{
                    translate(search, {to: 'ar'}).then(trns => {
                         str = trns.text.replace(/^"(.*)"$/, '$1');
                         str1=search.replace(/^"(.*)"$/, '$1');
                        values={
                            english_word:str1,
                            arabic_word:str
                        }
                        conn.query(`insert into dictionary set ?`,values).then(() => {
                           console.log(str);
                            return  str;
                        }).catch(err => {
                            return 'false';
                        });
                    }).catch(err => {
                        return 'false';
                       
                    });
                  }
            }).catch(err => {
                return 'false';
            })
    }).catch(err => {
        return 'false';
    });     
}