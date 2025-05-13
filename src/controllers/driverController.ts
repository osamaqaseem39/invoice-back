import { Request, Response } from 'express';
import Driver from '../models/Driver';

// Get all drivers
export const getDrivers = async (req: Request, res: Response): Promise<void> => {
  try {
    const drivers = await Driver.find().sort({ name: 1 });
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching drivers', error });
  }
};

// Get single driver
export const getDriver = async (req: Request, res: Response): Promise<void> => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) {
      res.status(404).json({ message: 'Driver not found' });
      return;
    }
    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching driver', error });
  }
};

// Create new driver
export const createDriver = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, phone } = req.body;
    const driver = new Driver({ name, phone });
    const savedDriver = await driver.save();
    res.status(201).json(savedDriver);
  } catch (error) {
    res.status(500).json({ message: 'Error creating driver', error });
  }
};

// Update driver
export const updateDriver = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, phone } = req.body;
    const driver = await Driver.findByIdAndUpdate(
      req.params.id,
      { name, phone },
      { new: true }
    );
    if (!driver) {
      res.status(404).json({ message: 'Driver not found' });
      return;
    }
    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ message: 'Error updating driver', error });
  }
};

// Delete driver
export const deleteDriver = async (req: Request, res: Response): Promise<void> => {
  try {
    const driver = await Driver.findByIdAndDelete(req.params.id);
    if (!driver) {
      res.status(404).json({ message: 'Driver not found' });
      return;
    }
    res.status(200).json({ message: 'Driver deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting driver', error });
  }
}; 