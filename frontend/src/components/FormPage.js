import React from 'react';
import { useParams } from 'react-router-dom';
import EmployeeForm from './EmployeeForm';

const FormPage = () => {
  const { eid } = useParams(); // Fetch `eid` from the URL


  return (
    <div>
      <EmployeeForm employeeId={eid} />
    </div>
  );
};

export default FormPage;