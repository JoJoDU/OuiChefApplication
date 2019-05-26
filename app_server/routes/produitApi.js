var express = require('express');
var router = express.Router();
var fs = require('fs');
var AWS = require('aws-sdk');
AWS.config.loadFromPath('config.json');
var Product = require('../models/product');
var produitJson = {
   "Get/Post  tous les produits et le prix":"/produitApi/produit",
   "Get/Put/Delete produit avec son nom":"/produitApi/produit:produitTitle"
};
/* GET produit page. */
router.get('/', function(req, res, next) {
   res.send(produitJson);
});

router.route('/produit')
   .get(function(req,res){
      Product.scan().exec(function (err, data) {
         if(err){
            res.send(err);
         }else{
            for(var i=0; i<data.count;i++){
               console.log(data.count);
               console.log(data[i].price);
            }
            res.send(data);
         }
       });
   })
   .post(function(req,res){
 
         var product = new Product();
         product.title = req.body.title;
         product.price = req.body.price;
  
         product.save(req.body,function(err){
            if (err){
               res.send(err);
             } 
             res.json({ message: 'Produit a créé!' });
         })
  
   })

   router.route('/produit/:produitTitle')
      .get(function(req,res){
         console.log(req.params.produitTitle);
         Product.get({"title":req.params.produitTitle},function(err,data){
            if(err){
               res.send(err);
            }else
            res.send(data);
         })
      })
      
      .put(function(req,res){
         console.log(req.params.produitTitle);

        Product.get(req.params.produitTitle,function(err,product){
           if(err)
              res.send(err);

              product.price = req.body.price;
              product.save(req.body,function(err){
               if (err){
                  res.send(err);
                }else{ 
                res.json({ message: 'Produit a renouvellé!' });
               }
            })
        })
         
      })

      .delete(function(req,res){
         Product.delete(req.params.produitTitle,function(err,data){
            if(err){
               res.send(err);
            }
            res.json({ message: 'Produit a supprimé!' });
         })
      })

module.exports = router;
