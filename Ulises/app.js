function make_treemap(data){
    var visualization = d3plus.viz()
    .container("#viz")  // container DIV to hold the visualization
    .data(data)  // data to use with the visualization
    .type("tree_map")   // visualization type
    .id("Commodity")         // key for which our data is unique on
    .size("total")      // sizing of blocks
    .draw()             // finally, draw the visualization!

}

make_treemap(trade_war_data_2016);