'use strict'

var express = require('express');
var mongoskin = require('mongoskin');

// Inicializamos la base de datos
var db = mongoskin.db("//CONNECTIONSTRING ", {safe: true})
db.bind("Series");

//Inicializamos el servidor
var app = express();

app.use(express.static(__dirname + '/public'));

// Definición de las rutas
app.get('/api/serie/:id', function (req, res) {
	db.Series.findOne({ _id: parseInt(req.params.id)}, function(err, serie) {
		res.json(serie);
	});
})

app.get('/api/serie', function(req, res) {
	db.Series.find().toArray(function(err,items) {
		res.json(items);
	});	
});

// Esuchamos las peticiones para procesarlas
app.listen(process.env.PORT || 3000);