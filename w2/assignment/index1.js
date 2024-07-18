const width = 1400;
const height = 800;

function getRandomNumberFromArray(arr) {
    if (arr.length === 0) {
        throw new Error("Array is empty");
    }
    var randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

var dataObjects = [
    {
        "name": "Oliver",
        "s1": 10,
        "s2": 11,
        "s3": 14,
        "s4": 8,
        "s5": 9,
        "s6": 10,
    },
    {
        "name": "Emil",
        "s1": 11,
        "s2": 8,
        "s3": 11,
        "s4": 10,
        "s5": 12,
        "s6": 8,
    },
    {
        "name": "Phi",
        "s1": 9,
        "s2": 3,
        "s3": 10,
        "s4": 9,
        "s5": 10,
        "s6": 11,
    },
    {
        "name": "Viggo",
        "s1": 7,
        "s2": 12,
        "s3": 7,
        "s4": 13,
        "s5": 5,
        "s6": 10,
    }
];

const svg = d3.select("#canvas")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "lightblue");



var xScale = d3.scaleBand()
    .domain(dataObjects.map(d => d.name))
    .range([200, 1200]);

for (let index = 0; index < 4; index++) {
    var name = dataObjects[index]["name"];
    svg.append("text")
        .attr("x", xScale(name) + xScale.bandwidth() / 2)
        .attr("y", 680)
        .attr("text-anchor", "middle")
        .attr("font-size", "34px")
        .text(name);
    
}

var circles = svg.selectAll("circle")
    .data(dataObjects)
    .join("circle")
    .attr("r", 150)
    .attr("cy", 20)
    .attr("cx", d => xScale(d.name) + xScale.bandwidth() / 2)
    .attr("fill", "gray")

async function makeRain(sString) {
    var nameList = dataObjects.map(d => d.name);
    var xCoords = nameList.map(d => xScale(d) + xScale.bandwidth() / 2);

    for (let i = 0; i < xCoords.length; i++) {
        const coord = xCoords[i];
        var xInterval = Array.from({ length: 41 }, (_, i) => coord - 20 + i);
        var dropArray = [];

        for (let j = 0; j < dataObjects[i][sString]; j++) {
            dropArray.push(getRandomNumberFromArray(xInterval));
        }

        var raindrops = svg.selectAll(`.raindrop-${i}`)
            .data(dropArray)
            .enter()
            .append("circle")
            .attr("class", `raindrop-${i}`)
            .attr("cx", d => d)
            .attr("cy", -10)
            .attr("r", 5)
            .attr("fill", "blue");

        raindrops.transition()
            .delay(() => Math.random() * 5000)
            .duration(4000)
            .ease(d3.easeLinear)
            .attr("cy", height + 10)
            .on("end", function () { d3.select(this).remove(); });

        // Introduce a small delay between each raindrop creation
        
    }
    
    // Introduce a longer delay before the next interval starts
    
    
}

async function controller() {
    for (let index = 0; index < 6; index++) {
        var sString = "s" + (index + 1).toString();

        svg.append("text")
        .attr("x", width / 2)
        .attr("y", 75)
        .attr("text-anchor", "middle")
        .attr("font-size", "34px")
        .attr("class", "s")
        .text(sString);

        
        await makeRain(sString);
        await delay(10000);
        svg.select(".s").remove();
    }
}

controller();


function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}