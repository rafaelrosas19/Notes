const fs = require("fs");
const uuid = require("uuid");

module.exports = function (app) {

    app.get("/api/notes", function(req,res) {
        
        fs.readFile('./db/db.json', 'utf8', function(err, data){   
            if (err) {
                throw err;
            }

            const notesData = JSON.parse(data);
            
            res.json(notesData);   
        })

    });


    
    
};