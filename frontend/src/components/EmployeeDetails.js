import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const EmployeeDetail = () => {
    const { eid } = useParams();
    const { axiosInstance } = useAuth();
    const [employee, setEmployee] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await axiosInstance.get(`/employees/${eid}`);
                setEmployee(response.data);
                console.log(response.data)
            } catch (err) {
                setError('Error fetching employee details: ' + err.message);
                console.error('Error:', err);
            }
        };

        fetchEmployee();
    }, [eid]);

    const handleDelete = async () => {
        try {
            await axiosInstance.delete('/employees', { params: { eid } });
            window.location.href = '/employees';
        } catch (err) {
            setError('Error deleting employee: ' + err.message);
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!employee) {
        return <h2>Loading...</h2>;
    }

    return (
        <div className="container w-50 mt-4">
          <div className="card">
            <div className="card-header bg-dark text-light d-flex justify-content-between align-items-center">
              <h2>{employee.first_name} {employee.last_name}</h2>
              <div>
                <Link to={`/employees/edit/${employee._id}`} className="btn btn-warning btn-sm me-2">
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="btn btn-danger btn-sm"
                >
                  Delete Employee
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <p><strong>Position:</strong> {employee.position}</p>
                  <p><strong>Email:</strong> {employee.email}</p>
                  <p><strong>Salary:</strong> ${employee.salary}</p>
                  <p><strong>Department:</strong> {employee.department}</p>
                </div>
                <div className="col-md-6">
                  <p><strong>Date of Joining:</strong> {new Date(employee.date_of_joining).toLocaleDateString()}</p>
                  <p><strong>Created At:</strong> {new Date(employee.created_at).toLocaleDateString()}</p>
                  <p><strong>Last Updated:</strong> {new Date(employee.updated_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
      
};

export default EmployeeDetail;