import { useState } from 'react'
import { Plus } from 'lucide-react'

function WorkoutForm({ onSubmit }) {
  const [exercise, setExercise] = useState({
    name: '',
    sets: '',
    reps: '',
    weight: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!exercise.name || !exercise.sets || !exercise.reps) return
    
    onSubmit(exercise)
    
    // Nulstil formen
    setExercise({
      name: '',
      sets: '',
      reps: '',
      weight: ''
    })
  }

  return (
    <div className="bg-white rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Øvelsesnavn"
            value={exercise.name}
            onChange={(e) => setExercise({...exercise, name: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <input
            type="number"
            placeholder="Sæt"
            value={exercise.sets}
            onChange={(e) => setExercise({...exercise, sets: e.target.value})}
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Reps"
            value={exercise.reps}
            onChange={(e) => setExercise({...exercise, reps: e.target.value})}
            className="p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Vægt (kg)"
            value={exercise.weight}
            onChange={(e) => setExercise({...exercise, weight: e.target.value})}
            className="p-2 border rounded"
          />
        </div>
        <button 
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          Tilføj øvelse
        </button>
      </form>
    </div>
  )
}

export default WorkoutForm