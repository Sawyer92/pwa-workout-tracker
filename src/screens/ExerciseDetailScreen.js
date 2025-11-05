import {  Edit2, Star, ChevronLeft } from 'lucide-react';

const ExerciseDetailScreen = ({ exercise, workout, setCurrentScreen, toggleFavorite, setEditMode }) => {
  return (
    <div className="pb-20">
      <div className="bg-blue-600 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setCurrentScreen('detail')} className="p-2">
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
        <h1 className="text-2xl font-bold">{exercise.name}</h1>
      </div>

      <div className="p-4">
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Parametri</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">{exercise.sets}</p>
              <p className="text-sm text-gray-600">Serie</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{exercise.reps}</p>
              <p className="text-sm text-gray-600">Ripetizioni</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-600">{exercise.weight}</p>
              <p className="text-sm text-gray-600">kg</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">Descrizione</h2>
          <p className="text-gray-700 leading-relaxed">{exercise.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetailScreen;