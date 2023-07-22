// Defining Variables

var siteName = document.getElementById("bookmarkName");
var siteURL = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");
var tableContent = document.getElementById("tableContent");
var visitBtns;
var deleteBtns;

var bookmarks = [];

// Load Bookmarks from Local Storage

if (localStorage.getItem("bookmarksList")) {
    bookmarks = JSON.parse(localStorage.getItem("bookmarksList"));
for (var x = 0; x < bookmarks.length; x++) {
    displayBookmark(x);
}
}

// Display Function

function displayBookmark(indexOfWebsite) {
    var userURL = bookmarks[indexOfWebsite].siteURL;
    var httpsRegex = /^https?:\/\//g;

if (httpsRegex.test(userURL)) {
validURL = userURL;
fixedURL = validURL
    .split("")
    .splice(validURL.match(httpsRegex)[0].length)
    .join("");
} else {
    var fixedURL = userURL;
    validURL = `https://${userURL}`;
}
var newBookmark = `
<tr>
    <td>${indexOfWebsite + 1}</td>
    <td>${bookmarks[indexOfWebsite].siteName}</td>              
    <td>
        <button class="btn btn-visit" data-index="${indexOfWebsite}">
        <i class="fa-solid fa-eye pe-2"></i>Visit
        </button>
    </td>
    <td>
        <button class="btn btn-delete pe-2" data-index="${indexOfWebsite}">
        <i class="fa-solid fa-trash-can"></i>
        Delete
        </button>
    </td>
</tr>
`;
tableContent.innerHTML += newBookmark;

// Adding Click Event to visit buttons

visitBtns = document.querySelectorAll(".btn-visit");
if (visitBtns) {
    for (var l = 0; l < visitBtns.length; l++) {
        visitBtns[l].addEventListener("click", function (e) {
        visitWebsite(e);
    });
    }
}

// Adding Click Event to delete buttons

deleteBtns = document.querySelectorAll(".btn-delete");
if (deleteBtns) {
    for (var j = 0; j < deleteBtns.length; j++) {
        deleteBtns[j].addEventListener("click", function (e) {
        deleteBookmark(e);
    });
    }
}
}

// Clear Input Function

function clearInput() {
    siteName.value = "";
    siteURL.value = "";
}

// Capitalize Function, makes string capitalized

function capitalize(str) {
    let strArr = str.split("");
    strArr[0] = strArr[0].toUpperCase();
    return strArr.join("");
}

// Visit Function

function visitWebsite(e) {
    var websiteIndex = e.target.dataset.index;
    var httpsRegex = /^https?:\/\//;
if (httpsRegex.test(bookmarks[websiteIndex].siteURL)) {
    open(bookmarks[websiteIndex].siteURL);
} else {
    open(`https://${bookmarks[websiteIndex].siteURL}`);
}
}

// Delete Function

function deleteBookmark(e) {
    tableContent.innerHTML = "";
    var deletedIndex = e.target.dataset.index;
    bookmarks.splice(deletedIndex, 1);
for (var k = 0; k < bookmarks.length; k++) {
    displayBookmark(k);
}
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
}

// Submit Function

submitBtn.addEventListener("click", function () {
    var bookmarkName = siteName.value.trim();
    var bookmarkURL = siteURL.value.trim();
    
if (bookmarkName && bookmarkURL && !isBookmarkNameRepeated(bookmarkName)) { // Check if both inputs are non-empty
    var bookmark = {
    siteName: capitalize(bookmarkName),
    siteURL: bookmarkURL,
    };
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
    displayBookmark(bookmarks.length - 1);
    clearInput();
    var modalElement = document.querySelector(".box-info");
    if (modalElement) {
        modalElement.classList.add("d-none"); // Hide the modal if previously shown
    }
    } else {
    var modalElement = document.querySelector(".box-info");
    if (modalElement) {
        modalElement.classList.remove("d-none"); // Show the modal if any input is empty
    }
}
});

// Function to check if the website name is repeated

function isBookmarkNameRepeated(name) {
    return bookmarks.some((bookmark) => bookmark.siteName === capitalize(name));
}