const data = {
  users: [],
  posts: [],
  comments: []
};

const users = document.getElementById("users");

const sendRequest = (type, url, store) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = e => {
      if (e.target.readyState == 4) {
        if (e.target.status == 200) {
          data[store] = JSON.parse(xhr.responseText);
          resolve();
        } else {
          reject(e.target.status);
        }
      }
    };

    xhr.open(type, url);
    xhr.send();
  });

sendRequest("get", "https://jsonplaceholder.typicode.com/users", "users")
  .then(renderUsers)
  .then(
    sendRequest(
      "get",
      "https://jsonplaceholder.typicode.com/posts",
      "posts"
    ).then(loadPosts)
  )
  .then(
    sendRequest(
      "get",
      "https://jsonplaceholder.typicode.com/comments",
      "comments"
    ).then(loadComments)
  )
  .catch();

function renderUsers() {
  data.users.forEach(_user => {
    const li = document.createElement("li");
    const user = document.createElement("ul");
    user.innerHTML = `${_user.name}`;
    user.setAttribute("id", `user-${_user.id}`);
    users.appendChild(li);
    li.appendChild(user);
  });
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
