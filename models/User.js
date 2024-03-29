import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Please Enter Your Full Name ",
    },
    email: {
        type: String,
        required: "Please enter Your Email Address",
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: "Please Enter a password"
    },
    role: {
        type: String,
        default: "user",
    },
    image: {
        type: String,
        default: "https://cdn2.vectorstock.com/i/1000x1000/92/16/default-profile-picture-avatar-user-icon-vector-46389216.jpg",
    },
    emailVerified: {
        type: Boolean,
        default: false,
    },
    defaultPaymentMethod: {
        type: String,
        default: "",
    },
    address: [
        {
            firstName: {
                type: String,
            },
            lastName: {
                type: String,
            },
            phoneNumber: {
                type: String,
            },
            address1: {
                type: String,
            },
            address2: {
                type: String,
            },
            city: {
                type: String,
            },
            zipCode: {
                type: String,
            },
            state: {
                type: String,
            },
            country: {
                type: String,
            },
            active: {
                type: Boolean,
                default: false,
            },
        }
    ]

}, {
    timestamps: true,
});

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;