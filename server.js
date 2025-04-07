const express = require('express');
const fs = require("fs")
const app = express();
const PORT = 3000;

app.get("/user",(req, res)=>{
    const userName = req.query.name;
    fs.readFile("data.json", "utf-8", (err, data)=>{
        if (err){
            res.status(500).json({
                success: false,
                message: "Error reading data file",
            });
            return;
        }
        const users = JSON.parse(data);
        if(users[userName]) {
            res.status(200).json({
                success: true,
                data: users[userName],
            });
        }else{
            res.status(400).json({
                success: false,
                message:"User not found",
            });
        }
    });
});

app.listen(PORT, ()=>{
    console.log(`server is running at http://localhost:${PORT}`);
});