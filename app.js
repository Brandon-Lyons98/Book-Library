//button event listeners for create new book, add new book to page, close popup
const addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', addBookToLibrary);

const newBtn = document.getElementById('newBtn');
newBtn.addEventListener('click', () => popUpForm.style.display = 'block');

const popUpForm = document.getElementById('popup-form');
const closePopUp = document.getElementsByTagName('span')[0];
closePopUp.addEventListener('click', () => popUpForm.style.display = 'none');

//Book Constructor
class Book {
  constructor(title, author, pages, read) {
    this.title = title.value;
    this.author = author.value; 
    this.pages = pages.value + ' pages'; 
    this.read = read.checked; 
  }
}

//creates book from Book Constructor, adds to library
let myLibrary = [];
let newBook;

const myForm = document.getElementById('my-form');

function addBookToLibrary() {
  event.preventDefault();
  if (myForm.checkValidity()) {
    popUpForm.style.display = 'none';
    newBook = new Book(title, author, pages, read); 
    myLibrary.push(newBook); 
    render();
    myForm.reset();
  } else {
    alert('Please fill in all three fields');
  }
}

//Creates book visual in browser
function render() {
  const display = document.getElementById('card-container');
  const books = document.querySelectorAll('.book');
  books.forEach(book => display.removeChild(book));
   
  for (let i=0; i<myLibrary.length; i++){
      createBook(myLibrary[i]);
  }
}

//creates book DOM elements, to use in render();
function createBook(item) {
  const library = document.querySelector('#card-container');
  const bookDiv = document.createElement('div');
  const titleDiv = document.createElement('div');
  const authDiv = document.createElement('div');
  const pageDiv = document.createElement('div');
  const removeBtn = document.createElement('button');
  const readBtn = document.createElement('button');
    
    
  bookDiv.classList.add('book');
  bookDiv.setAttribute('id', myLibrary.indexOf(item));

  titleDiv.textContent = item.title;
  titleDiv.classList.add('title');
  bookDiv.appendChild(titleDiv);

  authDiv.textContent = item.author;
  authDiv.classList.add('author');
  bookDiv.appendChild(authDiv);

  pageDiv.textContent = item.pages;
  pageDiv.classList.add('pages');
  bookDiv.appendChild(pageDiv);

  readBtn.classList.add('readBtn')    
  bookDiv.appendChild(readBtn);
  if(item.read===false) {
    readBtn.textContent = 'Not Read';
    readBtn.style.backgroundColor = '#911';
    bookDiv.style.backgroundImage = 'linear-gradient(to bottom right, whitesmoke, pink)';
  } else {
    readBtn.textContent = 'Read';
    readBtn.style.backgroundColor = '#9fff9c';
    bookDiv.style.backgroundImage = 'linear-gradient(to bottom right, whitesmoke, #52747D)';
  }

  removeBtn.textContent = 'Remove'; 

  removeBtn.classList.add('removeBtn');
  bookDiv.appendChild(removeBtn);
    
  library.appendChild(bookDiv);

  removeBtn.addEventListener('click', () => {
    myLibrary.splice(myLibrary.indexOf(item), 1);
    setData();
    render();
  });

    //add toggle ability to each book 'read' button on click
  readBtn.addEventListener('click', () => { 
    item.read = !item.read; 
    setData(); 
    render();
  }); 
};


// setting Library to be stored in local storage
function setData() {
  localStorage.setItem(`myLibrary`, JSON.stringify(myLibrary));
}

//pulls books from local storage when page is refreshed
function restore() {
  if(!localStorage.myLibrary) {
      render();
  }else {
      let objects = localStorage.getItem('myLibrary') // gets information from local storage to use in below loop to create DOM/display
      objects = JSON.parse(objects);
      myLibrary = objects;
      render();
  }
}

restore();