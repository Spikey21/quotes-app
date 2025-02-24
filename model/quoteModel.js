const { ObjectId } = require("mongodb")
const mongoSinleton = require("../data/mongoDBSingleton")
const ObjectId = require("mongodb").ObjectId

function saveAll(quotes) {
    return new Promise (async (resolve, reject) => {
        const collection = await mongoSinleton.getCollection()
        const result = await collection.insertMany(quotes)
        if (result.insertedCount) {
            resolve(result)
        } else {
            reject("couldnt save quotes")
        }
    })
}

function getAll() {
    return new Promise (async (resolve, reject) => {
        const collection = await mongoSinleton.getCollection()
        const cursor = collection.find()
        const result = await cursor.toArray()
        if (result.length>0) {
            resolve(result)
        } else {
            reject("couldnt get quotes")
        }
    })
}

function getById(id) {
    return new Promise (async (resolve, reject) => {
        const collection = await mongoSinleton.getCollection()
        const result = await collection.findOne({_id: ObjectId(id)})
        if (result) {
            resolve(result)
        } else {
            reject("couldnt get quote by Id" + id)
        }
    })
}
module.exports = {
    getAll,
    getById,
    saveAll
}