const xhr = new XMLHttpRequest();

const data = {
  users: "",
  posts: "",
  comments: ""
};

function sendRequest(req, type, url, store) {
  req.onreadystatechange = _ => {
    if (req.readyState == 4) {
      if (req.status == 200) {
        data[store] = JSON.parse(req.responseText);
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
  "https://jsonplaceholder.typicode.com/posts",
  "posts"
);
sendRequest(
  new XMLHttpRequest(),
  "get",
  "https://jsonplaceholder.typicode.com/users",
  "users"
);
sendRequest(
  new XMLHttpRequest(),
  "get",
  "https://jsonplaceholder.typicode.com/comments",
  "comments"
);
