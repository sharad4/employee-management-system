import React, { useState } from 'react'

const EmployeeForm = ({ employee, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState({
        name: employee?.name || '',
        email: employee?.email || '',
        department: employee?.department || '',
        position: employee?.position || '',
        salary: employee?.salary || '',
        hireDate: employee?.hireDate || '',
        status: employee?.status || 'Active',
        phone: employee?.phone || '',
        address: employee?.address || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };


    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.value]: e.target.value }));
    };
    
  return (
    <div>EmployeeForm</div>
  )
}

export default EmployeeForm