

    d3.json("imports/tree/2016").then(function(data) {
        //  console.log(data)
          // parse data
          data.forEach(function(d){
              d.total = +d.total;
              d.HSC = d.HSC;
              d.Description = d.Description
              d=d

             console.log(d)
          
          console.log(data)

    var visualization = d3plus.viz()
    .container("#treemap")  // container DIV to hold the visualization
    .data(data)  // data to use with the visualization
    .type("tree_map")   // visualization type
    .id("Description")         // key for which our data is unique on
    .size("total")      // sizing of blocks
    .draw()             // finally, draw the visualization!
});
    })

