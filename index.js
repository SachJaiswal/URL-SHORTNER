require('dotenv').config();
const express = require("express");
const path = require("path");

const Url = require("./model/url")
const logreqres  = require("./middleware/index");
const cookieParser = require("cookie-parser");

const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticroute");
const userRoute = require("./routes/user");
const connectiondb = require("./connection");
const { handleDeleteShortUrl } = require("./controller/url");

const app = express();
app.set('trust proxy', 1);
const port = process.env.PORT || 8000;
const { resstrictToLoggedinUserOnly,checkAuth } = require("./middleware/auth");

/* =======================
   DATABASE CONNECTION
======================= */

connectiondb(
  process.env.MONGODB_CONNECT
).then(() => {
  console.log("Database Connected");
}).catch((err) => {
  console.log(err);
})

/* =======================
   MIDDLEWARE
======================= */

app.use(express.json());                            // body parser
app.use(express.urlencoded({ extended: false }));   // accept form data
app.use(logreqres("./log.txt"));                    // logger
app.use(cookieParser());                            // cookie parser

app.use((req, res, next) => {
    res.locals.baseUrl = `${req.protocol}://${req.get("host")}`;
    next();
});

app.set("view engine", "ejs");                        // view engine
app.set("views",path.resolve("./views"));             // view folder
app.use(express.static(path.resolve("./views")));


app.use("/url",resstrictToLoggedinUserOnly,urlRoute);  
app.use("/user",userRoute);
app.get("/", checkAuth, (req, res, next) => {
    if (!req.user) return res.render("landing");
    next();
});
app.use("/", checkAuth, (req, res, next) => {
    if (req.user) res.locals.user = req.user;
    next();
}, staticRoute);

app.get("/delete/:shortId", resstrictToLoggedinUserOnly, handleDeleteShortUrl);

app.get("/:shortId", async (req, res) => {
    const shortId = req.params.shortId;

    const entry = await Url.findOneAndUpdate(
        { short_id: shortId },
        {
            $push: {
                visit_history: {
                    ip_address: req.ip,
                    visited_at: new Date()
                }
            }
        },
        { new: true } // return updated document
    );

    if (!entry) {
        return res.status(404).json({ msg: "URL Not Found" });
    }

    return res.redirect(entry.redirect_url);
});



app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
})
