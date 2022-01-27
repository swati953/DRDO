const express = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const Cart = require('../models/Cart');

//Route 1:fetching all notes from login user /api/notes/fetchallnotes


router.get('/fetchcartitem', fetchuser, async(req, res) => {
    try {
        const notes = await Cart.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error arise");
    }
})


router.post('/additemtocart', fetchuser, [
    body('itemId', 'enter a valid Item id'),
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
        const { itemName, itemQuantity, itemId } = req.body;

        const note = new Cart({
            user: req.user.id,
            itemId,
            itemName,
            itemQuantity,
        })
        const saveNote = await note.save();
        res.json(saveNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error arise");
    }
})

//Route 4:deletng an existing notes into current login user /api/notes/deletenote
router.delete('/deleteItemFromCart/:id', fetchuser, async(req, res) => {
        //finding the notes to be deleetd and deleetd them too
        try {
            let note = await Cart.findById(req.params.id);
            if (!note) { return res.status(404).send("Not found") }
            //checking is the user is authenticate or not "koi aur aka ni delete krde"!!
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowded")
            }
            note = await Cart.findOneAndDelete({ "_id": req.params.id })
            res.json({ note: note, "success": "Note has been deletd" });
        } catch (error) {
            console.error(error.message);
            res.status(500).send("some error arise");
        }

    })
    //upadting item route:3 /api/store/updateitem
router.put('/updateCartItem/:id', fetchuser, async(req, res) => {
    const { itemName, itemQuantity, itemId } = req.body;
    //creating a new object to save them 
    try {
        const newNote = {};
        if (itemName) { newNote.itemName = itemName };
        if (itemQuantity) { newNote.itemQuantity = itemQuantity };

        //finding the notes to be upadted and upadte them too
        let note = await Cart.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found") }
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowded")
        }
        note = await Cart.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error arise");
    }

})
module.exports = router;