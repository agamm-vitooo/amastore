// src/routes/testimonialRoutes.js

import express from 'express';
import { getTestimonials } from '../controller/testimonialController.js';

const router = express.Router();

router.get('/', getTestimonials);

export default router;