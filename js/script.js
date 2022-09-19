"use strict"

const myLibrary = [];
const libraryMain = document.querySelector('div.shelf');
const modalWindow = document.querySelector('.modal-background');
const modalForm = document.querySelector('.add-form');
const addButton = document.querySelector('.new-book');
const submitBook = document.querySelector('#add-button');
const bookForm = document.querySelector('.book-form');

addButton.addEventListener('click', displayModal);
submitBook.addEventListener('click', createBookFromForm)

addBookToLibrary('The Lord of the Rings', 'J.R.R. Tolkien',
                 900, 0, false);

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien',
                 400, 0, false);

addBookToLibrary('The Silmarillion', 'J.R.R. Tolkien',
                 600, 0, false);

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
    card.dataset.index = index;

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
    libraryMain.textContent = '';
    library.forEach((book, idx) => {
        renderBookCard(book, idx)
    });
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
    const pagesRead = document.querySelector("#pagesRead").value;
    const bookRead = document.querySelector("#bookRead").value;
    addBookToLibrary(title, author, pages, pagesRead, bookRead);
    renderShelf(myLibrary);
    modalForm.classList.remove('form-active');
    addButton.style.transform = '';
    modalWindow.style.display = "none";
    bookForm.reset();

}