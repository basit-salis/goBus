const router = require('express').Router()

const autoSearch = (req,res,next)=>{
    
    const res = await fetch('../assets/search_auto.json');
    const result = await res.json();
    console.log(result)
}