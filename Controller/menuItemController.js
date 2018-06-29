
var mysql = require('../config/database.js');
var category = require("../Modal/category");


exports.getAllCategoriesController = function (req, res) {
    var categories = new category();

    categories.getCategories(req, async function (result, err) {
        //Get parent categories
        var parentCategories = result;

        //console.log(result)
        //Now this function will call another async function and await to get the result
        var Breakfast = await categories.getBreakFast(req, parentCategories);
        console.log(Breakfast); //execution awaiting until all parent and subcategories are fetched
        var Salad = await categories.getSalad(req, parentCategories);
        var Soup = await categories.getSoup(req, parentCategories);
        var Dessert = await categories.gerDessert(req, parentCategories);
        var Beverages = await categories.getBeverages(req, parentCategories);
        var MainCourse = await categories.getMainCourse(req,parentCategories);
        let categoriesArray = [{ "CategoryName": "test", "Items": "test","DailyImages":"" },
        { "CategoryName": "test", "Items": "test","DailyImages":"" },
        { "CategoryName": "test", "Items": "test" ,"DailyImages":""},
        { "CategoryName": "test", "Items": "test","DailyImages":"" },
        { "CategoryName": "test", "Items": "test","DailyImages":"" },
        { "CategoryName": "test", "Items": "test","DailyImages":"" }];
        var total_length = (Salad.length) + (Breakfast.length) + (Soup.length) + (Dessert.length) + (Beverages.length) + (MainCourse.length);
        // console.log("BreakFast",Breakfast[0].ItemName);
        console.log("Total Lenght", categoriesArray[0].CategoryName);
        let obj = {
        }
        if (Salad.length != 0) {
            categoriesArray[5].CategoryName = "Main Course";
            categoriesArray[5].Items = MainCourse[0].ItemName
            categoriesArray[5].DailyImages=MainCourse[0].DailyImages
        }else{
            categoriesArray[5].CategoryName = "Main Course";
            categoriesArray[5].Items = "No Menu Avaliable ";
            categoriesArray[5].DailyImages= "No Images Avaliable";
        }
        if (Breakfast.length != 0) {
            categoriesArray[0].CategoryName = "BreakFast";
            categoriesArray[0].Items = Breakfast[0].ItemName;
            categoriesArray[0].DailyImages=Breakfast[0].DailyImages;
        }else{
            categoriesArray[0].CategoryName = "BreakFast";
            categoriesArray[0].Items = "No Menu Avaliable ";
            categoriesArray[0].DailyImages="No Images Avaliable";
        }
        if (Salad.length != 0) {
            categoriesArray[1].CategoryName = "Salad";
            categoriesArray[1].Items = Salad[0].ItemName
            categoriesArray[1].DailyImages=Salad[0].DailyImages
        }else{
            categoriesArray[1].CategoryName = "Salad";
            categoriesArray[1].Items = "No Menu Avaliable ";
            categoriesArray[1].DailyImages= "No Images Avaliable";
        }
        if (Soup.length != 0) {
            categoriesArray[2].CategoryName = "Soup";
            categoriesArray[2].Items = Soup[0].ItemName;
            categoriesArray[2].DailyImages=Soup[0].DailyImages
        }else{
            categoriesArray[2].CategoryName = "Soup";
            categoriesArray[2].Items = "No Menu Avaliable ";
            categoriesArray[2].DailyImages="No Images Avaliable";
        }
        if (Dessert.length != 0) {
            categoriesArray[3].CategoryName = "Dessert";
            categoriesArray[3].Items = Dessert[0].ItemName;
            categoriesArray[3].DailyImages=Dessert[0].DailyImages
        }else{
            categoriesArray[3].CategoryName = "Dessert";
            categoriesArray[3].Items ="No Menu Avaliable ";
            categoriesArray[3].DailyImages="No Images Avaliable";
        }
        if(Beverages.length!=0){
            categoriesArray[4].CategoryName = "Beverages";
            categoriesArray[4].Items = Beverages[0].ItemName;
            categoriesArray[4].DailyImages=Beverages[0].DailyImages
        }else{
            categoriesArray[4].CategoryName = "Beverages";
            categoriesArray[4].Items ="No Menu Avaliable";
            categoriesArray[4].DailyImages="No Images Avaliable";
        }    
        res.json({
            status: 200,
            categories: categoriesArray,
        });
    });

}


