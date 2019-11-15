import mongoose from 'mongoose'

const adminSchema = mongoose.Schema({

    assoc_code: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        default: null
    },
    fullname: {
        type: String,
        required: true,
        default: null
    },
    status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })

export default mongoose.model('admin', adminSchema)