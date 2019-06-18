//import { SharedIniFileCredentials } from "aws-sdk";


var produit = new Vue({
    el: "#produit",
    data: {
        items: [],
        flag: 0
    },

    created: function () {


        if (localStorage.panier) {
            this.items = JSON.parse(localStorage.panier)
            this.flag = 1
        }

        else
            this.flag = 0
    },
    methods: {
        minus(i) {
            if (this.items[i].number > 0) {

                this.items[i].number--
                let panier = localStorage.panier
                panier = JSON.parse(panier)
                console.log(panier)
                let name = this.items[i].name
                console.log(name)
                for (let item in panier) {
                    console.log(item)
                    if (panier[item].name == name) {
                        panier[item].number--
                    }
                }

                localStorage.panier = JSON.stringify(panier)

            }
        },
        add(i) {

                this.items[i].number++
                let panier = localStorage.panier
                panier = JSON.parse(panier)
                console.log(panier)
                let name = this.items[i].name
                console.log(name)
                for (let item in panier) {
                    console.log(item)
                    if (panier[item].name == name) {
                        panier[item].number++
                    }
                }

                localStorage.panier = JSON.stringify(panier)

        },
        deleteItem(i) {
            let panier = localStorage.panier
            panier = JSON.parse(panier)
            console.log(panier)
            console.log("delete:"+i)
            panier.splice(i,1)
            this.items=panier
            localStorage.panier = JSON.stringify(panier)
        }
    },
    computed: {
        total: function () {
            let items = this.items
            let temp = 0
            for (let item in items) {
                temp += items[item].price * items[item].number
            }
            temp = temp.toFixed(2)
            localStorage.totalPrice = temp
            return temp
        }
    }
})