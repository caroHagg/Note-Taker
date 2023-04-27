const express = require ("express");
const fs = require ("fs");
const uuid = require('uuid');
const path = require ("path");
const router = express();
const PORT = process.env.PORT || 3000;

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use(express.static("public"));

// add notes page to /notes route
router.get("/notes",(req,res)=>
res.sendFile(path.join(__dirname,"/public/notes.html"))
);

// add api/notes to show all notes
router.get("/api/notes", (req,res) =>{
    fs.readFile("./db/db.json","utf-8",(err,data)=>{
        if (err) {

            return console.log(err);
            
        }else{
            const response = JSON.parse(data);
            return res.json(response)

        }
    })
});

//add a new note to db
router.post("/api/notes", (req,res) => {
    fs.readFile("./db/db.json","utf-8",(err,data)=>{
        if (err) {

            return console.log(err);
            
        }else{
            const response = JSON.parse(data);
            const newNote = {
                id:uuid.v4(),
                title: req.body.title,
                text:req.body.text,
            }
            response.push(newNote);
            fs.writeFile("./db/db.json",JSON.stringify(response,null,4),(err)=>{
                if(err){
                    return console.log(err);
                }else{
                    return res.json(newNote);
                }
            })
        }
    })

});


router.listen(PORT,()=>{
    console.log("listening on port " + PORT)
});

router.get("/*", (req,res) =>
res.sendFile(path.join(__dirname, "/public/index.html"))
);