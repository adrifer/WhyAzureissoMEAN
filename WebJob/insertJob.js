var mongoskin = require('mongoskin');
var request = require('request');

var db = mongoskin.db('//CONNECTIONSTRING', { safe: true });

//DB Collections
db.bind("Series");

db.Series.remove(function(err) {
		if(err) {
		    console.log("Reset Error");
		    db.close();
		} else {
		    console.log("Reset Complete");

		    request('http://api.trackseries.tv/v1/Stats/TopSeries', function (error, response, body) {
		        var series = JSON.parse(body);
		        series.forEach(function (item) {
		            console.log("Getting " + item.name);
		            request('http://api.trackseries.tv/v1/Series/' + item.id + '/All', function (errorDetail, responseDetail, bodyDetail) {
		                var serie = JSON.parse(bodyDetail);
		                serie._id = serie.id;
		                delete serie.id;
		                console.log("Complete " + serie.name);

		                db.Series.insert(serie, function (err) {
		                    if (err) {
		                        console.log("Insert error");
		                    } else {
		                        console.log("Inserted " + serie.name);
		                    }
		                    updateCount(series.length);
		                })
		            });
		        });
		    });
		}
	});


var count = 0;
function updateCount(numSeries) {
    count++;
    if (count == numSeries) {
        db.close();
    }
}

