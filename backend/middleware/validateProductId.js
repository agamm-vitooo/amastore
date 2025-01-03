import express from 'express';

const validateProductId = (req, res, next) => {
    const { id } = req.params;
    const numericId = parseInt(id, 10);

    if (isNaN(numericId)) {
        return res.status(400).json({ message: 'Invalid product ID' });
    }

    req.params.id = numericId;
    next();
};

export default validateProductId;