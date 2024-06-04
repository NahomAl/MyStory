import express from "express";
import bodyParser from "body-parser";
import fs from 'fs';

const app = express();
const port = 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

app.get("/", (req, res) => {
    res.render("index.ejs");
});

app.get("/writeStory", (req, res) => {
  res.render("writeStory.ejs");
});
app.post("/writeStory/submit", (req, res) => {
  res.redirect("/writeStory");
  const updatedData = req.body;
  writingJSON(updatedData);
});
app.get("/readStory", (req, res) => {
  fs.readFile('user.json', 'utf8', (err, data) => {
      if (err) {
          console.error('Error reading the file:', err);
      return "Error reading user.json";
    }

    try {
      const jsonData = JSON.parse(data);
      res.render("readStory.ejs", {title: jsonData.title, story: jsonData.story});
    } catch (parseErr) {
        console.error('Error parsing JSON:', parseErr);
        return "Error parsing user.json";
    }
  });
 });
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

function writingJSON(updatedData) { 
      fs.writeFile('user.json', JSON.stringify(updatedData, null, 2), 'utf8', (err) => {
          if (err) {
            console.error(err);
            res.status(500).send('Error writing to JSON file');
            return;
          }
          res.send('JSON file has been updated');
        });
}