import  { useState } from 'react';
import {  Plus, ChevronLeft, Trash2 } from 'lucide-react';

const CreateWorkoutScreen = ({ setCurrentScreen, addWorkout }) => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('60');
  const [muscleGroups, setMuscleGroups] = useState('');
  const [exercises, setExercises] = useState([
    { name: '', sets: '3', reps: '10', weight: '0', description: '' }
  ]);

  const addExercise = () => {
    setExercises([...exercises, { name: '', sets: '3', reps: '10', weight: '0', description: '' }]);
  };

  const updateExercise = (index, field, value) => {
    const newExercises = [...exercises];
    newExercises[index][field] = value;
    setExercises(newExercises);
  };

  const removeExercise = (index) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!name.trim()) {
      alert('Inserisci un nome per l\'allenamento');
      return;
    }

    const validExercises = exercises.filter(e => e.name.trim());
    if (validExercises.length === 0) {
      alert('Aggiungi almeno un esercizio');
      return;
    }

    const newWorkout = {
      id: Date.now().toString(),
      name: name.trim(),
      status: 'pending',
      muscleGroups: muscleGroups.split(',').map(g => g.trim()).filter(g => g),
      duration: parseInt(duration) || 60,
      favorite: false,
      exercises: validExercises.map((e, idx) => ({
        id: `e${Date.now()}_${idx}`,
        name: e.name.trim(),
        sets: parseInt(e.sets) || 3,
        reps: parseInt(e.reps) || 10,
        weight: parseInt(e.weight) || 0,
        description: e.description.trim()
      }))
    };

    addWorkout(newWorkout);
    setCurrentScreen('home');
  };

  return (
    <div className="pb-20">
      <div className="bg-blue-600 text-white p-4">
        <div className="flex items-center mb-4">
          <button onClick={() => setCurrentScreen('home')} className="p-2">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-2xl font-bold ml-2">Nuovo Allenamento</h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Nome Allenamento</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Es. Allenamento Petto"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Durata (minuti)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Gruppi Muscolari (separati da virgola)</label>
          <input
            type="text"
            value={muscleGroups}
            onChange={(e) => setMuscleGroups(e.target.value)}
            placeholder="Es. Petto, Tricipiti"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

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

          {exercises.map((exercise, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 mb-3 relative">
              {exercises.length > 1 && (
                <button
                  onClick={() => removeExercise(index)}
                  className="absolute top-2 right-2 text-red-500"
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
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Crea Allenamento
        </button>
      </div>
    </div>
  );
};

export default CreateWorkoutScreen;