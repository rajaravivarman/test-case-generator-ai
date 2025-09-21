import React, { useState, useCallback } from 'react';
import { Project, Requirement, TestCase, TraceabilityData } from '../../types';
import { generateTestCasesFromRequirements } from '../../services/geminiService';
import ProjectInput from '../ProjectInput';
import RequirementsInput from '../RequirementsInput';
import TestCaseDisplay from '../TestCaseDisplay';
import TraceabilityMatrix from '../TraceabilityMatrix';
import { Spinner } from '../common/Spinner';
// FIX: Import TestGeneratorIcon to be used in the component.
import { CodeBracketIcon, DocumentTextIcon, GitHubIcon, TestGeneratorIcon } from '../common/icons';

type InputMethod = 'requirements' | 'sourceCode' | 'scm';

const TestGeneratorView: React.FC = () => {
  const [project, setProject] = useState<Project>({ name: '', description: '' });
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [traceabilityData, setTraceabilityData] = useState<TraceabilityData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'testCases' | 'traceability'>('testCases');
  const [inputMethod, setInputMethod] = useState<InputMethod>('requirements');

  const handleProjectChange = useCallback((field: keyof Project, value: string) => {
    setProject(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleRequirementsChange = useCallback((rawText: string) => {
    const lines = rawText.split('\n').filter(line => line.trim() !== '');
    const reqs = lines.map((line, index) => ({
      id: `REQ-${String(index + 1).padStart(3, '0')}`,
      text: line.trim(),
    }));
    setRequirements(reqs);
  }, []);

  const handleGenerateTestCases = useCallback(async () => {
    if (!project.name || (inputMethod === 'requirements' && requirements.length === 0)) {
      setError('Project Name and at least one Requirement are mandatory.');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setTestCases([]);
    setTraceabilityData([]);

    try {
      if (inputMethod !== 'requirements') {
        throw new Error("This generation method is not yet implemented.");
      }

      const generatedCases = await generateTestCasesFromRequirements(project, requirements);
      setTestCases(generatedCases);

      const traceData = requirements.map(req => ({
          reqId: req.id,
          testCases: generatedCases.filter(tc => tc.requirementId === req.id).length,
      }));
      setTraceabilityData(traceData);
      setActiveTab('testCases');

    } catch (err: any) {
      console.error('Error generating test cases:', err);
      setError(`Failed to generate test cases. ${err.message || 'Please try again.'}`);
    } finally {
      setIsLoading(false);
    }
  }, [project, requirements, inputMethod]);

  const hasContent = testCases.length > 0;

  const renderInputMethod = () => {
    switch(inputMethod) {
      case 'requirements':
        return <RequirementsInput onRequirementsChange={handleRequirementsChange} />;
      case 'sourceCode':
        return (
          <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-gray-600 rounded-lg h-64 bg-gray-900/50">
             <CodeBracketIcon className="w-12 h-12 text-gray-500 mb-3" />
             <h3 className="font-semibold text-white">Upload Source Code</h3>
             <p className="text-sm text-gray-400 mt-1">This feature is coming soon. You'll be able to upload a zip file of your codebase.</p>
          </div>
        );
      case 'scm':
         return (
          <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-gray-600 rounded-lg h-64 bg-gray-900/50">
             <GitHubIcon className="w-12 h-12 text-gray-500 mb-3" />
             <h3 className="font-semibold text-white">SCM Integration</h3>
             <p className="text-sm text-gray-400 mt-1">Connect to your Git repository to generate tests directly from your source code.</p>
             <button disabled className="mt-4 bg-gray-700 text-gray-400 font-semibold py-2 px-4 rounded-md cursor-not-allowed">
                Connect to GitHub (Coming Soon)
             </button>
          </div>
        );
      default:
        return null;
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
      {/* Left Column: Inputs */}
      <div className="flex flex-col gap-6 bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
        <ProjectInput project={project} onProjectChange={handleProjectChange} />
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <TestGeneratorIcon className="w-6 h-6 text-indigo-400"/>
            <h2 className="text-lg font-semibold text-white">2. Generation Source</h2>
          </div>
          <div className="flex space-x-1 bg-gray-900/50 p-1 rounded-lg w-full">
            <button onClick={() => setInputMethod('requirements')} className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${inputMethod === 'requirements' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}>
              <DocumentTextIcon className="w-5 h-5" /> Requirements
            </button>
            <button onClick={() => setInputMethod('sourceCode')} className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${inputMethod === 'sourceCode' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}>
              <CodeBracketIcon className="w-5 h-5" /> Source Code
            </button>
            <button onClick={() => setInputMethod('scm')} className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2 ${inputMethod === 'scm' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}>
              <GitHubIcon className="w-5 h-5" /> SCM
            </button>
          </div>
          {renderInputMethod()}
        </div>
        
        <button
            onClick={handleGenerateTestCases}
            disabled={isLoading || inputMethod !== 'requirements'}
            className="w-full flex justify-center items-center gap-2 bg-indigo-600 text-white font-semibold py-3 px-4 rounded-md shadow-lg hover:bg-indigo-500 disabled:bg-indigo-800/50 disabled:cursor-not-allowed disabled:text-gray-400 transition-all duration-200"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating...
              </>
            ) : (
              'Generate Test Cases'
            )}
        </button>

        {error && <div className="text-red-400 bg-red-900/50 border border-red-600 p-3 rounded-md text-sm">{error}</div>}
      </div>

      {/* Right Column: Outputs */}
      <div className="flex flex-col bg-gray-800 rounded-2xl shadow-lg border border-gray-700 min-h-[600px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full gap-4">
            <Spinner />
            <p className="text-lg text-gray-400">Generating test cases with Gemini...</p>
            <p className="text-sm text-gray-500">This might take a moment.</p>
          </div>
        ) : hasContent ? (
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-gray-700">
              <div className="flex space-x-1 bg-gray-900 p-1 rounded-lg w-fit">
                <button onClick={() => setActiveTab('testCases')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${activeTab === 'testCases' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}>
                  Generated Test Cases ({testCases.length})
                </button>
                <button onClick={() => setActiveTab('traceability')} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${activeTab === 'traceability' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-700'}`}>
                  Traceability Matrix
                </button>
              </div>
            </div>
            <div className="flex-grow p-6 overflow-y-auto">
                {activeTab === 'testCases' ? <TestCaseDisplay testCases={testCases} /> : <TraceabilityMatrix data={traceabilityData} />}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            <h3 className="text-xl font-semibold text-gray-300">Your test cases will appear here</h3>
            <p className="text-gray-500 mt-2 max-w-sm">
              Configure your project and select a generation source, then click "Generate Test Cases" to see the AI in action.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TestGeneratorView;