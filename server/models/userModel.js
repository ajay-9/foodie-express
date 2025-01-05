const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        _id: {
            type: String, // Explicitly define _id as a String
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt timestamps
    }
);

module.exports = mongoose.model("User", userSchema);
