import { TrendingUp } from 'lucide-react'
import React from 'react'

const StatCard = ({ title, value, icon: Icon, trend, color }) => {
  return (
    <div className='bg-white rounded-lg shadow-md p-6 border-l-4' style={{ borderLeftColor: color }}>
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm font-medium text-gray-600">{title}</p>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                {trend && (
                    <p className="text-sm text-green-600 flex items-center mt-1">
                        <TrendingUp className='w-4 h-4 mr-1'/>
                        {trend}
                    </p>
                )}
            </div>
            <Icon className="w-12 h-12 text-gray-400"/>
        </div>
    </div>
  );
};

export default StatCard;