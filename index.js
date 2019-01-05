const data = {
  users: [],
  posts: [],
  comments: []
};

function sendRequest(type, url, store, cb) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = _ => {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        data[store] = JSON.parse(xhr.responseText);
        cb && cb();
      }
      if (xhr.status == 404) {
        console.error("404 - not found");
      }
    }
  };

  xhr.open(type, url);
  xhr.send();
}

sendRequest(
  "get",
  "https://jsonplaceholder.typicode.com/users",
  "users",
  renderUsers
);

const users = document.getElementById("users");

function renderUsers() {
  data.users.forEach(_user => {
    const li = document.createElement("li");
    const user = document.createElement("ul");
    user.innerHTML = `${_user.name}`;
    user.setAttribute("id", `user-${_user.id}`);
    users.appendChild(li);
    li.appendChild(user);
  });
  sendRequest(
    "get",
    "https://jsonplaceholder.typicode.com/posts",
    "posts",
    loadPosts
  );
}

function loadPosts() {
  for (let i = 0; i < data.users.length; i++) {
    const user = document.getElementById(`user-${i + 1}`);
    data.posts.forEach(_post => {
      if (_post.userId == user.getAttribute("id").substr(5)) {
        const li = document.createElement("li");
        const post = document.createElement("ul");
        post.setAttribute("id", `post-id-${_post.id}`);
        post.innerHTML = `<h5>${_post.title}</h5><p>${_post.body}</p>`;
        user.appendChild(li);
        li.appendChild(post);
      }
    });
  }
  sendRequest(
    "get",
    "https://jsonplaceholder.typicode.com/comments",
    "comments",
    loadComments
  );
}

function loadComments() {
  for (let i = 0; i < data.posts.length; i++) {
    const post = document.getElementById(`post-id-${i + 1}`);
    data.comments.forEach(_comment => {
      if (_comment.postId == post.getAttribute("id").substr(8)) {
        const li = document.createElement("li");
        const comment = document.createElement("ul");
        comment.setAttribute("id", `comment-id-${_comment.id}`);
        comment.innerHTML = `<p>${_comment.body}</p>`;
        post.appendChild(li);
        li.appendChild(comment);
      }
    });
  }
}
