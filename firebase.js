import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js";
import { getDatabase, ref, set, child, update, remove, onValue } from "https://www.gstatic.com/firebasejs/9.1.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyB6KRCZvGzDPXF7vmIhQGuoB9be7f11K4E",
    authDomain: "retail-ee926.firebaseapp.com",
    databaseURL: "https://retail-ee926-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "retail-ee926",
    storageBucket: "retail-ee926.appspot.com",
    messagingSenderId: "3730071878",
    appId: "1:3730071878:web:f5c0a3753b8206e6264547",
};

const app = initializeApp(firebaseConfig);

document.getElementById("read").addEventListener("click", function(){
    var db = getDatabase();
    var retailInput = document.getElementById("retail");
    var retailId = retailInput.value.trim(); // 去除前後空白
    var connect_db;
    var retrieve_data = '';
    var responseText = document.getElementById("response");
    responseText.textContent = "";
    responseText.style.whiteSpace = "pre-line"; // 設置 CSS 樣式以顯示換行
    console.log("DEBUG: Read function");

    // 檢查 retailId 是否包含"顯示條碼"
    if (retailId.includes("顯示條碼")) {
        // 刪除"顯示條碼"
        retailId = retailId.replace("顯示條碼", "").trim();
        
        // 從資料庫中查詢所有資料
        connect_db = ref(db, 'Y/');
        onValue(connect_db, (snapshot) => {
            retrieve_data = snapshot.val();
            var matchedItems = [];
            
            // 遍歷所有資料,查找包含 retailId 的項目
            for (var key in retrieve_data) {
                if (retrieve_data.hasOwnProperty(key)) {
                    if (retrieve_data[key].name.includes(retailId)) {
                        var barcode = key;
                        matchedItems.push(retrieve_data[key].name + " 擺在: " + retrieve_data[key].location + "\n條碼: " + barcode);
                    }
                }
            }

            // 顯示匹配的項目或查無資料
            if (matchedItems.length > 0) {
                responseText.textContent = matchedItems.join("\n"); // 使用 \n 來換行
            } else {
                responseText.textContent = "查無此商品";
            }
        });
    } 
    // 檢查 retailId 是否為空
    else if (retailId === "") {
        responseText.textContent = "查無此商品";
    } 
    // 檢查 retailId 是否包含特殊字元（非數字和非中文字）
    else if (/[^0-9\u4E00-\u9FFF]/.test(retailId)) { // 允許數字和繁體中文字
        responseText.textContent = "請勿輸入特殊字元";
    } 
    // 檢查 retailId 是否為繁體中文字
    else if (/^[\u4E00-\u9FFF]+$/.test(retailId)) { // 檢查是否為繁體中文字
        // 如果是繁體中文字,從資料庫中查詢所有資料
        connect_db = ref(db, 'Y/');
        onValue(connect_db, (snapshot) => {
            retrieve_data = snapshot.val();
            var matchedItems = [];
            
            // 遍歷所有資料,查找包含 retailId 的項目
            for (var key in retrieve_data) {
                if (retrieve_data.hasOwnProperty(key)) {
                    if (retrieve_data[key].name.includes(retailId)) {
                        matchedItems.push(retrieve_data[key].name + " 擺在: " + retrieve_data[key].location);
                    }
                }
            }

            // 顯示匹配的項目或查無資料
            if (matchedItems.length > 0) {
                responseText.textContent = matchedItems.join("\n"); // 使用 \n 來換行
            } else {
                responseText.textContent = "查無此商品";
            }
        });
    } 
    // 檢查 retailId 是否為數字
    else if (!isNaN(retailId)) {
        connect_db = ref(db, 'Y/' + retailId + '/');
        onValue(connect_db, (snapshot) => {
            retrieve_data = snapshot.val();
            if (retrieve_data) {
                call_loop_print(retrieve_data);
                var Text = retrieve_data.name + " 擺在: " + retrieve_data.location;
                responseText.textContent = Text;
            } else {
                responseText.textContent = "查無此商品";
            }
        });
    } else {
        responseText.textContent = "查無此商品";
    }
    retailInput.value = "";
    function call_loop_print(retrieve_data){
        for (var r=0;r<Object.entries(retrieve_data).length;r++){
            var key = Object.keys(retrieve_data)[r];
            var value = retrieve_data[key];
            console.log("Key_" + r + ': ' + key + " Value_:" + r + ': ' + value );
            }
    }
});
