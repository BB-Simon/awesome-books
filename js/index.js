class BookList {
  constructor() {
    this.books = JSON.parse(localStorage.getItem('books')) || [];
    this.bookListContainer = document.getElementById('book-list');
    this.drawBooksToTheDom();
  }

  add(book) {
    this.books = [book, ...this.books];
    this.saveToLG();
    this.drawBooksToTheDom();
  }

  saveToLG() {
    localStorage.setItem('books', JSON.stringify(this.books));
  }

  noBookMsg() {
    const p = document.createElement('p');
    p.style.textAlign = 'center';
    p.innerText = 'No book added yet';
    p.style.color = 'red';
    this.bookListContainer.append(p);
  }

  drawBooksToTheDom() {
    if (this.books.length > 0) {
      this.bookListContainer.classList.add('add-border');
      this.bookListContainer.innerHTML = '';
      this.books.forEach((book) => {
        const li = document.createElement('li');
        li.classList.add('list-item');
        const h3 = document.createElement('h3');
        h3.innerText = `"${book.title}" by ${book.author}`;
        const btn = document.createElement('button');
        btn.classList.add('remove-book-btn');
        btn.innerText = 'Remove';
        li.appendChild(h3);
        li.appendChild(btn);
        this.bookListContainer.appendChild(li);
        btn.addEventListener('click', () => {
          // Remove book from the list
          this.removeBookFromTheDom(btn, book.id);
        });
      });
    } else {
      this.noBookMsg();
    }
  }

  removeBookFromTheDom(btn, id) {
    const root = btn.parentNode;
    root.parentNode?.removeChild(root);
    this.books = this.books.filter((book) => book.id !== id);
    this.saveToLG();
    if (this.books.length === 0) {
      this.bookListContainer.classList.remove('add-border');
      this.noBookMsg();
    }
  }
}

const book = new BookList();
const addBookForm = document.getElementById('add-book');

function handleSubmit(e) {
  e.preventDefault();
  const title = addBookForm.title.value;
  const author = addBookForm.author.value;
  const newBook = { title, author, id: `${Date.now()}` };
  book.add(newBook);
  e.target.reset();
}

addBookForm.addEventListener('submit', handleSubmit);
