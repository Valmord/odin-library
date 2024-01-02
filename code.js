class Library{
    options = {
        tableShown: false,
    }

    myLibrary = [
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
    ]

    addBook(title, author, pages, haveRead){
        const newBook = new Book(title, author, pages, haveRead);
        this.myLibrary.push(newBook);
    }

    getBookTableHeader(){
        const tableHeader = 
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
    
    getBookTableRows(){
        let tableRows = '';
        for (let i = 0; i < lib.myLibrary.length; i++){
            let currentBook = lib.myLibrary[i];
            let bookRow = "<tr>\n"
            for (let prop in currentBook){
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
}


class Book{
    constructor(title, author, pages, haveRead){
        this.title = title;
        this.pages = pages;
        this.author = author;
        this.haveRead = haveRead;
    }
}

class LibraryDisplay{
    displayBookTotal(){
        domElement.libraryInfo.textContent = `Total number of books: ${lib.myLibrary.length}`;
    }

    displayTable() {
        if (lib.options.tableShown) {
            domElement.displayBooksBtn.textContent = "Display library books";
            domElement.booksTable.hidden = true;
        } else {
            domElement.displayBooksBtn.textContent = "Hide books table";
            domElement.booksTable.hidden = false;
            this.display();
        }
        lib.options.tableShown = !lib.options.tableShown;
    }

    display(){
        domElement.booksTable.innerHTML = lib.getBookTableHeader() + lib.getBookTableRows();
        addBookRemoveBtns();
        addReadBtns();
        this.displayBookTotal();
    }
}

function addReadBtns(){
    const tableReadBtns = document.querySelectorAll('.books-table .have-read-button');
    tableReadBtns.forEach(btn => {
        btn.addEventListener('click',() => {
            lib.myLibrary[btn.dataset.id].haveRead = true;
            libDisplay.display();
        })
    })
}

function addBookRemoveBtns(){
    const tableDelBtns = document.querySelectorAll('.books-table .remove-entry');
    tableDelBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            lib.myLibrary.splice(btn.dataset.id,1);
            libDisplay.display();
        })
    })
}

const domElement = {
    libraryInfo: document.querySelector('.library-info'),
    booksTable: document.querySelector('.books-table'),
    displayBooksBtn: document.querySelector('.display-books-btn'),
    modalForm: document.querySelector('.form-modal'),
    form: document.querySelector('#book-form'),
    titleInput: document.querySelector('#title'),
    authorInput: document.querySelector('#author'),
    pagesInput: document.querySelector('#pages'),
    readCheckbox: document.querySelector('#read'),
    newBookBtn: document.querySelector('.add-book'),
    modalAddBookBtn: document.querySelector('.modal-add-btn'),
    modalCancelBtn: document.querySelector('.modal-cancel-btn'),

    init(){ 
        domElement.displayBooksBtn.addEventListener('click', () => {
            libDisplay.displayTable();
        })

        domElement.newBookBtn.addEventListener('click', () => {
            domElement.modalForm.style.display = 'block';
        })

        domElement.modalCancelBtn.addEventListener('click', () => {
            domElement.modalForm.style.display = 'none';
            domElement.form.reset();
        })

        domElement.modalForm.addEventListener('click', event => {
            if (event.target.classList.contains('form-modal')) {
                domElement.modalCancelBtn.click();
            }
        })

        domElement.form.addEventListener('submit', event => {
            event.preventDefault();
            lib.addBook(
                domElement.titleInput.value,
                domElement.authorInput.value,
                domElement.pagesInput.value,
                domElement.readCheckbox.checked);
            if (lib.options.tableShown) {
                libDisplay.display();
            } else libDisplay.displayBookTotal();
            domElement.form.reset();
        })

    }

}

// Page initialisation 
const lib = new Library();
const libDisplay = new LibraryDisplay();
libDisplay.displayBookTotal();
domElement.init();