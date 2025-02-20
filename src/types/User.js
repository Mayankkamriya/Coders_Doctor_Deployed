import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  id: {type: String},
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
