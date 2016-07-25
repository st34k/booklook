$(document).ajaxStart(function(){
    $("#wait").css("display", "block");
});

$(document).ajaxComplete(function(){
    $("#wait").css("display", "none");
});


// var bookLook = function() {

  var bookArray = {
    books:[
     // title
     // author
     // description
     // imageUrl
     // pagesNo
     ]
  };





var fetch = function (isbn) {   //gets the isbn input from the user and looks for the book
  $.ajax({
    method: "GET",
    url: 'https://www.googleapis.com/books/v1/volumes?q=isbn:' + isbn,
    dataType: "json",
    success: function(data) {
// console.log(data);
    var title = data.items[0].volumeInfo.title;             //after finding book returns the following info saved into variables
    var author = data.items[0].volumeInfo.authors[0];
    var description = data.items[0].volumeInfo.description;
    var imageUrl = data.items[0].volumeInfo.imageLinks.thumbnail;
    var pagesNo = data.items[0].volumeInfo.pageCount;

    createBook(title, author, description, imageUrl, pagesNo);      //after getting the variables, calls the createBook function
       
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }

  }); 

  
}


var createBook = function(title,author,description,imageUrl,pagesNo){  //NEED TO ADD HOW LONG WILL IT TAKE TO READ
  //this function gets the input from the search with AJAX and pushes them into an array

  var book = {
    title:title,
    author:author,
    description:description,
    imageUrl:imageUrl,
    pagesNo:pagesNo

  };

  bookArray.books.push(book); //push the book into array
  showBook(book);       //after pushing the info into the array, calls to the showBook function to display the searched book

}

var showBook = function (book){           //displays the information searched for. after displaying, splices the array to empty it in case of a new search
  $('.book-display').empty();             //before it will display another book the user searched for it will empty the array
  var source = $('#books-template').html();
  var template = Handlebars.compile(source);
  var newHTML = template(bookArray);

  $('.book-display').append(newHTML);

  bookArray.books.splice(0,bookArray.books.length);

}



$('.add-book').on('click', function (e) {
  e.preventDefault();
  var isbn = $('#book-isbn').val();
  fetch(isbn);
});


  // var title = $('#book-title').val();
  // var author = $('#book-author').val();
  // var description = $('#book-description').val();
  // var imageUrl = $('#book-img').val();
  // var pagesNumber = $('#book-pages').val(); //get the number of books from form (value)
  // var pagesNo = parseInt(pagesNumber); //turn the number of pages from the form into integer
  // var minutes = $('#book-readtime').val(); //get how many minutes read per day (value)
  // var minRead = parseInt(minutes); //turn the minutes from the form into an integer
  
  // createBook(title,author,description,imageUrl,pagesNo)

  // app.createPost(text);
  // app.renderPosts();
  // app.renderComments();
