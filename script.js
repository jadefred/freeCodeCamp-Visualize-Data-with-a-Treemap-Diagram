const movieSalesURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";

const svg = d3.select("#canvas");

const drawTreeMap = (moviesData) => {
  //develope the hierarchy of data with d3 method
  const hierarchy = d3
    .hierarchy(moviesData, (node) => {
      return node.children;
    })
    //sum up the value so the movie has the highest value could occupy a bigger block
    .sum((node) => {
      return node.value;
    })
    //sort the nodes
    .sort((node1, node2) => {
      return node2.value - node1.value;
    });

  //using d3 treemap to create a method
  const createTreeMap = d3.treemap().size([1000, 600]);

  //it will generate a 4 corners positon of the sqaure that will halp to draw the square on tree map (x0, x1, y0, y1)
  createTreeMap(hierarchy);
};

async function fetchMovieSales() {
  const response = await fetch(movieSalesURL);
  const data = await response.json();
  console.log(data);
  drawTreeMap(data);
}

fetchMovieSales();
