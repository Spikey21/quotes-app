
const mongoSingleton = require("../data/mongoDBSingleton")
const ObjectId = require("mongodb").ObjectId; 

function saveAll(quotes) {
    return new Promise (async (resolve, reject) => {
        const collection = await mongoSingleton.getCollection()
        const result = await collection.insertMany(quotes)
        if (result.insertedCount) {
            resolve(result)
        } else {
            reject("Couldnt save quotes")
        }
    })
}

function getAll() {
    return new Promise (async (resolve, reject) => {
        const collection = await mongoSingleton.getCollection()
        const cursor = collection.find()
        const result = await cursor.toArray()
        if (result.length>0) {
            resolve(result)
        } else {
            reject("Couldnt get quotes")
        }
    })
}

function getById(id) {
    return new Promise (async (resolve, reject) => {
        const collection = await mongoSingleton.getCollection()
        const result = await collection.findOne({_id: new ObjectId(id)})
        if (result) {
            resolve(result)
        } else {
            reject("Couldnt get quote by Id" + id)
        }
    })
}
module.exports = {
    getAll,
    getById,
    saveAll
}