import { useState, useEffect } from 'react'
import { Cog } from 'lucide-react'
import ProgramBuilder from './components/ProgramBuilder'
import ActiveWorkout from './components/ActiveWorkout'
import Settings from './components/Settings'
import { exportWorkoutToExcel } from './utils/exportToExcel'

function App() {
  const [view, setView] = useState('programs')
  const [programs, setPrograms] = useState([])
  const [activeProgram, setActiveProgram] = useState(null)
  const [workoutHistory, setWorkoutHistory] = useState([])
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    const savedPrograms = JSON.parse(localStorage.getItem('workoutPrograms') || '[]')
    const savedHistory = JSON.parse(localStorage.getItem('workoutHistory') || '[]')
    setPrograms(savedPrograms)
    setWorkoutHistory(savedHistory)

    const savedImage = localStorage.getItem('backgroundImage')
    if (savedImage && document.querySelector('#background-image')) {
      document.querySelector('#background-image').src = savedImage
    }
  }, [])

  const handleCompleteWorkout = (workout) => {
    const newHistory = [...workoutHistory, workout]
    setWorkoutHistory(newHistory)
    localStorage.setItem('workoutHistory', JSON.stringify(newHistory))
    setActiveProgram(null)
    setView('programs')
  }

  return (
    <div className="min-h-screen bg-black text-white relative">
      {/* Hero baggrundsbillede */}
      <div className="absolute inset-0 z-0">
        <img
          id="background-image"
          src={localStorage.getItem('backgroundImage') || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1080&h=1350&fit=crop'}
          alt="Background"
          className="w-full h-[100vh] object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/70 to-black" />
      </div>

      {/* Hovedindhold */}
      <div className="relative z-10">
        <div className="max-w-md mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-8 text-center text-white drop-shadow-lg">
            Trænings Tracker
          </h1>

          {view !== 'workout' && (
            <div className="flex items-center gap-1 mb-8 bg-zinc-900/80 backdrop-blur-sm p-1 rounded-xl">
              <button
                onClick={() => setView('programs')}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                  view === 'programs' 
                    ? 'bg-white text-black' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Programmer
              </button>
              <button
                onClick={() => setView('create')}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                  view === 'create' 
                    ? 'bg-white text-black' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Opret nyt
              </button>
              <button
                onClick={() => setView('history')}
                className={`flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors ${
                  view === 'history' 
                    ? 'bg-white text-black' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Historik
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="text-gray-400 hover:text-white p-2 rounded-lg"
              >
                <Cog size={20} />
              </button>
            </div>
          )}

          {showSettings && (
            <Settings onClose={() => setShowSettings(false)} />
          )}

          {view === 'create' && <ProgramBuilder />}
        
          {view === 'workout' && activeProgram && (
            <ActiveWorkout 
              program={activeProgram}
              onComplete={handleCompleteWorkout}
              onCancel={() => {
                setActiveProgram(null)
                setView('programs')
              }}
            />
          )}
        
          {view === 'programs' && (
            <div className="space-y-4">
              {programs.map(program => (
                <div key={program.id} className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-1">{program.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {program.exercises.length} øvelser
                  </p>
                  <button 
                    onClick={() => {
                      setActiveProgram(program)
                      setView('workout')
                    }}
                    className="w-full bg-white text-black py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors"
                  >
                    Start træning
                  </button>
                </div>
              ))}
            </div>
          )}

          {view === 'history' && (
            <div className="space-y-4">
              {workoutHistory.map((workout, index) => (
                <div key={index} className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{workout.programName}</h3>
                      <p className="text-gray-400 text-sm">
                        {new Date(workout.date).toLocaleDateString('da-DK')}
                      </p>
                    </div>
                    <button
                      onClick={() => exportWorkoutToExcel(workout)}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      Eksportér
                    </button>
                  </div>
                  <div className="space-y-3">
                    {workout.exercises.map((exercise, exIndex) => (
                      <div key={exIndex} className="border-t border-zinc-800 pt-3">
                        <p className="font-medium mb-1">{exercise.name}</p>
                        <p className="text-gray-400 text-sm">
                          Resultater: {exercise.setResults.join(', ')} reps
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App