const addBookForm = document.getElementById("add-book");
const bookList = document.getElementById("book-list");
const books = [];


function addBookToTheList(book, cb) {
  const li = document.createElement("li");
  li.classList.add('list-item');
  li.innerHTML = `
    <h3>${book.title}</h3>
    <h4>${book.author}</h4>
    <button id="remove-book" data-id=${book.id}>Remove</button>
    `;

  bookList.appendChild(li)
  
  const removeBnt = document.getElementById("remove-book");
  removeBnt.addEventListener('click', cb())
}

function removeBookFromTheList(){
  books.filter(book => book.title !== title)
  books.forEach((book) => addBookToTheList(book))
}



function handleSubmit(e) {
  e.preventDefault();

  const bookTitle = addBookForm['title'].value;
  const bookAuthor = addBookForm['author'].value;
  books.push({
    id: 'aa',
    title: bookTitle,
    author: bookAuthor
  })
  books.forEach((book) => addBookToTheList(book, removeBookFromTheList))
}


addBookForm.addEventListener("submit", handleSubmit);
