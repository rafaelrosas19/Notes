const fs = require("fs");
const uuid = require("uuid");

module.exports = function (app) {

    app.get("/api/notes", (req, res) => {
        fs.readFile("./db/db.json", "utf8", function (err, data) {
            if (err) {
                throw err;
            }
            const notesData = JSON.parse(data);
            res.json(notesData);
        })
    });

    app.post("/api/notes", (req, res) => {
        let notes = {};
        const newNote = {
            id: uuid.v4(),
            title: req.body.title,
            text: req.body.text,
        };
        fs.readFile("./db/db.json", "utf8", function (err, data) {
            if (err) {
                throw err;
            }
            notes = JSON.parse(data);
            notes.push(newNote);

            fs.writeFile("./db/db.json", JSON.stringify(notes), (err) => {
                if (err) throw err
            })
            res.redirect('/')

        });
    });

    app.delete("/api/notes/:id", (req, res) => {
        let noteData = {};
        fs.readFile("./db/db.json", "utf8", function (err, data) {
            if (err) {
                throw err;
            }

            let notesData = JSON.parse(data);
            const found = noteData.some(note => note.id === (req.params.id));

            if (found) {
                const newNotes = notesData.filter(note => note.id !== (req.params.id))
                fs.writeFile("./db/db.json", JSON.stringify(newNotes), (err) => {

                    if (err) throw err

                })

                res.json({
                    msg: "Note deleted",
                    notes: newNotes
                });
            }
            else {
                res.status(400).json({ msg: `No notes with the id of ${req.params.id}` });
            }
        });
    });
};