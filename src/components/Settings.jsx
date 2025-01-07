import { useState } from 'react'

function Settings({ onClose }) {
  const [backgroundImage, setBackgroundImage] = useState(null)

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB
        alert('Billedet må maksimalt være 5MB')
        return
      }

      const img = new Image()
      img.onload = () => {
        if (img.width < 640 || img.height < 960) {
          alert('Billedet skal minimum være 640x960 pixels')
          return
        }
        
        const reader = new FileReader()
        reader.onloadend = () => {
          localStorage.setItem('backgroundImage', reader.result)
          setBackgroundImage(reader.result)
          window.location.reload()
        }
        reader.readAsDataURL(file)
      }
      img.src = URL.createObjectURL(file)
    }
  }

  return (
    <div className="bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">Indstillinger</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">
            Baggrundsbillede
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full text-sm text-gray-400
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-white file:text-black
              hover:file:bg-gray-100"
          />
          <p className="mt-2 text-xs text-gray-500">
            Anbefalet størrelse: minimum 640x960 pixels, max 5MB
          </p>
        </div>
        
        <button
          onClick={onClose}
          className="w-full bg-white text-black py-3 rounded-xl font-medium hover:bg-gray-100 transition-colors"
        >
          Luk
        </button>
      </div>
    </div>
  )
}

export default Settings