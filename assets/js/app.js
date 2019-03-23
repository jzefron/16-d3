var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;



d3.csv('assets/data/data.csv').then( function( data) {
    //if (error) return console.warn(error);
    console.log('did we go int')
    data.map(d => {
        d.id = +d.id;
        d.poverty = +d.poverty;
        d.povertyMoe = +d.povertyMoe;
        d.age = +d.age;
        d.income = +d.income;
        d.healthcare = +d.healthcare;
        d.healthcareLow = +d.healthcareLow;
        d.healthcareHigh = +d.healthcareHigh;
        d.obesity = +d.obesity;
        d.obesityLow = +d.obesityLow;
        d.obesityHigh = +d.obesityHigh;
        d.smokes = +d.smokes;
        


    });
    var xLinearScale = d3.scaleLinear()
    .domain([0.95*d3.min(data, d => d.income), 1.05*d3.max(data, d => d.income)])
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([0.95*d3.min(data,d=>d.obesity), 1.05*d3.max(data, d => d.obesity)])
    .range([height, 0]);
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);
      
    var circlesGroup = chartGroup.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d.income))
      .attr("cy", d => yLinearScale(d.obesity))
      .attr("r", "15")
      .attr("fill", "green")
      .attr("opacity", ".5")
      .append('text')
      .classd('stateText')
      .text(d=>d.abbr);
      
          // Create axes labels
    chartGroup.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 40)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .attr("class", "axisText")
    .text("Obesisty (%)");


  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
    .attr("class", "axisText")
    .text("Income ($)");
}
);