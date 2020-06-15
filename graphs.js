
        google.charts.load('current', {'packages':['corechart', 'treemap']});
        google.charts.setOnLoadCallback(drawAllSheets);

        function drawAllSheets() {
            drawSheetName('G20 members', 'SELECT A', G20ResponseHandler);
            drawSheetName("MilTotalSpend", 'SELECT A,B,C,D,E,F', militarySpendingResponseHandler);
            drawSheetName("HcTotalSpend", 'SELECT A,B,C,D,E,F', HCSpendingResponseHandler);
            drawSheetName("EducTotalSpend", 'SELECT A,B,C,D,E,F', EducSpendingResponseHandler);
            drawSheetName("GDPCur", 'SELECT A,B,C,D,E,F', GDPCurrResponseHandler);
            drawSheetName("AllPercapitasavg", 'SELECT A,B,C,D', avgpercapcolumnResponseHandler);
            drawSheetName("AllPercapitasavg", 'SELECT A,B,C,D', avgpercapstackResponseHandler);
            drawSheetName("MilPerGDP", 'SELECT A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T', MilPerGDPResponseHandler);
            drawSheetName("HCPerGDP", 'SELECT A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T', HCPerGDPResponseHandler);
            drawSheetName("HCPerGDPOg", 'SELECT A,H', hcpercgdppercchangeResponseHandler);
            drawSheetName("MilpergdpOG", 'SELECT A,H', milpercgdppercchangeResponseHandler);
            drawSheetName("Percchangecombined", 'SELECT A,B', geopercchangeResponseHandler);
        } //drawAllSheets

        function drawSheetName(sheetName, query, responseHandler) {
            var queryString = encodeURIComponent(query);
            var query = new google.visualization.Query(
                'https://docs.google.com/spreadsheets/d/1Lav5y7gGb4gneFjowdaHlHvXJnGKlqaf1lW3_YGV2Ok/gviz/tq?sheet='
                        + sheetName + '&headers=1&tq=' + queryString); //Query
            query.send(responseHandler);
        } //drawSheetName

        function checkError(response) {
            if (response.isError()) {
                alert("Error in query: " + response.getMessage() + " " + response.getDetailedMessage());
                return;
            }
        } //checkError
        
        // function to create map of g20 countries 
        function G20ResponseHandler(response) {
            checkError(response) ;
            var data = response.getDataTable();
            data.sort({column: 0, desc:true});

            var options = {
                title: 'Countries included in the G20'
            };

            var chart = new google.visualization.GeoChart(document.getElementById('G20members'));

            chart.draw(data, options);
        } 
     

        // function to chart military total spending not including average 
        function militarySpendingResponseHandler(response) {
            checkError(response);
            var data = response.getDataTable();
            data.sort({column: 2, desc: true});

            var options = {
                vAxis: {title: 'Spending in Millions ($) Test'},
                hAxis: {title: 'Country'}
            };

            var chart = new google.visualization.ColumnChart(document.getElementById("MilitaryspendingG20_div"));

            chart.draw(data, options);
        }
            //section comparing overall spending to overall GDP 

        // function to chart healthcare total spending not including average 

        function HCSpendingResponseHandler(response) {
            checkError(response);
            var data = response.getDataTable();
            data.sort({column: 2, desc: true});

            var options = {
                vAxis: {title: 'Spending in Millions ($)'},
                hAxis: {title: 'Country'}
            };

            var chart = new google.visualization.ColumnChart(document.getElementById("HealthG20_div"));

            chart.draw(data, options);
        }

        // function to chart education total spending not including average 

        function EducSpendingResponseHandler(response) {
            checkError(response);
            var data = response.getDataTable();
            data.sort({column: 2, desc: true});

            var options = {

				height: 600,
                vAxis: {title: 'Spending in Millions ($)'},
                hAxis: {title: 'Country'}
            };

            var chart = new google.visualization.ColumnChart(document.getElementById("educspendingG20_div"));

            chart.draw(data, options); //added
        }
        // function to chart GDPs for Country 
        function GDPCurrResponseHandler(response) {
            checkError(response);
            var data = response.getDataTable();
            data.sort({column: 2, desc: true});

            var options = {
                title: 'Total GDP 2013-2017',
				height: 600,
                vAxis: {title: 'GDP in Millions ($)'},
                hAxis: {title: 'Country'}
            };

            var chart = new google.visualization.ColumnChart(document.getElementById("gpdcurrent"));

            chart.draw(data, options); //added
        }

        // function comparing avg spending per capita 
        function avgpercapcolumnResponseHandler(response) {
            checkError(response);
            var data = response.getDataTable();
             data.sort({column: 3, desc: true});

            var options = {
                title: 'Average Per Capita Spending & GDP',
                vAxis: {title: 'Per Capita Spending ($)'},
                hAxis: {title: 'Country'}
            };

            var chart = new google.visualization.ColumnChart(document.getElementById("percapitaavgcolumn"));

            chart.draw(data, options);
        }



        // Section comparing per capita spending 
        function avgpercapstackResponseHandler(response) {
            checkError(response);
            var data = response.getDataTable();
            data.sort({column: 4, desc: true});

            var options = {
                legend: {position: 'top', maxLines: 3},
                bar: {groupWidth: '95%'},
                isStacked: true
            };

            var chart = new google.visualization.BarChart(document.getElementById('percapitaavgspend'));

            chart.draw(data, options);

        }

        // function to compare Military percent of GDP Change over time 
        function MilPerGDPResponseHandler(response) {
            checkError(response) ; 
            var data = response.getDataTable();
            
            var options = {
                chart: {
                    title: 'Military Percent of GDP 2013-2017',
                    //subtitle: 'in millions of dollars (USD)'
                },

            };
            var chart = new google.visualization.LineChart(document.getElementById('mil_per_gpd_div'));

            chart.draw(data, options);

        }
        // function to compare Healthcare percent of GDP Change over time 
        function HCPerGDPResponseHandler(response) {
            checkError(response) ; 
            var data = response.getDataTable();
            
            var options = {
                chart: {
                    title: 'Health Percent of GDP 2013-2017',
                    //subtitle: 'in millions of dollars (USD)'
                },
            };
            var chart = new google.visualization.LineChart(document.getElementById('HC_per_gpd_div'));

            chart.draw(data, options);

        }

        
        // function to show percent change in % GDP Healthcare 
         function hcpercgdppercchangeResponseHandler(response) {
            checkError(response) ; 
            var data = response.getDataTable();
            
            var options = {
                legend: 'none',
                bars: 'horizontal',
                annotations: {alwaysOutside: true},
                title: 'Health Care Percent Change in Percent GDP 2013-2017',
                vAxis: {title: 'Country'},
                hAxis: {title: 'Percent Change between 2013 and 2017'}
            };
              
            var view = new google.visualization.DataView(data);
            view.setColumns([0,1, {
                calc: function(dt, row) {
                    return Math.ceil(dt.getFormattedValue(row, 1)) + '%';
                },
                sourceColumn: 1,
                type: 'string',
                role: 'annotation'
            }]);

            var chart = new google.visualization.BarChart(document.getElementById('HC_per_change_gpd_div'));

            chart.draw(data, options);

        }
        
// function to show percent change in % GDP Military 
         function milpercgdppercchangeResponseHandler(response) {
            checkError(response) ; 
            var data = response.getDataTable();
            
            var options = {
                legend: 'yes',
                bars: 'horizontal',
                annotations: {alwaysOutside: false},
                title: 'Military Percent Change in Percent GDP 2013-2017',
                vAxis: {title: 'Country'},
                hAxis: {title: 'Percent Change between 2013 and 2017'}
            };

            var chart = new google.visualization.BarChart(document.getElementById('Mil_per_change_gpd_div'));

            chart.draw(data, options);

        }
        // function to show percent change in % GDP Military Geo Chart   
        
         function geopercchangeResponseHandler(response) {
            checkError(response) ;
            var data = response.getDataTable();
            data.sort({column: 1, desc:true});

            var options = {
                colorAxis: {colors: ['#4CAF50','#1B5E20']}, 
                title: 'Military Spending Percent Change'
            };

            var chart = new google.visualization.GeoChart(document.getElementById('milchangegeo_gpd_div'));
            chart.draw(data, options);
        } 
     

     

    
