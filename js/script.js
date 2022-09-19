"use strict"

const myLibrary = [];
const libraryMain = document.querySelector('div.shelf');

addBookToLibrary('The Lord of the Rings', 'J.R.R. Tolkien',
                 900, 0, false);

renderShelf(myLibrary);

function Book(title, author, pages, pagesRead=0, read=false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    if (read) {
        this.pagesRead = pages;
    } else {
        this.pagesRead = pagesRead;
    }
}

function addBookToLibrary(title, author, pages, pagesRead, read) {
    const book = new Book(title, author, pages, pagesRead, read);
    myLibrary.push(book);
}

function renderBookCard(book, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.setAttribute('data', 'index: ' + index);

    const bookTitle = document.createElement('h3');
    bookTitle.classList.add('book-title');
    bookTitle.textContent = book.title;
    card.appendChild(bookTitle);

    const bookAuthor = document.createElement('h5');
    bookAuthor.classList.add('book-author');
    bookAuthor.textContent = book.author;
    card.appendChild(bookAuthor);

    libraryMain.appendChild(card);
}

function renderShelf(library) {
    library.forEach((book, idx) => {
        renderBookCard(book, idx)
    });
}