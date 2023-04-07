// Display the default plot
function init() {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function (data) {
      console.log(data);
        // Create array to hold all names (all ID names)
        var names = data.samples.map(x=>x.id)
        // Append an option in the dropdown
        names.forEach(function(name) {
            d3.select('#selDataset')
                .append('option')
                .text(name)
            });
  
    // Create arrays for sample_values, OTU ids, and OTU labels        
    var sample_values = data.samples.map(x=> x.sample_values);
    var otu_ids = data.samples.map(x=> x.otu_ids);
    var otu_label = data.samples.map(x=> x.otu_labels);
    
    // Get the top 10 OTU
    var sorted = sample_values.sort(function(a, b){return b-a});
    var tt = sorted.map(x => x.slice(0,10));
    var sortedIds = otu_ids.sort(function(a, b){return b-a});
    var topId = sortedIds.map(x =>x.slice(0,10));
    var sorted_labels = otu_label.sort(function(a, b){return b-a});
    var topLabels = sorted_labels.map(x =>x.slice(0,10));
  
    // Get the first ID to display on page on load
    var displayFirstId = data.metadata[0]// first id
    var samplemetadata = d3.select("#sample-metadata").selectAll('h1')
    
    // Display the first ID's demographic information
    var sampleMetadata = samplemetadata.data(d3.entries(displayFirstId))
    sampleMetadata.enter()
                  .append('h1')
                  .merge(sampleMetadata)
                  .text(d => `${d.key} : ${d.value}`)
                  .style('font-size','50%')
  
    sampleMetadata.exit().remove()
  
    // Create Bar Chart
    // Create trace for bar chart
    var trace_alfa = {
        x : tt[0],
        y : topId[0].map(x => "OTU" + x),
        text : topLabels[0],
        type : 'bar',
        orientation : 'h',
        transforms: [{
            type: 'sort',
            target: 'y',
            order: 'descending',
          }],
        marker: {
          color: 'rgb(27, 161, 187)',
          opacity: 0.6,
          line: {
            color: 'rgb(8,48,107)',
            width: 1.5
          }
        }
    };
    // Create layout
    var layout_alfa = {
        title : '<b>Top 10 OTU</b>',
    };
  
    // Draw the bar chart
    var data = [trace_alfa];
    var config = {responsive:true}
    Plotly.newPlot('bar', data, layout_alfa,config);
  
  
    // Create a bubble chart 
    // Create the trace for the bubble chart
    var trace_beta = {
        x : otu_ids[0],
        y : sample_values[0],
        text : otu_label[0],
        mode : 'markers',
        marker : {
            color : otu_ids[0],
            size : sample_values[0]
        }
    };
  
    // Create layout
    var layout_beta = {
        title: '<b>Bubble Chart</b>',
        automargin: true,
        autosize: true,
        showlegend: false,
            margin: {
                l: 150,
                r: 50,
                b: 50,
                t: 50,
                pad: 4      
    }};
  
    // Draw the bubble chart
    var data_beta = [trace_beta];
    var config = {responsive:true}
    Plotly.newPlot('bubble',data_beta,layout_beta,config);
  
    
    //Plot the weekly washing frequency in a gauge chart.
    // Get the first ID's washing frequency
    var firstWFreq = displayFirstId.wfreq;
  
    // Calculations for gauge needle
    var firstWFreqDeg = firstWFreq * 20;
    var degrees = 180 - firstWFreqDeg;
    var radius = 0.5;
    var radians = (degrees * Math.PI) / 180;
    var x = radius * Math.cos(degrees * Math.PI / 180);
    var y = radius * Math.sin(degrees * Math.PI / 180);
   
  });
  };
  
  // Update the plot 
  function updatePlotly(id) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then(function (data) {
      console.log(data);
        // Get the sample data
        var test = data.samples.filter(x => x.id === id);
  
        // Get the top 10 sample values
        var sample_values = test.map(x => x.sample_values).sort(function(a, b){return b-a});
        var top_values = sample_values.map(x => x.slice(0,10));
  
        // Get the top ten IDs
        var otu_ids = test.map(x=> x.otu_ids).sort(function(a, b){return b-a});
        var topId = otu_ids.map(x => x.slice(0,10));
  
        // Get the top ten labels
        var otu_label = test.map(x=> x.otu_labels).sort(function(a, b){return b-a});
        var topLabels = otu_label.map(x => x.slice(0,10));
  
        var metadataSamples = data.metadata.filter(x => x.id === +id)[0];
  
        // Get the demographic information
        var samplemetadata = d3.select("#sample-metadata").selectAll('h1')
        var sampleMetadata = samplemetadata.data(d3.entries(metadataSamples))
        sampleMetadata.enter()
                      .append('h1')
                      .merge(sampleMetadata)
                      .text(d => `${d.key} : ${d.value}`)
                      .style('font-size','50%')
        
        // Create Bar Chart
        // Create trace for bar chart
        var trace = {
            x : top_values[0],
            y : topId[0].map(x => "OTU" + x),
            text : topLabels[0],
            type : 'bar',
            orientation : 'h',
            transforms: [{
                type: 'sort',
                target: 'y',
                order: 'descending'
              }],
              marker: {
                color: 'rgb(27, 161, 187)',
                opacity: 0.6,
                line: {
                  color: 'rgb(8,48,107)',
                  width: 1.5
                }
              }
        };
  
        // Create the layout
        var layout_alfa = {
            title: "<b>Top 10 OTU</b>"
        };
        var data1 = [trace];
        var config = {responsive:true}
  
        // Plot the bar chart
        Plotly.newPlot('bar', data1,layout_alfa,config);
  
  
        // Create a bubble chart 
        // Create the trace for the bubble chart
        var trace_beta = {
            x : test.map(x=> x.otu_ids)[0],
            y : test.map(x => x.sample_values)[0],
            text : test.map(x=> x.otu_labels),
            mode : 'markers',
            marker : {
                color : test.map(x=> x.otu_ids)[0],
                size : test.map(x => x.sample_values)[0]
            }   
        };
  
        // Create the layout
        var layout_beta = {
            title: '<b>Bubble Chart</b>',
            automargin: true,
            autosize: true,
            showlegend: false,
            margin: {
                l: 150,
                r: 50,
                b: 50,
                t: 50,
                pad: 4
              }
        };
  
        // Create the bubble chart
        var data_beta = [trace_beta];
        var config = {responsive:true}
        Plotly.newPlot('bubble', data_beta,layout_beta,config)
    });
  };
  
  // Call updatePlotly
  function optionChanged(id) {
    updatePlotly(id);
  };
  
  init();