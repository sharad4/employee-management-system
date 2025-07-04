import React from 'react'

const Filters = ({ filters, onFilterChange, onClearFilters }) => {
  return (
    <div className='bg-white p-4 rounded-lg shadow-md mb-6'>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select 
                   value={filters.department}
                    onChange={(e) => onFilterChange('department', e.target.value)}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                    <option value="">All Departments</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Operations">Operations</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                    value={filters.status}
                    onChange={(e) => onFilterChange('status', e.target.value)}
                    className='w-full px-3 py-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                >

                    <option value="">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="On Leave">On Leave</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Salary Range</label>
                <select
                    value={filters.salaryRange}
                    onChange={(e) => onFilterChange('salaryRange', e.target.value)}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                    <option value="">All Ranges</option>
                    <option value="0-50000">$0 - $50,000</option>
                    <option value="50000-70000">$50,000 - $70,000</option>
                    <option value="70000-90000">$70,000 - $90,000</option>
                    <option value="90000+">$90,000+</option>
                </select>
            </div>
            <div className="flex items-end">
                <button
                    onClick={onClearFilters}
                    className='w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300'
                >
                    Clear Filters
                </button>
            </div>
        </div>
    </div>
  );
};

export default Filters;