const movieSalesURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";

const svg = d3.select("#canvas");
const tooltip = d3.select("#tooltip");

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
  //format : [data: {category: "Action", name: "Avatar", value: "760505847"}]
  const moviesTiles = hierarchy.leaves();

  //using d3 treemap to create a method
  const createTreeMap = d3.treemap().size([1000, 600]);

  //it will generate properties which contain 4 corners positon of the block that will help to draw the square on tree map later on (x0, x1, y0, y1)
  createTreeMap(hierarchy);

  //since we can't put text directly in the svg element, we create the group elements instead
  const block = svg
    .selectAll("g")
    .data(moviesTiles)
    .enter()
    .append("g")
    //mark the block starting point (x, y) with the position we have been generated before by using transform
    .attr("transform", (movie) => {
      return "translate (" + movie.x0 + ", " + movie.y0 + ")";
    });

  //append each block to a rectangle
  block
    .append("rect")
    .attr("class", "tile")
    //fill the color according to different category
    .attr("fill", (movie) => {
      let category = movie.data.category;
      if (category === "Action") {
        return "#f94144";
      } else if (category === "Drama") {
        return "#f3722c";
      } else if (category === "Adventure") {
        return "#f8961e";
      } else if (category === "Family") {
        return "#f9c74f";
      } else if (category === "Animation") {
        return "#90be6d";
      } else if (category === "Comedy") {
        return "#43aa8b";
      } else if (category === "Biography") {
        return "#577590";
      }
    })
    .attr("data-name", (movie) => {
      return movie.data.name;
    })
    .attr("data-category", (movie) => {
      return movie.data.category;
    })
    .attr("data-value", (movie) => {
      return movie.data.value;
    })
    //use 2 positions to calculate the width and height of the rentangle
    .attr("width", (movie) => {
      return movie.x1 - movie.x0;
    })
    .attr("height", (movie) => {
      return movie.y1 - movie.y0;
    })
    //add tooltip
    .on("mouseover", (movie) => {
      tooltip.transition().style("visibility", "visible");

      //currency formatter
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      });

      const revenue = formatter.format(movie.data.value);

      tooltip.html(
        "Movie: " + movie.data.name + "<br />" + "Category: " + movie.data.category + "<br />" + "Box office: " + revenue
      );

      tooltip.attr("data-value", movie.data.value);
    })
    .on("mouseout", () => {
      tooltip.transition().style("visibility", "hidden");
    });

  //append text (movie's name) to the block
  block
    .append("text")
    .text((movie) => {
      return movie.data.name;
    })
    .attr("x", 5)
    .attr("y", 20)
};

async function fetchMovieSales() {
  const response = await fetch(movieSalesURL);
  const data = await response.json();
  drawTreeMap(data);
}

fetchMovieSales();
