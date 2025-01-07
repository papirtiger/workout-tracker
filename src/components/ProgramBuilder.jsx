import { useState } from 'react'
import { Plus, Save } from 'lucide-react'
import WorkoutForm from './WorkoutForm'

function ProgramBuilder({ onClose }) {
  const [programName, setProgramName] = useState('')
  const [exercises, setExercises] = useState([])

  const addExercise = (exercise) => {
    setExercises([...exercises, { ...exercise, id: Date.now() }])
  }

  const handleSave = () => {
    if (!programName.trim() || exercises.length === 0) return

    const program = {
      id: Date.now(),
      name: programName,
      exercises: exercises,
      createdAt: new Date().toISOString()
    }

    const existingPrograms = JSON.parse(localStorage.getItem('workoutPrograms') || '[]')
    localStorage.setItem('workoutPrograms', JSON.stringify([...existingPrograms, program]))

    setProgramName('')
    setExercises([])
    onClose?.()
  }

  return (
    <div className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">Opret nyt program</h2>
      
      <div className="space-y-4">
        <input
          type="text"
          placeholder="Programnavn"
          value={programName}
          onChange={(e) => setProgramName(e.target.value)}
          className="w-full p-3 rounded-lg"
        />

        <WorkoutForm onSubmit={addExercise} />

        <div className="mt-6 space-y-3">
          {exercises.map((exercise, index) => (
            <div key={index} className="bg-zinc-800 p-3 rounded-lg">
              <p className="font-medium">{exercise.name}</p>
              <p className="text-sm text-gray-400">
                {exercise.sets} sæt × {exercise.reps} reps
                {exercise.weight && ` @ ${exercise.weight}kg`}
              </p>
            </div>
          ))}
        </div>

        {exercises.length > 0 && (
          <button
            onClick={handleSave}
            className="w-full bg-white text-black py-3 rounded-xl font-medium"
          >
            <Save className="inline-block mr-2" size={20} />
            Gem program
          </button>
        )}
      </div>
    </div>
  )
}

export default ProgramBuilder