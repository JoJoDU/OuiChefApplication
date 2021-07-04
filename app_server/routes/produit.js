var express = require('express');
var router = express.Router();
var fs = require('fs');
var AWS = require('aws-sdk');
AWS.config.loadFromPath('config.json');
var Product = require('../models/product.js');
/*GET produit page. */

 var produitApiJson= {
"product list":{"uri":"/produit","method":"GET"},
"add product":{"uri":"/produit","method":"POST"},
"get product with title":{"uri":"/produit/produitTitle","method":"GET"},
"update product with title":{"uri":"/produit/produitTitle","method":"PUT"},
"delete product with title":{"uri":"/produit/produitTitle","method":"DELETE"},
}


router.route('/')
   .get(function(req,res){
      res.send(produitApiJson);
   })
   .post(function(req,res){
 
         var product = new Product();
         product.title = req.body.title;
         product.information = req.body.information;
  
         product.save(req.body,function(err){
            if (err){
               res.send(err);
             } 
             res.json({ message: 'Produit a créé!' });
         })
  
   })

   router.route('/:produitTitle')
      .get(function(req,res){
         console.log(req.params);
         if(req.params.produitTitle == "produit"){
            Product.scan().exec(function (err, data) {
               if(err){
                  res.send(err);
               }else{
                  for(var i=0; i<data.count;i++){
                     console.log(data.count);
                     console.log(data[i].information);
                  }
                  res.send(data);
               }
             });
         }else{
            console.log(req.params.produitTitle);
            Product.get({"title":req.params.produitTitle},function(err,data){
               if(err){
                  res.send(err);
               }else
               res.send(data);
            })
         }
      })
      
      .put(function(req,res){
         console.log(req.params.produitTitle);

        Product.get(req.params.produitTitle,function(err,product){
           if(err)
              res.send(err);

              product.information = req.body.information;
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
