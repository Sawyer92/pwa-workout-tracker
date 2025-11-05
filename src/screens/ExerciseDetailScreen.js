import React, { useState } from 'react';
import { Edit2, Star, ChevronLeft, Trash2, Save, X } from 'lucide-react';

const ExerciseDetailScreen = ({ 
  exercise, 
  workout, 
  setCurrentScreen, 
  toggleFavorite,
  updateExerciseInWorkout,
  deleteExerciseFromWorkout
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedExercise, setEditedExercise] = useState({
    name: exercise.name,
    sets: exercise.sets,
    reps: exercise.reps,
    weight: exercise.weight,
    description: exercise.description
  });

  const handleSave = () => {
    if (!editedExercise.name.trim()) {
      alert('Inserisci un nome per l\'esercizio');
      return;
    }

    const updatedExercise = {
      ...exercise,
      name: editedExercise.name.trim(),
      sets: parseInt(editedExercise.sets) || 3,
      reps: parseInt(editedExercise.reps) || 10,
      weight: parseInt(editedExercise.weight) || 0,
      description: editedExercise.description.trim()
    };

    updateExerciseInWorkout(workout.id, exercise.id, updatedExercise);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedExercise({
      name: exercise.name,
      sets: exercise.sets,
      reps: exercise.reps,
      weight: exercise.weight,
      description: exercise.description
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (workout.exercises.length === 1) {
      alert('Non puoi eliminare l\'ultimo esercizio di un allenamento. Elimina l\'intero allenamento se necessario.');
      return;
    }
    
    if (window.confirm(`Sei sicuro di voler eliminare l'esercizio "${exercise.name}"?`)) {
      deleteExerciseFromWorkout(workout.id, exercise.id);
      setCurrentScreen('detail');
    }
  };

  if (isEditing) {
    return (
      <div className="pb-20">
        <div className="bg-blue-600 text-white p-4">
          <div className="flex items-center justify-between mb-4">
            <button onClick={handleCancel} className="p-2">
              <X size={24} />
            </button>
            <h1 className="text-xl font-bold">Modifica Esercizio</h1>
            <button onClick={handleSave} className="p-2 bg-green-500 rounded-lg">
              <Save size={24} />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nome Esercizio</label>
            <input
              type="text"
              value={editedExercise.name}
              onChange={(e) => setEditedExercise({ ...editedExercise, name: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Serie</label>
              <input
                type="number"
                value={editedExercise.sets}
                onChange={(e) => setEditedExercise({ ...editedExercise, sets: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Ripetizioni</label>
              <input
                type="number"
                value={editedExercise.reps}
                onChange={(e) => setEditedExercise({ ...editedExercise, reps: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Peso (kg)</label>
              <input
                type="number"
                value={editedExercise.weight}
                onChange={(e) => setEditedExercise({ ...editedExercise, weight: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Descrizione</label>
            <textarea
              value={editedExercise.description}
              onChange={(e) => setEditedExercise({ ...editedExercise, description: e.target.value })}
              rows="4"
              placeholder="Descrizione dell'esecuzione..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <button
            onClick={handleDelete}
            className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
          >
            <Trash2 size={20} />
            Elimina Esercizio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <div className="bg-blue-600 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setCurrentScreen('detail')} className="p-2">
            <ChevronLeft size={24} />
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
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