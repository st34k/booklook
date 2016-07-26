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





var fetch = function (input) {   //gets the isbn input from the user and looks for the book
  $.ajax({
    method: "GET",
    url: 'https://www.googleapis.com/books/v1/volumes?q=:' + input,
    dataType: "json",
    success: function(data) {
// console.log(data);

      createBook(data);      //after getting the variables, calls the createBook function
       },
    
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus);
    }

  }); 

  
}


var createBook = function(data){  //NEED TO ADD HOW LONG WILL IT TAKE TO READ
  //this function gets the input from the search with AJAX and pushes them into an array
  for (var i = 0; i < 10 ; i++){
  var book = {
    title:data.items[i].volumeInfo.title,
    author:data.items[i].volumeInfo.authors[0],
    description:data.items[i].volumeInfo.description,
    imageUrl:data.items[i].volumeInfo.imageLinks.thumbnail,
    pagesNo:data.items[i].volumeInfo.pageCount

  };
  
  bookArray.books.push(book); //push the book into array
  showBook(book);       //after pushing the info into the array, calls to the showBook function to display the searched book
  
  }

}

var showBook = function (book){ 
          //displays the information searched for. after displaying, splices the array to empty it in case of a new search
  $('.show-books').empty();             //before it will display another book the user searched for it will empty the array
  var source = $('#books-template').html();
  var template = Handlebars.compile(source);
  var newHTML = template(bookArray);

  $('.show-books').append(newHTML);

  // bookArray.books.splice(0,bookArray.books.length);

}



$('.add-book').on('click', function (e) {
  e.preventDefault();
  // var isbn = $('#book-isbn').val();
  var userInput = $('#book-isbn').val();
  // var input = userInput.replace(/ /g, "+");
  var input = userInput.split(" ").join("+");
  fetch(input);
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
