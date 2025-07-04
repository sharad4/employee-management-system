import React, { useState, useEffect, useMemo } from "react";
import { Download, Plus, Users, Search, Filter } from "lucide-react";
import { generateMockEmployees } from "./data/generateMock";
import EmployeeDetail from './components/EmployeeDetail';
import Filters from './components/Filters';
import EmployeeTable from './components/EmployeeTable';
import Modal from './components/Modal';
import EmployeeForm from './components/EmployeeForm';
import StatCard from './components/StatCard';
import Pagination from './components/Pagination';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    department: '',
    status: '',
    salaryRange: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // 'create', 'edit', 'view'
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  // Initialize mock data
  useEffect(() => {
    const mockData = generateMockEmployees();
    setEmployees(mockData);
    setFilteredEmployees(mockData);
  }, []);

  // Filter and search logic
  useEffect(() => {
    let filtered = employees.filter(employee => {
      const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           employee.department.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = !filters.department || employee.department === filters.department;
      const matchesStatus = !filters.status || employee.status === filters.status;
      
      let matchesSalaryRange = true;
      if (filters.salaryRange) {
        const [min, max] = filters.salaryRange.split('-').map(val => val.replace('+', ''));
        if (max) {
          matchesSalaryRange = employee.salary >= parseInt(min) && employee.salary <= parseInt(max);
        } else {
          matchesSalaryRange = employee.salary >= parseInt(min);
        }
      }
      
      return matchesSearch && matchesDepartment && matchesStatus && matchesSalaryRange;
    });

    // Apply sorting
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredEmployees(filtered);
    setCurrentPage(1);
  }, [employees, searchTerm, filters, sortConfig]);

  // Statistics
  const stats = useMemo(() => {
    const totalEmployees = employees.length;
    const activeEmployees = employees.filter(emp => emp.status === 'Active').length;
    const departments = [...new Set(employees.map(emp => emp.department))].length;
    const avgSalary = employees.reduce((sum, emp) => sum + emp.salary, 0) / employees.length;
    
    return {
      totalEmployees,
      activeEmployees,
      departments,
      avgSalary: Math.round(avgSalary)
    };
  }, [employees]);

  // Pagination
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  // Event handlers
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({ department: '', status: '', salaryRange: '' });
    setSearchTerm('');
  };

  const handleCreateEmployee = (formData) => {
    const newEmployee = {
      id: Math.max(...employees.map(emp => emp.id)) + 1,
      ...formData,
      salary: parseInt(formData.salary),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.name}`
    };
    setEmployees(prev => [...prev, newEmployee]);
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleUpdateEmployee = (formData) => {
    setEmployees(prev => prev.map(emp => 
      emp.id === selectedEmployee.id 
        ? { ...emp, ...formData, salary: parseInt(formData.salary) }
        : emp
    ));
    setIsModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleDeleteEmployee = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      setEmployees(prev => prev.filter(emp => emp.id !== id));
    }
  };

  const handleExportData = () => {
    const csvContent = [
      ['ID', 'Name', 'Email', 'Department', 'Position', 'Salary', 'Status', 'Hire Date'],
      ...filteredEmployees.map(emp => [
        emp.id, emp.name, emp.email, emp.department, emp.position, emp.salary, emp.status, emp.hireDate
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'employees.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const openModal = (type, employee = null) => {
    setModalType(type);
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Employee Management System</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={handleExportData}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              <button
                onClick={() => openModal('create')}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Employee
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Employees"
            value={stats.totalEmployees}
            icon={Users}
            color="#3B82F6"
            trend="+12% from last month"
          />
          <StatCard
            title="Active Employees"
            value={stats.activeEmployees}
            icon={TrendingUp}
            color="#10B981"
            trend="+5% from last month"
          />
          <StatCard
            title="Departments"
            value={stats.departments}
            icon={Calendar}
            color="#8B5CF6"
          />
          <StatCard
            title="Average Salary"
            value={`$${stats.avgSalary.toLocaleString()}`}
            icon={DollarSign}
            color="#F59E0B"
            trend="+8% from last year"
          />
        </div>

        {/* Filters */}
        <Filters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />

        {/* Search and Actions */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {filteredEmployees.length} of {employees.length} employees
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSortConfig({ key: 'name', direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' })}
                className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Sort by Name {sortConfig.key === 'name' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </button>
              <button
                onClick={() => setSortConfig({ key: 'salary', direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' })}
                className="px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Sort by Salary {sortConfig.key === 'salary' && (sortConfig.direction === 'asc' ? '↑' : '↓')}
              </button>
            </div>
          </div>
        </div>

        {/* Employee Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <EmployeeTable
            employees={currentEmployees}
            onEdit={(employee) => openModal('edit', employee)}
            onDelete={handleDeleteEmployee}
            onView={(employee) => openModal('view', employee)}
          />
          
          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={
          modalType === 'create' ? 'Add New Employee' :
          modalType === 'edit' ? 'Edit Employee' :
          'Employee Details'
        }
      >
        {modalType === 'create' && (
          <EmployeeForm
            onSubmit={handleCreateEmployee}
            onCancel={() => setIsModalOpen(false)}
          />
        )}
        {modalType === 'edit' && selectedEmployee && (
          <EmployeeForm
            employee={selectedEmployee}
            onSubmit={handleUpdateEmployee}
            onCancel={() => setIsModalOpen(false)}
          />
        )}
        {modalType === 'view' && selectedEmployee && (
          <EmployeeDetail employee={selectedEmployee} />
        )}
      </Modal>
    </div>
  );
};

export default App;