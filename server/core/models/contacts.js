const fs = require('fs');
const path = require("path");

const contactPath = path.resolve(__dirname, '../../contacts.json');


let lastInsertedId = 0;

//using sync calls instead of async
const getAll = () => {
    try{
        const rawData = fs.readFileSync(contactPath);
        return JSON.parse(rawData);
    }
    catch(err){
        throw err;
    }
};

const insertOne = (contact) => {
    try{
        if(!contact.currency_code) contact.currency_code = "INR";
        const rawData = getAll();
        const id = rawData.length + 1
        contact.id = id;
        contact.created_time = new Date().toISOString();
        contact.last_modified_time = null;
        rawData.push(contact);

        fs.writeFileSync(contactPath, JSON.stringify(rawData), {flag: 'w'});
        return id;
    }
    catch(err){
        throw err;
    }
}

module.exports = {
    getAll,
    insertOne,
}

