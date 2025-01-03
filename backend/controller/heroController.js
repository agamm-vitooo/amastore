import * as heroServices from '../services/heroServices.js';

// Ambil Hero Section
export const getHeroSection = async(req, res) => {
    try {
        const heroSection = await heroServices.getHeroSection();
        if (!heroSection) {
            return res.status(404).json({ message: 'Hero Section not found' });
        }
        res.status(200).json(heroSection);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const createHeroSection = async(req, res) => {
    const { title, description, imageUrl, ctaButtonText, ctaButtonLink } = req.body;

    // Cek jika body tidak ada atau tidak sesuai
    if (!req.body || !title || !description || !imageUrl || !ctaButtonText || !ctaButtonLink) {
        return res.status(400).json({ message: 'All fields are required: title, description, imageUrl, ctaButtonText, and ctaButtonLink.' });
    }

    const data = { title, description, imageUrl, ctaButtonText, ctaButtonLink };

    try {
        const createdHeroSection = await heroServices.createHeroSection(data);
        res.status(201).json(createdHeroSection); // Respons dengan status 201 Created
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Perbarui Hero Section
export const updateHeroSection = async(req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    try {
        const updatedHeroSection = await heroServices.updateHeroSection(id, updatedData);
        res.status(200).json(updatedHeroSection);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Hapus Hero Section
export const deleteHeroSection = async(req, res) => {
    const { id } = req.params;

    try {
        await heroServices.deleteHeroSection(id);
        res.status(200).json({ message: 'Hero Section deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};