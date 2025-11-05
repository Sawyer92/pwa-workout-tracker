export const dummyData = [
  {
    id: '1',
    name: 'Allenamento Petto, Spalle e Tricipiti',
    status: 'pending',
    muscleGroups: ['Petto', 'Spalle','Tricipiti'],
    duration: 60,
    favorite: false,
    exercises: [
      { id: 'e1', name: 'Panca Piana', sets: 3, reps: 12, weight: 12, description: 'Partire da 12kg e progredire di 2kg alla volta fino a 16kg.' },
      { id: 'e2', name: 'Panca a 45°', sets: 3, reps: 12, weight: 14, description: 'Partire da 14kg e progredire di 2kg alla volta fino a 18kg.' },
      { id: 'e3', name: 'Chest Press', sets: 3, reps: 12, weight: 12.5, description: 'Partire da 12,5kg per lato e progredire di 2,5kg alla volta.' },
      { id: 'e4', name: 'Lento Manubri', sets: 3, reps: 12, weight: 10, description: 'Partire da 10kg e progredire di 2kg alla volta fino a 14kg.' },
      { id: 'e5', name: 'Alzate Frontali', sets: 3, reps: 12, weight: 6, description: 'Partire da 6kg e progredire di 2kg alla volta fino a 10kg.' },
      { id: 'e6', name: 'Alzate Laterali', sets: 3, reps: 12, weight: 8, description: 'Partire da 8kg e progredire di 2kg alla volta fino a 12kg.' },
      { id: 'e7', name: 'Croci ai cavi', sets: 3, reps: 12, weight: 10, description: 'Partire da 10kg e aumentare fino a 15kg.' },
      { id: 'e8', name: 'Parallele', sets: 3, reps: 12, weight: 30, description: 'Partire da 30kg e scendere fino a 20kg.' },
      { id: 'e9', name: 'Tricipiti ai cavi alti', sets: 4, reps: 12, weight: 20, description: 'Partire da 20kg e progredire fino a 30-35kg.' }

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
      { id: 'e10', name: 'Squat', sets: 3, reps: 12, weight: 20, description: 'Partire da 20kg e aumentare di 2,5kg per lato' },
      { id: 'e11', name: 'Leg press', sets: 3, reps: 12, weight: 130, description: 'Partenza da 130kg (65 per gamba) e incrementare di 10kg per gamba a set' },
      { id: 'e12', name: 'Leg extension', sets: 3, reps: 12, weight: 40, description: 'Partenza da 40kg e incrementare di 10kg a set' },
      { id: 'e13', name: 'Affondo con manubri', sets: 3, reps: 12, weight: 8, description: 'Partenza da 8kg e incrementare di 2kg a set' },
      { id: 'e14', name: 'Leg curl', sets: 3, reps: 12, weight: 20, description: 'Partenza da 20kg e incrementare di 5kg a set' },
      { id: 'e15', name: 'Polpacci', sets: 4, reps: 12, weight: 80, description: 'Partenza da 80kg e incrementare di 10kg per gamba a set' },
    
    ]
  },
   {
    id: '3',
    name: 'Allenamento Dorso e Bicipiti',
    status: 'active',
    muscleGroups: ['Dorso', 'Spalle', 'Bicipiti'],
    duration: 75,
    favorite: true,
    exercises: [
      { id: 'e16', name: 'Lat Machine', sets: 3, reps: 12, weight: 7.5, description: 'Partire da 7.5kg per lato e aumentare di 2,5kg per lato' },
      { id: 'e17', name: 'Pulley', sets: 3, reps: 12, weight: 35, description: 'Partenza da 35kg e incrementare di 10kg' },
      { id: 'e18', name: 'Low-Row', sets: 3, reps: 12, weight: 20, description: 'Partenza da 20kg e incrementare di 5kg per lato a set' },
      { id: 'e19', name: 'Curl Manubri', sets: 3, reps: 12, weight: 10, description: 'Partenza da 10kg e incrementare di 2kg a set' },
      { id: 'e20', name: 'Curl ai Cavi', sets: 3, reps: 12, weight: 20, description: 'Partenza da 20kg e incrementare di 5kg a set' },
      { id: 'e21', name: 'Curl Martello', sets: 3, reps: 12, weight: 10, description: 'Partenza da 10kg e incrementare di 2kg a set' },
      { id: 'e22', name: 'Pec Fly', sets: 3, reps: 12, weight: 15, description: 'Partenza da 15kg e incrementare di 5kg a set' },
      
    ]
  }
];