var express = require("express");
var app = express();
var router = require("./controller") // .controller/router.js
// controller需要有package.json->main 去指定

// 模板引擎 預設目錄 views
app.set("view engine", "ejs");

// 靜態頁面
app.use(express.static("./public")); 
app.use(express.static("./uploads"));

// 首頁,執行router.showIndex函數變數
app.get("/", router.showIndex); 
// album
app.get("/:albumName", router.showAlbum);
// upload
app.get("/up", router.showUp);
app.post("/up",router.doPost);

// err 404
app.use(function(err,res){
    res.render("err") // render err.ejs
});

var server = app.listen(80, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Server is listening at http://%s:%s", host, port);
});
 