import React, { useState, useEffect } from 'react';
import { Home, FileText, Search, User, Plus, Edit2, Star, ChevronLeft, Trash2, Dumbbell } from 'lucide-react';

// Utility per storage persistente
const usePersistedState = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [key, state]);

  return [state, setState];
};

// Dati di esempio iniziali
const initialWorkouts = [
  {
    id: '1',
    name: 'Allenamento Petto e Tricipiti',
    status: 'active',
    muscleGroups: ['Petto', 'Tricipiti'],
    duration: 60,
    favorite: false,
    exercises: [
      { id: 'e1', name: 'Panca piana', sets: 4, reps: 10, weight: 80, description: 'Sdraiati sulla panca, afferra il bilanciere con presa leggermente più ampia delle spalle. Abbassa il bilanciere al petto e spingi verso l\'alto.' },
      { id: 'e2', name: 'Croci manubri', sets: 3, reps: 12, weight: 20, description: 'Sdraiati sulla panca con manubri. Apri le braccia lateralmente mantenendo una leggera flessione ai gomiti, poi richiudi.' },
      { id: 'e3', name: 'French press', sets: 3, reps: 12, weight: 30, description: 'Sdraiati sulla panca, porta il bilanciere sopra la testa. Piega i gomiti portando il peso verso la fronte, poi estendi.' }
    ]
  },
  {
    id: '2',
    name: 'Allenamento Gambe',
    status: 'pending',
    muscleGroups: ['Quadricipiti', 'Femorali', 'Glutei'],
    duration: 75,
    favorite: true,
    exercises: [
      { id: 'e4', name: 'Squat', sets: 5, reps: 8, weight: 100, description: 'Posiziona il bilanciere sulle spalle. Scendi piegando le ginocchia fino a 90 gradi, mantieni la schiena dritta.' },
      { id: 'e5', name: 'Leg press', sets: 4, reps: 12, weight: 150, description: 'Siediti sulla leg press, posiziona i piedi sulla pedana. Spingi con forza estendendo le gambe.' }
    ]
  }
];

// Component: BottomNavigation
const BottomNavigation = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'history', icon: FileText, label: 'Cronologia' },
    { id: 'search', icon: Search, label: 'Cerca' },
    { id: 'profile', icon: User, label: 'Profilo' }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 flex justify-around items-center z-50">
      {tabs.map(tab => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center p-2 rounded-lg transition-colors ${
              activeTab === tab.id ? 'text-blue-600' : 'text-gray-500'
            }`}
          >
            <Icon size={24} />
            <span className="text-xs mt-1">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

// Component: WorkoutCard
const WorkoutCard = ({ workout, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="min-w-[280px] bg-white rounded-xl shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow mr-4 border border-gray-100"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-semibold text-lg text-gray-800 flex-1">{workout.name}</h3>
        {workout.favorite && <Star size={20} fill="#fbbf24" className="text-yellow-400 ml-2" />}
      </div>
      <div className="flex flex-wrap gap-2 mb-3">
        {workout.muscleGroups.map((group, idx) => (
          <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {group}
          </span>
        ))}
      </div>
      <div className="flex items-center text-sm text-gray-600">
        <Dumbbell size={16} className="mr-1" />
        <span>{workout.exercises.length} esercizi</span>
        <span className="mx-2">•</span>
        <span>{workout.duration} min</span>
      </div>
    </div>
  );
};

// Screen: HomeScreen
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

// Screen: WorkoutDetailScreen
const WorkoutDetailScreen = ({ workout, setCurrentScreen, setSelectedExercise, toggleFavorite }) => {
  return (
    <div className="pb-20">
      <div className="bg-blue-600 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setCurrentScreen('home')} className="p-2">
            <ChevronLeft size={24} />
          </button>
          <div className="flex gap-2">
            <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
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

// Screen: ExerciseDetailScreen
const ExerciseDetailScreen = ({ exercise, workout, setCurrentScreen, toggleFavorite }) => {
  return (
    <div className="pb-20">
      <div className="bg-blue-600 text-white p-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => setCurrentScreen('detail')} className="p-2">
            <ChevronLeft size={24} />
          </button>
          <div className="flex gap-2">
            <button className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
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

// Screen: SearchScreen
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

// Screen: HistoryScreen
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

// Screen: ProfileScreen
const ProfileScreen = ({ workouts }) => {
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

// Screen: CreateWorkoutScreen
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

// Main App Component
const App = () => {
  const [workouts, setWorkouts] = usePersistedState('workouts', initialWorkouts);
  const [activeTab, setActiveTab] = useState('home');
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const toggleFavorite = (workoutId) => {
    setWorkouts(workouts.map(w =>
      w.id === workoutId ? { ...w, favorite: !w.favorite } : w
    ));
    if (selectedWorkout?.id === workoutId) {
      setSelectedWorkout({ ...selectedWorkout, favorite: !selectedWorkout.favorite });
    }
  };

  const addWorkout = (workout) => {
    setWorkouts([...workouts, workout]);
  };

  useEffect(() => {
    if (activeTab === 'home') setCurrentScreen('home');
    else if (activeTab === 'history') setCurrentScreen('history');
    else if (activeTab === 'search') setCurrentScreen('search');
    else if (activeTab === 'profile') setCurrentScreen('profile');
  }, [activeTab]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen workouts={workouts} setCurrentScreen={setCurrentScreen} setSelectedWorkout={setSelectedWorkout} />;
      case 'detail':
        return <WorkoutDetailScreen workout={selectedWorkout} setCurrentScreen={setCurrentScreen} setSelectedExercise={setSelectedExercise} toggleFavorite={toggleFavorite} />;
      case 'exercise':
        return <ExerciseDetailScreen exercise={selectedExercise} workout={selectedWorkout} setCurrentScreen={setCurrentScreen} toggleFavorite={toggleFavorite} />;
      case 'search':
        return <SearchScreen workouts={workouts} setCurrentScreen={setCurrentScreen} setSelectedWorkout={setSelectedWorkout} setSelectedExercise={setSelectedExercise} />;
      case 'history':
        return <HistoryScreen workouts={workouts} setCurrentScreen={setCurrentScreen} setSelectedWorkout={setSelectedWorkout} />;
      case 'profile':
        return <ProfileScreen workouts={workouts} />;
      case 'create':
        return <CreateWorkoutScreen setCurrentScreen={setCurrentScreen} addWorkout={addWorkout} />;
      default:
        return <HomeScreen workouts={workouts} setCurrentScreen={setCurrentScreen} setSelectedWorkout={setSelectedWorkout} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderScreen()}
      <BottomNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default App;