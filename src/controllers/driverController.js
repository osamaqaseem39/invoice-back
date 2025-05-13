"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDriver = exports.updateDriver = exports.createDriver = exports.getDriver = exports.getDrivers = void 0;
const Driver_1 = __importDefault(require("../models/Driver"));
// Get all drivers
const getDrivers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const drivers = yield Driver_1.default.find().sort({ name: 1 });
        res.status(200).json(drivers);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching drivers', error });
    }
});
exports.getDrivers = getDrivers;
// Get single driver
const getDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driver = yield Driver_1.default.findById(req.params.id);
        if (!driver) {
            res.status(404).json({ message: 'Driver not found' });
            return;
        }
        res.status(200).json(driver);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching driver', error });
    }
});
exports.getDriver = getDriver;
// Create new driver
const createDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, phone } = req.body;
        const driver = new Driver_1.default({ name, phone });
        const savedDriver = yield driver.save();
        res.status(201).json(savedDriver);
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating driver', error });
    }
});
exports.createDriver = createDriver;
// Update driver
const updateDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, phone } = req.body;
        const driver = yield Driver_1.default.findByIdAndUpdate(req.params.id, { name, phone }, { new: true });
        if (!driver) {
            res.status(404).json({ message: 'Driver not found' });
            return;
        }
        res.status(200).json(driver);
    }
    catch (error) {
        res.status(500).json({ message: 'Error updating driver', error });
    }
});
exports.updateDriver = updateDriver;
// Delete driver
const deleteDriver = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const driver = yield Driver_1.default.findByIdAndDelete(req.params.id);
        if (!driver) {
            res.status(404).json({ message: 'Driver not found' });
            return;
        }
        res.status(200).json({ message: 'Driver deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting driver', error });
    }
});
exports.deleteDriver = deleteDriver;
