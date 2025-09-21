import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar, { ViewType } from './components/Sidebar';
import TestGeneratorView from './components/views/TestGeneratorView';
import PlaceholderView from './components/views/PlaceholderView';
import { AutomationIcon, DocumentsIcon, ComplianceIcon, TraceabilityIcon, ReportsIcon, AnalyticsIcon, IntegrationsIcon } from './components/common/icons';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('testGenerator');

  const renderView = () => {
    switch (activeView) {
      case 'testGenerator':
        return <TestGeneratorView />;
      case 'automation':
        return <PlaceholderView title="Test Automation" icon={<AutomationIcon className="w-16 h-16 text-gray-600 mb-4" />} description="Define, manage, and trigger automated API or UI tests with Playwright." />;
      case 'documents':
        return <PlaceholderView title="Documents" icon={<DocumentsIcon className="w-16 h-16 text-gray-600 mb-4" />} description="Manage all your project-related documents in one place." />;
      case 'compliance':
        return <PlaceholderView title="Compliance" icon={<ComplianceIcon className="w-16 h-16 text-gray-600 mb-4" />} description="Track and report on compliance standards and regulations." />;
      case 'traceability':
        return <PlaceholderView title="Traceability" icon={<TraceabilityIcon className="w-16 h-16 text-gray-600 mb-4" />} description="Visualize end-to-end traceability from requirements to test results." />;
      case 'reports':
        return <PlaceholderView title="Reports" icon={<ReportsIcon className="w-16 h-16 text-gray-600 mb-4" />} description="Generate and view detailed reports on your testing activities." />;
      case 'analytics':
        return <PlaceholderView title="Analytics" icon={<AnalyticsIcon className="w-16 h-16 text-gray-600 mb-4" />} description="Gain insights into your testing process with powerful analytics." />;
      case 'integrations':
        return <PlaceholderView title="Integrations" icon={<IntegrationsIcon className="w-16 h-16 text-gray-600 mb-4" />} description="Connect with your favorite tools like Jira, GitHub, and Jenkins." />;
      default:
        return <TestGeneratorView />;
    }
  };

  return (
    <div className="h-screen bg-gray-900 text-gray-100 font-sans flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-900">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;
