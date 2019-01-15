var fs = require("fs");

// 取得./upload當中所有目錄
exports.getAllAlbums = function(callback){
    fs.readdir("./uploads",function(err,files){
        if(err){
            callback("沒找到upload文件夾",null);
        }
        var allAlbums = [];
        (function iterator(i){
            // 跌代同等檔案數量就結束
            if(i == files.length){
                // 呼叫callback()回傳，做渲染
                callback(null,allAlbums);
                return;
            }
            // 取得檔案狀態為文件夾
            fs.stat("./uploads/" + files[i], function(err,stats){
                if(err) {
                    callback("找不到文件 " + files[i], null);
                    return;
                }
                // 目錄名稱push到陣列中
                if(stats.isDirectory()){
                    allAlbums.push(files[i]);
                } 
                iterator(i + 1); // 遞迴呼叫 下一個i項目
            });
        })(0);
    });
}
exports.getALLImagesByAlubumName = function(albumName,callback){
    var albumPath = "./uploads/" + albumName;
    fs.readdir(albumPath,function(err,files){
        if(err){
            callback("沒找到upload文件夾",null);
            return;
        }
        var allImages = [];
        (function iterator(i){
            if(i == files.length){
                callback(null,allImages);
                return;
            }
            fs.stat(albumPath + "/" + files[i], function(err,stats){
                if(err) {
                    callback("找不到文件" + files[i], null);
                    return;
                }
                if(stats.isFile()){
                    if(getFileExtension3(files[i]) == "jpg" ) {
                        allImages.push(files[i]);
                    }
                } 
                iterator(i + 1);
            });
        })(0);
    });
}

function getFileExtension3(filename) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
  }