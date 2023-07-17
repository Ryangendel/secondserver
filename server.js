const { MongoClient } = require('mongodb');
const express = require("express")
var bodyParser = require('body-parser');
const app = express()
const PORT = process.env.PORT || 3001
const path = require("path")
const fs = require('fs');
const mongoose = require("mongoose")
// var ObjectId = require('mongodb').ObjectId;
const Dog = require("./models/Dogs")

mongoose.connect(
    process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/dogs_db',
    {
      useNewUrlParser: true, 
      useUnifiedTopology: true,
    }
  );

// calling body-parser to handle the Request Object from POST requests
//mongodb+srv://ryangendel:P@ssword!@cluster1.xupjqjl.mongodb.net/?retryWrites=true&w=majority
// const url = process.env.MONGO_URI ||'mongodb://localhost:27017';
// const client = new MongoClient(url);
// const dbName = 'dogs_db';


//=========================

// async function main() {
//     // Use connect method to connect to the server
//     await client.connect();
//     console.log('Connected successfully to server');
//     const db = client.db(dbName);
//     const collection = db.collection('documents');
  
//     // the following code examples can be pasted here...
  
//     return 'done.';
//   }
  
//   main()
//     .then(console.log)
//     .catch(console.error)
//     .finally(() => client.close());
  

//=========================


// parse application/json, basically parse incoming Request Object as a JSON Object 
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded, basically can only parse incoming Request Object if strings or arrays
// app.use(bodyParser.urlencoded({ extended: false }));
// combines the 2 above, then you can parse incoming Request Object if object, with nested objects, or generally any type.
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(checkIfLoggedIn)

var db = [
    {name:"Runa", age:4, breed:"pit", id:1233, password:"banana", adopted:false, picture: "https://cdn.britannica.com/07/234207-050-0037B589/English-bulldog-dog.jpg"},
    {name:"Hunter", age:8, breed:"Terrier", id:09813, password:"banana1", adopted:false, picture:"https://a-z-animals.com/media/animals/images/original/bulldog.jpg"},
    {name:"Odie", age:2, breed:"bulldog", id:98283, password:"banana2", adopted:false, picture:"https://images.saymedia-content.com/.image/t_share/MTk2NjAxOTIwMjA1MzY3MjYz/your-guide-to-english-bulldog-puppies.jpg"}
]

//CRUD 
//C => POST
//R => GET
//U => PUT
//D

function checkIfLoggedIn(req, res, next){
    console.log("INSIDE CHECK IF LOGGED In -----1111")
    next()
}

function checkUser(req){
    actualUser = false
    for (let i = 0; i < db.length; i++) {
        console.log(req.body.data.password)
        if(req.body.data.password === db[i].password){
            console.log("INSIDE FOR LOOP CHECK")
            actualUser = true
        }
      } 
      return actualUser
}

function checkIfLoggedInPost(req, res, next){
    console.log("INSIDE CHECK IF LOGGED In -----")
    if(checkUser(req)){
        next()
        return
    }
    res.send('youre not logged in')
}

//linked lists
//binary tree
//search algos 
//stack vs queues
// console.log("----------------")
// console.log(__dirname)
// console.log("----------------")

app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, 'index.html'));
})


app.get("/aboutus", (req, res)=>{
    res.sendFile(path.join(__dirname, 'aboutus.html'));
})

app.get("/individualdog/:id", (req, res)=>{
    res.sendFile(path.join(__dirname, 'individualdog.html'));
})


app.get("/alldogs", (req, res)=>{
    res.sendFile(path.join(__dirname, 'alldogs.html'));
})

app.get("/products/:id", async (req, res)=>{ 
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('dogs');
    const chosenDog = await collection.find({"_id": new ObjectId(req.params.id)}).toArray();
    res.json(chosenDog)
})
//CRUD
//TYPEDEF(QUERY(G), MUTATIONS(CUD)) RESOLVERS
app.get("/products", async (req, res)=>{ 
    //BELOW IS WITH THE MONGOOSE DRIVER
    Dog.find({})
    .then(alldogs =>{
        res.json(alldogs)
    })

    //BELOW IS WITH THE MONGO DRIVER
    // await client.connect();
    // const db = client.db(dbName);
    // const collection = db.collection('dogs');
    // const findResult = await collection.find({name:"Runa"}).toArray();
})

app.post("/products", (req, res)=>{
    
    // const newEntry ={
    // name:req.body.data.name,
    // caretaker: req.body.data.caretaker,
    // age:req.body.data.age,
    // password:req.body.data.passoword,
    // }


//   console.log("INSIDE RIGHT ROUTE")
  
// var string = JSON.stringify(newEntry)
//     fs.appendFile("./dogs.js", "var y ='hello'", (err) => {
//         if (err)
//           console.log(err);
//         else {
//           console.log("File written successfully\n");
//           console.log("The written has the following contents:");
//           console.log(fs.readFileSync("books.txt", "utf8"));
//         }
//       });


//     db.push(newEntry)

console.log(req.body)
    
   Dog.create(req.body)
   .then(returnedData=>{
    console.log(returnedData)
   }).catch(err=>{
    console.log(err)
   })

    res.json(db)
})


//need two thing, item to update and what we are updating something to

function checkTruthy(req, res, next){
    if(typeof req.body.data.adopted === "boolean"){
        next()
        return
    } else{
        res.send("please put in correct value for adopted")
    }
}

app.put("/products/:id", (req, res)=>{
    console.log("INSIDE PUT ROUTE")
    console.log(req.params.id)
    console.log(req)
    console.log(req.body.name)
    var changedDog = {}
    for (let i = 0; i < db.length; i++) {
        if(req.params.id == db[i].id){
            db[i].name=req.body.name
            changedDog = db[i]
        }
      }
      console.log(changedDog)
    res.json(changedDog)
})

app.delete("/products/:id", (req, res)=>{
    console.log("***********")
    console.log(req.params.id)
    console.log("***********")
    for (let i = 0; i < db.length; i++) {
        if(req.params.id == db[i].id){
         
      }
    }
    res.json(db)
})

app.listen(PORT,()=>{
    console.log("listening on port " + PORT)
})
