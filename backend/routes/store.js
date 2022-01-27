const express = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Store = require('../models/Store');
const Cart = require('../models/Cart');
//Route 1:fetching all notes from login user /api/notes/fetchallnotes


router.get('/fetchallitems', fetchuser, async(req, res) => {
    try {
        const notes = await Store.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error arise");
    }
})

//adding item in store /api/store/additem
router.post('/additem', fetchuser, [
        body('itemName', 'enter a valid Item name').isLength({ min: 3 }),
        body('itemQuantity', 'enter a valid Item Quantuty').isLength({ min: 1 }),
    ], async(req, res) => {

        try {
            // if there is any error 
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            //  if there is no any error now use the desctructing concepyt of JS
            const { itemName, itemQuantity } = req.body;
            if (req.user.id === "616ff42252afeb357dc6df45") {
                const storeitem = new Store({
                    itemName,
                    itemQuantity,
                })
                const saveNote = await storeitem.save();
                res.json(saveNote);
            } else {
                res.json("only Admin can add ");
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).send("some error arise");
        }
    })
    //upadting item route:3 /api/store/updateitem
router.put('/updateitem/:id', fetchuser, async(req, res) => {
    const { itemName, itemQuantity } = req.body;
    //creating a new object to save them 
    try {
        const newNote = {};
        if (itemName) { newNote.itemName = itemName };
        if (itemQuantity) { newNote.itemQuantity = itemQuantity };
        //finding the notes to be upadted and upadte them too
        let note = await Store.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found") }
        if (req.user.id === "616ff42252afeb357dc6df45") {
            note = await Store.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
            let note1 = await Cart.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
            res.json(note);
        } else {
            res.json("Not allowded");
        }


    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error arise");
    }

})

//Route 4:deletng an existing notes into current login user /api/notes/deletenote
router.delete('/deleteitem/:id', fetchuser, async(req, res) => {
    //finding the notes to be deleetd and deleetd them too
    try {
        let note = await Store.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found") }
        if (req.user.id === "616ff42252afeb357dc6df45") {
            note = await Store.findOneAndDelete({ "_id": req.params.id })
            let note1 = await Cart.findOneAndDelete({ "itemId": req.params.id })
            res.json({ note: note, "success": "item has been deletd" });
        } else {
            res.json({ "ERROR": "only admin can delete items" });
        }
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error arise");
    }

})
module.exports = router;