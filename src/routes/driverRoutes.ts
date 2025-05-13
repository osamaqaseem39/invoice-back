import express from 'express';
import {
  getDrivers,
  getDriver,
  createDriver,
  updateDriver,
  deleteDriver
} from '../controllers/driverController';

const router = express.Router();

// GET all drivers
router.get('/', getDrivers);

// GET single driver
router.get('/:id', getDriver);

// POST new driver
router.post('/', createDriver);

// PUT update driver
router.put('/:id', updateDriver);

// DELETE driver
router.delete('/:id', deleteDriver);

export default router; 