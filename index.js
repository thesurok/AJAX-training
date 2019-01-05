const xhr = new XMLHttpRequest();

const data = {
  users: [],
  posts: [],
  comments: []
};

function sendRequest(req, type, url, store, cb) {
  req.onreadystatechange = _ => {
    if (req.readyState == 4) {
      if (req.status == 200) {
        data[store] = JSON.parse(req.responseText);
        cb && cb();
      }
      if (req.status == 404) {
        console.error("404 - not found");
      }
    }
  };

  req.open(type, url);
  req.send();
}

sendRequest(
  new XMLHttpRequest(),
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
    new XMLHttpRequest(),
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
    new XMLHttpRequest(),
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
