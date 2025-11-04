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