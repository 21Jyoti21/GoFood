const express = require('express');
const router = express.Router();
const Order=require('../models/Orders')

router.post('/orderData', async (req, res) => {
    let data = req.body.order_data
    // await data.splice(0,0,{Order_date:req.body.order_date})
    const currentDateTime = new Date(); // current date and time
await data.splice(0, 0, {
    Order_date: currentDateTime.toLocaleDateString(), // e.g. "22/09/2025"
    Order_time: currentDateTime.toLocaleTimeString(), // e.g. "19:30:45"
});

    // console.log("1231242343242354",req.body.email)

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'email': req.body.email })    
    console.log(eId)
    if (eId===null) {
        try {
            console.log(data)
            console.log("1231242343242354",req.body.email)
            await Order.create({
                email: req.body.email,
                order_data:[data]
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }
    }

    else {
        try {
            await Order.findOneAndUpdate({email:req.body.email},
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})
router.post('/myOrderData', async (req, res) => {
  try {
    let myData = await Order.findOne({ email: req.body.email });
    res.json({ orderData: myData });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Server Error", message: error.message });
  }
});
module.exports = router;