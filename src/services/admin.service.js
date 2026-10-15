import bcrypt from 'bcryptjs';
import Admin from '../models/Admin.js';
export async function initializeAdmin(){const email=process.env.ADMIN_EMAIL?.trim().toLowerCase(),password=process.env.ADMIN_PASSWORD;if(!email||!password)throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD are required');if(password.length<12)throw new Error('ADMIN_PASSWORD must be at least 12 characters');const existing=await Admin.findOne({email});if(!existing){const passwordHash=await bcrypt.hash(password,12);await Admin.create({email,passwordHash,role:'admin'});console.log(`Initial admin created for ${email}`);}}
