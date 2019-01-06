let countries = [];
let iso = "it";
const getCountries = (method, url) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.onload = e => {
      resolve(e.target.response);
    };
    xhr.onerror = e => {
      reject(e.response);
    };
    xhr.send();
  });

const getCountryDetails = getCountries => {
  countries = JSON.parse(getCountries);
  countries.forEach(_country => {
    _country.alpha2Code == iso.toUpperCase() && console.log(_country.name);
  });
};

getCountries("get", "http://restcountries.eu/rest/v2/all")
  .then(getCountryDetails)
  .catch(err => console.log(err));
