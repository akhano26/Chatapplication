
import express from 'express'
import { getUserForSidebar } from '../controllers/user.controller.js';

const userroute=express.Router();

userroute.get('/',getUserForSidebar);


export default userroute
