"use strict"

const mainBody = document.querySelector('main');
const libraryMain = document.querySelector('div.shelf');
const modalWindow = document.querySelector('.modal-background');
const modalForm = document.querySelector('.add-form');
const addButton = document.querySelector('.new-book');
const bookForm = document.querySelector('.book-form');

addButton.addEventListener('click', displayModal);
bookForm.addEventListener('submit', createBookFromForm);

// addBookToLibrary('The Lord of the Rings', 'J.R.R. Tolkien',
//                  900, false);

// addBookToLibrary('The Hobbit', 'J.R.R. Tolkien',
//                  400, false);

// addBookToLibrary('The Silmarillion', 'J.R.R. Tolkien',
//                  600, true);

class Book {
    constructor(title, author, pages, read = false) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleRead() {
        if (this.read) {
            this.read = false;
        } else {
            this.read = true;
        }
    }
}

class Library {
    constructor() {
        this.books = [];
        this.renderShelf();
    }

    addBookToLibrary(book) {
        this.books.push(book);
        this.renderShelf();
    }

    removeBook(bookIdx) {
        this.books.splice(bookIdx, 1);
    }

    renderShelf() {
        if (this.books.length === 0) {
            const emptyString = document.createElement('h2');
            emptyString.classList.add('empty');
            emptyString.textContent = 'Your library is empty';
            mainBody.appendChild(emptyString);
        } else {
            const emptyString = document.querySelector('h2.empty');
            if (emptyString) mainBody.removeChild(emptyString);
            libraryMain.textContent = '';
            this.books.forEach((book, idx) => {
                renderBookCard(book, idx)
            });
        }   
    }
}

const myLibrary = new Library();

function renderBookCard(book, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = index;

    const bookTitle = document.createElement('h3');
    bookTitle.classList.add('book-title');
    bookTitle.textContent = book.title;
    card.appendChild(bookTitle);

    const bookAuthor = document.createElement('h5');
    bookAuthor.classList.add('book-author');
    bookAuthor.textContent = book.author;
    card.appendChild(bookAuthor);

    const bookPages = document.createElement('h5');
    bookPages.classList.add('book-pages');
    bookPages.textContent = book.pages + 'pp.';
    card.appendChild(bookPages);

    const cardControls = document.createElement('div');
    cardControls.classList.add('card-controls');

    const readButton = document.createElement('button');
    readButton.classList.add('read-button');
    if (book.read) {
        readButton.textContent = 'Finished';
        readButton.classList.add('finished');
    } else {
        readButton.textContent = 'Not read';
    }
    readButton.addEventListener('click', toggleRead);
    cardControls.appendChild(readButton);
    

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Remove';
    deleteButton.addEventListener('click', removeBook);
    cardControls.appendChild(deleteButton);

    card.appendChild(cardControls);
    
    libraryMain.appendChild(card);
}



function displayModal() {
    addButton.style.transform = 'rotate(45deg)';
    modalForm.classList.add('form-active');
    modalWindow.style.display = 'block';

}

window.onclick = function(event) {
    if (event.target == modalWindow) {
        modalForm.classList.remove('form-active');
        addButton.style.transform = '';
        modalWindow.style.display = "none";
    }
}

function createBookFromForm(e) {
    e.preventDefault();
    const title = document.querySelector("#bookTitle").value;
    const author = document.querySelector("#bookAuthor").value;
    const pages = document.querySelector("#bookPages").value;
    const bookRead = document.querySelector("#bookRead").checked;

    const book = new Book(title, author, pages, bookRead);
    myLibrary.addBookToLibrary(book);
    
    modalForm.classList.remove('form-active');
    addButton.style.transform = '';
    modalWindow.style.display = "none";
    bookForm.reset();
}

function toggleRead(e) {
    const bookIdx = +e.composedPath()[2].dataset.index;
    const readButton = e.target;
    myLibrary.books[bookIdx].toggleRead();
    if (myLibrary.books[bookIdx].read) {
        readButton.classList.toggle('finished');
        readButton.textContent = 'Finished';
    } else {
        readButton.classList.toggle('finished');
        readButton.textContent = 'Not read';
    }
}

function removeBook(e) {
    const deletedCard = e.composedPath()[2];
    const bookIdx = +deletedCard.dataset.index;
    myLibrary.removeBook(bookIdx);
    deletedCard.classList.toggle('removing');

    Promise.all(deletedCard.getAnimations().map(animation => animation.finished)).
        then(() => myLibrary.renderShelf());
}