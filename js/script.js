const bookSubmit = document.getElementById("bookSubmit");

bookSubmit.addEventListener("click", function (event) {
    event.preventDefault();

    const inputBookTitle = document.getElementById("inputBookTitle").value;
    const inputBookAuthor = document.getElementById("inputBookAuthor").value;
    const inputBookYear = document.getElementById("inputBookYear").value;
    const inputBookIsComplete = document.getElementById("inputBookIsComplete").checked;


    const book = {
        id: +new Date(),
        title: inputBookTitle,
        author: inputBookAuthor,
        year: inputBookYear,
        isComplete: inputBookIsComplete,
    };

    let books = [];
    if (localStorage.getItem("books") !== null) {
        books = JSON.parse(localStorage.getItem("books"));
    }
    if (isValidated(book)) {
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));

        if (!inputBookIsComplete) {
            const incompleteBookshelfList = document.getElementById("incompleteBookshelfList");
            const bookItem = createBookItem(book);
            incompleteBookshelfList.append(bookItem);
            Swal.fire({
                title: "Buku berhasil ditambahkan",
                text: "Buku berhasil ditambahkan ke rak belum selesai dibaca",
                icon: "success",
                confirmButtonText: "OK",
                showConfirmButton: false
            }).then(() => {
                resetForm();
            });
        } else {
            const completeBookshelfList = document.getElementById("completeBookshelfList");
            const bookItem = createBookItem(book);
            completeBookshelfList.append(bookItem);
            Swal.fire({
                title: "Buku berhasil ditambahkan",
                text: "Buku berhasil ditambahkan ke rak selesai dibaca",
                icon: "success",
                confirmButtonText: "OK",
                timer: 1000,
                showConfirmButton: false
            }).then(() => {
                resetForm();
            });
        }
    }

});

function resetForm() {
    document.getElementById("inputBookTitle").value = "";
    document.getElementById("inputBookAuthor").value = "";
    document.getElementById("inputBookYear").value = "";
    document.getElementById("inputBookIsComplete").checked = false;
    document.getElementById("completeLabel").textContent = "Belum selesai dibaca";
}

function isValidated(book) {
    if (book.title === "" && book.author === "" && book.year === "") {
        Swal.fire({
            title: "Buku gagal ditambahkan",
            text: "Judul, Penulis, dan Tahun harus diisi.",
            icon: "error",
            confirmButtonText: "OK",
            timer: 1000,
            showConfirmButton: false
        });
        return false;
    } else if (book.title === "") {
        Swal.fire({
            title: "Buku gagal ditambahkan",
            text: "Judul buku tidak boleh kosong!",
            icon: "error",
            confirmButtonText: "OK",
            timer: 1000,
            showConfirmButton: false
        });
        if (book.title === "" && book.author === "") {
            Swal.fire({
                title: "Buku gagal ditambahkan",
                text: "Judul buku dan penulis buku tidak boleh kosong!",
                icon: "error",
                confirmButtonText: "OK",
                timer: 1000,
                showConfirmButton: false
            });
            return false;
        } else if (book.title === "" && book.year === "") {
            Swal.fire({
                title: "Buku gagal ditambahkan",
                text: "Judul buku dan tahun buku tidak boleh kosong!",
                icon: "error",
                confirmButtonText: "OK",
                timer: 1000,
                showConfirmButton: false
            });
            return false;
        }
        return false;
    } else if (book.author === "") {
        Swal.fire({
            title: "Buku gagal ditambahkan",
            text: "Penulis buku tidak boleh kosong!",
            icon: "error",
            confirmButtonText: "OK",
            timer: 1000,
            showConfirmButton: false
        });
        if (book.author === "" && book.title === "") {
            Swal.fire({
                title: "Buku gagal ditambahkan",
                text: "Penulis buku dan judul buku tidak boleh kosong!",
                icon: "error",
                confirmButtonText: "OK",
                timer: 1000,
                showConfirmButton: false
            });
            return false;
        } else if (book.author === "" && book.year === "") {
            Swal.fire({
                title: "Buku gagal ditambahkan",
                text: "Penulis buku dan tahun buku tidak boleh kosong!",
                icon: "error",
                confirmButtonText: "OK",
                timer: 1000,
                showConfirmButton: false
            });
            return false;
        }
        return false;

    } else if (book.year === "") {
        Swal.fire({
            title: "Buku gagal ditambahkan",
            text: "Tahun buku tidak boleh kosong!",
            icon: "error",
            confirmButtonText: "OK",
            timer: 1000,
            showConfirmButton: false
        });
        if (book.year === "" && book.book === "") {
            Swal.fire({
                title: "Buku gagal ditambahkan",
                text: "Tahun buku dan judul buku tidak boleh kosong!",
                icon: "error",
                confirmButtonText: "OK",
                timer: 1000,
                showConfirmButton: false
            });
            return false;
        } else if (book.year === "" && book.author === "") {
            Swal.fire({
                title: "Buku gagal ditambahkan",
                text: "Tahun buku dan penulis buku tidak boleh kosong!",
                icon: "error",
                confirmButtonText: "OK",
                timer: 1000,
                showConfirmButton: false
            });
            return false;
        }
        return false;
    }
    return true;
}

