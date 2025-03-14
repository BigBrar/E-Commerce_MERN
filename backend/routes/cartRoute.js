import express from 'express'
import { addToCart, updateCart, getCart } from '../controllers/cartController.js'
import authUser from '../middleware/auth.js';

const cartRouter = express.Router();

cartRouter.post('/get', authUser,getCart)
cartRouter.post('/update', authUser,updateCart)
cartRouter.post('/add', authUser,addToCart)


export default cartRouter;