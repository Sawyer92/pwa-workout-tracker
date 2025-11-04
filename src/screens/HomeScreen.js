const HomeScreen = ({ workouts, setCurrentScreen, setSelectedWorkout }) => {
  const activeWorkouts = workouts.filter(w => w.status === 'active');
  const pendingWorkouts = workouts.filter(w => w.status === 'pending');
  const completedWorkouts = workouts.filter(w => w.status === 'completed');

  const WorkoutSection = ({ title, workouts }) => (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-gray-800 mb-3 px-4">{title}</h2>
      <div className="flex overflow-x-auto px-4 pb-2 scrollbar-hide">
        {workouts.length === 0 ? (
          <p className="text-gray-500 text-sm">Nessun allenamento</p>
        ) : (
          workouts.map(workout => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              onClick={() => {
                setSelectedWorkout(workout);
                setCurrentScreen('detail');
              }}
            />
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="pb-20 pt-4">
      <div className="px-4 mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">I Miei Allenamenti</h1>
        <button
          onClick={() => setCurrentScreen('create')}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={24} />
        </button>
      </div>

      <WorkoutSection title="In Corso" workouts={activeWorkouts} />
      <WorkoutSection title="In Sospeso" workouts={pendingWorkouts} />
      <WorkoutSection title="Completati" workouts={completedWorkouts} />
    </div>
  );
};

export default HomeScreen;