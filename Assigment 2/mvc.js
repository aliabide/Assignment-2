// // Model Controler
// class Model {

//     constructor() {
//         this.contacts = JSON.parse(localStorage.getItem('StudentData')) || [];
//     }

//     addContact(data) {
//         this.contacts.push(new Contact(data));
//     }

//     get data() {
//         return this.contacts;
//     }
// }

// // UI Controler
// class View {
//     constructor() {

//     }
// }

// // Global Controler
// class Controler {
//     constructor(model, view) {
//         this.model = model;
//         this.view = view;
//     }

//     bindAddContact(data) {
//         this.model.addContact(data);
//     }
// }

// class Contact {
//     /*
//     contructor(id, firstName, lastName, userName, city, state, zipCode) {
//         this.data = {
//             id,
//             firstName,
//             lastName,
//             userName,
//             city,
//             state,
//             zipCode,
//         }
//     }
//     */

//     contructor(data) {
//         this.data = data;
//     }

//     get data() {
//         /*
//         if(options) {
//             let result = {};
//             for(prop in options) {
//                 if(this.data[prop]) {
//                     result[prop] = options[prop];
//                 }
//             }
//             return result;
//         }
//         */
//         return this.data;
//     }

//     set data(options) {
//         if(options) {
//             for(prop in options) {
//                 if(this.data[prop]) {
//                     this.data[prop] = options[prop];
//                 }
//             }
//         }
//     }

//     get fullName() {
//         return `${this.data({firstName})} ${this.data({lastName})}`;
//     }
// }

// const app = new Controler(new Model(), new View());

class Bookmark {
    constructor(opt) {
        this.url = opt.url;
        this.created = new Date();
    }
}

class Bookmarks {
    constructor() {
        this.bookmarks = [];
    }

    push(bookmark) {
        this.bookmarks.push(bookmark);
        const bookmarkAdded = new CustomEvent('bookmarkAdded');
        document.dispatchEvent(bookmarkAdded);
    }

    forEach(callback) {
        this.bookmarks.forEach(callback);
    }
}

class BookmarkView {
    constructor($bookmarkList, bookmarks) {
        this.$bookmarkList = $bookmarkList;

        this.$bookmarkInput = document.querySelectorAll('.form-control');
        this.$bookmarkButton = document.querySelector('.bookmark-button');
        console.log("=== ", this.$bookmarkInput)
        this.bookmarks = bookmarks;

        this.$bookmarkButton.addEventListener('click', () => {
            let object = {
                EmployeeID: '',
                FirstName: '',
                LastName: '',
                Gender: '',
                HiredDate: '',
                Salary: '',

            }
            object["FirstName"] = this.$bookmarkInput[0].value
            object["LastName"] = this.$bookmarkInput[1].value
            object["EmployeeID"] = this.$bookmarkInput[2].value
            object["Gender"] = this.$bookmarkInput[3].value
            object["HiredDate"] = this.$bookmarkInput[4].value
            object["Salary"] = this.$bookmarkInput[5].value

            const addNewBookmark = new CustomEvent('addNewBookmark', { detail: { url: object } });
            document.dispatchEvent(addNewBookmark);
        });

        document.addEventListener('bookmarkAdded', () => {
            this.render();
        });
    }

    _bookmarkElement(url) {
        const $list = document.createElement('li');
        const $textNode = document.createTextNode(url.EmployeeID + " " + url.FirstName + " " + url.LastName + " " + url.Gender + " " + url.HiredDate + " " + url.Salary);
        $list.appendChild($textNode);

        return $list;
    }

    render() {
        this.$bookmarkList.innerHTML = '';
        this.bookmarks.forEach((bookmark) => {
            const $bookmark = this._bookmarkElement(bookmark.url);
            this.$bookmarkList.appendChild($bookmark);
        });
    }
}

class BookmarkController {
    constructor($element) {
        this.bookmarks = new Bookmarks();
        this.view = new BookmarkView($element, this.bookmarks);

        document.addEventListener('addNewBookmark', (e) => {
            const url = e.detail.url;
            this.addNewBookmark(url);
        });
    }

    addNewBookmark(url) {
        const bookmark = new Bookmark({ url });
        this.bookmarks.push(bookmark);
    }
}

(function () {
    const bookmarkController = new BookmarkController(document.querySelector('.bookmark-list'));
})();