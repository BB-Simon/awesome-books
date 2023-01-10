const addBookForm = document.getElementById('add-book');
const bookListContainer = document.getElementById('book-list');
let books = JSON.parse(localStorage.getItem('books')) || [];

function addBookToTheList() {
  bookListContainer.innerHTML = '';
  localStorage.setItem('books', JSON.stringify(books));
  books.forEach((book) => {
    const li = document.createElement('li');
    li.classList.add('list-item');
    const html = `
      <h3>${book.title}</h3>
      <h4>${book.author}</h4>
      <button class='remove-book' data-id=${book.id}>Remove</button>
      `;

    li.innerHTML = html;
    bookListContainer.appendChild(li);
    const removeBtns = document.querySelectorAll('.remove-book');
    removeBtns.forEach((btn) => {
      const id = btn.getAttribute('data-id');
      btn.addEventListener('click', () => {
        // Remove book from the list
        books = books.filter((book) => book.id !== id);
        addBookToTheList();
      });
    });
  });
}

addBookToTheList();

function handleSubmit(e) {
  e.preventDefault();

  const bookTitle = addBookForm.title.value;
  const bookAuthor = addBookForm.author.value;
  books.push({
    id: `${Date.now()}`,
    title: bookTitle,
    author: bookAuthor,
  });

  addBookToTheList();

  addBookForm.title.value = '';
  addBookForm.author.value = '';
}

addBookForm.addEventListener('submit', handleSubmit);
