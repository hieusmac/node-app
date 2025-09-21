import express from "express";
import {dirname} from "path";
import {fileURLToPath} from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express()
const port = process.env.PORT || 3000
let blogLists = []

app.set("view engine", "ejs")
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.get("/about", (req, res) => {
    res.render("about.ejs")
})

app.get("/post", (req, res) => {
    res.render("post.ejs", {blogLists: blogLists})
})

app.route("/submit")
    .post((req, res) => {
        blogLists.push({
            title: req.body["blogTitle"],
            text: req.body["blogText"],
            postingTime: getFormatTime()
        });
        res.redirect("/post");
    })
    .delete((req, res) => {
        res.redirect("/post");
    })

app.post("/post/edit", (req, res) => {
    const index = req.body["listIndex"]
    const time = blogLists[index]["postingTime"]
    blogLists[index] = {
        title: req.body["renameTitle"],
        text: req.body["rewriteContent"],
        postingTime: time,
    };
    res.redirect("/post")
})

app.post("/delete", (req, res) => {
    blogLists.splice(req.body["delIndex"], 1)
    res.redirect("/post");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

function getFormatTime() {
    return new Date().toLocaleString("en-AU", {
        hour12: false,
        hour: "numeric",
        minute: "numeric",
        day: "numeric",
        weekday: "short",
        month: "numeric",
        year: "numeric",
    })
}