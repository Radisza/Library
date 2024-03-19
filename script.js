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

function show_books_table(books) {
    for (book of books) {
        add_book_to_table(book)
    }
}
function add_book_to_table(book) {
    let books_table = document.querySelector('.books');
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

function add_book_to_library(book) {
    books.push(book);
    add_book_to_table(book);
}

let books = create_books(10);
show_books_table(books);

let book_form = document.querySelector('.new_book');
book_form.addEventListener('submit', (event) => {
    event.preventDefault();
    const form_data = new FormData(book_form);
    console.log(form_data);
    add_book_to_library (new Book(
        title = form_data.get("title"),
        author = form_data.get("author"),
        pages = form_data.get("pages"),
        read = form_data.get("read") == "true" ? true : false,
    ))

    book_form.reset();
})
