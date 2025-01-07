import { useState } from 'react'
import { Save } from 'lucide-react'

function ActiveWorkout({ program, onComplete, onCancel }) {
  const [exerciseResults, setExerciseResults] = useState(
    program.exercises.map(exercise => ({
      ...exercise,
      setResults: Array(Number(exercise.sets)).fill('')
    }))
  )

  const updateSetResult = (exerciseIndex, setIndex, reps) => {
    setExerciseResults(prev => {
      const newResults = [...prev]
      newResults[exerciseIndex] = {
        ...newResults[exerciseIndex],
        setResults: newResults[exerciseIndex].setResults.map((set, idx) =>
          idx === setIndex ? reps : set
        )
      }
      return newResults
    })
  }

  const handleComplete = () => {
    const workoutResult = {
      programId: program.id,
      programName: program.name,
      date: new Date().toISOString(),
      exercises: exerciseResults,
    }
    onComplete(workoutResult)
  }

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-6">{program.name}</h2>
        
        {exerciseResults.map((exercise, exerciseIndex) => (
          <div key={exercise.id} className="mb-8 bg-zinc-900 rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-2">{exercise.name}</h3>
            <p className="text-gray-400 text-sm mb-4">
              Mål: {exercise.sets} sæt × {exercise.reps} reps
              {exercise.weight && ` @ ${exercise.weight}kg`}
            </p>
            
            <div className="space-y-3">
              {exercise.setResults.map((result, setIndex) => (
                <div key={setIndex} className="flex items-center gap-4">
                  <span className="text-gray-400 w-12">Sæt {setIndex + 1}</span>
                  <input
                    type="number"
                    value={result}
                    onChange={(e) => updateSetResult(exerciseIndex, setIndex, e.target.value)}
                    placeholder="Reps"
                    className="w-20 bg-zinc-800 text-white rounded-lg p-3 text-center"
                    pattern="[0-9]*"
                    inputMode="numeric"
                  />
                  <span className="text-gray-400">reps</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-black border-t border-zinc-900">
          <div className="max-w-md mx-auto flex gap-4">
            <button
              onClick={handleComplete}
              className="flex-1 bg-white text-black py-4 rounded-xl font-medium"
            >
              Afslut træning
            </button>
            <button
              onClick={onCancel}
              className="flex-1 bg-zinc-900 text-white py-4 rounded-xl font-medium"
            >
              Annuller
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ActiveWorkout