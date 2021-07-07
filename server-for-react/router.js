const express = require('express')
const router = express.Router()

router.get('/' , (req,res) => {
    res.json({message:'server is up and running'})
})


module.exports = router