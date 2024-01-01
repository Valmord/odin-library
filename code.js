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
        author:"Syzanne Collins", 
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

function displayLibrary(){
    //
}