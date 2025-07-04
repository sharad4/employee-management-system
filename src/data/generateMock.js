
export const generateMockEmployees = () => {
  const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance', 'Operations'];
  const positions = ['Manager', 'Senior Developer', 'Developer', 'Analyst', 'Coordinator', 'Specialist'];
  const statuses = ['Active', 'Inactive', 'On Leave'];
  
  return Array.from({ length: 150 }, (_, i) => ({
    id: i + 1,
    name: `Employee ${i + 1}`,
    email: `employee${i + 1}@company.com`,
    department: departments[Math.floor(Math.random() * departments.length)],
    position: positions[Math.floor(Math.random() * positions.length)],
    salary: Math.floor(Math.random() * 50000) + 40000,
    hireDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28)).toISOString().split('T')[0],
    status: statuses[Math.floor(Math.random() * statuses.length)],
    avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=employee${i + 1}`,
    phone: `+1-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
    address: `${Math.floor(Math.random() * 9999) + 1} Main St, City, State ${Math.floor(Math.random() * 90000) + 10000}`
  }));
};