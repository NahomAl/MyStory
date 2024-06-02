import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))

app.get("/home", (req, res) => {
    console.log("GET /");
    res.render("index.ejs");
});

app.get("/submit", (req, res) => {
    console.log("POST /");
});
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});