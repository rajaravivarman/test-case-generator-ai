import React from 'react';
import { TestCase } from '../types';
import TestCaseCard from './TestCaseCard';

interface TestCaseDisplayProps {
  testCases: TestCase[];
}

const TestCaseDisplay: React.FC<TestCaseDisplayProps> = ({ testCases }) => {
  return (
    <div className="space-y-4">
      {testCases.map((testCase, index) => (
        <TestCaseCard key={testCase.id || index} testCase={testCase} />
      ))}
    </div>
  );
};

export default TestCaseDisplay;
