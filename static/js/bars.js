function buildBar(bardate) {//renderloc



//Create SVG

// axisTicks = {qty: 5, outerSize: 0, dateFormat: '%m-%d'};
// var	parseDate = d3.time.format("%Y-%m").parse;
// var parseTime = d3.timeParse("%d-%b-%y");

var container = d3.selectAll("#bars")

var svg = container.append("svgs"),
margin= {
    top: 30,
     right: 20, 
     bottom: 30, 
     left: 50},
width = +svg.attr("width") - margin.left - margin.right,
height = +svg.attr("height") - margin.top - margin.bottom,
g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
var x = d3.scaleBand().rangeRound([0, width]).padding(0.1);

var y = d3.scaleLinear().rangeRound([height, 0]);
// var x = d3.scaleBand()
//     .range([0, width]);
// var y = d3.scaleLinear()
//     .range([height, 0]);
                


d3.json("/imports/bars/"+bardate).then(function(data) {
    //  console.log(data)
        // parse data
        // data.forEach(function(d){
        //     d.total = +d.total;
        //     d.month = d.Period
        // })
        console.log(data)

        x.domain(data.map(function(d) { return d.Period}));
        y.domain([0, d3.max(data, function(d){return d.MoValue})])
  
        g.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
    
        g.append("g")
        .call(d3.axisLeft(y))
        .append("text")
        .attr("fill", "#000")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("Monthly Trade Value");
    
        g.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function (d) {
            return x(d.Period);
        })
        .attr("y", function (d) {
            return y(Number(d.MoValue));
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
            return height - y(Number(d.MoValue));
        });
    });
}
buildBar(2016)


// svg.selectAll(".bar")
// .data(data)
// .enter()
// .append("rect")
// .attr("class", "bar")
// .attr("x", function(d){ return x(d.Period)})
// .attr("width", x.bandwidth())
// .attr("y", function(d){return y(d.total)})
// .attr("height", function(d) { return y(d.total)})

// svg.append("g")
// .attr("transform", "translate(0,"+height+")")
// .call(d3.axisBottom(x));

// svg.append("g")
// .call(d3.axisLeft(y))