function createBookItem(book) {
    const bookItem = document.createElement("div");
    bookItem.classList.add("book_item", "card", "mb-0");
    bookItem.setAttribute("data-id", book.id);

    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    bookItem.append(cardBody);

    const bookTitle = document.createElement("h3");
    bookTitle.classList.add("card-title");
    bookTitle.innerText = book.title;
    cardBody.append(bookTitle);

    const bookYear = document.createElement("p");
    bookYear.classList.add("card-text", "text-muted");
    bookYear.innerText = `${book.year}`;
    cardBody.append(bookYear);

    const bookAuthor = document.createElement("p");
    bookAuthor.classList.add("card-text", "font-monospace");
    bookAuthor.innerText = `-Author by ${book.author}-`;
    cardBody.append(bookAuthor);

    const bookAction = document.createElement("div");
    bookAction.classList.add("action");
    bookItem.append(bookAction);

    if (!book.isComplete) {
        const completeButton = document.createElement("button");
        completeButton.classList.add("black");
        completeButton.innerHTML = '<i class="fas fa-check"></i> Selesai dibaca';
        completeButton.addEventListener("click", function () {
            moveBookToCompleted(book);
        });
        bookAction.append(completeButton);
    } else {
        const undoButton = document.createElement("button");
        undoButton.classList.add("black");
        undoButton.innerHTML = '<i class="fas fa-undo"></i> Belum selesai dibaca';
        undoButton.addEventListener("click", function () {
            moveBookToUncompleted(book);
        });
        bookAction.append(undoButton);
    }


    const editButton = document.createElement("button");
    editButton.classList.add("green");
    editButton.innerHTML = '<i class="fas fa-edit"></i> Edit buku';
    editButton.addEventListener("click", function () {
        editBook(book);
    });
    bookAction.append(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("red");
    deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i> Hapus buku';
    deleteButton.addEventListener("click", function () {
        deleteBook(book);
    });
    bookAction.append(deleteButton);

    return bookItem;
}

function findBookIndex(bookId) {
    let books = [];
    if (localStorage.getItem("books") !== null) {
        books = JSON.parse(localStorage.getItem("books"));
    }

    for (let i = 0; i < books.length; i++) {
        if (books[i].id === bookId) {
            return i;
        }
    }

    return -1;
}

function editBook(book) {
    const index = findBookIndex(book.id);
    const editBook = document.createElement("div");
    editBook.innerHTML = `
    <section class="input_section">
    <form id="editBookForm">
     <div class="input pb-3">
                <div class="form-floating">
                  <input class="form-control" id="editBookTitle" value="${book.title}" type="text" placeholder="Masukkan Judul Buku"
                    required>
                  <label for="editBookTitle">Judul</label>
                </div>
              </div>
              <div class="input pb-3">
                <div class="form-floating">
                  <input class="form-control" id="editBookAuthor" value="${book.author}" type="text" placeholder="Masukkan Penulis Buku"
                    required>
                  <label for="editBookAuthor">Penulis</label>
                </div>
              </div>
              <div class="input pb-3">
                <div class="form-floating">
                  <input class="form-control" id="editBookYear" value="${book.year}" type="number" min="1920" max="2025" step="2"
                    placeholder="Masukkan Tahun Buku" required>
                  <label for="editBookYear">Tahun</label>
                </div>
              </div>
              <div class="form-check form-switch text-start">
                <input class="form-check-input" type="checkbox" role="switch" ${book.isComplete ? "checked" : ""} id="editBookIsComplete"
                  onchange="toggleLabelEdit()">
                <label class="form-check-label" for="editBookIsComplete" id="editcompleteLabel"> ${book.isComplete ? "Selesai dibaca" : "Belum selesai dibaca"}</label>
              </div>
    </form>
    </section>
    `;

    const form = editBook.querySelector("#editBookForm");
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const titleInput = editBook.querySelector("#editBookTitle");
        const authorInput = editBook.querySelector("#editBookAuthor");
        const yearInput = editBook.querySelector("#editBookYear");

        if (titleInput.value.trim() === '' || authorInput.value.trim() === '' || yearInput.value.trim() === '') {
            Swal.fire({
                title: "Buku gagal diubah",
                text: "Judul, Penulis, dan Tahun harus diisi.",
                icon: "error",
                confirmButtonText: "OK",
                timer: 1000,
                showConfirmButton: false
            });
        } else {
            const isCompleteInput = editBook.querySelector("#editBookIsComplete");
            const editedBook = {
                id: book.id,
                title: editBook.querySelector("#editBookTitle").value,
                author: editBook.querySelector("#editBookAuthor").value,
                year: editBook.querySelector("#editBookYear").value,
                isComplete: isCompleteInput.checked,
            };

            const books = JSON.parse(localStorage.getItem("books")) || [];
            books.splice(index, 1, editedBook);
            localStorage.setItem("books", JSON.stringify(books));

            const bookItem = document.querySelector(`[data-id="${book.id}"]`);
            bookItem.replaceWith(createBookItem(editedBook));

            if (editedBook.isComplete) {
                const completeBookList = document.getElementById("completeBookshelfList");
                const bookItem = document.querySelector(`[data-id="${editedBook.id}"]`);
                completeBookList.appendChild(bookItem);
            } else {
                const incompleteBookList = document.getElementById("incompleteBookshelfList");
                const bookItem = document.querySelector(`[data-id="${editedBook.id}"]`);
                incompleteBookList.appendChild(bookItem);
            }
            Swal.fire({
                title: "Edit Buku",
                text: "Buku berhasil diubah",
                icon: "success",
                confirmButtonText: "OK",
                timer: 1000,
                showConfirmButton: false
            });
        }
    });

    Swal.fire({
        title: "Edit Buku",
        html: editBook,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: `Simpan`,
        preConfirm: () => {
            const form = document.getElementById("editBookForm");
            form.dispatchEvent(new Event("submit"));
        },
    });
}

