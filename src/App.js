import { useState, useEffect } from 'react';
import BottomNavigation from '../src/components/BottomNavigation';
import HomeScreen from '../src/screens/HomeScreen';
import WorkoutDetailScreen from '../src/screens/WorkoutDetailScreen';
import ExerciseDetailScreen from '../src/screens/ExerciseDetailScreen';
import SearchScreen from '../src/screens/SearchScreen';
import HistoryScreen from '../src/screens/HistoryScreen';
import ProfileScreen from '../src/screens/ProfileScreen';
import CreateWorkoutScreen from './screens/CreateWorkoutScreen';
import { dummyData } from './utility/constants';


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
const initialWorkouts = dummyData;

// Main App Component
const App = () => {
  const [workouts, setWorkouts] = usePersistedState('workouts', initialWorkouts);
  const [activeTab, setActiveTab] = useState('home');
  const [currentScreen, setCurrentScreen] = useState('home');
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [editMode, setEditMode] = useState(false);

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

  const updateWorkout = (updatedWorkout) => {
  setWorkouts(workouts.map(w => 
    w.id === updatedWorkout.id ? updatedWorkout : w
  ));
  setSelectedWorkout(updatedWorkout);
};

const deleteWorkout = (workoutId) => {
  setWorkouts(workouts.filter(w => w.id !== workoutId));
};

const updateExerciseInWorkout = (workoutId, exerciseId, updatedExercise) => {
  const updatedWorkouts = workouts.map(workout => {
    if (workout.id === workoutId) {
      return {
        ...workout,
        exercises: workout.exercises.map(ex => 
          ex.id === exerciseId ? updatedExercise : ex
        )
      };
    }
    return workout;
  });
  
  setWorkouts(updatedWorkouts);
  
  // Aggiorna anche il workout selezionato
  const updatedWorkout = updatedWorkouts.find(w => w.id === workoutId);
  setSelectedWorkout(updatedWorkout);
  setSelectedExercise(updatedExercise);
};

const deleteExerciseFromWorkout = (workoutId, exerciseId) => {
  const updatedWorkouts = workouts.map(workout => {
    if (workout.id === workoutId) {
      return {
        ...workout,
        exercises: workout.exercises.filter(ex => ex.id !== exerciseId)
      };
    }
    return workout;
  });
  
  setWorkouts(updatedWorkouts);
  
  // Aggiorna anche il workout selezionato
  const updatedWorkout = updatedWorkouts.find(w => w.id === workoutId);
  setSelectedWorkout(updatedWorkout);
};

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen workouts={workouts} setCurrentScreen={setCurrentScreen} setSelectedWorkout={setSelectedWorkout} />;
      case 'detail':
        return <WorkoutDetailScreen workout={selectedWorkout} setCurrentScreen={setCurrentScreen} setSelectedExercise={setSelectedExercise} toggleFavorite={toggleFavorite} setEditMode={setEditMode} updateWorkout={updateWorkout} deleteWorkout={deleteWorkout}/>;
      case 'exercise':
        return <ExerciseDetailScreen exercise={selectedExercise} workout={selectedWorkout} setCurrentScreen={setCurrentScreen} toggleFavorite={toggleFavorite} setEditMode={setEditMode} updateExerciseInWorkout={updateExerciseInWorkout} deleteExerciseFromWorkout={deleteExerciseFromWorkout}/>;
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