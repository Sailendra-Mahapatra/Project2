function buildBar(bardate, hsc) //renderloc
var w = 500;
var h = 100;
var barPadding = 1

//Create SVG
var svg = d3.select(".body")
    .append("svg")
    .attr("width", w)
    .attr("height". h);

    svg.selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", 20)
    .attr("height", 100);

d3.json(inout+"/slice/"+hsc+"/"+bardate).then(function(data) {
    //  console.log(data)
        // parse data
        data.forEach(function(d){
            d.total = +d.total;
            d.HSC = d.HSC;
            d.month = d.Period
            console.log(d.total)
        })