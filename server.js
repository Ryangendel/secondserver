const express = require("express")
const app = express()

var db = [{name:"Runa", age:4, breed:"pit", id:1233}, {name:"Hunter", age:8, breed:"Terrier", id:09813},
{name:"Odie", age:2, breed:"bulldog", id:98283}
]

app.get("/dogs/:id/:banana/:runa/:hello",(request, response)=>{
    let chosenDog = {}
    console.log(typeof request.params.id)
    for (let i = 0; i < db.length; i++) {
        console.log("INSIDE FOR LOOP")
        if(request.params.id == db[i].id){
            chosenDog = db[i]
        }
      }
    
    response.json(chosenDog)
})

app.listen(5000,()=>{
    console.log("listening on port 5000")
})