exports.getAllCategoriesControllers = function (req, res) {
    var categories = new category();

    categories.getCategories(req, async function (result, err) {
        //Get parent categories
        var parentCategories = result;

        //console.log(result)
        //Now this function will call another async function and await to get the result
        var Breakfast = await categories.getBreakFast(req, parentCategories);
        console.log(Breakfast); //execution awaiting until all parent and subcategories are fetched
        var Salad = await categories.getSalad(req, parentCategories);
        var Soup = await categories.getSoup(req, parentCategories);
        var Dessert = await categories.gerDessert(req, parentCategories);
        var Beverages = await categories.getBeverages(req, parentCategories);
        let categoriesArray = [{ "CategoryName": "test", "Items": "test","DailyImages":"" },
        { "CategoryName": "test", "Items": "test","DailyImages":"" },
        { "CategoryName": "test", "Items": "test" ,"DailyImages":""},
        { "CategoryName": "test", "Items": "test","DailyImages":"" },
        { "CategoryName": "test", "Items": "test","DailyImages":"" }];
        var total_length = (Salad.length) + (Breakfast.length) + (Soup.length) + (Dessert.length) + (Beverages.length);
        // console.log("BreakFast",Breakfast[0].ItemName);
        console.log("Total Lenght", categoriesArray[0].CategoryName);
        let obj = {
        }
        if (Breakfast.length != 0) {
            categoriesArray[0].CategoryName = "BreakFast";
            categoriesArray[0].Items = Breakfast[0].ItemName;
            categoriesArray[0].DailyImages=Breakfast[0].DailyImages;
        }else{
            categoriesArray[0].CategoryName = "BreakFast";
            categoriesArray[0].Items = "No Menu Avaliable ";
            categoriesArray[0].DailyImages="No Images Avaliable";
        }
        if (Salad.length != 0) {
            categoriesArray[1].CategoryName = "Salad";
            categoriesArray[1].Items = Salad[0].ItemName
            categoriesArray[1].DailyImages=Salad[0].DailyImages
        }else{
            categoriesArray[1].CategoryName = "Salad";
            categoriesArray[1].Items = "No Menu Avaliable ";
            categoriesArray[1].DailyImages= "No Images Avaliable";
        }
        if (Soup.length != 0) {
            categoriesArray[2].CategoryName = "Soup";
            categoriesArray[2].Items = Soup[0].ItemName;
            categoriesArray[2].DailyImages=Soup[0].DailyImages
        }else{
            categoriesArray[2].CategoryName = "Soup";
            categoriesArray[2].Items = "No Menu Avaliable ";
            categoriesArray[2].DailyImages="No Images Avaliable";
        }
        if (Dessert.length != 0) {
            categoriesArray[3].CategoryName = "Dessert";
            categoriesArray[3].Items = Dessert[0].ItemName;
            categoriesArray[3].DailyImages=Dessert[0].DailyImages
        }else{
            categoriesArray[3].CategoryName = "Dessert";
            categoriesArray[3].Items ="No Menu Avaliable ";
            categoriesArray[3].DailyImages="No Images Avaliable";
        }
        if(Beverages.length!=0){
            categoriesArray[4].CategoryName = "Beverages";
            categoriesArray[4].Items = Beverages[0].ItemName;
            categoriesArray[4].DailyImages=Beverages[0].DailyImages
        }else{
            categoriesArray[4].CategoryName = "Beverages";
            categoriesArray[4].Items ="No Menu Avaliable";
            categoriesArray[4].DailyImages="No Images Avaliable";
        }    
        res.json({
            status: 200,
            categories: categoriesArray,
        });
    });

}

