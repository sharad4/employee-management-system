import React from 'react'

const EmployeeDetail = ({ employee }) => {
  return (
   <div className="space-y-6">
    <div className="flex items-center space-x-4">
      <img
        src={employee.avatar}
        alt={employee.name}
        className="w-20 h-20 rounded-full"
      />
      <div>
        <h3 className="text-2xl font-bold text-gray-900">{employee.name}</h3>
        <p className="text-gray-600">{employee.position}</p>
        <p className="text-sm text-gray-500">{employee.department}</p>
      </div>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h4 className="font-semibold text-gray-900 mb-2">Contact Information</h4>
        <div className="space-y-2">
          <p><span className="font-medium">Email:</span> {employee.email}</p>
          <p><span className="font-medium">Phone:</span> {employee.phone}</p>
          <p><span className="font-medium">Address:</span> {employee.address}</p>
        </div>
      </div>
      
      <div>
        <h4 className="font-semibold text-gray-900 mb-2">Employment Details</h4>
        <div className="space-y-2">
          <p><span className="font-medium">Salary:</span> ${employee.salary.toLocaleString()}</p>
          <p><span className="font-medium">Hire Date:</span> {new Date(employee.hireDate).toLocaleDateString()}</p>
          <p><span className="font-medium">Status:</span> 
            <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
              employee.status === 'Active' ? 'bg-green-100 text-green-800' :
              employee.status === 'Inactive' ? 'bg-red-100 text-red-800' :
              'bg-yellow-100 text-yellow-800'
            }`}>
              {employee.status}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
  )
}

export default EmployeeDetail;