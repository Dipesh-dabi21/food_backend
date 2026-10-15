import {z} from 'zod';
export const createOrderSchema=z.object({customer:z.object({name:z.string().trim().min(2).max(100),phone:z.string().trim().regex(/^[0-9+() -]{8,18}$/),address:z.string().trim().min(8).max(500)}),items:z.array(z.object({menuItem:z.string().optional(),name:z.string().trim().min(1).max(150),price:z.number().nonnegative().optional(),quantity:z.number().int().min(1).max(50)})).min(1).max(30)});
export const statusSchema=z.object({status:z.enum(['Order Received','Preparing','Out for Delivery','Delivered','Cancelled'])});
export function parse(schema,data){const result=schema.safeParse(data);if(!result.success){const e=new Error(result.error.issues.map(i=>`${i.path.join('.')}: ${i.message}`).join('; '));e.statusCode=400;throw e;}return result.data;}
