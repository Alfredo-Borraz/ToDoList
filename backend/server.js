const express = require("express");
const cors = require("cors");
const app = express();


/* const sql = require("./BD.js"); */

/* const corsOptions = {
    origin: "http://localhost:8080"
} */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


require("./routes/task.routes.js")(app);
const PORT = 8080;

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
});




