import User from '../models/User.js'
import bcrypt from "bcryptjs";

class AuthRepository {
  async registerUser(userData) {
    try {
      const { name, email, password, role, selectedServiceType } = userData;

      if (!name || !email || !password || !role) {
        throw new Error("Please fill all required fields");
      }

      if (role === "provider" && !selectedServiceType) {
        throw new Error("Service type required for provider");
      }

      const userExists = await User.findOne({ email });
      if (userExists) throw new Error("User already exists");

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
        selectedServiceType: role === "provider" ? selectedServiceType : null,
      });

      return user;
    } catch (error) {
      console.log("Something went wrong on repository layer");
      throw new Error("Error creating user: " + error.message);
    }
  }

  async loginUser(email, password) {
    try {
      const user = await User.findOne({ email }).populate(
        "selectedServiceType"
      );
      if (!user) throw new Error("Invalid credentials");

      const isMatch = await bcrypt.compare(password,user.password);
      if (!isMatch) throw new Error("Invalid credentials");

      return user;
    } catch (error) {
      console.log("Something went wrong on repository layer");
      throw new Error("Error creating user: " + error.message);
    }
  }
}

export default AuthRepository;
