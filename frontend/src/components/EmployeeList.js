import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const EmployeeList = () => {
  const { axiosInstance } = useAuth();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');  
  const [errorMessage, setErrorMessage] = useState('');  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async () => {
    setLoading(true);
    setErrorMessage(''); 
    setEmployees([]);  
  
    try {
      const query = searchQuery.trim();
      let url = '/employees';  
  
      if (query) {
        url = `/employees/search?query=${query}`; 
      }
  
      const response = await axiosInstance.get(url);
      setEmployees(response.data); 
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setErrorMessage('No employees found for the given query.');
        setEmployees([]); 
      } else {
        setErrorMessage('An error occurred while fetching employees.');
      }
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    if (!searchQuery) {
      setLoading(true);
      setErrorMessage('');
      setEmployees([]);
      axiosInstance.get('/employees')
        .then(response => setEmployees(response.data))
        .catch(error => setErrorMessage('Failed to load employees'))
        .finally(() => setLoading(false));
    }
  }, [searchQuery, axiosInstance]);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="container mt-4">
      <div className="card">
            <div className="card-header bg-dark text-light d-flex justify-content-between align-items-center">
              <h2>Employee List</h2>
            </div>


      <div className="m-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search by department/position"
          />
          <button onClick={handleSearchSubmit} className="btn btn-primary">Search</button>
        </div>
      </div>


      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}


      {employees.length > 0 ? (
        <table className="table table-striped">
          <thead className='bg-dark text-light'>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id}>
                <td>{`${employee.first_name} ${employee.last_name}`}</td>
                <td>{employee.email}</td>
                <td>{employee.position}</td>
                <td>{employee.department}</td>
                <td>
                  <Link to={`/employees/${employee._id}`} className="btn btn-primary btn-sm me-2">View</Link>
                  <Link to={`/employees/edit/${employee._id}`} className="btn btn-warning btn-sm">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No employees found.</p>
      )}
    </div>
    </div>
  );
};

export default EmployeeList;
