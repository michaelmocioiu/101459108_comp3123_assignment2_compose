const Employee = require('../models/Employee');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

// Get all employees
exports.getEmployees = async (req, res) => {
    const employees = await Employee.find();
    res.status(200).json(employees);
};

// Create a new employee
exports.createEmployee = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Check if employee with the same email already exists
    const existingEmployee = await Employee.findOne({ email: req.body.email });
    if (existingEmployee) {
        return res.status(400).json({ message: 'Employee with this email already exists.' });
    }

    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json({ message: 'Employee created successfully', employee_id: employee._id });
};

//Search endpoint
exports.searchEmployees = async (req, res) => {
    const searchQuery = req.query.query;

    try {
        const employees = await Employee.find({
            $or: [
                { department: { $regex: searchQuery, $options: 'i' } },  // case-insensitive search for first_name
                { position: { $regex: searchQuery, $options: 'i' } },   // case-insensitive search for last_name
            ]
        });

        if (employees.length === 0) {
            return res.status(404).json({ message: 'No employees found' });
        }

        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ message: 'Error searching employees' });
    }
};
// Get employee by ID
exports.getEmployeeById = async (req, res) => {
    // Validate the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { eid } = req.params;

    // Check if eid is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(eid)) {
        return res.status(400).json({ message: 'Invalid employee ID format' });
    }

    try {
        const employee = await Employee.findById(eid);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving employee' });
    }
};


// Update employee by ID
exports.updateEmployee = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.eid, req.body, { new: true });
    if (!updatedEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee details updated successfully', employee: updatedEmployee });
};

// Delete employee by ID
exports.deleteEmployee = async (req, res) => {
    const { eid } = req.query; // Get the employee ID from the query parameters

    try {
        const deletedEmployee = await Employee.findByIdAndDelete(eid); // Use eid from the query
        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json({ message: 'Employee deleted successfully.' });
    } catch (err) {
        console.error('Error:', err); // Log the error for debugging
        res.status(500).json({ message: 'Error deleting employee' });
    }
};

