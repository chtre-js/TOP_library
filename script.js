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
  displayBook(newBook);
}

function displayBook(book) {
  const cardTemplate = document.querySelector("#cardTemplate");
  const cardClone = cardTemplate.content.cloneNode(true);
  const card = document.createElement("div");
  card.classList.add("card");

  cardClone.querySelector(".card__title").textContent = book.title;
  cardClone.querySelector(".card__author").textContent = `by ${book.author}`;
  cardClone.querySelector(".card__pages p:nth-child(2)").textContent =
    book.pages;

  const readStatus = cardClone.querySelector(".card__readStatus");
  card.addEventListener("click", (event) => {
    readStatus.classList.toggle("true");
    if (book.readStatus) {
      book.readStatus = false;
      readStatus.textContent = "Unread";
    } else {
      book.readStatus = true;
      readStatus.textContent = "Read";
    }
  });

  if (book.readStatus) {
    readStatus.classList.toggle("true");
    readStatus.textContent = "Read";
  } else {
    readStatus.textContent = "Unread";
  }

  const removeBtn = cardClone.querySelector(".card__remove-btn");
  removeBtn.addEventListener("click", () => {
    const index = myLibrary.findIndex((b) => b.id === book.id);
    if (index !== -1) {
      myLibrary.splice(index, 1);
    }
    card.remove();
  });

  card.appendChild(cardClone);
  const cardsContainer = document.querySelector(".cards__container");
  cardsContainer.appendChild(card);
}

function getUserInput() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const readStatusCheckbox = document.getElementById("readStatus");
  let readStatus = false;
  if (readStatusCheckbox.checked) readStatus = true;
  return [title, author, pages, readStatus];
}

function initializeDialog() {
  const dialog = document.getElementById("form");
  const openDialogBtn = document.querySelector(".top-bar .header__cta");
  const form = document.querySelector("dialog form");
  dialog.removeAttribute("open");
  openDialogBtn.addEventListener("click", () => {
    dialog.showModal();
  });

  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    const isClickOutside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (isClickOutside) {
      dialog.close();
    }
  });

  const submitBtn = document.getElementById("form-trigger");
  submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const [title, author, pages, readStatus] = getUserInput();

    if (!title.trim()) {
      alert("Title is required.");
      return;
    }
    if (!author.trim()) {
      alert("Author is required.");
      return;
    }
    if (!pages || isNaN(pages) || Number(pages) <= 0) {
      alert("Pages must be a positive number.");
      return;
    }
    addBook(title, author, pages, readStatus);
    form.reset();
    dialog.close();
  });
}

initializeDialog();
