// Listen for form Submit

document.getElementById('myForm').addEventListener('submit', saveBookmark);

//save Bookmark
function saveBookmark(e){
    //Get from values
    var siteName = document.getElementById(`siteName`).value;
    var siteUrl = document.getElementById(`siteUrl`).value;

    if(!validateForm(siteName,siteUrl)){
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    /*
    //Local storage only stores strings ..test
    localStorage.setItem('test', 'Hello World');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
    */

    // Test if bookmarks is null
    if(localStorage.getItem('bookmarks') === null){
        //init array
        var bookmarks=[];
        //Add to array
        bookmarks.push(bookmark);
        //Set to localStorage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }
     else{
        //Get bookmarks from localStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmark to array
        bookmarks.push(bookmark);

        // Re-set it back to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    //Clear form
    document.getElementById("myForm").reset();

    //Re-fetch bookmarks
    fetchBookmarks();

    //Prevents form from submitting
    e.preventDefault();
}

//Delete Bookmarks
function deleteBookmark(url){
    //get Bookmarks from LocalStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // loop through bookmarks
    for(var i=0;i<bookmarks.length; i++){
        if(bookmarks[i].url == url){
            // Remove from array
            bookmarks.splice(i,1);
        }
    }
    //Re-set back to localStorage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

    

    //Re-fetch bookmarks again
    fetchBookmarks();
};

// Fetch bookmarks

function fetchBookmarks(){
    //get bookmarks from LocalStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //get Output id
    var bookmarksResults = document.getElementById('bookmarksResults');
    //Build output
    bookmarksResults.innerHTML = '';

    for(var i=0;i<bookmarks.length;i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="cards bg-light text-dark card-body">' + 
                                        '<h3>' +name+ 
                                        '<a class="btn btn-default" target="_blank" href="'+url+'">Visit</a>'+
                                        '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'+
                                        '</h3>'+
                                        '</div>';
    }
}
//Validate Form
function validateForm(siteName,siteUrl){
    if(!siteName || !siteUrl){
        alert('please in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
        alert('Please enter a valid URL');
        return false;
    }

    return true;
}