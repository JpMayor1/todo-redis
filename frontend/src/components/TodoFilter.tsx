import React from 'react';

interface TodoFilterProps {
  currentFilter: 'all' | 'active' | 'completed';
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
  taskCounts: {
    all: number;
    active: number;
    completed: number;
  };
}

const TodoFilter: React.FC<TodoFilterProps> = ({ currentFilter, onFilterChange, taskCounts }) => {
  const filters = [
    { key: 'all' as const, label: 'All', count: taskCounts.all },
    { key: 'active' as const, label: 'Active', count: taskCounts.active },
    { key: 'completed' as const, label: 'Completed', count: taskCounts.completed },
  ];

  return (
    <div className="flex flex-wrap gap-2 p-4 bg-gray-50 rounded-lg">
      {filters.map(({ key, label, count }) => (
        <button
          key={key}
          onClick={() => onFilterChange(key)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
            currentFilter === key
              ? 'bg-blue-500 text-white shadow-sm'
              : 'bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-800'
          }`}
        >
          {label} ({count})
        </button>
      ))}
    </div>
  );
};

export default TodoFilter;