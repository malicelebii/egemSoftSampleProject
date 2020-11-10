const express = require('express');
const router = express.Router();
const Product = require('../models/Product')

//=================================
//             Product
//=================================

// READ (ONE)
router.get('/:id', (req, res) => {
   Product.findById(req.params.id)
     .then((result) => {
       res.json(result);
     })
     .catch((err) => {
       res.status(404).json({ success: false, msg: `No such product.` });
     });
 });


router.get("/", (req, res) => {
   let products = Product.find()
   .then(products=>res.json(products))
   
});


// UPDATE
router.put('/:id', (req, res) => {

  
 
   let updatedProduct = {
     name: req.body.name,
     img: req.body.img,
     price: req.body.price,
     category: req.body.category,
     stock: req.body.stock,
     price_history:req.body.price_history
   };
 
   Product.findOneAndUpdate({ _id: req.params.id }, updatedProduct )
     .then((oldResult) => {
       Product.findOne({ _id: req.params.id })
         .then((newResult) => {
           res.json(newResult);
         })
         .catch((err) => {
           res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
           return;
         });
     })
     .catch((err) => res.json(err));
 });

router.post("/", (req, res) => {
   let product = new Product({ name: req.body.name,img:req.body.img,category:req.body.category,price:req.body.price,stock:req.body.stock })

   product.save()
   .then(product=>res.json(product))
   .catch(err=>res.json(err))
    
   

});

router.delete('/:id',(req,res)=>{
   let deletedProduct = Product.findByIdAndRemove(req.params.id)
   .then(deleted=>res.json(deleted));
})



module.exports = router;
