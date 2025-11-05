import React, { useState } from 'react';
import { Edit2, Star, ChevronLeft, Trash2, Save, X, Plus } from 'lucide-react';
import MuscleGroupSelector from '../components/MuscleGroupSelector';

const WorkoutDetailScreen = ({ 
  workout, 
  setCurrentScreen, 
  setSelectedExercise, 
  toggleFavorite,
  updateWorkout,
  deleteWorkout
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedWorkout, setEditedWorkout] = useState({
    name: workout.name,
    duration: workout.duration,
    muscleGroups: [...workout.muscleGroups],
    exercises: [...workout.exercises]
  });

  const handleSave = () => {
    if (!editedWorkout.name.trim()) {
      alert('Inserisci un nome per l\'allenamento');
      return;
    }

    const updatedWorkout = {
      ...workout,
      name: editedWorkout.name.trim(),
      duration: parseInt(editedWorkout.duration) || 60,
      muscleGroups: editedWorkout.muscleGroups,
      exercises: editedWorkout.exercises.filter(e => e.name.trim())
    };

    updateWorkout(updatedWorkout);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedWorkout({
      name: workout.name,
      duration: workout.duration,
      muscleGroups: [...workout.muscleGroups],
      exercises: [...workout.exercises]
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Sei sicuro di voler eliminare l'allenamento "${workout.name}"?`)) {
      deleteWorkout(workout.id);
      setCurrentScreen('home');
    }
  };

  const updateExercise = (index, field, value) => {
    const newExercises = [...editedWorkout.exercises];
    newExercises[index][field] = value;
    setEditedWorkout({ ...editedWorkout, exercises: newExercises });
  };

  const deleteExercise = (index) => {
    if (editedWorkout.exercises.length === 1) {
      alert('Un allenamento deve avere almeno un esercizio');
      return;
    }
    if (window.confirm('Sei sicuro di voler eliminare questo esercizio?')) {
      const newExercises = editedWorkout.exercises.filter((_, i) => i !== index);
      setEditedWorkout({ ...editedWorkout, exercises: newExercises });
    }
  };

  const addExercise = () => {
    const newExercises = [...editedWorkout.exercises, {
      id: `e${Date.now()}`,
      name: '',
      sets: 3,
      reps: 10,
      weight: 0,
      description: ''
    }];
    setEditedWorkout({ ...editedWorkout, exercises: newExercises });
  };

  if (isEditing) {
    return (
      <div className="pb-20">
        <div className="bg-blue-600 text-white p-4">
          <div className="flex items-center justify-between mb-4">
            <button onClick={handleCancel} className="p-2">
              <X size={24} />
            </button>
            <h1 className="text-xl font-bold">Modifica Allenamento</h1>
            <button onClick={handleSave} className="p-2 bg-green-500 rounded-lg">
              <Save size={24} />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nome Allenamento</label>
            <input
              type="text"
              value={editedWorkout.name}
              onChange={(e) => setEditedWorkout({ ...editedWorkout, name: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Durata (minuti)</label>
            <input
              type="number"
              value={editedWorkout.duration}
              onChange={(e) => setEditedWorkout({ ...editedWorkout, duration: e.target.value })}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <MuscleGroupSelector
            selectedGroups={editedWorkout.muscleGroups}
            setSelectedGroups={(groups) => setEditedWorkout({ ...editedWorkout, muscleGroups: groups })}
          />

          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="block text-sm font-semibold text-gray-700">Esercizi</label>
              <button
                onClick={addExercise}
                className="text-blue-600 text-sm font-semibold flex items-center"
              >
                <Plus size={16} className="mr-1" /> Aggiungi
              </button>
            </div>

            {editedWorkout.exercises.map((exercise, index) => (
              <div key={exercise.id} className="bg-gray-50 rounded-lg p-4 mb-3 relative">
                {editedWorkout.exercises.length > 1 && (
                  <button
                    onClick={() => deleteExercise(index)}
                    className="absolute top-2 right-2 text-red-500 z-10"
                  >
                    <Trash2 size={18} />
                  </button>
                )}

                <input
                  type="text"
                  value={exercise.name}
                  onChange={(e) => updateExercise(index, 'name', e.target.value)}
                  placeholder="Nome esercizio"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />

                <div className="grid grid-cols-3 gap-2 mb-2">
                  <input
                    type="number"
                    value={exercise.sets}
                    onChange={(e) => updateExercise(index, 'sets', e.target.value)}
                    placeholder="Serie"
                    className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <input
                    type="number"
                    value={exercise.reps}
                    onChange={(e) => updateExercise(index, 'reps', e.target.value)}
                    placeholder="Rip."
                    className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <input
                    type="number"
                    value={exercise.weight}
                    onChange={(e) => updateExercise(index, 'weight', e.target.value)}
                    placeholder="Peso kg"
                    className="px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <textarea
                  value={exercise.description}
                  onChange={(e) => updateExercise(index, 'description', e.target.value)}
                  placeholder="Descrizione esecuzione..."
                  rows="2"
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleDelete}
            className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
          >
            <Trash2 size={20} />
            Elimina Allenamento
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-20">
      <div className="bg-blue-600 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setCurrentScreen('home')} className="p-2">
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