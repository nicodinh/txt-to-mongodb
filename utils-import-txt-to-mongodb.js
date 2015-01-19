// README FIRST
// pour les gros fichiers attribuer plus de ram
// FATAL ERROR: CALL_AND_RETRY_2 Allocation failed - process out of memory
// --> node --max-old-space-size=8192 utils-import-txt-to-mongodb.js
// 8192 = 8gb de ram
var mongoose = require('mongoose');
var fs = require('fs');
var Schema = mongoose.Schema;
var myConnection = mongoose.createConnection('localhost', 'faw');
var fawSchema = new Schema({
    word: String,
    length: Number,
    language: String
});
var Word = myConnection.model('word', fawSchema);

// Asynchronous
fs.readFile('liste.de.mots.francais.fr.utf8.txt', function(err, data) {
    if(err) throw err;
    var array = data.toString().split("\n");
    for(i in array) {
        console.log(array[i]);
	var word = new Word({
	    word: array[i],
	    length: array[i].length,
	    language: "FR"
	});
	word.save(function (err) {
	    if (err) { throw err; }
	    console.log('mot ajouté avec succès !');
	});
    }
});