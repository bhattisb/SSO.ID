let form = document.getElementById("form");
let input = document.getElementById("input");
let msg = document.getElementById("msg");
let posts = document.getElementById("posts");

// Retrieve stored data from session storage and display it
window.addEventListener("load", () => {
  let storedPosts = JSON.parse(sessionStorage.getItem("posts")) || [];
  storedPosts.forEach(post => {
    createPost(post);
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Button Was Clicked");
  formValidation();
});

let formValidation = () => {
  if (input.value === "") {
    msg.innerHTML = "Post Cannot be Blank";
    console.log("failure");
  } else {
    console.log("Success");
    msg.innerHTML = "";
    acceptData();
  }
};

let data = {};

let acceptData = () => {
  data["text"] = input.value;
  console.log(data);
  createPost(data);
  storePost(data);
  input.value = "";
};

let createPost = (post) => {
  posts.innerHTML += `
    <div>
      <p>${post.text}</p>
      <span class="options">
        <i onClick="editPost(this)" class="fas fa-edit"></i>
        <i onClick="deletePost(this)" class="fas fa-trash-alt"></i>
      </span>
    </div>
  `;
};

let storePost = (post) => {
  let storedPosts = JSON.parse(sessionStorage.getItem("posts")) || [];
  storedPosts.push(post);
  sessionStorage.setItem("posts", JSON.stringify(storedPosts));
};

let deletePost = (e) => {
  let postElement = e.parentElement.parentElement;
  let postText = postElement.querySelector("p").innerText;
  postElement.remove();
  removeFromStorage(postText);
};

let editPost = (e) => {
  let postElement = e.parentElement.parentElement;
  let postText = postElement.querySelector("p").innerText;
  input.value = postText;
  postElement.remove();
  removeFromStorage(postText);
};

let removeFromStorage = (postText) => {
  let storedPosts = JSON.parse(sessionStorage.getItem("posts")) || [];
  storedPosts = storedPosts.filter(post => post.text !== postText);
  sessionStorage.setItem("posts", JSON.stringify(storedPosts));
};
