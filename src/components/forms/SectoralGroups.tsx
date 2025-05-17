import React, { useState } from 'react';
import { Plus, Trash2, Users } from 'lucide-react';
import { SectoralGroup } from '../../types';

interface SectoralGroupsProps {
  groups: SectoralGroup[];
  onChange: (groups: SectoralGroup[]) => void;
}

const SectoralGroups: React.FC<SectoralGroupsProps> = ({ groups, onChange }) => {
  const [newGroup, setNewGroup] = useState<Partial<SectoralGroup>>({
    name: '',
    count: 0,
    notes: ''
  });

  const handleAddGroup = () => {
    if (newGroup.name && newGroup.count !== undefined) {
      onChange([...groups, { 
        id: Date.now().toString(),
        name: newGroup.name,
        count: newGroup.count,
        notes: newGroup.notes
      }]);
      setNewGroup({ name: '', count: 0, notes: '' });
    }
  };

  const handleRemoveGroup = (id: string) => {
    onChange(groups.filter(group => group.id !== id));
  };

  const handleUpdateGroup = (id: string, field: keyof SectoralGroup, value: string | number) => {
    onChange(groups.map(group => 
      group.id === id ? { ...group, [field]: value } : group
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium text-gray-900">Sectoral Groups</h3>
        <div className="flex items-center text-sm text-gray-600">
          <Users size={16} className="mr-1" />
          <span>Track special population groups</span>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Add New Group Form */}
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Group Name</label>
              <input
                type="text"
                value={newGroup.name}
                onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
                placeholder="e.g., Pregnant Women"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-dswd-blue focus:border-dswd-blue sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Count</label>
              <input
                type="number"
                min="0"
                value={newGroup.count}
                onChange={(e) => setNewGroup({ ...newGroup, count: parseInt(e.target.value) || 0 })}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-dswd-blue focus:border-dswd-blue sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newGroup.notes}
                  onChange={(e) => setNewGroup({ ...newGroup, notes: e.target.value })}
                  placeholder="Optional notes"
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-dswd-blue focus:border-dswd-blue sm:text-sm"
                />
                <button
                  onClick={handleAddGroup}
                  disabled={!newGroup.name || newGroup.count === undefined}
                  className="flex items-center px-4 py-2 bg-dswd-blue text-white text-sm font-medium rounded-md hover:bg-dswd-blue-dark disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  <Plus size={16} className="mr-1" />
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Groups List */}
        <div className="divide-y divide-gray-200">
          {groups.map((group) => (
            <div key={group.id} className="p-4 hover:bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Group Name</label>
                  <input
                    type="text"
                    value={group.name}
                    onChange={(e) => handleUpdateGroup(group.id, 'name', e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-dswd-blue focus:border-dswd-blue sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Count</label>
                  <input
                    type="number"
                    min="0"
                    value={group.count}
                    onChange={(e) => handleUpdateGroup(group.id, 'count', parseInt(e.target.value) || 0)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-dswd-blue focus:border-dswd-blue sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Notes</label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={group.notes}
                      onChange={(e) => handleUpdateGroup(group.id, 'notes', e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-dswd-blue focus:border-dswd-blue sm:text-sm"
                    />
                    <button
                      onClick={() => handleRemoveGroup(group.id)}
                      className="flex items-center px-3 py-2 text-dswd-red hover:bg-dswd-red/10 rounded-md"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {groups.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <Users size={32} className="mx-auto mb-2 text-gray-400" />
              <p>No sectoral groups added yet</p>
              <p className="text-sm">Add groups like pregnant women, PWDs, or senior citizens</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectoralGroups;