import { useState } from 'react';
import { Plus, ChevronLeft, Trash2 } from 'lucide-react';
import MuscleGroupSelector from '../components/MuscleGroupSelector';

const CreateWorkoutScreen = ({ setCurrentScreen, addWorkout }) => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('60');
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [errors, setErrors] = useState({});

  const addExercise = () => {
    // Verifica che l'esercizio precedente sia completo prima di aggiungerne uno nuovo
    if (exercises.length > 0) {
      const lastExercise = exercises[exercises.length - 1];
      if (!lastExercise.name.trim() || !lastExercise.sets || !lastExercise.reps || !lastExercise.weight) {
        alert('Completa l\'esercizio corrente prima di aggiungerne uno nuovo');
        return;
      }
    }
    
    setExercises([...exercises, { name: '', sets: '', reps: '', weight: '', description: '' }]);
    setErrors({});
  };

  const validateExercises = () => {
    if (exercises.length === 0) {
      return false;
    }

    const newErrors = {};
    let isValid = true;

    exercises.forEach((exercise, index) => {
      const exerciseErrors = {};

      if (!exercise.name.trim()) {
        exerciseErrors.name = 'Nome obbligatorio';
        isValid = false;
      }

      if (!exercise.sets || exercise.sets === '' || parseInt(exercise.sets) <= 0) {
        exerciseErrors.sets = 'Serie obbligatorie';
        isValid = false;
      }

      if (!exercise.reps || exercise.reps === '' || parseInt(exercise.reps) <= 0) {
        exerciseErrors.reps = 'Ripetizioni obbligatorie';
        isValid = false;
      }

      if (exercise.weight === '' || parseInt(exercise.weight) < 0) {
        exerciseErrors.weight = 'Peso obbligatorio';
        isValid = false;
      }

      if (Object.keys(exerciseErrors).length > 0) {
        newErrors[index] = exerciseErrors;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const updateExercise = (index, field, value) => {
    const newExercises = [...exercises];
    newExercises[index][field] = value;
    setExercises(newExercises);

    // Rimuovi l'errore per quel campo specifico quando l'utente inizia a digitare
    if (errors[index] && errors[index][field]) {
      const newErrors = { ...errors };
      delete newErrors[index][field];
      if (Object.keys(newErrors[index]).length === 0) {
        delete newErrors[index];
      }
      setErrors(newErrors);
    }
  };

  const removeExercise = (index) => {
    setExercises(exercises.filter((_, i) => i !== index));
    
    // Rimuovi anche gli errori per quell'esercizio
    const newErrors = { ...errors };
    delete newErrors[index];
    
    // Ricalcola gli indici degli errori
    const reindexedErrors = {};
    Object.keys(newErrors).forEach(key => {
      const oldIndex = parseInt(key);
      if (oldIndex > index) {
        reindexedErrors[oldIndex - 1] = newErrors[key];
      } else {
        reindexedErrors[oldIndex] = newErrors[key];
      }
    });
    
    setErrors(reindexedErrors);
  };

  const handleSubmit = () => {
    // Validazione nome allenamento
    if (!name.trim()) {
      alert('Inserisci un nome per l\'allenamento');
      return;
    }

    // Validazione gruppi muscolari
    if (muscleGroups.length === 0) {
      alert('Seleziona almeno un gruppo muscolare');
      return;
    }

    // Validazione esercizi
    if (exercises.length === 0) {
      alert('Aggiungi almeno un esercizio');
      return;
    }

    const isValid = validateExercises();
    if (!isValid) {
      alert('Completa tutti i campi obbligatori degli esercizi (nome, serie, ripetizioni, peso)');
      return;
    }

    const newWorkout = {
      id: Date.now().toString(),
      name: name.trim(),
      status: 'pending',
      muscleGroups: muscleGroups,
      duration: parseInt(duration) || 60,
      favorite: false,
      exercises: exercises.map((e, idx) => ({
        id: `e${Date.now()}_${idx}`,
        name: e.name.trim(),
        sets: parseInt(e.sets),
        reps: parseInt(e.reps),
        weight: parseFloat(e.weight),
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
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Nome Allenamento <span className="text-red-500">*</span>
          </label>
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
          <MuscleGroupSelector
            selectedGroups={muscleGroups}
            setSelectedGroups={setMuscleGroups}
          />
          {muscleGroups.length === 0 && (
            <p className="text-xs text-red-500 mt-1">* Seleziona almeno un gruppo muscolare</p>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="block text-sm font-semibold text-gray-700">
              Esercizi <span className="text-red-500">*</span>
            </label>
            <button
              onClick={addExercise}
              className="text-blue-600 text-sm font-semibold flex items-center hover:text-blue-700"
            >
              <Plus size={16} className="mr-1" /> Aggiungi
            </button>
          </div>

          {exercises.length === 0 && (
            <div className="bg-gray-100 rounded-lg p-4 text-center text-gray-500 text-sm">
              Clicca su "Aggiungi" per inserire un esercizio
            </div>
          )}

          {exercises.map((exercise, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4 mb-3 relative border-2 border-gray-200">
              <button
                onClick={() => removeExercise(index)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 bg-white rounded-full p-1"
              >
                <Trash2 size={18} />
              </button>

              <div className="mb-2">
                <input
                  type="text"
                  value={exercise.name}
                  onChange={(e) => updateExercise(index, 'name', e.target.value)}
                  placeholder="Nome esercizio *"
                  className={`w-full px-3 py-2 rounded-lg border ${
                    errors[index]?.name ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-600`}
                />
                {errors[index]?.name && (
                  <p className="text-xs text-red-500 mt-1">{errors[index].name}</p>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2 mb-2">
                <div>
                  <input
                    type="number"
                    value={exercise.sets}
                    onChange={(e) => updateExercise(index, 'sets', e.target.value)}
                    placeholder="Serie *"
                    min="1"
                    className={`w-full px-3 py-2 rounded-lg border ${
                      errors[index]?.sets ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-600`}
                  />
                  {errors[index]?.sets && (
                    <p className="text-xs text-red-500 mt-1">{errors[index].sets}</p>
                  )}
                </div>
                <div>
                  <input
                    type="number"
                    value={exercise.reps}
                    onChange={(e) => updateExercise(index, 'reps', e.target.value)}
                    placeholder="Rip. *"
                    min="1"
                    className={`w-full px-3 py-2 rounded-lg border ${
                      errors[index]?.reps ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-600`}
                  />
                  {errors[index]?.reps && (
                    <p className="text-xs text-red-500 mt-1">{errors[index].reps}</p>
                  )}
                </div>
                <div>
                  <input
                    type="number"
                    value={exercise.weight}
                    onChange={(e) => updateExercise(index, 'weight', e.target.value)}
                    placeholder="Peso *"
                    min="0"
                    step="0.5"
                    className={`w-full px-3 py-2 rounded-lg border ${
                      errors[index]?.weight ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-600`}
                  />
                  {errors[index]?.weight && (
                    <p className="text-xs text-red-500 mt-1">{errors[index].weight}</p>
                  )}
                </div>
              </div>

              <textarea
                value={exercise.description}
                onChange={(e) => updateExercise(index, 'description', e.target.value)}
                placeholder="Descrizione esecuzione (facoltativa)..."
                rows="2"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
          ))}
        </div>

        <div className="pt-2">
          <p className="text-xs text-gray-500 mb-3">
            * Campi obbligatori
          </p>
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Crea Allenamento
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkoutScreen;