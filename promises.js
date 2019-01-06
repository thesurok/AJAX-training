// //Callback
// const getDataCallback = (num, cb) => {
//   setTimeout(() => {
//     if (typeof num === "number") {
//       cb(null, num * 2);
//     } else {
//       cb("Number must be provided");
//     }
//   }, 2000);
// };

// getDataCallback(2, (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     getDataCallback(data, (err, data) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(data);
//       }
//     });
//   }
// });

const getDataPromise = num =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      typeof num === "number" ? resolve(num * 2) : reject("Error");
    }, 2000);
  });

getDataPromise(4).then(
  data => {
    getDataPromise(data).then(
      data => {
        console.log(data);
      },
      err => console.log(err)
    );
  },
  err => console.log(err)
);

getDataPromise(10)
  .then(data => {
    return getDataPromise(data);
  })
  .then(data => console.log(data));
