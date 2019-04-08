var svg = d3.select(".chart"),
    margin = {top: 20, right: 20, bottom: 50, left: 50},
    width1 = +svg.attr("width") - margin.left - margin.right,
    height1 = +svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
var x0 = d3.scaleBand()
    .rangeRound([0, width1])
    .paddingInner(0.3);
var x1 = d3.scaleBand()
    .padding(0.05);
var y = d3.scaleLinear()
    .rangeRound([height1, 0]);
var z = d3.scaleOrdinal()
    .range(["#98abc5", "#8a89a6","#6b486b"]);

// // monthly chart
// // var svg2 = d3.select(".month"),
// // margin1 = {top: 20, right: 100, bottom: 50, left: 100},
// // width = 960 - margin1.left - margin1.right,
// // height = 500 - margin1.top - margin1.bottom,
// // g1 = svg2.append("g").attr("transform", "translate(" + margin1.left + "," + margin1.top + ")");
// // var x2 = d3.scaleBand()
// // .rangeRound([0, width])
// // .paddingInner(0.3);
// // var x3 = d3.scaleBand()
// // .padding(0.05);
// // var y1 = d3.scaleLinear()
// // .rangeRound([height, 0]);
// // var z1 = d3.scaleOrdinal()
// // .range(["#4cb2cc", "#b8a3ff","red", "#808080"])

var url = "/imports/bars"
d3.json(url, function(data) {
    data.forEach(d => {
        console.log(d);
        
<<<<<<< HEAD
    });  
}),
 function(error, data) {
  if (error) throw error;
  var keys = data.columns.slice(1);
=======
        if (d.type === "import") {
            totalImp.push(d)
        }
        if(d.type === "export"){
            totalExp.push(d)
        }
        
	});
	console.log(data)
})
    console.log(totalExp);
    
// functions for toggling between data
function change(value){

	if(value === 'import'){
		update(totalImp);
	}else if(value === 'export'){
		update(totalExp);
	}else{
		update(bothData);
	}
}
>>>>>>> 647e8af700e4b2aabb59eaf8b99b9ae03f0a521d

  
  x0.domain(data.map(function(d) { return d.year; }));
  x1.domain(keys).rangeRound([0, x0.bandwidth()]);
  y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();
  g.append("g")
    .selectAll("g")
    .data(data)
    .enter().append("g")
      .attr("transform", function(d) { return "translate(" + x0(d.year) + ",0)"; })
    .selectAll("rect")
    .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
    .transition().duration(3000)
    .delay( function(d,i) { return i * 200; })
      .attr("x", function(d) { return x1(d.key); })
      .attr("y", function(d) { return y(d.value); })
      .attr("width", x1.bandwidth())
      .attr("height", function(d) { return height1 - y(d.value); })
      .attr("fill", function(d) { return z(d.key); });
  g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height1 + ")")
      .call(d3.axisBottom(x0));
  g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y).ticks(null, "s"))
    .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start")
      .text("US Trade in Dollars");
  var legend = g.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", 12)
      .attr("text-anchor", "end")
      .attr("font-weight", "bold")
    .selectAll("g")
    .data(keys.slice().reverse())
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
  legend.append("rect")
      .attr("x", width1 - 10)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z);
  legend.append("text")
      .attr("x", width1 - 18)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function(d) { return d; });
      
};