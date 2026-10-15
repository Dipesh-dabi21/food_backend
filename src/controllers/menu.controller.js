import MenuItem from '../models/MenuItem.js';import {asyncHandler} from '../utils/asyncHandler.js';
export const getMenu=asyncHandler(async(req,res)=>{const data=await MenuItem.find({isAvailable:true}).sort({category:1,name:1}).lean();res.json({success:true,data});});
