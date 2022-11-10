import mongoose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'


import users from './data/users.js'
import products from './data/products.js'

import User from './models/userModel.js'
import Product from './models/productModel.js'

import connectDB from './config/db.js'


dotenv.config()
connectDB()

const importData = async () => {
    try {

        //const createdUsers = await User.insertMany(users)
        const adminUser = await User.findOne({ isAdmin: true })
        console.log(`${adminUser}`.blue.inverse)

        
        
        const sampleProducts = products.map(p =>{
            return {...p, user:adminUser}        
        } )        // 
        await Product.insertMany(sampleProducts)

        console.log('Data imported successfully'.green.inverse)

    } catch (error) {
        console.log(`error: ${error}`.red.inverse)
    } finally {
        exit()
    }


}
const destroyData = async () => {
    try {
        // await User.deleteMany({})
        await Product.deleteMany({})
        console.log('Data destroyed successfully'.red.inverse)
    } catch (error) {
        console.log(error)
    } finally {
        exit()
    }
}
const exit = () => {
    console.log(`Exiting...`.red.inverse)
    process.exit()
}

if(process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}