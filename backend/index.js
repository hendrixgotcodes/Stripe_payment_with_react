const cors = require("cors")
const express = require("express")
const stripe =require("stripe")("pk_test_51Jk8K0HGvkwM1PWXTX6rZDn6A1VcxixdZSXkn1cxT8yEbgyP1mvJWeT03TSzgYwtGhOPUvasWy9V7ZG6I1ssxVdb00sZl6IUTy")
const uuid = require("uuid").v4

const app = express()

//middleware
app.use(express.json())
app.use(cors())


//routes
app.get("/", (req, res)=>{
    res.send("works online")
})

app.post("/payment", (req, res)=>{

    const {product, token} = req.body;
    console.log("PRODUCT: ", product);
    console.log("PRICE: ",product.pric);

    const idempontencyKey = uuid()

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then((customer)=>{
        stripe.charges.create({
            amount: product.prec * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: `purchase of ${product.name}`,
            shipping: {
                name: token.card.name,
                address: {
                    country: token.card.address_country
                }
            }
        }, {
            idempontencyKey
        })
        .then((result)=>{
            res.status(200).json(result)
        })
        .catch((err)=>{
            console.log(err);
        })
    })

})

app.listen(8282, ()=>{

    console.log("LISTIENING AT PORT 8282");

})