import React from 'react';
import { TestCase } from '../types';
import { CheckCircleIcon, ClipboardCheckIcon, LinkIcon } from './common/icons';

interface TestCaseCardProps {
  testCase: TestCase;
}

const TestCaseCard: React.FC<TestCaseCardProps> = ({ testCase }) => {
  return (
    <div className="bg-gray-900/70 border border-gray-700 rounded-lg shadow-md transition-shadow hover:shadow-indigo-500/20">
      <div className="p-4 border-b border-gray-700">
        <div className="flex justify-between items-start">
            <div className='flex-1'>
                 <span className="text-xs font-mono bg-indigo-900/50 text-indigo-300 px-2 py-1 rounded">{testCase.id}</span>
                <h3 className="text-lg font-semibold text-white mt-2">{testCase.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{testCase.description}</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 font-medium whitespace-nowrap ml-4">
                <LinkIcon className="w-4 h-4 text-gray-500"/>
                <span>{testCase.requirementId}</span>
            </div>
        </div>
      </div>
      <div className="p-4 space-y-4">
        <div>
          <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
            <ClipboardCheckIcon className="w-5 h-5 text-indigo-400" />
            Test Steps
          </h4>
          <ol className="list-decimal list-inside space-y-1 text-gray-300 text-sm pl-2">
            {testCase.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>
        <div>
          <h4 className="flex items-center gap-2 text-sm font-semibold text-gray-300 mb-2">
            <CheckCircleIcon className="w-5 h-5 text-green-400" />
            Expected Results
          </h4>
          <p className="text-gray-300 text-sm pl-2">{testCase.expectedResults}</p>
        </div>
      </div>
    </div>
  );
};

export default TestCaseCard;
