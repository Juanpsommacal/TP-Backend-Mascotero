import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 30,
        minlength: 2,
        trim: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 100,
        minlength: 2,
        trim: true,
        lowercase: true,
    },
    price: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
});

productSchema.plugin(mongoosePaginate);

export default mongoose.model("products", productSchema);