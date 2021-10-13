import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import articlesRoute from "./routes/articlesRoute.js";


let mongo_uri = "mongodb+srv://admin:admin@cluster.vlskr.mongodb.net/chachaBlog?retryWrites=true&w=majority"

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
mongoose.connect(mongo_uri, {useNewUrlParser:true, useUnifiedTopology:true})
    .then(() => {
        app.listen(3000, () => {
            console.log("Server started on port 3000 and connected to Database");
        });
    })
    .catch((err) => {
        console.log(err);
    })

app.get('/', (req, res) => {
    res.redirect('/articles');
})
    
app.use('/articles', articlesRoute);

