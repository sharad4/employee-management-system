# Employee Management System

A modern, enterprise-level Employee Management System built with React 19 and Tailwind CSS, featuring comprehensive CRUD operations, advanced filtering, and analytics dashboard.

## 🚀 Features

- **Dashboard Analytics** - Real-time employee statistics and trends
- **Employee Management** - Complete CRUD operations (Create, Read, Update, Delete)
- **Advanced Search & Filtering** - Multi-criteria filtering by department, status, and salary
- **Data Export** - CSV export functionality
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Pagination** - Efficient handling of large datasets
- **Sorting** - Dynamic column sorting capabilities
- **Modal System** - Clean UI for forms and detailed views

## 🛠️ Tech Stack

- **React 19** - Latest React with modern hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Vite** - Fast build tool and development server

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>
cd employee-management-system

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🏗️ Project Structure

```
src/
├── components/
│   ├── StatCard.jsx
│   ├── Modal.jsx
│   ├── EmployeeForm.jsx
│   ├── EmployeeDetail.jsx
│   ├── EmployeeTable.jsx
│   ├── Filters.jsx
│   └── Pagination.jsx
├── data/
|   └── generateMock.js
├── App.jsx
└── main.jsx
```

## 🔧 Key Components

- **StatCard** - Reusable dashboard metrics component
- **Modal** - Generic modal wrapper for forms and details
- **EmployeeForm** - Form handling with validation
- **EmployeeTable** - Data table with sorting and actions
- **Filters** - Advanced filtering interface
- **Pagination** - Navigation for large datasets

## 📊 Mock Data

The application includes 150 mock employees with realistic data including:

- Personal information (name, email, phone, address)
- Employment details (department, position, salary, hire date)
- Status tracking (Active, Inactive, On Leave)
- Avatar generation using DiceBear API

## 🎯 Enterprise Features

- **State Management** - Complex state handling with React hooks
- **Performance Optimization** - useMemo for expensive calculations
- **Error Handling** - Form validation and user feedback
- **Data Transformation** - Advanced filtering and sorting logic
- **Export Functionality** - CSV data export
- **Responsive Design** - Works on all device sizes

## 🚦 Getting Started

1. The application loads with 150 mock employees
2. Use the search bar to find specific employees
3. Apply filters by department, status, or salary range
4. Click "Add Employee" to create new records
5. Use table actions (👁️ View, ✏️ Edit, 🗑️ Delete) for management
6. Export data using the "Export" button

## 🔮 Future Enhancements

- TypeScript integration
- API integration with backend services
- Authentication and authorization
- Advanced charts and analytics
- Employee photo uploads
- Bulk operations
- Email notifications

## 📝 License

This project is created for portfolio demonstration purposes.

---

**Built with ❤️ using React 19 & Tailwind CSS**
