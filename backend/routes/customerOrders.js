const express = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const CustomerOrders = require('../models/CustomerOrders')

//add 
router.post('/addOrder', fetchuser, [
        body('customerId', 'enter a valid customer Item id'),
        body('customerName', 'enter a valid customerName name'),
        body('customerItemId', 'enter a valid customerItemId '),
        body('customerItemIname', 'enter a valid customerItemIname '),
        body('customerItemQuantity', 'enter a valid customerItemQuantity '),

    ], async(req, res) => {

        try {
            // if there is any error 
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            //  if there is no any error now use the desctructing concepyt of JS
            const { customerId, customerName, customerItemId, customerItemIname, customerItemQuantity } = req.body;

            const note = new CustomerOrders({
                user: req.user.id,
                customerId,
                customerName,
                customerItemId,
                customerItemIname,
                customerItemQuantity
            })
            const saveNote = await note.save();
            res.json(saveNote);
        } catch (error) {

            console.error(error.message);
            res.status(500).send("some error arise");
        }
    })
    //update status field by admin
router.put('/updateCustomerOrders/:id', fetchuser, async(req, res) => {
    const { status } = req.body;
    //creating a new object to save them 
    try {
        let status1;
        if (status) { status1 = status };


        //finding the notes to be upadted and upadte them too
        let note = await CustomerOrders.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found") }
        if (req.user.id !== "62c47bd643624664e6ecdc13") {
            return res.status(401).send("Not Allowded")
        }
        note = await CustomerOrders.findByIdAndUpdate(req.params.id, { $set: { status: status1 } })
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error arise");
    }

})
router.delete('/deleteCustomerOrders/:id', fetchuser, async(req, res) => {
    //finding the notes to be deleetd and deleetd them too
    try {
        let note = await CustomerOrders.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found") }
        if (req.user.id === "62c47bd643624664e6ecdc13") {
            note = await CustomerOrders.findOneAndDelete({ "_id": req.params.id })
                // let note1 = await CustomerOrders.findOneAndDelete({ "itemId": req.params.id })
            res.json({ note: note, "success": "item has been deletd" });
        } else {
            res.json({ "ERROR": "only admin can delete items" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error arise");
    }

})
router.get('/fetchMyOrders', fetchuser, async(req, res) => {
    try {
        const notes = await CustomerOrders.find({ customerId: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error arise");
    }
})
router.get('/fetchCustomerOrders', fetchuser, async(req, res) => {
    try {
        const notes = await CustomerOrders.find();
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error arise");
    }
})
module.exports = router;