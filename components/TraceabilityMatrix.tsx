import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TraceabilityData } from '../types';

interface TraceabilityMatrixProps {
  data: TraceabilityData[];
}

const TraceabilityMatrix: React.FC<TraceabilityMatrixProps> = ({ data }) => {
    if (!data || data.length === 0) {
        return <div className="text-center text-gray-500">No traceability data available.</div>;
    }

  return (
    <div className='w-full h-[500px]'>
        <h3 className="text-lg font-semibold text-white mb-4">Requirement to Test Case Coverage</h3>
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
            data={data}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 50,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
            <XAxis dataKey="reqId" angle={-45} textAnchor="end" stroke="#A0AEC0" interval={0} />
            <YAxis allowDecimals={false} stroke="#A0AEC0" />
            <Tooltip
                contentStyle={{ 
                    backgroundColor: '#1A202C',
                    border: '1px solid #4A5568',
                    color: '#E2E8F0'
                }}
                cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }}
             />
            <Legend wrapperStyle={{ color: '#E2E8F0' }} />
            <Bar dataKey="testCases" fill="#8B5CF6" name="No. of Test Cases" />
            </BarChart>
        </ResponsiveContainer>
    </div>
  );
};

export default TraceabilityMatrix;
