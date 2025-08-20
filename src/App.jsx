import './styles/App.css'
import React from 'react'
import { useTranslation } from 'react-i18next'    // react-i18next hook

function App() {

  // t translation function receives a key and returns the translated string
  // i18n object allows changing the language dynamically
  const { t, i18n } = useTranslation()

  // Function to change the language. 
  // React renders "t()" component to update the UI
  const changeLng = (lng) => {
    i18n.changeLanguage(lng)
  }

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
      {/* Title */}
      <h1 className='text-3xl font-bold mb-4'>{t("welcome")}</h1>

      <div className='space-x-2'>

        {/* Buttons switch languages */}
        <button
          className='px-4 py-2 bg-blue-500 text-white rounded'
          onClick={() => changeLng('pt')}
        >PT</button>

        <button
          className='px-4 py-2 bg-blue-500 text-white rounded'
          onClick={() => changeLng('es')}
        >ES</button>
        <button
          className='px-4 py-2 bg-blue-500 text-white rounded'
          onClick={() => changeLng('en')}
        >EN</button>


      </div>
    </div>
  )
}

export default App
