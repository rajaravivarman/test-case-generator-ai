import React from 'react';

interface PlaceholderViewProps {
  title: string;
  icon: React.ReactNode;
  description: string;
}

const PlaceholderView: React.FC<PlaceholderViewProps> = ({ title, icon, description }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 bg-gray-800/50 rounded-2xl border border-gray-700 p-8">
      {icon}
      <h1 className="text-2xl font-bold text-white mt-4">{title}</h1>
      <p className="mt-2 max-w-md text-gray-400">{description}</p>
      <div className="mt-6 bg-yellow-900/50 text-yellow-300 text-sm px-4 py-2 rounded-lg border border-yellow-700">
        Feature Coming Soon
      </div>
    </div>
  );
};

export default PlaceholderView;