function deleteBook(book) {
    Swal.fire({
        title: "Anda yakin?",
        text: `Buku ${book.title} karya ${book.author} akan dihapus`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, hapus!",
    }).then((result) => {
        if (result.isConfirmed) {
            const books = JSON.parse(localStorage.getItem("books"));
            const filteredBooks = books.filter(function (item) {
                return item.id !== book.id;
            });
            localStorage.setItem("books", JSON.stringify(filteredBooks));

            const bookItem = document.querySelector(`.book_item[data-id="${book.id}"]`);
            bookItem.remove();

            Swal.fire({
                title: "Buku Dihapus",
                text: `Buku ${book.title} karya ${book.author} berhasil dihapus`,
                icon: "success",
                timer: 1000,
                showConfirmButton: false
            });

        }
    })
}


function moveBookToCompleted(book) {
    Swal.fire({
        title: 'Konfirmasi',
        text: `Apakah Anda yakin ingin memindahkan buku ${book.title}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.isConfirmed) {
            const books = JSON.parse(localStorage.getItem("books"));
            const updatedBooks = books.map(function (item) {
                if (item.id === book.id) {
                    item.isComplete = true;
                }
                return item;
            });
            localStorage.setItem("books", JSON.stringify(updatedBooks));

            const bookItem = document.querySelector(`.book_item[data-id="${book.id}"]`);
            const completeBookshelfList = document.getElementById("completeBookshelfList");
            bookItem.querySelector("button.black").innerHTML = '<i class="fas fa-undo"></i> Belum selesai dibaca';
            bookItem.querySelector("button.black").addEventListener("click", function () {
                moveBookToUncompleted(book);
            });
            completeBookshelfList.append(bookItem);
            Swal.fire({
                title: 'Berhasil!',
                text: 'Buku berhasil dipindahkan.',
                icon: 'success',
                confirmButtonText: 'OK',
                timer: 1000,
                showConfirmButton: false
            })
        }
    });
}

function moveBookToUncompleted(book) {
    Swal.fire({
        title: 'Konfirmasi',
        text: `Apakah Anda yakin ingin memindahkan buku ${book.title}?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Ya',
        cancelButtonText: 'Batal'
    }).then((result) => {
        if (result.isConfirmed) {
            const books = JSON.parse(localStorage.getItem("books"));
            const updatedBooks = books.map(function (item) {
                if (item.id === book.id) {
                    item.isComplete = false;
                }
                return item;
            });
            localStorage.setItem("books", JSON.stringify(updatedBooks));

            const bookItem = document.querySelector(`.book_item[data-id="${book.id}"]`);
            const incompleteBookshelfList = document.getElementById("incompleteBookshelfList");
            bookItem.querySelector("button.black").innerHTML = '<i class="fas fa-check"></i> Selesai dibaca';
            bookItem.querySelector("button.black").addEventListener("click", function () {
                moveBookToCompleted(book);
            });
            incompleteBookshelfList.append(bookItem);
            Swal.fire({
                title: 'Berhasil!',
                text: 'Buku berhasil dipindahkan.',
                icon: 'success',
                confirmButtonText: 'OK',
                timer: 1000,
                showConfirmButton: false
            })
        }
    });
}

