const SearchScreen = ({ workouts, setCurrentScreen, setSelectedWorkout, setSelectedExercise }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const searchResults = workouts.reduce((acc, workout) => {
    if (workout.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      acc.push({ type: 'workout', data: workout });
    }
    workout.exercises.forEach(exercise => {
      if (exercise.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        acc.push({ type: 'exercise', data: exercise, workout });
      }
    });
    return acc;
  }, []);

  return (
    <div className="pb-20 p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Cerca</h1>
      <input
        type="text"
        placeholder="Cerca allenamenti o esercizi..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 mb-4"
      />

      {searchTerm && (
        <div className="space-y-2">
          {searchResults.length === 0 ? (
            <p className="text-gray-500 text-center mt-8">Nessun risultato trovato</p>
          ) : (
            searchResults.map((result, idx) => (
              <div
                key={idx}
                onClick={() => {
                  if (result.type === 'workout') {
                    setSelectedWorkout(result.data);
                    setCurrentScreen('detail');
                  } else {
                    setSelectedWorkout(result.workout);
                    setSelectedExercise(result.data);
                    setCurrentScreen('exercise');
                  }
                }}
                className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow border border-gray-100"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-blue-600 font-semibold mb-1">
                      {result.type === 'workout' ? 'ALLENAMENTO' : 'ESERCIZIO'}
                    </p>
                    <h3 className="font-semibold text-gray-800">{result.data.name}</h3>
                    {result.type === 'exercise' && (
                      <p className="text-sm text-gray-500 mt-1">da {result.workout.name}</p>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchScreen;