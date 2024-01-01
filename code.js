const libraryOptions = {
    tableShown: false,
}

const myLibrary = [
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
}

function getBookTableHeader(){
    tableHeader = 
    `<colgroup>
        <col class="table-column-1">
        <col class="table-column-2">
        <col class="table-column-3">
        <col class="table-column-4">
    </colgroup>
    <th>Title</th>
    <th>Author</th>
    <th>Pages</th>
    <th>Have read?</th>`

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
                bookRow += `<td>${read}</td>\n`
            } else {
               bookRow += `<td>${currentBook[prop]}</td>\n` 
            }
        }
        bookRow += '</tr>'
        tableRows += bookRow;
    }
    return tableRows;
}

const libraryInfo = document.querySelector('.library-info');
const booksTable = document.querySelector('.books-table');
const displayBooksBtn = document.querySelector('.display-books-btn');
const formModal = document.querySelector('.form-modal');
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
    }
    addBookToLibrary(
        titleInput.value,
        authorInput.value,
        pagesInput.value,
        readCheckbox.checked);
    updateLibraryInfo();
    if (libraryOptions.tableShown) displayLibrary();
    form.reset();
})

newBookBtn.addEventListener('click', () => {
    formModal.style.display = 'block';
})

modalCancelBtn.addEventListener('click', () => {
    formModal.style.display = 'none';
    form.reset();
})