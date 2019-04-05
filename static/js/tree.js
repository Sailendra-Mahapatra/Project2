d3.json("imports/tree/2016").then(function(data) {
    //  console.log(data)
      // parse data

      console.log(data)

    });
  function update(source){  
   var visualization = d3plus.viz()
    .container("#treemap")  // container DIV to hold the visualization
    .data(source)  // data to use with the visualization
    .type("tree_map")   // visualization type
    .id("Description")         // key for which our data is unique on
    .size("total")      // sizing of blocks
    .draw()             // finally, draw the visualization!
  }
console.log(visualization)

// make_treemap(trade_war_data_2016);
