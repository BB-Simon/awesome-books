const addBookForm = document.getElementById("add-book");

function handleSubmit(e) {
  e.preventDefault();
  console.log(document.forms["add-book"]);

  const bookTitle = addBookForm['title'].value;
  const bookAuthor = addBookForm['author'].value;
  console.log(bookTitle, bookAuthor);
}

addBookForm.addEventListener("submit", handleSubmit);
