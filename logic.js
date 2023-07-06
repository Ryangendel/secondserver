console.log("hello")

// x()=>{
//     this
// }

var char1 ={
    usersTurn: true,
    startingHealth:50,
    currentHealth:30,
    swordSwingDamage:20,
    checkifalive:function(){
        if(this.health > 0){
            console.log("im still alive")
        }else if(this.health < 21 && this.health < 11){
            console.log("Im kind of struggling")
        }
        else{
            console.log("im dead")
        }
    }
}

var char2 ={
    usersTurn: false,
    startingHealth:50,
    currentHealth:30,
    x_axis:0,
    y_axis:0,
    charSprites:[""],
    swordSwingDamage:55,
    attackCharacter: function(char){
        console.log(char)
        this.health =  this.health - char.swordSwingDamage //50 - 55
    },
    checkifalive:function(){
        if(this.health > 0){
            console.log("im still alive")
        }else{
            console.log("im dead")
        }
    }
}

function respawn(car){
    char.currentHealth = char.startingHealth
}
char2.attackCharacter(char1)
char2.checkifalive()
//lexical scope
//value of the keyword this
//reference to it outer env