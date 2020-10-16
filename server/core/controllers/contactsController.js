const contactModel = require('../models/contacts');

const requiredFields = ["first_name", "last_name", "email", "phone", "mobile", "company_name", "contact_name", "contact_type", "recievables", "payables"];

const getAll = function(){
    try{
        return contactModel.getAll();
    }
    catch(err){
        throw err;
    }
};

const insertOne = function(contact){
    try{
        //model validations
        if(!contact) throw {name: 'validationError', message: 'contact null or undefined', status: 400}; //null check
        if(typeof contact !== 'object') throw {name: 'validationError', message: 'contact null or undefined', status: 400}; //shallow object check
        requiredFields.forEach(requiredField => {
            if(contact[requiredField] == null) throw {name: 'validationError', message: 'following field: ' + requiredField + ' not supplied', status: 400};
        });

        const insertId = contactModel.insertOne(contact);
        return insertId;

    }
    catch(err){
        throw err;
    }
}

module.exports = {
    getAll,
    insertOne,
}