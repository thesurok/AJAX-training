//Callback
const getDataCallback = cb => {
  setTimeout(() => {
    cb(null, "This is the data");
  }, 2000);
};

getDataCallback((err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});

//Promise
const getDataPromise = data =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(`This is success data ${data}`);
    }, 2000);
  });

const myPromise = getDataPromise(1234);

myPromise.then(
  data => {
    console.log(data);
  },
  err => console.log(err)
);
