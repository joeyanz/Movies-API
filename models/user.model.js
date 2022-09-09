const { Schema, model } = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 30,
    },
    email: {
        type: String,
        required: true,
        validate: [isEmail, "Invalid email address"],
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
});

userSchema.pre("save", async function () {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
});
userSchema.methods.checkPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = model("User", userSchema);
