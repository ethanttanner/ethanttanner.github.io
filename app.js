function loadLibraryFromServer() {
    fetch("https://music-library-authentication.herokuapp.com/library",{
        credentials: "include"
    }).then(function (response) {
        console.log("loadLibraryFromServer")
        if (response.status == 200 || response.status == 201) {
            signupsigninbutton.style.display = "none";
            // show resouce lsit/divs/etc.
            //hide login/register divs
            var insertdiv = document.querySelector("#insert_div");
            insertdiv.style.display = "block";
            var register = document.querySelector("#register_div");
            register.style.display = "none";
            var register = document.querySelector("#login_div");
            register.style.display = "none";
            var register = document.querySelector("#edit_div");
            register.style.display = "none";
            var song_list = document.querySelector("#song_list");
            song_list.style.display = "block";
            
            //return
        }

        else if (response.status == 401) {
            //show login/register divs
            //hide resource list/divs/etc.
            
            var insertdiv = document.querySelector("#insert_div");
            insertdiv.style.display = "none";
            var register = document.querySelector("#register_div");
            register.style.display = "none";
            var login = document.querySelector("#login_div");
            login.style.display = "none";

            var edit = document.querySelector("#edit_div");
            edit.style.display = "none";
            var song_list = document.querySelector("#song_list");
            song_list.style.display = "none";
            return;
        }
        
        response.json().then(function (data) {
            
            var song_list = document.querySelector('#song_list');
            song_list.innerHTML = "";
            
            // python: for place in lunchPlaces
            data.forEach(function (data) {
                var songs = document.createElement("li");
                var titleDiv = document.createElement("div");
                if (data.title) {
                    titleDiv.innerHTML = "Title: ";
                    titleDiv.innerHTML += data.title;
                }
                else {
                    titleDiv.innerHTML = "Title: ";
                    titleDiv.innerHTML += "None"
                }
                titleDiv.classList.add("song-title");
                songs.appendChild(titleDiv);
            
                var artistDiv = document.createElement("div");
                if (data.artist != "" ) {
                    artistDiv.innerHTML = "Artist: ";
                    artistDiv.innerHTML += data.artist;
                }
                else {
                    artistDiv.innerHTML = "Artist: ";
                    artistDiv.innerHTML += "None"
                }
                artistDiv.classList.add("song-artist");
                songs.appendChild(artistDiv);
                
                var albumDiv = document.createElement("div");
                if (data.album) {
                    albumDiv.innerHTML = "Album: ";
                    albumDiv.innerHTML += data.album;
                }
                else {
                    albumDiv.innerHTML = "Album: ";
                    albumDiv.innerHTML += "None"
                }
                albumDiv.classList.add("song-album");
                songs.appendChild(albumDiv);
                
                var genreDiv = document.createElement("div");
                if (data.genre) {
                    genreDiv.innerHTML = "Genre: ";
                    genreDiv.innerHTML += data.genre;
                }
                else {
                    genreDiv.innerHTML = "Genre: ";
                    genreDiv.innerHTML += "None"
                }
                genreDiv.classList.add("song-genre");
                songs.appendChild(genreDiv);
                
                var lengthDiv = document.createElement("div");
                if (data.length) {
                    lengthDiv.innerHTML = "Length: ";
                    lengthDiv.innerHTML += data.length;
                }
                else {
                    lengthDiv.innerHTML = "Length: ";
                    lengthDiv.innerHTML += "None";
                }
                lengthDiv.classList.add("song-length");
                songs.appendChild(lengthDiv);
                
                

                
                
                var deleteButton = document.createElement("button");
                deleteButton.innerHTML = "DELETE THIS SONG";
                deleteButton.onclick = function () {
                if (confirm("Do you want to delete this song?\n\n" + data.title)) {
                    deleteFromServer(data.id);
                    loadLibraryFromServer();
                }
                    // call new function deleteRestaurantFromServer
                    // pass place.id to this function for context
                }
                deleteButton.className = "song-delete";
                
                
                var updateButton = document.createElement("button");
                    updateButton.innerHTML = "EDIT";
            
                var input = document.querySelector("#input");
                var edit = document.querySelector("#edit_div");
                
                input.style.display = "block";
                edit.style.display = "none";
                
                    updateButton.onclick = function() {

                    //loadLibraryFromServer()
                    
                    if (edit.style.display === "none"){
                        showEdit(data.id, data.title, data.artist, data.album, data.genre, data.length);
                        edit.style.display = "block";
                        input.style.display = "none";
                        }
                    else{
                        input.style.display = "block";
                        edit.style.display = "none";
                                            }
                    window.scrollTo(0, 0);
                    }
                songs.appendChild(deleteButton);
                songs.appendChild(updateButton);
                song_list.appendChild(songs);
            });

            
        });
    });
}

