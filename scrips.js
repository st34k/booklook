// var bookLook = function() {

  var bookArray = {
    books:[
     // {title: "Hyperion", author:"Dan Simmons", description:"Set in a futiristic world blah blah blah",
     //  imageUrl: "hyperion.jpg", pagesNo: "300", minRead:"60"}
     ]
  };



// }


var createBook = function(title,author,description,imageUrl,pagesNo){  //NEED TO ADD HOW LONG WILL IT TAKE TO READ

  var book = {
    title:title,
    author:author,
    description:description,
    imageUrl:imageUrl,
    pagesNo:pagesNo

  };

  bookArray.books.push(book); //push the book into array


  var source = $('#books-template').html();
  var template = Handlebars.compile(source);
  var newHTML = template(bookArray);

  $('.book-display').append(newHTML);
}


$('.add-book').on('click', function (e) {
  e.preventDefault();

  var title = $('#book-title').val();
  var author = $('#book-author').val();
  var description = $('#book-description').val();
  var imageUrl = $('#book-img').val();
  var pagesNumber = $('#book-pages').val(); //get the number of books from form (value)
  var pagesNo = parseInt(pagesNumber); //turn the number of pages from the form into integer
  var minutes = $('#book-readtime').val(); //get how many minutes read per day (value)
  var minRead = parseInt(minutes); //turn the minutes from the form into an integer
  
  createBook(title,author,description,imageUrl,pagesNo)

  // app.createPost(text);
  // app.renderPosts();
  // app.renderComments();
});