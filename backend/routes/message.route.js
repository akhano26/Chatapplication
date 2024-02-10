import express from 'express'
import { messagesend } from '../controllers/message.controller.js';
import protectRouter from '../middleware/protectroute.js';
import { getUserMessages } from '../controllers/message.controller.js';
const messagerouter=express.Router();


messagerouter.get('/:id',getUserMessages)
messagerouter.post('/send/:id',protectRouter,messagesend)

export default messagerouter