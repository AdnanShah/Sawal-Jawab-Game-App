var mysql = require('../config/database.js');
const Promise = require('bluebird');
class category {
    constructor() {

    }

    getBreakFast(req, parentCategory) {
        return new Promise(function (resolve) {
            let startDate = req.query.currentDate;
            console.log(startDate);
          
            var temp ="'" + startDate + "'";
            console.log(temp)
            let itemName = 'ItemName ';
            let DayName = 'DayNameEnglish';
            if (req.headers['locale'] === 'ar') {
                itemName = 'ItemNameArabic';
                DayName = 'DayNameArabic' ;
            }
            const query = `select ${itemName},${DayName},DailyImages from items where ParentID= 2 and  OfferDate = ${temp}`
            console.log(query)
            Promise.using(mysql.getSqlConn(), conn => {
                conn.query(query).then(rows => {
                    console.log(rows)
                    resolve(rows); //Passing results to callback function
                }).catch(err => {
                   throw err;
                });
            });
        });
    }
    getSalad(req, parentCategory) {
        return new Promise(function (resolve) {
            let startDate = req.query.currentDate;
            console.log(startDate);
            var temp ="'" + startDate + "'";
            let itemName = 'ItemName ';
            let DayName = 'DayNameEnglish';
            if (req.headers['locale'] === 'ar') {
                itemName = 'ItemNameArabic';
                DayName = 'DayNameArabic' ;
            }
            const query = `select ${itemName},${DayName},DailyImages from heroku_b62d6d820f1e210.items where ParentID=22 and OfferDate=${temp} `
            console.log(query)
            Promise.using(mysql.getSqlConn(), conn => {
                conn.query(query).then(rows => {
                   // console.log(rows)
                    resolve(rows); //Passing results to callback function
                }).catch(err => {
                    throw err;
                });
            });
        });
    }
    getMainCourse(req, parentCategory) {
        return new Promise(function (resolve) {
            let startDate = req.query.currentDate;
            console.log(startDate);
            var temp ="'" + startDate + "'";
            let itemName = 'ItemName ';
            let DayName = 'DayNameEnglish';
            if (req.headers['locale'] === 'ar') {
                itemName = 'ItemNameArabic';
                DayName = 'DayNameArabic' ;
            }
            const query = `select ${itemName},${DayName},DailyImages from heroku_b62d6d820f1e210.items where ParentID=42 and OfferDate=${temp} `
            console.log(query)
            Promise.using(mysql.getSqlConn(), conn => {
                conn.query(query).then(rows => {
                    console.log(rows)
                    resolve(rows); //Passing results to callback function
                }).catch(err => {
                    throw err;
                });
            });
        });
    }
    getSoup(req, parentCategory) {
        return new Promise(function (resolve) {
            let startDate = req.query.currentDate;
            console.log(startDate);
            var temp ="'" + startDate + "'";
            let itemName = 'ItemName ';
            let DayName = 'DayNameEnglish';
            if (req.headers['locale'] === 'ar') {
                itemName = 'ItemNameArabic';
                DayName = 'DayNameArabic' ;
            }
            const query = `select ${itemName},${DayName},DailyImages from items where ParentID=32 and OfferDate=${temp} `
            console.log(query)
            Promise.using(mysql.getSqlConn(), conn => {
                conn.query(query).then(rows => {
                  //  console.log(rows)
                    resolve(rows); //Passing results to callback function
                }).catch(err => {
                    throw err;
                });
            });
        });
    }
    gerDessert(req, parentCategory) {
        return new Promise(function (resolve) {
            let startDate = req.query.currentDate;
            console.log(startDate);
          
            var temp ="'" + startDate + "'";
            let itemName = 'ItemName ';
            let DayName = 'DayNameEnglish';
            if (req.headers['locale'] === 'ar') {
                itemName = 'ItemNameArabic';
                DayName = 'DayNameArabic' ;
            }
            const query = `select ${itemName},${DayName},DailyImages from items where ParentID=12 and OfferDate=${temp} `
            console.log(query)
            Promise.using(mysql.getSqlConn(), conn => {
                conn.query(query).then(rows => {
                   // console.log(rows)
                    resolve(rows); //Passing results to callback function
                }).catch(err => {
                    throw err;
                });
            });
        });
    }
    getBeverages(req, parentCategory) {
        return new Promise(function (resolve) {
            let startDate = req.query.currentDate;
            console.log(startDate);
          
            var temp ="'" + startDate + "'";
            let itemName = 'ItemName ';
            let DayName = 'DayNameEnglish';
            if (req.headers['locale'] === 'ar') {
                itemName = 'ItemNameArabic';
                DayName = 'DayNameArabic' ;
            }
            const query = `select ${itemName},${DayName},DailyImages from items where ParentID=52 and OfferDate=${temp} `

            console.log(query)
            Promise.using(mysql.getSqlConn(), conn => {
                conn.query(query).then(rows => {
                   // console.log(rows)
                    resolve(rows); //Passing results to callback function
                }).catch(err => {
                    throw err;
                });
            });
        });
    }
    /*
        This Function will return categories
        that does'nt have any parent id
    */
    getCategories(req, callback) {
        let itemName = 'ItemName ';
        let DayName = 'DayNameEnglish';
        if (req.headers['locale'] === 'ar') {
            itemName = 'ItemNameArabic';
            DayName = 'DayNameArabic' ;
        }
        var query = `SELECT ItemID,${itemName},${DayName},DailyImages FROM items WHERE ParentID = 0`;
        console.log(query)
        Promise.using(mysql.getSqlConn(), conn => {
            conn.query(query).then(rows => {
                console.log(rows)
                callback(rows); //Passing results to callback function
            }).catch(err => {
               throw err;
            });
        });



    }


}

module.exports = category;
