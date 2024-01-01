const libraryOptions = {
    tableShown: false,
}

let myLibrary = [
    {   title:"The Secret of Terror Castle", 
        author:"Robert Arthur", 
        pages: 108, 
        haveRead: true
    },
    {   title:"The Mystery of the Stuttering Parrot", 
        author:"Robert Arthur", 
        pages: 111, 
        haveRead: true
    },
    {   title:"The Mystery of the Whispering Mummy", 
        author:"Robert Arthur", 
        pages: 111, 
        haveRead: true
    },
    {   title:"The Hunger Games", 
        author:"Suzanne Collins", 
        pages: 367, 
        haveRead: false
    },
];

function Book(title, author, pages, haveRead){
    this.title = title;
    this.pages = pages;
    this.author = author;
    this.haveRead = haveRead;
}

function addBookToLibrary(title, author, pages, haveRead){
    const newBook = new Book(title, author, pages, haveRead);
    myLibrary.push(newBook);
}

function updateLibraryInfo(){
    libraryInfo.textContent = `Total number of books: ${myLibrary.length}`;
}

function displayLibraryBtn(){
    if (libraryOptions.tableShown) {
        displayBooksBtn.textContent = "Display library books";
        booksTable.hidden = true;
    } else {
        displayBooksBtn.textContent = "Hide books table";
        booksTable.hidden = false;
        displayLibrary();
    }
    libraryOptions.tableShown = !libraryOptions.tableShown;
}

function displayLibrary(){
    booksTable.innerHTML = getBookTableHeader() + getBookTableRows();
    addBookRemoveBtns();
    addReadBtns();
    updateLibraryInfo();
}

function addReadBtns(){
    const tableReadBtns = document.querySelectorAll('.books-table .have-read-button');
    tableReadBtns.forEach(btn => {
        btn.addEventListener('click',() => {
            myLibrary[btn.dataset.id].haveRead = true;
            displayLibrary();
        })
    })
}

function addBookRemoveBtns(){
    const tableDelBtns = document.querySelectorAll('.books-table .remove-entry');
    tableDelBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            myLibrary.splice(btn.dataset.id,1);
            displayLibrary();
        })
    })
}

function getBookTableHeader(){
    tableHeader = 
    `<colgroup>
        <col class="table-column-1">
        <col class="table-column-2">
        <col class="table-column-3">
        <col class="table-column-4">
        <col class="table-column-5">
    </colgroup>
    <th>Title</th>
    <th>Author</th>
    <th>Pages</th>
    <th>Have read?</th>
    <th>Remove Entry?</th>`

    return tableHeader;
}

function getBookTableRows(){
    let tableRows = '';
    for (let i = 0; i < myLibrary.length; i++){
        let currentBook = myLibrary[i];
        let bookRow = "<tr>\n"
        for (prop in currentBook){
            if (prop === 'haveRead') {
                const read = currentBook[prop] ? 'Yes' : 'No';
                if (read === 'No') {
                    bookRow += `<td>${read}<button data-id="${i}" class="have-read-button">✔</button></td>\n`
                }
                else {
                    bookRow += `<td>${read}</td>\n`
                }
               
            } else {
               bookRow += `<td>${currentBook[prop]}</td>\n` 
            }
        }
        bookRow += `<td><button class="remove-entry" data-id${i}>X</button></td>`
        bookRow += '</tr>'
        tableRows += bookRow;
    }
    return tableRows;
}

const libraryInfo = document.querySelector('.library-info');
const booksTable = document.querySelector('.books-table');
const displayBooksBtn = document.querySelector('.display-books-btn');
const modalForm = document.querySelector('.form-modal');
const form = document.querySelector('#book-form');
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const readCheckbox = document.querySelector('#read');
const newBookBtn = document.querySelector('.add-book');
const modalAddBookBtn = document.querySelector('.modal-add-btn');
const modalCancelBtn = document.querySelector('.modal-cancel-btn');

// Page initialisation 
updateLibraryInfo();
displayBooksBtn.onclick = displayLibraryBtn;

modalAddBookBtn.addEventListener('click', (event) => {
    if (form.checkValidity()) {
        event.preventDefault();
        addBookToLibrary(
            titleInput.value,
            authorInput.value,
            pagesInput.value,
            readCheckbox.checked);
        if (libraryOptions.tableShown) displayLibrary();
        form.reset();
    }
})

newBookBtn.addEventListener('click', () => {
    modalForm.style.display = 'block';
})

modalCancelBtn.addEventListener('click', () => {
    modalForm.style.display = 'none';
    form.reset();
})

let test;
modalForm.addEventListener('click', event => {
    if (event.target.classList.contains('form-modal')) {
        modalCancelBtn.click();
    }
})