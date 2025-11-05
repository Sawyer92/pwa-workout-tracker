import React from 'react';
import { X } from 'lucide-react';

const MuscleGroupSelector = ({ selectedGroups, setSelectedGroups }) => {
  const availableGroups = [
    'Petto',
    'Dorso',
    'Spalle',
    'Bicipiti',
    'Tricipiti',
    'Avambracci',
    'Addominali',
    'Quadricipiti',
    'Femorali',
    'Glutei',
    'Polpacci',
    'Trapezio',
    'Lombari',
    'Obliqui'
  ];

  const toggleGroup = (group) => {
    if (selectedGroups.includes(group)) {
      setSelectedGroups(selectedGroups.filter(g => g !== group));
    } else {
      setSelectedGroups([...selectedGroups, group]);
    }
  };

  const removeGroup = (group) => {
    setSelectedGroups(selectedGroups.filter(g => g !== group));
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Gruppi Muscolari
      </label>

      {/* Gruppi selezionati */}
      {selectedGroups.length > 0 && (
        <div className="mb-3">
          <p className="text-xs text-gray-600 mb-2">Selezionati:</p>
          <div className="flex flex-wrap gap-2">
            {selectedGroups.map((group, idx) => (
              <div
                key={idx}
                className="bg-blue-600 text-white px-3 py-1.5 rounded-full text-sm flex items-center gap-2"
              >
                <span>{group}</span>
                <button
                  type="button"
                  onClick={() => removeGroup(group)}
                  className="hover:bg-blue-700 rounded-full p-0.5 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gruppi disponibili */}
      <div>
        <p className="text-xs text-gray-600 mb-2">Disponibili:</p>
        <div className="flex flex-wrap gap-2">
          {availableGroups
            .filter(group => !selectedGroups.includes(group))
            .map((group, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => toggleGroup(group)}
                className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm hover:bg-gray-200 transition-colors border border-gray-300"
              >
                {group}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MuscleGroupSelector;