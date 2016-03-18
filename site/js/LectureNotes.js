/**
 * Created by Andy on 3/18/2016.
 */
function openDb() {
    console.log("openDb ...");
    var req = indexedDB.open(DB NAME, DB VERSION); //meed to know which db to use and its version
    req.onsuccess = function(evt) {
        //db = req.result;
        db = this.result;
        console.log("openDb DONE");

    };
    req.onerror = function (evt) {
        console.log("openDb.onupgradeneeded");
        var store = evt.currentTarget.result.createObjectStore(
            DB_STORE_NAME, {keyPath: 'id', autoIncrement: true});
        store.createIndex('biblioid', 'biblioid', {unique: true});
        store.createIndex('title', 'title', {unique: false});
        store.createIndex('year', 'year', { unique: false});
    }
}