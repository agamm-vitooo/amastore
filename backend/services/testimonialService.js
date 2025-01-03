// src/services/testimonialService.js

import prisma from '../prismaClient.js';

export const getAllTestimonials = async() => {
    return await prisma.testimonial.findMany();
};