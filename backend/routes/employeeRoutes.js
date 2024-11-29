const express = require('express');
const { body, param, validationResult } = require('express-validator');
const {
    getEmployees,
    createEmployee,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    searchEmployees
} = require('../controllers/employeeController');
const authenticateJWT = require('../middleware/authMiddleware'); // JWT authentication middleware
const router = express.Router();

// Protect all employee routes with JWT
router.use(authenticateJWT);

router.get('/search', searchEmployees);
// Validation for creating a new employee
router.post(
    '/',
    [
        body('first_name').notEmpty().withMessage('First name is required'),
        body('last_name').notEmpty().withMessage('Last name is required'),
        body('email').isEmail().withMessage('Invalid email format'),
        body('position').notEmpty().withMessage('Position is required'),
        body('salary').isNumeric().withMessage('Salary must be a number'),
        body('date_of_joining').isISO8601().toDate().withMessage('Invalid date of joining'),
        body('department').notEmpty().withMessage('Department is required'),
    ],
    createEmployee // Call the controller method
);

// Validation for getting employee by ID
router.get(
    '/:eid',
    [
        param('eid').isMongoId().withMessage('Invalid employee ID format'), // Validate employee ID format
    ],
    getEmployeeById
);


// Validation for updating employee by ID
router.put(
    '/:eid',
    [
        param('eid').isMongoId().withMessage('Invalid employee ID format'), // Validate employee ID
        body('position').optional().notEmpty().withMessage('Position must not be empty'),
        body('salary').optional().isNumeric().withMessage('Salary must be a number'),
    ],
    updateEmployee
);

// Route to delete employee by ID
router.delete('/', deleteEmployee); // No validation necessary for delete

// Route to get all employees
router.get('/', getEmployees);

module.exports = router;