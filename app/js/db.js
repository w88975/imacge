var db = openDatabase(' imacge ', '1.0', 'save ak and sk', 2 * 1024 * 1024);
db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS qiniu (id unique, ak,sk,scope)');
});

db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS qiniu (id unique, ak,scope)');
    tx.executeSql('INSERT INTO qiniu (id, ak,sk,scope) VALUES (1, "ak","sk","scope")');
});

// 获取ak和sk
db.getAuth = function (callback) {
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM qiniu', [], function (tx, results) {
            var len = results.rows.length, i;
            if (len === 0) {
                alert('设置');
                return null;
            }
            callback({ ak:results.rows.item(0).ak,sk:results.rows.item(0).sk,scope: results.rows.item(0).scope });
        }, null);
    });
};

// 设置
db.setAuth = function (ak,sk,scope) {
    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS qiniu (id unique, ak,scope)');
        tx.executeSql('INSERT INTO qiniu (id, ak,sk,scope) VALUES (1, "'+ak+'","'+sk+'","'+scope+'")');
    });
};

db.getAuth(function(obj) {
    console.log(obj);
});
