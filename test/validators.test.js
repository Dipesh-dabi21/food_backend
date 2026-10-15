import test from 'node:test';import assert from 'node:assert/strict';import {createOrderSchema,statusSchema} from '../src/utils/validators.js';
test('accepts a valid order payload',()=>{const result=createOrderSchema.safeParse({customer:{name:'Dipesh Dabi',phone:'+91 9876543210',address:'12 Main Road, Indore'},items:[{name:'Margherita Pizza',quantity:2}]});assert.equal(result.success,true);});
test('rejects empty order items',()=>{const result=createOrderSchema.safeParse({customer:{name:'Dipesh',phone:'9876543210',address:'12 Main Road'},items:[]});assert.equal(result.success,false);});
test('rejects invalid status',()=>{assert.equal(statusSchema.safeParse({status:'Flying'}).success,false);});
