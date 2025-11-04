const WorkoutDetailScreen = ({ workout, setCurrentScreen, setSelectedExercise, toggleFavorite, setEditMode }) => {
  return (
    <div className="pb-20">
      <div className="bg-blue-600 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setCurrentScreen('home')} className="p-2">
            <ChevronLeft size={24} />
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setEditMode(true)}
              className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              <Edit2 size={20} />
            </button>
            <button
              onClick={() => toggleFavorite(workout.id)}
              className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              <Star size={20} fill={workout.favorite ? '#fbbf24' : 'none'} />
            </button>
          </div>
        </div>
        <h1 className="text-2xl font-bold mb-2">{workout.name}</h1>
        <div className="flex items-center text-sm opacity-90">
          <span>{workout.duration} minuti</span>
          <span className="mx-2">•</span>
          <span>{workout.exercises.length} esercizi</span>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">Gruppi Muscolari</h2>
          <div className="flex flex-wrap gap-2">
            {workout.muscleGroups.map((group, idx) => (
              <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {group}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Esercizi</h2>
          <div className="space-y-3">
            {workout.exercises.map(exercise => (
              <div
                key={exercise.id}
                onClick={() => {
                  setSelectedExercise(exercise);
                  setCurrentScreen('exercise');
                }}
                className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow border border-gray-100"
              >
                <h3 className="font-semibold text-gray-800 mb-2">{exercise.name}</h3>
                <div className="flex gap-4 text-sm text-gray-600">
                  <span>{exercise.sets} serie</span>
                  <span>•</span>
                  <span>{exercise.reps} ripetizioni</span>
                  <span>•</span>
                  <span>{exercise.weight} kg</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetailScreen;