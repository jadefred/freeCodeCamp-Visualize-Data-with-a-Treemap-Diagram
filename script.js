const movieSalesURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";

const svg = d3.select("#canvas");

const drawTreeMap = () => {};

async function fetchMovieSales() {
  const response = await fetch(movieSalesURL);
  const data = await response.json();
  console.log(data);
}

fetchMovieSales();
