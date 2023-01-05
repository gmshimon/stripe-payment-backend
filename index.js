const express  = require('express')
const app = express();
const port = 5000;
const cors = require('cors');

app.use(cors());
app.use(express.json())

const stripe = require("stripe") ('sk_test_51MMQcGDknvLebi91i2QfdPbopu4IknXtSDaZoUevRjmOkkdSeaIUBfFG1kDmI56G7bFxNWeGOw07VHU2YnLr5HhB00OnhquAap')

async function run(){
    try {
        app.get('/',async(req,res)=>{
            res.send("Hello world")
        })

        app.post('/create-payment-intent',async(req,res)=>{
            const price = 1000;
            const paymentIntent = await stripe.paymentIntents.create({
                amount:price,
                currency:'usd',
                automatic_payment_methods:{
                    enabled:true
                }
            })
            console.log({
                clientSecret:paymentIntent.client_secret
            })
            res.send({
                clientSecret:paymentIntent.client_secret
            })
        })

        app.listen(port,()=>{
            console.log('Listening to port',port)
        })
    } finally{
        
    }
}
run().catch(console.dir)