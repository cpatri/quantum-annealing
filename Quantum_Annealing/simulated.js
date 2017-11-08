// Javascript Simulated


function simulated() {
    console.log("Simulated loaded!")

    var svgWidth = document.getElementById('sim').offsetWidth;

    var margin = { top: 20, right: 20, bottom: 30, left: 40 },
        width = svgWidth - margin.left - margin.right,
        height = (svgWidth / 2) - margin.top - margin.bottom;
    padding = -60;

    var x = d3.scale.linear()
        .range([0, width]);


    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .orient("bottom")
        .scale(x)
        .tickValues([])

    var yAxis = d3.svg.axis()
        .orient("left")
        .scale(y)
        .tickValues([])

    var line = d3.svg.line()
        .x(function(d) { return x(d.x); })
        .y(function(d) { return y(d.y); })

    var svg = d3.select("#sim").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("text")
        .attr("text-anchor", "middle")
        .text("Energy")
        .attr("transform", "translate(" + (padding / 2) + "," + (height / 2) + ") rotate(-90)")
        .attr("font-size", "13px")
        .style("font-weight", "bold");

    svg.append("text")
        .attr("text-anchor", "middle")
        .attr("transform", "translate(" + (width / 2) + "," + (height - (padding / 2)) + ")")
        .text("State")
        .attr("font-size", "13px")
        .style("font-weight", "bold");

    d3.tsv("data.tsv", function(error, data) {
        if (error) throw error; //get TSV file

        // Coerce the data to numbers.
        data.forEach(function(d) {
            d.x = +d.x;
            d.y = +d.y;
        });

        // Compute the scales’ domains.
        x.domain(d3.extent(data, function(d) { return d.x; })).nice();
        y.domain(d3.extent(data, function(d) { return d.y; })).nice();

        // Add the x-axis.
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        // Add the y-axis.
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);

        // Add the line! 
        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1)
            .attr("d", line);




    });
    d3.tsv("data2.tsv", function(error, data) {
        if (error) throw error; //get TSV file

        // Coerce the data to numbers.
        data.forEach(function(d) {
            d.x = +d.x;
            d.y = +d.y;
        });

        x.domain(d3.extent(data, function(d) { return d.x; })).nice();
        y.domain(d3.extent(data, function(d) { return d.y; })).nice();

        svg.selectAll(".point")
            .data(data)
            .enter().append("circle")
            .attr("class", "point")
            .attr("r", 4.5)
            .attr("cx", function(d) { return x(d.x); })
            .attr("cy", function(d) { return y(d.y); })
            .style("opacity", 0)




        function showDots() {
            svg.selectAll(".point")
                .style("opacity", 0)
                .transition()
                .delay(function(d, i) {
                    return i * 250
                })
                .style("opacity", 1)
                .transition()
                .delay(spaceTime)
                .style("opacity", 0)

        }
        var spaceTime = 20000;
        var maxTimes = 1000;
        for (var i = 0; i < maxTimes; i++) {
            setTimeout(showDots, spaceTime * i)
        }


    });
}
// init call
simulated();