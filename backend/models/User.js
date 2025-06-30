import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 6 },
    role: { type: String, enum: ["provider", "consumer"], required: true },
    selectedServiceType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ServiceType",
      required: function () {
        return this.role === "provider";
      },
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
// This model defines the User schema with fields for name, email, password, role, and selectedServiceType.
