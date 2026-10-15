import mongoose from 'mongoose';
const orderItemSchema=new mongoose.Schema({menuItem:{type:mongoose.Schema.Types.ObjectId,ref:'MenuItem'},name:{type:String,required:true,trim:true},price:{type:Number,required:true,min:0},quantity:{type:Number,required:true,min:1,max:50}},{_id:false});
const orderSchema=new mongoose.Schema({customer:{name:{type:String,required:true,trim:true,maxlength:100},phone:{type:String,required:true,trim:true,maxlength:18},address:{type:String,required:true,trim:true,maxlength:500}},items:{type:[orderItemSchema],validate:v=>v.length>0},total:{type:Number,required:true,min:0},status:{type:String,enum:['Order Received','Preparing','Out for Delivery','Delivered','Cancelled'],default:'Order Received'},statusHistory:[{status:String,changedAt:{type:Date,default:Date.now}}]},{timestamps:true});
orderSchema.index({createdAt:-1});orderSchema.index({status:1,createdAt:-1});
export default mongoose.model('Order',orderSchema);
