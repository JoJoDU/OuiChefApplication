var recette = new Vue({
    el: '#recette',
    data: {
        ingredient: [],
        preparation: [],
        newIngredient: "",
        newPreparation: "",
        newQuantite: "",
        nextIngredientId: 0,
        nextPreparationId: 1,
        nombre: 0,
        title:"",
        type:"",
        calories:""
    },
    methods: {
        addNewIngredient: function () {
            if (this.newIngredient && this.newQuantite) {
                this.ingredient.push({
                    title: this.newIngredient,
                    quantite: this.newQuantite
                })
                this.newIngredient = ''
                this.newQuantite = ''
                this.nombre = this.ingredient.length
            } else {
                alert("Le nom et la quantité des ingrédients sont nécessaires")
            }

        },
        annulerIngredient: function (index) {
            this.ingredient.splice(index, 1)
            this.nombre = this.ingredient.length
        },
        addNewPreparation: function () {
            if (this.newPreparation) {
                this.preparation.push({
                    id: this.nextPreparationId++,
                    val: this.newPreparation,
                })
                this.newPreparation = ''
            } else {
                alert("La préparation ne peut pas être vide")
            }

        },
        terminer: function () {
            AWS.config.update({
                region: "eu-west-3",
                endpoint: "https://dynamodb.eu-west-3.amazonaws.com",
                accessKeyId: "AKIAJVP25MD64NIN6B4A",
                secretAccessKey: "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"
            });
            var docClient = new AWS.DynamoDB.DocumentClient();
            var item = {}
            item.id = localStorage.nombre
            for (let i in this.ingredient) {
                let title = this.ingredient[i].title
                let quantite = this.ingredient[i].quantite
                item[title] = quantite
            }
            console.log("item: " + item)
            var item2={id:localStorage.nombre,title:this.title,text:this.type+" - "+this.calories}
            var item3={id:localStorage.nombre}
            for (let i=1;i<this.preparation.length+1;i++) {
             item3[i]=this.preparation[i-1].val
            }
            var params = {
                TableName: "recette",
                Item: item
            };
            docClient.put(params, function (err, data) {
                if (err) {
                    console.log(err)
                } else {
                    console.log(data)
                    var params2 = {
                        TableName: "pageRecette",
                        Item: item2
                    };
                    docClient.put(params2, function (err, data) {
                        if (err) {
                            console.log(err)
                        } else {
                            console.log(data)
                            var params3 = {
                                TableName: "Preparation",
                                Item: item3
                            };
                            docClient.put(params3, function (err, data) {
                                if (err) {
                                    console.log(err)
                                } else {
                                    console.log(data)
                                    window.location.href="http://localhost:3000/pageRecette";
                                }
                            });
                        }
                    });
                }
            });


        }
    }
})