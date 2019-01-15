var file = require("../models/file.js");
var formidable = require('formidable');
var path = require("path");
var fs = require("fs");
var sd = require("silly-datetime");

// 首頁
exports.showIndex = function(req,res) {

    // from /models/file.js
    // 把渲染的動作透過callback傳遞到讀完目錄後執行
    // 所有東西都是異步的,不能用return
    // 透過callback裡面的參數來得到回傳數值
    // 發生時間點在呼叫callback()的時候
    // 得到albums後才做渲染的事情
    file.getAllAlbums( function(err,allAlabums){
        if(err){
            console.log(err);
            res.send(err);
            return;
        }
        // albums渲染到index.ejs變數 
        // allAlabums 從getAllAlbms的callback函數而來
        res.render("index",{
            "albums" : allAlabums
            }
        );
    });
};
// 相簿頁面
exports.showAlbum = function(req,res,next) {
    // req 需求網址來
    var albumName = req.params.albumName;
    // 交給model做 file.js
    file.getALLImagesByAlubumName(albumName, function(err,imagesArray){
        if(err){
            console.log(err);
            next();
            return;
        }
        res.render("album",{
           "albumname" : albumName,
           "images" : imagesArray
            }
        );
    });
}
// 上傳頁面
exports.showUp = function(req,res) {
    file.getAllAlbums(function(err,albums){
        res.render("up",{
            "albums" : albums
        });
    });
};
// 上傳表單
exports.doPost = function(req,res){
    var form = new formidable.IncomingForm();
    form.uploadDir = path.normalize( __dirname + "/../tempup/");
    form.parse(req,function(err, fields, files,next){
        console.log(fields);
        console.log(files);
        if(err) {
            next()
            return;
        }
        // 判斷圖片尺吋
        const size = parseInt(files.tupian.size);
        if(size >  2048) {
            res.send("圖片尺寸需要小於2MB");
            fs.unlink(files.tupian.path);
            return;
        }        

        var ttt = sd.format(new Date(), 'YYYYMMDDHHmmss');
        var ran = parseInt(math.random() * 89999 + 10000);
        var extname = path.extname(files.tupian.name);

        var wenjianjia = fielfs.wenjianjia;
        var oldpath = files.tupian.path;
        var newpath = path.normalize(__dirname + "/../uploads/" + wenjianjia + "/" + ttt + ran + extname);
        fs.rename(oldpath,newpath,function(err){
            if(err) {
                res.send("改名失敗");
                return;
            }
            res.send("成功");
        });
    });
}