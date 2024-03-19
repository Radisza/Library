class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

function create_books(num) {
    let books = [
        new Book("To Kill a Mockingbird", "Harper Lee", 123, true),
        new Book("Pride and Prejudice", "Jane Austen", 523, false),
        new Book("Harry Potter", "J k Rowling", 223, true),
    ]

    for (let i = 0 ; i < num; i++) {
        books.push(new Book(`Author ${i}`, `Title ${i}`, Math.floor(Math.random() * 300), i%2 == 0));
    }
    return books;
}

function show_all_books(books) {
    let books_table = document.querySelector('.books');
    for (book of books) {
        let row = books_table.insertRow(-1);

        let nr = row.insertCell(-1);
        nr.innerText = books_table.rows.length-1;

        let title = row.insertCell(-1);
        title.innerText = book.title;

        let author = row.insertCell(-1);
        author.innerText = book.author;

        let pages = row.insertCell(-1);
        pages.innerText = book.pages;

        let read = row.insertCell(-1);
        read.innerText = book.read;
    }
}

let books = create_books(10);
show_all_books(books);
