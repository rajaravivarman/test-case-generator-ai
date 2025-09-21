import React from 'react';

interface RequirementsInputProps {
  onRequirementsChange: (rawText: string) => void;
}

const RequirementsInput: React.FC<RequirementsInputProps> = ({ onRequirementsChange }) => {
  return (
    <div>
      <label htmlFor="requirements-text" className="block text-sm font-medium text-gray-400 mb-1">
        Enter requirements (one per line)
      </label>
      <textarea
        id="requirements-text"
        rows={8}
        onChange={(e) => onRequirementsChange(e.target.value)}
        placeholder={
`User must be able to register with an email and password.
The login page should have a 'Forgot Password' link.
Users can add items to a shopping cart.`
        }
        className="w-full bg-gray-900/50 border border-gray-600 rounded-md shadow-sm px-3 py-2 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-y"
      />
    </div>
  );
};

export default RequirementsInput;
