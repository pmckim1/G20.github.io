
        google.charts.load('current', {'packages':['corechart', 'treemap']});
        google.charts.setOnLoadCallback(drawAllSheets);

        function drawAllSheets() {
            drawSheetName('G20 members', 'SELECT A', G20ResponseHandler);
            drawSheetName("MilTotalSpend", 'SELECT A,B,C,D,E,F', militarySpendingResponseHandler);
            drawSheetName("HcTotalSpend", 'SELECT A,B,C,D,E,F', HCSpendingResponseHandler);
            drawSheetName("EducTotalSpend", 'SELECT A,B,C,D,E,F', EducSpendingResponseHandler);
            drawSheetName("GDPCur", 'SELECT A,B,C,D,E,F', GDPCurrResponseHandler);
            drawSheetName("Population", 'SELECT A,K,H', PopResponseHandler);
            drawSheetName("AllPercapitasavg", 'SELECT A,B,C,E', avgpercapcolumnResponseHandler);
            drawSheetName("AllPercapitasavg", 'SELECT A,B,C,D', avgpercapstackResponseHandler);
            drawSheetName("Population", 'SELECT A,I,J', MilHCPercapitaResponseHandler);
            drawSheetName("Population", 'SELECT A,I,J,K,L', MilHCGDPPercapitaResponseHandler);
            drawSheetName("MilPerGDP", 'SELECT A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T', MilPerGDPResponseHandler);
            drawSheetName("HCPerGDP", 'SELECT A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T', HCPerGDPResponseHandler);
            drawSheetName("educGDPper", 'SELECT A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T', educPerGDPResponseHandler);
            drawSheetName("GDPline", 'SELECT A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T', GDPtimeResponseHandler);
            drawSheetName("Percchangecombined", 'SELECT A,G', geomilchangeResponseHandler);
            drawSheetName("Percchangecombined", 'SELECT A,H', geohealthchangeResponseHandler);
            drawSheetName("Percchangecombined", 'SELECT A,I', geoeducchangeResponseHandler);
            drawSheetName("Percchangecombined", 'SELECT A,B,C,J', bothpercchangeResponseHandler);
            drawSheetName("Percchangecombined", 'SELECT A,D,E,F', bothOverallchangeResponseHandler);
            drawSheetName("Percchangecombined", 'SELECT A,B,C,I', BubbleResponseHandler);
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
        
        // function to create geomap of g20 countries 
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
     
         // Overall spending Section 
         
         
        // function to create column chart military total spending not including average 
        function militarySpendingResponseHandler(response) {
            checkError(response);
            var data = response.getDataTable();
            data.sort({column: 2, desc: true});

            var options = {
                height: 600,
                vAxis: {title: 'Spending in Millions ($)'},
                hAxis: {title: 'Country'}
            };

            var chart = new google.visualization.ColumnChart(document.getElementById("MilitaryspendingG20_div"));

            chart.draw(data, options);
        }

        // function to create column chart healthcare total spending not including average 

        function HCSpendingResponseHandler(response) {
            checkError(response);
            var data = response.getDataTable();
            data.sort({column: 2, desc: true});

            var options = {
                height: 600,
                vAxis: {title: 'Spending in Millions ($)'},
                hAxis: {title: 'Country'}
            };

            var chart = new google.visualization.ColumnChart(document.getElementById("HealthG20_div"));

            chart.draw(data, options);
        }

        // function to create column chart education total spending not including average 

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
        // function to creat column chart GDPs for Country 
        function GDPCurrResponseHandler(response) {
            checkError(response);
            var data = response.getDataTable();
            data.sort({column: 2, desc: true});

            var options = {
				height: 600,
                vAxis: {title: 'GDP in Millions ($)'},
                hAxis: {title: 'Country'}
            };

            var chart = new google.visualization.ColumnChart(document.getElementById("gpdcurrent"));

            chart.draw(data, options); //added
        }
        // Per Capita Spending Analysis 

    // function to create bubble chart of average population & avg gdp per capita
        function PopResponseHandler(response) {
		  
            var data = response.getDataTable();
            var view = new google.visualization.DataView(data);

            var options = {
                height: 700,
                colors:['gray'],
                vAxis: {title: 'Population in Millions'},
                hAxis: {title: 'Average Per Capita GDP($)'}
              };
                
            var chart = new google.visualization.BubbleChart(
                        document.getElementById('pop_div1'));
                        chart.draw(data, options);
            }



        // function to create column chart comparing avg spending in military and healthcare per capita to per capita gdp
        function avgpercapcolumnResponseHandler(response) {
            checkError(response);
            var data = response.getDataTable();
             data.sort({column: 3, desc: true});

            var options = {
                height: 600,
                vAxis: {title: 'Per Capita Spending ($)'},
                colors : ['blue','green', 'orange'],
                hAxis: {title: 'Country'}
            };

            var chart = new google.visualization.ColumnChart(document.getElementById("percapitaavgcolumn"));

            chart.draw(data, options);
        }

        // funtion to create bar graph to compare military, healthcare, and eucation spending per capita 
        function avgpercapstackResponseHandler(response) {
            checkError(response);
            var data = response.getDataTable();
            data.sort({column: 1, desc: true});

            var options = {
                height: 600,
                legend: {position: 'top', maxLines: 3},
                colors : ['blue','green', "purple"],
                vAxis: {title: 'Per Capita Spending ($)'},
                hAxis: {title: 'Country'},
                isStacked: true
            };


            var chart = new google.visualization.BarChart(document.getElementById('percapitaavgspend'));

            chart.draw(data, options);

        }


        
        // function to show Military vs Healthcare Per Capita Spending as bubble chart
        function MilHCPercapitaResponseHandler(response) {
		  
            var data = response.getDataTable();
            var view = new google.visualization.DataView(data);

            var options = {
                height: 700,
                hAxis: {title: 'Military Average Per Capita ($)'},
                vAxis: {title: "Healthcare Average Per Capita ($)"},
                legend: {position: 'top', maxLines: 3},
              };
                
            var chart = new google.visualization.BubbleChart(
                        document.getElementById('bubble_div1'));
                        chart.draw(data, options);
            }



    // function to show Military vs Healthcare vs Education vs GDP Per Capita Spending as bubble chart
        function MilHCGDPPercapitaResponseHandler(response) {
		  
            var data = response.getDataTable();
            data.sort({column: 3, desc: true});
            var view = new google.visualization.DataView(data);
         
            var options = {
                height: 700,
                hAxis: {title: 'Military Average Per Capita ($)'},
                vAxis: {title: "Health Care Average Per Capita ($)"},
                legend: {position: 'top', maxLines: 3},
                colorAxis: {colors: ['yellow', 'red']}
              };
                
            var chart = new google.visualization.BubbleChart(
                        document.getElementById('bubble_div'));
                        chart.draw(data, options);

         }

        //section for percent of GDP Analysis 

        // function to compare Military percent of GDP Change over time 
        function MilPerGDPResponseHandler(response) {
            checkError(response) ; 
            var data = response.getDataTable();
            
            var options = {
                height: 800,
                wdith: 1000,
                hAxis: {title: 'Year'},
                vAxis: {title: "Percent of GDP"},
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
                height:800,
                width: 1000,
                hAxis: {title: 'Year'},
                vAxis: {title: "Percent of GDP"},
                chart: {
                title: 'Health Percent of GDP 2013-2017',
                },
            };
            var chart = new google.visualization.LineChart(document.getElementById('HC_per_gpd_div'));
            chart.draw(data, options);
        }

         // function for education % GDP spending 
         function educPerGDPResponseHandler(response) {
            checkError(response) ; 
            var data = response.getDataTable();
            
            var options = {
                height:800,
                width: 1000,
                hAxis: {title: 'Year'},
                vAxis: {title: "Percent of GDP"},
                chart: {
                    title: 'Education Percent of GDP 2013-2017'
                    //subtitle: 'in millions of dollars (USD)'
                },

            };
            var chart = new google.visualization.LineChart(document.getElementById('educ_per_gpd_div'));

            chart.draw(data, options);

        }


           // function for GDP overtime spending spending 
           function GDPtimeResponseHandler(response) {
            checkError(response) ; 
            var data = response.getDataTable();
            
            var options = {
                height:800,
                width: 1000,
                hAxis: {title: 'Year'},
                vAxis: {title: "Percent of GDP"},
                chart: {
                    title: 'GDP Spending 2013-2017'
                    //subtitle: 'in millions of dollars (USD)'
                },

            };
            var chart = new google.visualization.LineChart(document.getElementById('gpd_line_div'));

            chart.draw(data, options);

        }



        // Change in Spending Section 
        
        // function to show percent change in % GDP Healthcare 
         function hcpercgdppercchangeResponseHandler(response) {
            checkError(response) ; 
            var data = response.getDataTable();
            
           

            
            var options = {
                legend: 'none',
                bars: 'horizontal',
                annotations: {alwaysOutside: true},
                title: 'Health Care Percent Change in Percent GDP 2013-2017',
                vAxis: {title: "Countries"
                },
                hAxis: {title: 'Percent Change between 2013 and 2017'}
            };

            
              
            var chart = new google.visualization.BarChart(document.getElementById('HC_per_change_gpd_div'));

            chart.draw(data, options);

        }

    //function to show percent change in GDP Military spending Geo Chart      
         function geomilchangeResponseHandler(response) {
            checkError(response) ;
            var data = response.getDataTable();
            data.sort({column: 1, desc:true});

            var options = {
                colorAxis: {colors: ['orange','blue']}, 
                title: 'Military Spending Percent Change'
            };

            var chart = new google.visualization.GeoChart(document.getElementById('milchangegeo_pc_div'));
            chart.draw(data, options);
        } 

//function to show percent change in % Healthcare spending Geo Chart      
         function geohealthchangeResponseHandler(response) {
            checkError(response) ;
            var data = response.getDataTable();
            data.sort({column: 1, desc:true});

            var options = {
                colorAxis: {colors: ['orange', "blue"]}, 
                title: 'Health Spending Percent Change'
            };

            var chart = new google.visualization.GeoChart(document.getElementById('healthchangegeo_pc_div'));
            chart.draw(data, options);
        } 

        //function to show percent change in % Education spending Geo Chart      
        function geoeducchangeResponseHandler(response) {
            checkError(response) ;
            var data = response.getDataTable();
            data.sort({column: 1, desc:true});

            var options = {
                colorAxis: {colors: ['orange', "blue"]}, 
                title: 'Education Spending Percent Change'
            };

            var chart = new google.visualization.GeoChart(document.getElementById('educchangegeo_pc_div'));
            chart.draw(data, options);
        } 


// function to show % change in HC & Military spending 
        function bothpercchangeResponseHandler(response) {
            checkError(response) ; 
            var data = response.getDataTable();
            
            var options = {
                height: 700,
                legend: {position: 'top', maxLines: 3},
                bars: 'horizontal',
                annotations: {alwaysOutside: true},
                colors : ['blue','green', "purple"],
                vAxis: {title: 'Country'},
                hAxis: {title: 'Percent Change between 2013 and 2017'}
            };

    

            var chart = new google.visualization.BarChart(document.getElementById("bothper_change_gpd_div"));

            chart.draw(data, options);
        }



            // function to show overall spend change in HC & Military 
        function bothOverallchangeResponseHandler(response) {
            checkError(response) ; 
            var data = response.getDataTable();
            
            var options = {
                height: 700,
                legend: {position: 'top', maxLines: 3},
                colors : ['blue','green', 'purple'],
                vAxis: {title: 'Change between 2013 and 2017 ($ in millions)'},
                hAxis: {title: 'Country'}
            };
            
            var chart = new google.visualization.ColumnChart(document.getElementById("both_change_gpd_div"));

            chart.draw(data, options);
        }
     
        // bubble function to show changes in percapita spending
        function BubbleResponseHandler(response) {
		  
            var data = response.getDataTable();
            data.sort({column: 3, desc: true});
            var view = new google.visualization.DataView(data);
         
            var options = {
                height: 700,
                hAxis: {title: 'Change in Military Spending Per Capita ($)'},
                vAxis: {title: "Change in Healthcare Spending Per Capita ($)"},
                legend: {position: 'top', maxLines: 3},
                colorAxis: {colors: ["grey", 'purple']}
              };
                
            var chart = new google.visualization.BubbleChart(
                        document.getElementById('bubble2_div'));
                        chart.draw(data, options);

         }
