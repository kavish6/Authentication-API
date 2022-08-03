const express = require("express");
const router = express.Router();
const auth= require('../middleware/auth')
const Recipe = require("../model/Recipe");
const {getAll,getMyRecipe} = require("../controller/RecipeController"); 
const { getRecipeById } = require("../controller/RecipeController");
const { createRecipe } = require("../controller/RecipeController");
const { updateRecipe } = require("../controller/RecipeController");
router.get('/all',getAll);
router.get('/',getRecipeById)
router.get('/user',auth,getMyRecipe)
router.post('/user',auth,createRecipe)
router.post('/update',auth,updateRecipe)
module.exports=router;