import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab?: string;
  onChange?: (tabId: string) => void;
  completed?: Record<string, boolean>;
}

const Tabs: React.FC<TabsProps> = ({ 
  tabs, 
  activeTab: externalActiveTab, 
  onChange,
  completed = {}
}) => {
  const [internalActiveTab, setInternalActiveTab] = useState(tabs[0]?.id || '');
  
  const activeTab = externalActiveTab || internalActiveTab;
  
  const handleTabChange = (tabId: string) => {
    if (onChange) {
      onChange(tabId);
    } else {
      setInternalActiveTab(tabId);
    }
  };

  return (
    <div>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-6 overflow-x-auto hide-scrollbar" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center
                ${activeTab === tab.id
                  ? 'border-dswd-blue text-dswd-blue'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
              `}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              {tab.label}
              {completed[tab.id] && (
                <CheckCircle size={16} className="ml-2 text-green-500" />
              )}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-4">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

export default Tabs;