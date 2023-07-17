const {Schema, model} = require("mongoose")

const DogModel = new Schema(
    {
        dogName: {
            type: String,
            trim: true, 
            required:true
        },
        dogAge:{
            type: Number, 
            trim: true, 
            required:true
        },
        breed:{
            type: String,
            trim: true, 
            required:true
        }
    }
)

const Dog = model("Dogs", DogModel)

module.exports = Dog