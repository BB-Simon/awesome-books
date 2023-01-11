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

  drawBooksToTheDom() {
    if(this.books.length  > 0 ) {
      this.bookListContainer.classList.add('add-border')
      this.bookListContainer.innerHTML = '';
    this.books.forEach((book) => {
      const li = document.createElement('li');
      li.classList.add('list-item');
      const html = `
        <h3>"${book.title}" by ${book.author} </h3>  
        <button class='remove-book-btn' data-id=${book.id}>Remove</button>
        `;
       
      li.innerHTML = html;
      this.bookListContainer.appendChild(li);
      const removeBtns = document.querySelectorAll('.remove-book-btn');
      removeBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
        // Remove book from the list
          this.removeBookFromTheDom(btn, book.id);
        });
      });
    });
    } else {
      this.bookListContainer.innerHTML = 'No book added yet'
    }
    
  }

  removeBookFromTheDom(btn, id) {
    const root = btn.parentNode;
    root.parentNode?.removeChild(root);
    this.books = this.books.filter((book) => book.id !== id);
    this.saveToLG();
    if(this.books.length === 0) {
      this.bookListContainer.classList.remove('add-border') 
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
