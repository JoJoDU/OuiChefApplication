var express = require('express');
var router = express.Router();
var fs = require('fs');
var AWS = require('aws-sdk');
AWS.config.loadFromPath('config.json');
var Product = require('../models/product');
/*var produitJson = {
   "Obtenir tous les produits et le prix" : "Get/Post/produitApi/produit",
   "Creer un produits et le prix" : "Post /produitApi/produit",
   "Obtenir produit avec son nom" : "Get /produitApi/produit:produitTitle",
   "Renouveller produit avec son nom" : "Put /produitApi/produit:produitTitle",
   "GSupprimer produit avec son nom" : "Delete /produitApi/produit:produitTitle"
};
 GET produit page. */
 var produitApiJson= {
"product list":{"uri":"/produitApi/produit","method":"GET"},
"add product":{"uri":"/produitApi/produit","method":"POST"},
"get product with title":{"uri":"/produitApi/produit:produitTitle","method":"GET"},
"update product with title":{"uri":"/produitApi/produit:produitTitle","method":"PUT"},
"delete product with title":{"uri":"/produitApi/produit:produitTitle","method":"DELETE"},
}
router.get('/', function(req, res, next) {
   res.send(produitApiJson);
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
