const movieSalesURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";

const svg = d3.select("#canvas");

const drawTreeMap = (moviesData) => {
  //develope the hierarchy of data with d3 method (process data as a tree)
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

  //create an array to show all the movies (children) only
  const moviesTiles = hierarchy.leaves();

  //using d3 treemap to create a method
  const createTreeMap = d3.treemap().size([1000, 600]);

  //it will generate properties which contain 4 corners positon of the block that will help to draw the square on tree map later on (x0, x1, y0, y1)
  createTreeMap(hierarchy);

  //since we can't put text directly in the svg element, we create the group elements instead
  const block = svg.selectAll("g").data(moviesTiles).enter().append("g");

  //append each block to a rectangle
  block
    .append("rect")
    .attr("class", "tile")
    //fill the color according to different category
    .attr("fill", (movie) => {
      let category = movie.data.category;
      if (category === "Action") {
        return "indianred";
      } else if (category === "Drama") {
        return "lightsteelblue";
      } else if (category === "Adventure") {
        return "mediumslateblue";
      } else if (category === "Family") {
        return "olivedrab";
      } else if (category === "Animation") {
        return "palevioletred";
      } else if (category === "Comedy") {
        return "royalblue";
      } else if (category === "Biography") {
        return "sandybrown";
      }
    });
};

async function fetchMovieSales() {
  const response = await fetch(movieSalesURL);
  const data = await response.json();
  console.log(data);
  drawTreeMap(data);
}

fetchMovieSales();
