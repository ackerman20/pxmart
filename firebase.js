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
    var retailId = retailInput.value;
    var connect_db = ref(db, 'Y/' + retailId + '/');
    var retrieve_data='';
    var responseText = document.getElementById("response");
    responseText.textContent = "";
    retailInput.textContent = "";
    console.log("DEBUG: Read function");
    onValue(connect_db, (snapshot) => {
        retrieve_data = snapshot.val();
        call_loop_print(retrieve_data);
        var Text = retrieve_data.name + "擺在: " + retrieve_data.location;
        responseText.textContent = Text
    })
    function call_loop_print(retrieve_data){
        for (var r=0;r<Object.entries(retrieve_data).length;r++){
            var key = Object.keys(retrieve_data)[r];
            var value = retrieve_data[key];
            console.log("Key_" + r + ': ' + key + " Value_:" + r + ': ' + value );
            }
    }
});
