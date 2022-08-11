const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";

const suggestions = document.querySelector(".suggestions");
const search = document.querySelector(".search");

const cities = [];

fetch(endpoint)
  .then((response) => response.json())
  .then((data) => cities.push(...data));
console.log(cities);

function findMatches(wordToMatch, cities) {
  return cities.filter((place) => {
    const regex = new RegExp(wordToMatch, "gi");
    return place.city.match(regex) || place.state.match(regex);
  });
}
function nombreAvecVirgules(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function displayMatchs() {
  const matchArray = findMatches(this.value, cities);
  const htmlElement = matchArray
    .map((place) => {
      const regex = new RegExp(this.value, "gi");
      const cityName = place.city.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      const stateName = place.state.replace(
        regex,
        `<span class="hl">${this.value}</span>`
      );
      return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${nombreAvecVirgules(place.population)}</span>
      </li>
    `;
    })
    .join("");
  suggestions.innerHTML = htmlElement;
}
search.addEventListener("change", displayMatchs);
search.addEventListener("keyup", displayMatchs);
