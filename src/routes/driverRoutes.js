"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const driverController_1 = require("../controllers/driverController");
const router = express_1.default.Router();
// GET all drivers
router.get('/', driverController_1.getDrivers);
// GET single driver
router.get('/:id', driverController_1.getDriver);
// POST new driver
router.post('/', driverController_1.createDriver);
// PUT update driver
router.put('/:id', driverController_1.updateDriver);
// DELETE driver
router.delete('/:id', driverController_1.deleteDriver);
exports.default = router;
