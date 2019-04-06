function buildBar(bardate, hsc) {//renderloc

var margin = {top: 30, right: 20, bottom: 30, left: 50};

//Create SVG
var width = 500 - margin.left - margin.right;
var height = 100 - margin.top - margin.bottom;
// axisTicks = {qty: 5, outerSize: 0, dateFormat: '%m-%d'};

var svg = d3.select("#bars")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height". height + margin.top + margin.bottom)
    .append("g")
    .atter("transform",
            "translate(" + margin.left + "," + margin.top + ")");
var x = d3.scaleBand()
    .range([0, width]);
var y = d3.scaleLinear()
    .range([height, 0]);
                


d3.json(inout+"/slice/"+hsc+"/"+bardate).then(function(data) {
    //  console.log(data)
        // parse data
        data.forEach(function(d){
            d.total = +d.total;
            d.HSC = d.HSC;
            d.month = d.Period
           
        })
        console.log(d.Period)
        x.domain(data.map(function(d) { return d.Period}));
        y.domain([0, d3.max(data, function(d){return d.total})])
    })
        svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d){ return x(d.Period)})
        .attr("width", x.bandwidth())
        .attr("y", function(d){return y(d.total)})
        .attr("height", function(d) { return y(d.total)})

     svg.append("g")
        .attr("transform", "translate(0,"+height+")")
        .call(d3.axisBottom(x));

    svg.append("g")
        .call(d3.axisLeft(y))
}
buildBar(2016, 3915)