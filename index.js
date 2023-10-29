import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async(req, res) => {
    try {
        const catImage = await axios.get("https://api.thecatapi.com/v1/images/search");
        const catFact = await axios.get("https://catfact.ninja/fact");
        res.render("index.ejs", {image: catImage.data[0], fact: catFact.data});
    } catch (error) {
        console.log(error);
        res.render("index.ejs", { data: JSON.stringify(error.response.data)});
    } 
});

app.get("/getfact", async(req, res) => {
    try {
        res.redirect("/");
    } catch (error) {
        console.log(error);
        res.render("index.ejs", { data: JSON.stringify(error.response.data)});
    } 
});

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});
