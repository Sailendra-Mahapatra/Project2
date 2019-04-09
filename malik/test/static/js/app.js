var svg = d3.select("svg"),
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

var url = "/imports/bars"
d3.json(url, function(data){
  data.forEach(d => {
    console.log(d);
    
    
  });
})