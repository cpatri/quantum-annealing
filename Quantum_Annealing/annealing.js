// Javscript Annealing

function annealing() {
    console.log("Annealing loaded!")

    var svgWidth = document.getElementById('anne').offsetWidth;

    // Set the dimensions of the canvas / graph
    var margin = { top: 30, right: 20, bottom: 30, left: 40 },
        width = svgWidth - margin.left - margin.right,
        height = (svgWidth / 2) - margin.top - margin.bottom
    padding = -60;

    // Set the ranges
    var x = d3.scale.linear()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    // Define the axes
    var xAxis = d3.svg.axis()
        .orient("bottom")
        .scale(x)
        .tickValues([])

    var yAxis = d3.svg.axis()
        .orient("left")
        .scale(y)
        .tickValues([])

    // Define the lines
    var valueline = d3.svg.line()
        .x(function(d) { return x(d.x); })
        .y(function(d) { return y(d.y); });

    var valueline2 = d3.svg.line()
        .x(function(d) { return x(d.x); })
        .y(function(d) { return y(d.y2); })

    // Adds the svg canvas
    var svg = d3.select("#anne").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

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

    // Get the data
    d3.csv("data.csv", function(error, data) {
        if (error) throw error;
        data.forEach(function(d) {
            d.x = +d.x;
            d.y = +d.y;
            d.y2 = +d.y2;
        });

        // Scale the range of the data

        x.domain([0, 100]);
        y.domain([0, 6]);

        // Add the valueline path.
        svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .style("stroke", "blue")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1)
            .attr("d", valueline2(data));

        svg.append("path")
            .attr("fill", "none")
            .style("stroke", "black")
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1)
            .attr("d", valueline(data));

        // Add the X Axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        // Add the Y Axis
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis);


    });

    for (var i = 0; i < 1000; i++) {
        setTimeout(updateData, 2000 + (20000* i));
        setTimeout(updateData3, 6000 + (20000 * i));
        setTimeout(blank, 20000+(20000*i));
        setTimeout(originalData, 20100 + (20000 * i));
    }
    function blank() {
        d3.csv("data_blank.csv", function(error, data) {
            if (error) throw error;

            data.forEach(function(d) {
                d.x = +d.x;
                d.y2 = +d.y2;
            });

            x.domain([0, 100]);
            y.domain([0, 6]);

            // Select the section we want to apply our changes to
            var svg = d3.select("#anne").select("svg").transition();

            // Make the changes
            svg.select("path") // change the line
                .duration(4000)
                .attr("d", valueline2(data));
            svg.select(".x.axis") // change the x axis
                .duration(750)
                .call(xAxis);
            svg.select(".y.axis") // change the y axis
                .duration(750)
                .call(yAxis);
        });
    }

    function originalData() {
        d3.csv("data0.csv", function(error, data) {
            if (error) throw error;

            data.forEach(function(d) {
                d.x = +d.x;
                d.y2 = +d.y2;
            });

            x.domain([0, 100]);
            y.domain([0, 6]);

            // Select the section we want to apply our changes to
            var svg = d3.select("#anne").select("svg").transition();

            // Make the changes
            svg.select("path") // change the line
                .duration(4000)
                .attr("d", valueline2(data));
            svg.select(".x.axis") // change the x axis
                .duration(750)
                .call(xAxis);
            svg.select(".y.axis") // change the y axis
                .duration(750)
                .call(yAxis);
        });
    }

    function updateData() {
        // Get the data again
        d3.csv("data1.csv", function(error, data) {
            if (error) throw error;

            data.forEach(function(d) {
                d.x = +d.x;
                d.y2 = +d.y2;
            });

            x.domain([0, 100]);
            y.domain([0, 6]);

            // Select the section we want to apply our changes to
            var svg = d3.select("#anne").select("svg").transition();

            // Make the changes
            svg.select("path") // change the line
                .duration(4000)
                .attr("d", valueline2(data));
            svg.select(".x.axis") // change the x axis
                .duration(750)
                .call(xAxis);
            svg.select(".y.axis") // change the y axis
                .duration(750)
                .call(yAxis);

        });
    }

    function updateData3() {
        // Get the data again
        d3.csv("data3.csv", function(error, data) {

            if (error) throw error;

            data.forEach(function(d) {
                d.x = +d.x;
                d.y2 = +d.y2;
            });

            // Scale the range of the data again 
            x.domain([0, 100]);
            y.domain([0, 6]);

            // Select the section we want to apply our changes to
            var svg = d3.select("#anne").select("svg").transition();

            // Make the changes
            svg.select("path") // change the line
                .duration(4000)
                .attr("d", valueline2(data));
            svg.select(".x.axis") // change the x axis
                .duration(750)
                .call(xAxis);
            svg.select(".y.axis") // change the y axis
                .duration(750)
                .call(yAxis);

        });
    }
}
// call init
annealing();