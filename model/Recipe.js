const mongoose=require('mongoose');

const RecipeSchema = new mongoose.Schema({
    name:{ 
        type: String,
        required: true,
        unique: true
    },
    ingredients: {
        type: [String],
        required: true,
    },
    image: {
    type:String,
    },
    description:{
        type:String,  
    },
    steps:{
        type:[String],
    },
    author:{
        type:String,
    }


});
const Recipe=mongoose.model("Recipe",RecipeSchema);
module.exports=Recipe;
