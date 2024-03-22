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
        books.push(new Book(`Title ${i}`, `Author ${i}`, Math.floor(Math.random() * 300), i%2 == 0));
    }
    return books;
}

function get_book_library() {
    let books_table = document.querySelector('.books');
    return books_table.querySelector('tbody');

}

function show_books_table(books) {
    let table = get_book_library();
    table.innerHTML = "";
    for (book of books) {
        add_book(table, book)
    }
}
function add_book(table, book) {
    let row = table.insertRow(-1);

    let nr = row.insertCell(-1);
    nr.innerText = table.rows.length-1;

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
    add_book(get_book_library(), book);
}

let books = create_books(5);
show_books_table(books);

function set_error_msg(form, input_name, msg) {
    let error_box = form.querySelector(`.${input_name}>.error`);
    error_box.innerText = msg;
}

function clear_errors(form) {
    for (let name of ["new_title", "author", "pages", "read"]) {
       set_error_msg(form, name, "");
    }
}

function getValue(form, form_data, name) {
    let value = form_data.get(name);
    if (!value) {
        set_error_msg(form, name, "This field is required");
        return null;
    }

    return value.trim();
}

function parseToPositiveInteger(form, input_name, value) {
    let number = parseInt(value);
    if (number && number > 0 && number.toString() == value) {
        return value;
    }

    set_error_msg(form, input_name, "This field must be positive integer");
    return null;
}

function getPagesValue(form, form_data, name) {
    let value = getValue(form, form_data, name);
    if (value) {
        return parseToPositiveInteger(form, name, value)
    }
    return null;
}

function getReadValue(form, form_data, name) {
    let value = getValue(form, form_data, name);
    if (value) {
        switch (value) {
            case "true":
                return true;
            case "false":
                return false;
            default:
                set_error_msg(form, name, "Incorrect value.");
        }
    }
    return null;
}

let book_form = document.querySelector('.new_book');
book_form.addEventListener('submit', (event) => {
    event.preventDefault();

    clear_errors(event.target);

    const form_data = new FormData(event.target);

    let title = getValue(event.target, form_data, "new_title");
    let author = getValue(event.target, form_data, "author");
    let pages = getPagesValue(event.target, form_data, "pages");
    let read = getReadValue(event.target, form_data, "read");

    if ([title, author, pages, read].includes(null))
    {
        return null;
    }

    if (books.some((book) => book.title == title)) {
        alert(`Book ${title} already exists`);
    } else {
        add_book_to_library (
            new Book(title, author, pages, read == "true" ? true: false)
        )
    }

    book_form.reset();
})

let search_book = document.querySelector(".search_box>input");
search_book.addEventListener("change", (event) => {
    const regex = new RegExp(`.*${event.target.value.toLowerCase()}.*`);
    let books_to_show = books.filter((book) => regex.test(book.title.toLowerCase()));
    show_books_table(books_to_show);
});
