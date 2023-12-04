import { password } from "bun";
import { Schema, InferSchemaType, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: {type: String, required: true},
    email: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    createdAt: { type: Date, default: Date.now },
  },
  {
    methods: {
      speak() {
        console.log(`${this.email}!`);
      },
    },
  }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    this.password = await password.hash(this.password, {
      algorithm: "bcrypt",
      cost: 4, 
    });
  }
  next();
});

userSchema.methods.comparePassword = function(newPassword:string, cb:(error:string| null,result?:boolean)=> void) {
  password.verify(newPassword, this.password, "bcrypt")
    .then((result) => {
      cb(null, result);
    })
    .catch((err: any) => {
      cb(err);
    });
};

export type User = InferSchemaType<typeof userSchema>;
export const User = model('User', userSchema);
