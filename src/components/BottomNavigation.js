const BottomNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'history', icon: FileText, label: 'Cronologia' },
    { id: 'search', icon: Search, label: 'Cerca' },
    { id: 'profile', icon: User, label: 'Profilo' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 flex justify-around items-center z-50">
      {tabs.map(tab => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              activeTab === tab.id ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <Icon size={24} />
            <span className="text-xs mt-1">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default BottomNavigation;
