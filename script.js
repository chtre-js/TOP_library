const myLibrary = [];

function Book(id, title, author, pages, readStatus) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.readStatus = readStatus;
}

function addBook(title, author, pages, readStatus) {
    const id = crypto.randomUUID();
    const newBook = new Book(id, title, author, pages, readStatus);

    myLibrary.push(newBook);
}

function displayBook(book) {
    const cardTemplate = document.querySelector("#cardTemplate");
    const cardClone = cardTemplate.content.cloneNode(true);
    const card = document.createElement("div");
    card.classList.add("card");

    cardClone.querySelector(".card__title").textContent = book.title;
    cardClone.querySelector(".card__author").textContent = book.author;
    cardClone.querySelector(".card__readStatus").textContent = book.readStatus;
    cardClone.querySelector(".card__pages p:nth-child(2)").textContent = book.pages;

    card.appendChild(cardClone);
    const grid = document.querySelector(".grid");
    grid.appendChild(card);
}

const myBook = new Book(56, "MRU", "Chérif", 256, false);

displayBook(myBook);


// function getUserInput { // TODO

// }