import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express()
const port = process.env.PORT || 3000

app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.get("/about", (req, res) => {
    res.render("about.ejs")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})