function searchBook() {
    const searchBookTitle = document.getElementById("searchBookTitle").value.toLowerCase();
    const incompleteBookshelfList = document.getElementById("incompleteBookshelfList");
    const completeBookshelfList = document.getElementById("completeBookshelfList");

    let incompleteBooks = [];
    let completeBooks = [];

    if (localStorage.getItem("books") !== null) {
        const books = JSON.parse(localStorage.getItem("books"));

        incompleteBooks = books.filter(book => !book.isComplete);
        completeBooks = books.filter(book => book.isComplete);
    }

    incompleteBookshelfList.innerHTML = "";
    completeBookshelfList.innerHTML = "";
    let foundIncompleteBook = false;
    let foundCompleteBook = false;

    if (searchBookTitle.trim() === "") {
        for (const book of incompleteBooks) {
            const bookItem = createBookItem(book);
            incompleteBookshelfList.appendChild(bookItem);
            foundIncompleteBook = true;
        }

        for (const book of completeBooks) {
            const bookItem = createBookItem(book);
            completeBookshelfList.appendChild(bookItem);
            foundCompleteBook = true;
        }
    } else {
        if (document.getElementById("searchSubmit")) {
            const deleteSubmit = document.createElement("button");
            deleteSubmit.id = "deleteSubmit";
            deleteSubmit.classList.add("btn", "btn-danger");
            deleteSubmit.innerHTML = '<i class="fas fa-trash"></i>';
            deleteSubmit.addEventListener("click", function (event) {
                event.preventDefault();
                document.getElementById("searchBookTitle").value = "";
                displayAllBooks();
            });
            searchSubmit.parentNode.replaceChild(deleteSubmit, searchSubmit);
        }
        for (const book of incompleteBooks) {
            const bookTitle = book.title.toLowerCase();
            const bookAuthor = book.author.toLowerCase();
            const bookYear = book.year;

            if (bookTitle.includes(searchBookTitle)) {
                const bookItem = createBookItem(book);
                incompleteBookshelfList.appendChild(bookItem);
                foundIncompleteBook = true;
            } else if (bookAuthor.includes(searchBookTitle)) {
                const bookItem = createBookItem(book);
                incompleteBookshelfList.appendChild(bookItem);
                foundIncompleteBook = true;
            } else if (bookYear.includes(searchBookTitle)) {
                const bookItem = createBookItem(book);
                incompleteBookshelfList.appendChild(bookItem);
                foundIncompleteBook = true;
            }

        }

        for (const book of completeBooks) {
            const bookTitle = book.title.toLowerCase();
            const bookAuthor = book.author.toLowerCase();
            const bookYear = book.year;

            if (bookTitle.includes(searchBookTitle)) {
                const bookItem = createBookItem(book);
                completeBookshelfList.appendChild(bookItem);
                foundCompleteBook = true;
            } else if (bookAuthor.includes(searchBookTitle)) {
                const bookItem = createBookItem(book);
                completeBookshelfList.appendChild(bookItem);
                foundCompleteBook = true;
            } else if (bookYear.includes(searchBookTitle)) {
                const bookItem = createBookItem(book);
                completeBookshelfList.appendChild(bookItem);
                foundCompleteBook = true;
            }
        }
    }
    if (searchBookTitle.trim() === "") {
        Swal.fire({
            title: "Maaf!",
            text: "Masukkan judul, penulis, atau tahun buku yang akan dicari..",
            icon: "error",
            confirmButtonText: "OK",
            timer: 1000,
            showConfirmButton: false
        });
    } else if (!foundIncompleteBook && !foundCompleteBook) {
        Swal.fire({
            icon: 'error',
            title: 'Buku tidak ditemukan',
            text: `Tidak ada buku yang dimaksud`,
            timer: 1000,
            showConfirmButton: false

        });
    } else if (foundIncompleteBook && foundCompleteBook) {
        Swal.fire({
            icon: 'success',
            title: 'Buku ditemukan',
            text: `Berikut adalah buku yang dimaksud`,
            timer: 1000,
            showConfirmButton: false
        });

    } else if (foundIncompleteBook) {
        Swal.fire({
            icon: 'success',
            title: 'Buku ditemukan',
            text: `Pada rak belum selesai dibaca`,
            timer: 1000,
            showConfirmButton: false
        });
    } else if (foundCompleteBook) {
        Swal.fire({
            icon: 'success',
            title: 'Buku ditemukan',
            text: `Pada rak selesai dibaca`,
            timer: 1000,
            showConfirmButton: false
        });
    }
    if (!foundIncompleteBook) {
        const emptyMessage = document.createElement("p");
        emptyMessage.innerText = "No incomplete books found";
        incompleteBookshelfList.appendChild(emptyMessage);
    }

    if (!foundCompleteBook) {
        const emptyMessage = document.createElement("p");
        emptyMessage.innerText = "No complete books found";
        completeBookshelfList.appendChild(emptyMessage);
    }
}

