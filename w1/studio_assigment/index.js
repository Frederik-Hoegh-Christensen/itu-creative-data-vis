var w = 1000;
var h = 700;


var xScale = d3.scaleLinear()
               .domain([0, 10])
               .range([50, w - 50]); 

var yScale = d3.scaleLinear()
               .domain([0, 10])
               .range([h - 50, 50]);  


var canvas = d3.select("#canvas")
				.append("svg")
				.attr("width", w)
				.attr("height", h)
				.style("background-color", "white")
                .style("border", "1px solid black");


var xAxis = d3.axisBottom(xScale);
var yAxis = d3.axisLeft(yScale);

canvas.append("g")
    .attr("transform", `translate(0, ${h - 50})`)
    .call(xAxis);


canvas.append("g")
    .attr("transform", "translate(50, 0)")
    .call(yAxis);


    canvas.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", w / 2 + 50)
    .attr("y", h - 10)
    .text("time in minutes");

canvas.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("x", -h / 2 + 30)
    .attr("y", 15)
    .attr("transform", "rotate(-90)")
    .text("loudness");


var planes = [
    {"loudness": 6, "time": 1.17},
    {"loudness": 7, "time": 6.17}
];

var birds = [
    {"loudness": 1, "time": 0.20},
    {"loudness": 2, "time": 0.35},
    {"loudness": 1, "time": 0.35},
    {"loudness": 0.5, "time": 1.30},
    {"loudness": 0.5, "time": 2.27},
    {"loudness": 0.5, "time": 3.11},
    {"loudness": 0.5, "time": 3.11},
    {"loudness": 0.5, "time": 4.40},
    {"loudness": 1, "time": 4.40},
    {"loudness": 1.2, "time": 4.40},
    {"loudness": 1.3, "time": 5.09},
    {"loudness": 0.2, "time": 6.50},
    {"loudness": 1, "time": 6.50},
    {"loudness": 1, "time": 6.50},
    {"loudness": 0.5, "time": 7.23},
    {"loudness": 0.6, "time": 9.48}
];
var planePath = "M 8 7 L 8 6 L 8 5 L 5 5 C 6 4.6667 7 4.3333 8 4 L 8 3 C 8 2 9 2 9 3 L 9 4 L 12 5 L 9 5 L 9 7 Z";

var rects = canvas.selectAll("rect")
                            .data(planes)
                            .join("path")
                            .attr("d", planePath)
                            .attr("fill", "black")
                            .attr("transform", d => `translate(${xScale(d.time)}, ${yScale(d.loudness)}) scale(5)`); 



var circles = canvas.selectAll("circle")
                                .data(birds)
                                .join("circle")
                                .attr("r", 10)
                                .attr("fill", "black")
                                .attr("cx", d => xScale(d.time))
                                .attr("cy", d => yScale(d.loudness));  



var birdLegend = canvas.append("g")
                      .attr("class", "legend")
                      .attr("transform", `translate(${w - 150}, 30)`);

birdLegend.append("circle")
      .attr("cx", 10)
      .attr("cy", 10)
      .attr("r", 10)
      .attr("fill", "black");

birdLegend.append("text")
      .attr("x", 30)
      .attr("y", 15)
      .text("bird")
      .attr("alignment-baseline", "middle");


var planeLegend = canvas.append("g")
                      .attr("class", "legend")
                      .attr("transform", `translate(${w - 150}, 70)`) 
                      

planeLegend.append("path")
      .attr("d", planePath)
      .attr("fill", "black")
      .attr("transform", `translate(-25, -5) scale(${4})`);

planeLegend.append("text")
      .attr("x", 30)
      .attr("y", 15)
      .text("plane")
      .attr("alignment-baseline", "middle");
