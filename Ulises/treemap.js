make_treemap("/trade_war_data_2016);


    var visualization = d3plus.viz()
    .container("#treemap")  // container DIV to hold the visualization
    .data(d)  // data to use with the visualization
    .type("tree_map")   // visualization type
    .id("Description")         // key for which our data is unique on
    .size("total")      // sizing of blocks
    .draw()             // finally, draw the visualization!

    })
}
