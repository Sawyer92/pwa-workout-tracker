const HistoryScreen = ({ workouts, setCurrentScreen, setSelectedWorkout }) => {
  const completedWorkouts = workouts.filter(w => w.status === 'completed');

  return (
    <div className="pb-20 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Cronologia</h1>
      {completedWorkouts.length === 0 ? (
        <p className="text-gray-500 text-center mt-8">Nessun allenamento completato</p>
      ) : (
        <div className="space-y-3">
          {completedWorkouts.map(workout => (
            <div
              key={workout.id}
              onClick={() => {
                setSelectedWorkout(workout);
                setCurrentScreen('detail');
              }}
              className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow border border-gray-100"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800">{workout.name}</h3>
                {workout.favorite && <Star size={18} fill="#fbbf24" className="text-yellow-400" />}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <span>{workout.exercises.length} esercizi</span>
                <span className="mx-2">•</span>
                <span>{workout.duration} min</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HistoryScreen;