import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, 'First name is required.']
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required.']
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'Email is required.'],
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required.']
        },
        status: {
            type: String,
            required: [true, 'Status is required.'],
            enum: ['active', 'inactive'],
            default: 'active',
        },
        role: {
            type: String,
            required: [true, 'Role is required.'],
            enum: ['admin', 'user'],
            default: 'user',
        }
    }, {
        timestamps: true
    }
);

userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            next()
        } else {
            this.password = await bcrypt.hash(this.password, 10);
            next()
        }
    } catch (error) {
        throw error.message;
    }
});

userSchema.plugin(uniqueValidator)
const User = model('User', userSchema);

export default User;