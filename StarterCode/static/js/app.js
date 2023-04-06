// Use sample_values as the values for the bar chart.
// Use otu_ids as the labels for the bar chart.
// Use otu_labels as the hovertext for the chart.


function getPlots(id) {
    d3.json("samples.json").then (sampledata=>{
        console.log(sampledata)
        var id = sampledata.samples[0].otu_ids;
        console.log(id)
        var theSampleValues = sampledata.samples[0].sample_values.slice(0,10).reverse();
        console.log(theSampleValues)
        var theLabels = sampledata.samples[0].otu_labels.slice(0,10);
        console.log(theLabels)
//2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
        var otu_top10 =  (sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
        var otu_id = otu_top10.map(d => "OTU" +d);
        console.log(`OTU IDS: ${otu_id}`)
        var theLabels = sampledata.samples[0].otu_labels.slice(0,10);
        console.log(`otu_labels: ${theLabels}`)
        var tracing = {
            x:theSampleValues,
            y:otu_id,
            text: theLabels,
            marker: {
            color: 'green'},
            type:"bar",
            orientation: "h",
        };
        var data = [tracing];
        var plotLayout = {
            title: "Top 10 OTU",
            yaxis:{ tickmode: "linear",},
        
            margin: {
                l:100,
                r:100,
                t:100,
                b:30
            }
        };
    Plotly.newPlot("bar", data, plotLayout);
        var tracingalfa = {
            x:sampledata.samples[0].otu_ids,
            y:sampledata.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: sampledata.samples[0].sample_values,
                color: sampledata.samples[0].otu_ids
            },
            text: sampledata.samples[0].otu_labels
    };
// 3. Create a bubble chart that displays each sample.
        var bubble_layout = {
            xaxis:{title: "OTU ID"},
            height:600,
            width:1000
        };
        var data_alfa = [tracingalfa];

    Plotly.newPlot("bubble", data_alfa, bubble_layout);
    });
}
function getDemoInfo(id) {
    d3.json("samples.json").then((data)=>{
        var meta = data.meta;
        console.log(meta)
        var filtro = meta.filter(metadata => metadata.id.toString() === id)[0];
        var demoInfo =d3.select("#sample-metadata");
        demoInfo.html("");

        Object.entries(filtro).forEach((key) => {
            demoInfo.append("h5").text(key[0].toUpperCase() + ":" +key[1] + "\n");
        });
    });
}
function optionChanged(id) {
    getPlots(id);
    getDemoInfo(id);
}

function init() {
    var dd = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        console.log(data)

        data.names.forEach(function(name) {
            dd.append("option").text(name).property("value");
        });
        getPlots(data.names[0]);
        getDemoInfo(data.names[0]);
    });
}

init();