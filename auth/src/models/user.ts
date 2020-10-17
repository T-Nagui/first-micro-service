import mongoose from 'mongoose';
import { Password } from '../services/password';

// interface for user to have strong type for mongo object

interface UserAttrs {
  email: string;
  password: string;
}
// interface for props of user model :
interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}
// interface props of user document (hidden also)
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  // add extra props if we need
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
        //     this.versionKey = false; // to remove version instead of delelte
      },
    },
  },
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

// hack to use interface instead of mongo object :p
userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
