const express = require("express");
const cors = require("cors");
const app = express();


/* const sql = require("./BD.js"); */

/* const corsOptions = {
    origin: "http://localhost:8080"
} */

/* app.use(express.json()); */
/* app.use(express.urlencoded({extended:true})); */


require("./routes/task.routes.js")(app);
const PORT = 3000;
app.use(cors());

app.get('/', (req, res)=>{
    res.send({status: 'bien'})
})

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
});




