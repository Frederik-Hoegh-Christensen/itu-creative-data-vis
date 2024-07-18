const width = 1400 ;
const height = 800;
const margin = 50;

function getRandomNumberFromArray(arr) {
    if (arr.length === 0) {
        throw new Error("Array is empty");
    }
    var randomIndex = Math.floor(Math.random() * arr.length);
    
    return arr[randomIndex];
}

var dataObjects = [
    {
        "name" : "oliver",
        "s1" : 1,
        "s2" : 1,
        "s3" : 1,
        "s4" : 1,
        "s5" : 1,
        "s6" : 10,
    },
    {
        "name" : "emil",
        "s1" : 11,
        "s2" : 1,
        "s3" : 11,
        "s4" : 10,
        "s5" : 12,
        "s6" : 8,
    },
    {
        "name" : "phi",
        "s1" : 9,
        "s2" : 3,
        "s3" : 1,
        "s4" : 9,
        "s5" : 10,
        "s6" : 11,
    },
    {
        "name" : "viggo",
        "s1" : 7,
        "s2" : 12,
        "s3" : 7,
        "s4" : 1,
        "s5" : 5,
        "s6" : 10,
    }
]

const svg = d3.select("#canvas")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "lightblue")


var xScale = d3.scaleBand(["oliver", "emil", "phi", "viggo"], [200, 1500])

var circles = svg.selectAll("circle")
            .data(dataObjects)
            .join("circle")
            .attr("r", 50)
            .attr("cy", 200)
            .attr("cx", d => xScale(d.name))

console.log("xScale: ", xScale("oliver"))
async function makeRain(sString){
    var nameList = dataObjects.map(d => d.name)
    var xCoords = nameList.map(d => xScale(d))
    console.log("xcoords: ", xCoords)
    
        for (let i = 0; i < xCoords.length; i++) {
            const coord = xCoords[i];
            var xInterval = Array.from({length: 41}, (_, i) => coord - 20 + i);
            var dropArray = [];
        
            for (let j = 0; j < dataObjects[i][sString]; j++) {
                dropArray.push(getRandomNumberFromArray(xInterval))
                
            }
    
            var raindrops = svg.selectAll(`.raindrop-${i}`)
                        .data(dropArray)
                        .enter()
                        .append("circle")
                        .attr("class", `raindrop-${i}`)
                        .attr("cx", d => d)
                        .attr("cy", -10) // Start above the visible area
                        .attr("r", 5)
                        .attr("fill", "blue");
    
                    // Animate the raindrops falling
                    raindrops.transition()
                        .delay(() => Math.random() * 5000)
                        .duration(4000) // Duration of the fall
                        .ease(d3.easeLinear)
                        .attr("cy", height + 10) // End below the visible area
                        .on("end", function() { d3.select(this).remove(); }); // Remove the raindrop after falling
            
        }
        await delay(5000)
        
        
        
    }
    
   
async function controller(){
    for (let index = 0; index < 6; index++) {
        var sString = "s" + (index + 1).toString()
        await makeRain(sString);
        
    }
}
controller()
