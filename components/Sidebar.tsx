import React from 'react';
import { 
    TestGeneratorIcon, AutomationIcon, DocumentsIcon, ComplianceIcon, 
    TraceabilityIcon, ReportsIcon, AnalyticsIcon, IntegrationsIcon 
} from './common/icons';

export type ViewType = 'testGenerator' | 'automation' | 'documents' | 'compliance' | 'traceability' | 'reports' | 'analytics' | 'integrations';

interface SidebarProps {
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
}

const navItems = [
  { id: 'testGenerator', label: 'Test Generator', icon: TestGeneratorIcon },
  { id: 'automation', label: 'Automation', icon: AutomationIcon },
  { id: 'documents', label: 'Documents', icon: DocumentsIcon },
  { id: 'compliance', label: 'Compliance', icon: ComplianceIcon },
  { id: 'traceability', label: 'Traceability', icon: TraceabilityIcon },
  { id: 'reports', label: 'Reports', icon: ReportsIcon },
  { id: 'analytics', label: 'Analytics', icon: AnalyticsIcon },
  { id: 'integrations', label: 'Integrations', icon: IntegrationsIcon },
];

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  return (
    <aside className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col p-4 space-y-6">
      <nav className="flex flex-col space-y-2">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as ViewType)}
              className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                isActive 
                  ? 'bg-indigo-600 text-white shadow-lg' 
                  : 'text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
