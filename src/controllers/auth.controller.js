import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import { asyncHandler } from "../utils/asyncHandler.js";
export const login = asyncHandler(async (req, res) => {
  const email = String(req.body.email || "")
      .trim()
      .toLowerCase(),
    password = String(req.body.password || "");
  if (!email || !password)
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  const admin = await Admin.findOne({ email });
  if (!admin || !(await bcrypt.compare(password, admin.passwordHash)))
    return res
      .status(401)
      .json({ success: false, message: "Invalid email or password" });
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32)
    throw new Error("JWT_SECRET must be at least 32 characters");
  const token = jwt.sign(
    { sub: admin._id.toString(), role: admin.role, email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "8h" },
  );
  res.json({
    success: true,
    data: { token, admin: { email: admin.email, role: admin.role } },
  });
});
