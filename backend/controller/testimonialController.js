// src/controllers/testimonialController.js

import { getAllTestimonials } from '../services/testimonialService.js';

export const getTestimonials = async(req, res) => {
    try {
        const testimonials = await getAllTestimonials();
        res.json(testimonials);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching testimonials' });
    }
};