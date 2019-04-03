
    var vWidth = 300;
    var vHeight = 200;
    // Prepare our physical space
    var g = d3.select('svg').attr('width', vWidth).attr('height', vHeight).select('g');
        // Get the data from our CSV file
    d3.csv('data_2015.csv', function(error, vCsvData) {
        if (error) throw error;
        vData = d3.stratify()(vCsvData);
        drawViz(vData);
    });
    function drawViz(vData) {
        // Declare d3 layout
        var vLayout = d3.treemap().size([vWidth, vHeight]).paddingOuter(5);
        // Layout + Data
        var vRoot = d3.hierarchy(vData).sum(function (d) { return d.data.size; });
        var vNodes = vRoot.descendants();
        vLayout(vRoot);
        var vSlices = g.selectAll('rect').data(vNodes).enter().append('rect');
        // Draw on screen
        vSlices.attr('x', function (d) { return d.x0; })
            .attr('y', function (d) { return d.y0; })
            .attr('width', function (d) { return d.x1 - d.x0; })
            .attr('height', function (d) { return d.y1 - d.y0; });
    }
