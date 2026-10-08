import express from 'express';
import { ServiceModel } from '../models/Service.js';

const router = express.Router();

// GET all active services (with optional category filter)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let services;
    if (category) {
      services = await ServiceModel.findByCategory(category);
    } else {
      services = await ServiceModel.findAll(true);
    }

    res.json({
      success: true,
      count: services.length,
      services,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve services catalog.',
      error: err.message,
    });
  }
});

// GET single service by slug or ID
router.get('/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params;
    let service = await ServiceModel.findBySlug(identifier);
    if (!service) {
      service = await ServiceModel.findById(identifier);
    }

    if (!service) {
      return res.status(404).json({ success: false, message: 'Service not found.' });
    }

    res.json({
      success: true,
      service,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving service details.',
      error: err.message,
    });
  }
});

export default router;
