import * as advantageService from '../services/advantageService.js';

// Get all advantages
export async function getAllAdvantages(req, res) {
    try {
        const advantages = await advantageService.getAllAdvantages();
        return res.status(200).json(advantages);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Get a single advantage by ID
export async function getAdvantageById(req, res) {
    const { id } = req.params;
    try {
        const advantage = await advantageService.getAdvantageById(parseInt(id));
        if (advantage) {
            return res.status(200).json(advantage);
        } else {
            return res.status(404).json({ message: "Advantage not found" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Create a new advantage
export async function createAdvantage(req, res) {
    const { iconUrl, title, description } = req.body;
    const data = { iconUrl, title, description };

    try {
        const createdAdvantage = await advantageService.createAdvantage(data);
        return res.status(201).json(createdAdvantage);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Update an advantage
export async function updateAdvantage(req, res) {
    const { id } = req.params;
    const { iconUrl, title, description } = req.body;
    const data = { iconUrl, title, description };

    try {
        const updatedAdvantage = await advantageService.updateAdvantage(parseInt(id), data);
        return res.status(200).json(updatedAdvantage);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

// Delete an advantage
export async function deleteAdvantage(req, res) {
    const { id } = req.params;
    try {
        await advantageService.deleteAdvantage(parseInt(id));
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}