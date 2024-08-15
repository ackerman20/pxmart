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

function write_db() {
    console.log("DEBUG: Write function");
    var db = getDatabase();
    var create_db_table = ref(db, 'Y/' + '4710085247479/');
    var user_name = document.getElementById("user_name").value;
    var user_password =  document.getElementById("user_name_password").value;
    if( user_name == '' || user_password == ''){
        alert("Make sure, must be non-empty data is required!!!");
        console.log("Make sure, must be non-empty data is required!!!");
        throw "Make sure, must be non-empty data is required!!!";
    }
    set(ref(db, 'Y/' + '4710085247479/'), {
      user_name: user_name,
      user_name_password: user_password
    }).then((res) => {
        console.log();
    })
    .catch((err) => {
        alert(err.message);
        console.log(err.code);
        console.log(err.message);
    })
}

function read_db() {
    var db = getDatabase();
    var connect_db = ref(db, 'Y/' + '4710085247479/');
    var retrieve_data='';
    var responseText = document.getElementById("response");
    responseText.textContent = "";
    console.log("DEBUG: Read function");
    onValue(connect_db, (snapshot) => {
        retrieve_data = snapshot.val();
        //console.log("user_name: " + retrieve_data.user_name);
        //console.log("user_name_password: " + retrieve_data.user_name_password);
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
}

var write_data_to_firebase = document.getElementById("write_data_to_firebase");
write_data_to_firebase.addEventListener('click', write_db);

var read_data_from_firebase = document.getElementById("read_data_from_firebase");
read_data_from_firebase.addEventListener('click', read_db);