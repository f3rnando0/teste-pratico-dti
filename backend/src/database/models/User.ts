import { hash } from "bcrypt";
import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    lembretes: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', function(next) {
    const user = this;

    if(!user.isModified('password')) return next();

    hash(user.password, 8, function(err, data) {
        if(err) return next(err);

        user.password = data;
        next();
    })
})

export const User = model("Users", userSchema);
