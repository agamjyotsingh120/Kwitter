//YOUR FIREBASE LINKS
var firebaseConfig = {
      apiKey: "AIzaSyDmfO2_6z8jx-gK8qKnysQRUjLh8N8OiUw",
      authDomain: "kwitter-cc342.firebaseapp.com",
      databaseURL: "https://kwitter-cc342-default-rtdb.firebaseio.com",
      projectId: "kwitter-cc342",
      storageBucket: "kwitter-cc342.appspot.com",
      messagingSenderId: "328275149995",
      appId: "1:328275149995:web:bb1d2e250d7bb9f6ed23ee"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);



    
user_name = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send()
{
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name:user_name,
            message:msg,
            like:0
      });

      document.getElementById("msg").value = "";
}


function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code

console.log(firebase_message_id);
console.log(message_data);
name1 = message_data['name'];
message = message_data['message'];
like = message_data['like'];

nametag = "<h4> " + name1 + "<img class='user_tick' src='tick.png'></h4>";
messagetag = "<h4 class='message_h4'>" + message + "</h4>";

like_button ="<button class='btn btn-warning' id=" + firebase_message_id + " value="+like+" onclick='updateLike(this.id)'>";
spantag = "<span class='glyphonicon glyphonicon-thumbs-up'>Like: "+ like + "</span></button><hr>";

row = nametag + messagetag + like_button + spantag;
document.getElementById("output").innerHTML += row;
//End code
      } });  }); }
getData();


function updateLike(message_id)
{
      console.log("clicked on the like button - " + message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);

      firebase.database().ref(room_name).child(message_id).update({
            like : updated_likes
      });
}

function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location.replace("index.html");
}