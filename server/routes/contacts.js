const express = require('express');
const router = express.Router();

const contactsController = require('../core/controllers/contactsController');

router.route('/').get((req, res, next) => {
    try{
        const data = contactsController.getAll();
        return res.status(200).json({
            status: 1,
            message: 'contacts fetched succesfully',
            data
        });
    }
    catch(err){
        next(err);
    }
    
}).post((req, res, next) => {
    try{
        const {contact} = req.body;
        const insertId = contactsController.insertOne(contact);
        return res.status(200).json({
            status: 1,
            message: 'contact inserted',
            data: {insertId},
        });
    }
    catch(err){
        console.log('err:', err);
        next(err);
    }
});

module.exports = router;