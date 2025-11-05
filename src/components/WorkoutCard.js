import { Star, Dumbbell } from 'lucide-react';

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

export default WorkoutCard;