var music_library = document.querySelector("#music_library");

var add_to_library = document.querySelector("#add_to_library")
add_to_library.onclick = function() {
    var title = document.querySelector("#title").value;
    var artist = document.querySelector("#artist").value;
    var album = document.querySelector("#album").value;
    var genre = document.querySelector("#genre").value;
    var length = document.querySelector("#length").value;
    if( title != ""){
        if (artist == "")
            artist = "None";
        if (album == "")
            album = "None";
        if (genre == "")
            genre = "None";
        if (length == "")
            length = 0.00;
        console.log(title, artist, album, genre, length);
        createLibraryOnServer(title, artist, album, genre, length);
    } else {
        alert("Please enter a song title!");
    }
};

var signupsigninbutton = document.querySelector("#signupsignin");
signupsigninbutton.onclick = function()
{
    console.log("Clicked")
    var login_div = document.querySelector("#login_div");
    var register_div = document.querySelector("#register_div");
    
    if (login_div.style.display === "none"){
        login_div.style.display = "block";
        register_div.style.display = "block";
        }
    else{
        login_div.style.display = "none";
        register_div.style.display = "none";
    }
};


var cancelbutton = document.querySelector("#cancelbutton");
cancelbutton.onclick = function()
{


  document.querySelector("#email_field").value = "";
  document.querySelector("#fname_field").value = "";
  document.querySelector("#lname_field").value = "";
  document.querySelector("#reg_password").value = "";

    loadLibraryFromServer();
};

var loginCancelButton = document.querySelector("#logincancelbutton");
loginCancelButton.onclick = function()
{
    document.querySelector("#login_email_field").value = "";
    document.querySelector("#login_password").value = "";
    loadLibraryFromServer();
};


var registerButton = document.querySelector("#registerbutton");
registerButton.onclick = function () {
  var newemail = document.querySelector("#email_field").value;
  var newfname = document.querySelector("#fname_field").value;
  var newlname = document.querySelector("#lname_field").value;
  var newhaspasword = document.querySelector("#reg_password").value;
    
  var bodyStr = "email=" + encodeURIComponent(newemail);
  bodyStr += "&fname=" + encodeURIComponent(newfname);
  bodyStr += "&lname=" + encodeURIComponent(newlname);
  bodyStr += "&password=" + encodeURIComponent(newhaspasword);

  document.querySelector("#email_field").value = "";
  document.querySelector("#fname_field").value = "";
  document.querySelector("#lname_field").value = "";
  document.querySelector("#reg_password").value = "";

  fetch("https://music-library-authentication.herokuapp.com/users", {
    //request parameters:
    method: "POST",
    credentials:"include",
    body: bodyStr,
    headers: {

      "Content-Type": "application/x-www-form-urlencoded"

    } // this is a dictionary

  }).then(function (response) {
    loadLibraryFromServer()
    if (response.status == 201){
        alert("User successsfully registered!");
      //var signinbutton = document.querySelector("#signinsignup");
        //signupsigninbutton.style.display = "none";
        //var music_list = document.querySelector("#music_list");
        //music_list.style.display = "block";
        //loadLibraryFromServer();
      
    }else if(response.status == 422){
      alert("User already exists with email address!!")
      /*var insert_div = document.querySelector("#insert_div");
        insert_div.style.display = "none";
      var register_div = document.querySelector("#register_div");
        register_div.style.display = "block";
      var login_div = document.querySelector("#login_div");
        login_div.style.display = "block";
      var edit_div = document.querySelector("#edit_div");
        edit_div.style.display = "none";
      var music_list = document.querySelector("#music_list");
        music_list.style.display = "none";*/
    
    }
    else{
      alert("Something went wrong! :(")
    }

  });

};

