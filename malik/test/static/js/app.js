
var totalImp = [];
var totalExp = [];
var bothData = [];

d3.json("/imports/bars",function(data) {
    data.forEach(d => {
        bothData.push(d)
        
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

function update(data){
	//set domain for the x axis
	xChart.domain(["jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]);
	//set domain for y axis
    yChart.domain( [0, d3.max(data, function(d){ return +d.total; })] );
    
    //get the width of each bar 
	var barWidth = width / data.length;
	
	//select all bars on the graph, take them out, and exit the previous data set. 
	//then you can add/enter the new data set
	var bars = svg.selectAll(".bar")
					.remove()
					.exit()
					.data(data)		
	//now actually give each rectangle the corresponding data
	bars.enter()
		.append("rect")
		.attr("class", "bar")
		.attr("x", function(d, i){ return i * barWidth + 1 })
		.attr("y", function(d){ return yChart( d.total); })
		.attr("height", function(d){ return height - yChart(d.total); })
		.attr("width", barWidth - 1)
		.attr("fill", function(d){ 
			if(d.type === "import"){
				return "rgb(251,180,174)";
			}else{
				return "rgb(179,205,227)";
			}
        });
        //left axis
	svg.select('.y')
    .call(yAxis)
//bottom axis
svg.select('.xAxis')
  .attr("transform", "translate(0," + height + ")")
  .call(xAxis)
  .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", function(d){
          return "rotate(-65)";
      });
      
}//end update

//set up svg
var margin = {top: 20, right: 20, bottom: 95, left: 50};
var width = 800;
var height = 500;

var svg = d3.select(".svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var xChart = d3.scaleBand()
				.range([0, width]);
				
var yChart = d3.scaleLinear()
				.range([height, 0]);

var xAxis = d3.axisBottom(xChart);
var yAxis = d3.axisLeft(yChart);

//set up axes
//left axis
svg.append("g")
.attr("class", "y axis")
.call(yAxis)

//bottom axis
svg.append("g")
.attr("class", "xAxis")
.attr("transform", "translate(0," + height + ")")
.call(xAxis)
.selectAll("text")
  .style("text-anchor", "end")
  .attr("dx", "-.8em")
  .attr("dy", ".15em")
  .attr("transform", function(d){
      return "rotate(-65)";
  });

//add labels
svg
.append("text")
.attr("transform", "translate(-35," +  (height+margin.bottom)/2 + ") rotate(-90)")
.text("% of total watch time");

svg
.append("text")
.attr("transform", "translate(" + (width/2) + "," + (height + margin.bottom - 5) + ")")
.text("age group");

//use bothData to begin with
update(bothData);

