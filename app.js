const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors());

app.use("/",(req,res)=>{
    res.send("welcome to api of email sender")
})

app.listen(3030,()=>console.log("server is listening on port 3030")
)