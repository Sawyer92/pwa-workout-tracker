const ProfileScreen = () => {
  return (
    <div className="pb-20 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Profilo</h1>
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <div className="w-24 h-24 bg-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
          <User size={48} className="text-white" />
        </div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Atleta</h2>
        <p className="text-gray-600 mb-4">Membro da Novembre 2025</p>
        <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
          <div>
            <p className="text-2xl font-bold text-blue-600">{workouts.length}</p>
            <p className="text-sm text-gray-600">Allenamenti</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">{workouts.filter(w => w.status === 'completed').length}</p>
            <p className="text-sm text-gray-600">Completati</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-blue-600">{workouts.filter(w => w.favorite).length}</p>
            <p className="text-sm text-gray-600">Preferiti</p>
          </div>
        </div>
      </div>
    </div>
  );    
};

export default ProfileScreen;