import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required:[true, "Please enter a valid password"],
        minLength:[6, "Password must not be less than 6 characters"]
    },
    roles: {
        type: [String],
        default: ["Employee"]  
    },
    active: {
        type: Boolean,
        default: true
    },
},
{ timestamps: true },
);

// encrypt password every time you access it before saving it to dB
// userSchema.pre('save', async function (next) {
//     const user = this;
//     if (!user.isModified('password')) {
//         return next();
//     }
//     // encrypt password
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(user.password, salt);
//     user.password = hashedPassword;
//     next();
// });

export default mongoose.model('User', userSchema);