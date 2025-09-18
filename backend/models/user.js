import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true, minlength: 6 },
  email: { type: String, required: true },
  status: {
    type: String,
    enum: ["client", "employeur"],
    required: true,
  },
  estAbonne: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);
export default User;