const searchSubmit = document.getElementById("searchSubmit");
searchSubmit.addEventListener("click", function (event) {
    event.preventDefault();
    searchBook();
});

function displayAllBooks() {
    const incompleteBookshelfList = document.getElementById("incompleteBookshelfList");
    const completeBookshelfList = document.getElementById("completeBookshelfList");
    incompleteBookshelfList.innerHTML = "";
    completeBookshelfList.innerHTML = "";

    let incompleteBooks = [];
    let completeBooks = [];

    if (localStorage.getItem("books") !== null) {
        const books = JSON.parse(localStorage.getItem("books"));

        incompleteBooks = books.filter(book => !book.isComplete);
        completeBooks = books.filter(book => book.isComplete);
    }
    if (document.getElementById("deleteSubmit")) {
        searchSubmit.id = "searchSubmit";
        searchSubmit.classList.add("btn", "btn-warning");
        searchSubmit.innerHTML = '<i class="fas fa-search"></i>';
        deleteSubmit.parentNode.replaceChild(searchSubmit, deleteSubmit);
    }
    for (const book of incompleteBooks) {
        const bookItem = createBookItem(book);
        incompleteBookshelfList.appendChild(bookItem);

    }

    for (const book of completeBooks) {
        const bookItem = createBookItem(book);
        completeBookshelfList.appendChild(bookItem);

    }

}

function toggleLabel() {
    let checkbox = document.getElementById("inputBookIsComplete");
    let label = document.getElementById("completeLabel");
    if (checkbox.checked) {
        label.innerText = "Selesai dibaca";
    } else {
        label.innerText = "Belum selesai dibaca";
    }
}

function toggleLabelEdit() {
    let checkbox = document.getElementById("editBookIsComplete");
    let label = document.getElementById("editcompleteLabel");

    if (checkbox.checked) {
        label.innerText = "Selesai dibaca";
    } else {
        label.innerText = "Belum selesai dibaca";
    }
}

document.addEventListener("DOMContentLoaded", function () {
    let books = [];
    let checkbox = document.getElementById("inputBookIsComplete");
    let label = document.getElementById("completeLabel");
    if (localStorage.getItem("books") !== null) {
        books = JSON.parse(localStorage.getItem("books"));
    }

    for (let book of books) {
        const bookItem = createBookItem(book);
        if (!book.isComplete) {
            const incompleteBookshelfList = document.getElementById("incompleteBookshelfList");
            incompleteBookshelfList.append(bookItem);
        } else {
            const completeBookshelfList = document.getElementById("completeBookshelfList");
            completeBookshelfList.append(bookItem);
        }
    }
    if (checkbox.checked) {
        label.innerText = "Selesai dibaca";
    } else {
        label.innerText = "Belum selesai dibaca";
    }

});