var loginButton = document.querySelector("#loginbutton");
loginButton.onclick = function (email) {

  var newemail = document.querySelector("#login_email_field").value;
  var newhaspasword = document.querySelector("#login_password").value;

  var bodyStr = "email=" + encodeURIComponent(newemail);
  bodyStr += "&password=" + encodeURIComponent(newhaspasword);

  document.querySelector("#login_email_field").value = "";
  document.querySelector("#login_password").value = "";

  fetch("https://music-library-authentication.herokuapp.com/sessions", {
    //request parameters:
    method: "POST",
    credentials:"include",
    body: bodyStr,
    headers: {

      "Content-Type": "application/x-www-form-urlencoded"

    } // this is a dictionary

  }).then(function (response) {
    loadLibraryFromServer()
    if (response.status == 201){
        alert("Successfully Logged In. :)");
        
      // var signinbutton = document.queryElement("#signinsignup");
      // signinbutton.style.display = "none";
        //signupsigninbutton.style.display = "none";
        
      
    }else if(response.status == 404){
      alert("The EMAIL or PASSWORD is incorrect please try again!")
      var insert_div = document.querySelector("#insert_div");
        insert_div.style.display = "none";
      var register_div = document.querySelector("#register_div");
        register_div.style.display = "block";
      var login_div = document.querySelector("#login_div");
        login_div.style.display = "block";
      var edit_div = document.querySelector("#edit_div");
        edit_div.style.display = "none";
      var song_list = document.querySelector("#song_list");
        song_list.style.display = "none";

    }
    else{
      alert("Something went wrong! :(")
    }

  });

};



















function createLibraryOnServer(title, artist, album, genre, length) {
    var data = "title=" + encodeURIComponent(title);
    data += "&artist=" + encodeURIComponent(artist);
    data += "&album=" + encodeURIComponent(album);
    data += "&genre=" + encodeURIComponent(genre);
    data += "&length=" + encodeURIComponent(length);
    fetch("https://music-library-authentication.herokuapp.com/library", {
    // request options go here: method, headers(s), body
    method: "POST",
    credentials: "include",
    body: data,
    headers: {
    // headers go here
        "Content-Type": "application/x-www-form-urlencoded"
    }
    }).then(function (response) {
    // response code goes here
        loadLibraryFromServer();
    });
    document.getElementById('title').value = "";
    document.getElementById('artist').value = "";
    document.getElementById('album').value = "";
    document.getElementById('genre').value = "";
    document.getElementById('length').value = "";
};

var deleteFromServer= function(id) {
    //console.log(id)
    
    // put an alert saying do you really want to delete the entry.
    fetch(`https://music-library-authentication.herokuapp.com/library/${id}`, {
        method: 'DELETE',
        credentials: "include"
        }).then(function(response){
        //alert("do you really want to delete this item?" confirm())
        //loadLibraryFromServer();
        }).then(function(){
            loadLibraryFromServer();
        })
};

function updateSong( id, title, artist, album, genre, length ) {
    
    var data = "title=" + encodeURIComponent(title);
        //need this to get the new server to work
        data += "&artist=" + encodeURIComponent(artist);
        data += "&album=" + encodeURIComponent(album);
        data += "&genre=" + encodeURIComponent(genre);
        data += "&length=" + encodeURIComponent(length);



        fetch(`https://music-library-authentication.herokuapp.com/library/${id}`, {
            method: "PUT",
            credentials: "include",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: data
        }).then(function(response){
            loadLibraryFromServer();
        });
    
};




function showEdit(id, title, artist, album, genre, length) {
    var t = document.getElementById("edit_title");
    t.value = title;

    var art = document.getElementById("edit_artist");
    art.value = artist;

    var alb = document.getElementById("edit_album");
    alb.value = album;

    var gen = document.getElementById("edit_genre");
    gen.value = genre;

    var len = document.getElementById("edit_length");
    len.value = length;

    var save = document.getElementById("save")
    save.onclick = function(){
        edited_title = t.value;
        edited_artist = art.value;
        edited_album = alb.value;
        edited_genre = gen.value;
        edited_length = len.value;
        updateSong(id, edited_title, edited_artist, edited_album, edited_genre, edited_length);
        }
    
    var back = document.getElementById("back")
    back.onclick = function(){
        edited_title = t.value;
        edited_artist = art.value;
        edited_album = alb.value;
        edited_genre = gen.value;
        edited_length = len.value;
        updateSong(id, edited_title, edited_artist, edited_album, edited_genre, edited_length);
        
        }
};






loadLibraryFromServer();


