import React, { useState, useEffect } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const EmployeeForm = ({ employeeId }) => {
    const { axiosInstance } = useAuth();
    const [employee, setEmployee] = useState({
        first_name: '',
        last_name: '',
        email: '',
        position: '',
        salary: '',
        date_of_joining: '',
        department: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (employeeId) {
            const fetchEmployee = async () => {
                try {
                    const response = await axiosInstance.get(`/employees/${employeeId}`);
                    const emp_data = response.data;
                    emp_data.date_of_joining = emp_data.date_of_joining.split('T')[0];
                    setEmployee(emp_data);
                } catch (error) {
                    console.error('Error fetching employee:', error);
                }
            };
            fetchEmployee();
        }
    }, [employeeId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({
            ...employee,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (employeeId) {
                await axiosInstance.put(`/employees/${employeeId}`, employee);
            } else {
                const response = await axiosInstance.post('/employees', employee);
                employeeId = response.data.employee_id
            }
            navigate(`/employees/${employeeId}`);
        } catch (error) {
            console.error('Error saving employee:', error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="card">
                <div className="card-header bg-dark text-light d-flex justify-content-between align-items-center">
                    <h2>{employeeId ? 'Edit' : 'Add'} Employee</h2>
                </div>
                <div className="card-body">

                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label">First Name:</label>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={employee.first_name}
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Last Name:</label>
                                <input
                                    type="text"
                                    name="last_name"
                                    value={employee.last_name}
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={employee.email}
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Position:</label>
                                <input
                                    type="text"
                                    name="position"
                                    value={employee.position}
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label">Salary:</label>
                                <input
                                    type="number"
                                    name="salary"
                                    value={employee.salary}
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                />
                            </div>

                            <div className="col-md-6">
                                <label className="form-label">Date of Joining:</label>
                                <input
                                    type="date"
                                    name="date_of_joining"
                                    value={employee.date_of_joining}
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label">Department:</label>
                                <input
                                    type="text"
                                    name="department"
                                    value={employee.department}
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary">
                            {employeeId ? 'Update' : 'Add'} Employee
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EmployeeForm;