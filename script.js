// The fetch() method returns a Promise, which is a placeholder object that will either be fulfilled if your request is successful, or rejected if your request is unsuccessful.

// If the Promise is fulfilled, it resolves to a Response object, and you can use the .then() method to access the Response.

// The data you get from a GET request is not usable at first. To make the data usable, you can use the .json() method on the Response object to parse it into JSON. If you expand the Prototype of the Response object in the console, you will see the .json() method there.

// The .catch() method is another asynchronous JavaScript method you can use to handle errors. This is useful in case the Promise gets rejected.

// Now that you have the data you want, you can use it to populate the UI. But the fetched data contains an array of 26 authors, and if you add them all to the page at the same time, it could lead to poor performance.

// The best method to do this is the .slice() array method.

// Now you have everything you want to include in the UI. The next step is to make the Load More Authors button fetch more authors whenever it's clicked. You can do this by adding a click event to the button and carefully incrementing the startingIndex and endingIndex variables.



const authorContainer = document.getElementById('author-container');
const loadMoreBtn = document.getElementById('load-more-btn');

let startingIndex = 0;
let endingIndex = 8;
let authorDataArr = [];

fetch('https://cdn.freecodecamp.org/curriculum/news-author-page/authors.json')
  .then((res) => res.json())
  .then((data) => {
    authorDataArr = data;
    displayAuthors(authorDataArr.slice(startingIndex, endingIndex));  
  })
  .catch((err) => {
   authorContainer.innerHTML = '<p class="error-msg">There was an error loading the authors</p>';
  });

const fetchMoreAuthors = () => {
  startingIndex += 8;
  endingIndex += 8;

  displayAuthors(authorDataArr.slice(startingIndex, endingIndex));
  if (authorDataArr.length <= endingIndex) {
    loadMoreBtn.disabled = true;
loadMoreBtn.style.cursor='not-allowed';
    loadMoreBtn.textContent = 'No more data to load';
  }
};

const displayAuthors = (authors) => {
  authors.forEach(({ author, image, url, bio }, index) => {
    authorContainer.innerHTML += `
    <div id="${index}" class="user-card">
      <h2 class="author-name">${author}</h2>
      <img class="user-img" src="${image}" alt="${author} avatar">
      <div class="purple-divider"></div>
      <p class="bio">${bio.length > 50 ? bio.slice(0, 50) + '...' : bio}</p>
      <a class="author-link" href="${url}" target="_blank">${author} author page</a>
    </div>
  `;
  });
};

loadMoreBtn.addEventListener('click', fetchMoreAuthors);