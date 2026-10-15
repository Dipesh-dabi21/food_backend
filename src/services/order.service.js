import MenuItem from '../models/MenuItem.js';
import Order from '../models/Order.js';
import {emitOrderUpdated} from '../socket.js';
export async function createOrder(input){const items=[];let total=0;for(const requested of input.items){let source;if(requested.menuItem){source=await MenuItem.findById(requested.menuItem);if(!source||!source.isAvailable){const e=new Error(`Menu item unavailable: ${requested.name}`);e.statusCode=400;throw e;}}else{source=await MenuItem.findOne({name:requested.name,isAvailable:true});if(!source){const e=new Error(`Unknown menu item: ${requested.name}`);e.statusCode=400;throw e;}}
const price=source.price;items.push({menuItem:source._id,name:source.name,price,quantity:requested.quantity});total+=price*requested.quantity;}
const order=await Order.create({customer:input.customer,items,total,status:'Order Received',statusHistory:[{status:'Order Received'}]});return order;}
export async function updateStatus(id,status){const order=await Order.findById(id);if(!order){const e=new Error('Order not found');e.statusCode=404;throw e;}order.status=status;order.statusHistory.push({status,changedAt:new Date()});await order.save();emitOrderUpdated(order);return order;}
