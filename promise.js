const applyForVisa = documents => {
  console.log("Pending request...");
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0 ? resolve("resolve") : reject("Denied!");
    }, 2000);
  });
  return promise;
};

function getVisa(visa) {
  console.info(visa);
  return visa;
}

const bookHotel = a => {
  console.log(a);
  console.log("Booking hotel");
};

const buyTickets = () => {
  console.log("Buy tickets");
};

applyForVisa({})
  .then(getVisa)
  .then(bookHotel)
  .then(buyTickets)
  .catch(error => console.error(error));
