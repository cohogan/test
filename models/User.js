import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    nickname: { type: String, required: true },
    name: { type: String, required: true },
    picture: { type: String, required: true },
    updated_at: { type: Date, required: true },
    email: { type: String, required: true },
    email_verified: { type: Boolean, required: true },
    sub: { type: String, required: true, unique: true },
    sid: { type: String, required: true, unique: true },
  },
  { timestamps: {createdAt: 'created_at'} }
);

export default models.User || model("User", UserSchema);
