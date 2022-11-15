const express = require("express");
const app = new express();
const cors = require("cors");//communication
const logger = require("morgan");//to view api call on terminal


// to pass data from frontend to backend.  use => while starting the app, use is executed
app.use(express.json());//json pair
app.use(express.urlencoded({ extended: true }));//json pair
app.use(cors());
app.use(logger("dev"));//morgan

// for env file
// require ('dotenv').config();  

// mongodb
require("./middleware/mongodb.js");


// for hosting to herokku
// const path = require('path');
// app.use(express.static("./dist/blog-case_study-2"));

// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname + './dist/blog-case_study-2/index.html'));
// });

// router move to app.js
// const express = require("express");
const router = express.Router();
const DATA = require("./models/blogdata")

//get all list (get)
app.get('/getall', async (req, res) => {

    try {
        let list = await DATA.find();
        
        console.log(`from get method ${list}`);
        res.send(list);
    }
    catch (error) {
        console.log(`error from get method ${error}`);

    }

});



//add data (post)
app.post('/post', async (req, res) => {

    try {
        let item = {
            blogerName: req.body.blogerName,
            blogerImg: req.body.blogerImg,
            followCount: req.body.followCount,
            articleTitle: req.body.articleTitle,
            articleDate: req.body.articleDate,
            comments: req.body.comments,
            content1: req.body.content1,
            content2: req.body.content2,
            content3: req.body.content3,
            content4: req.body.content4,
            content5: req.body.content5,
            content6: req.body.content6,
            content7: req.body.content7,
            content8: req.body.content8,
            content9: req.body.content9,
            content10: req.body.content10
        }
        const newdata = new DATA(item);
        const savedata = await newdata.save();
        console.log(`from post method ${savedata}`);
        res.send(savedata);

    } catch (error) {
        console.log(`error from get method ${error}`);
    }

});


// for api calls
// const api = require("./router/api.js");
// app.use("/apii", api);



// set port 
// const port = "api";
const port = process.env.PORT|| 3000;
app.listen(port, () => {
    console.log(`........port is now connected at ${port} ........`);
});
