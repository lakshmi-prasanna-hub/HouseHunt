import express from 'express';
import { addProperty, getProperties } from '../controllers/property.js';

const router = express.Router();

router.post('/', addProperty);
router.get('/', getProperties);

export default router;