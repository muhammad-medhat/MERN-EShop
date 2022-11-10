import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    title: {type: String, required: true},
    content: { type: String, required: true  },
    rating: { type: Number, required: true    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, { timestamps: true});


const productSchema = new mongoose.Schema({
    user: {
        /**
         * Only Admins can create products
         * Other users can only view products
         */
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
        
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0,
    },
    brand: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    reviews: [reviewSchema],
    rating: {
        /**
         * The average rating of all reviews
         * This is a calculated field
         * there will be a separate schema for reviews
         */
        type: Number,
        required: true,
        default: 0,
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0,
    },




}, { timestamps: true});

const Product = mongoose.model("Product", productSchema);

export default Product;


