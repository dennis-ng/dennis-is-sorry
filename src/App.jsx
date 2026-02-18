import React, { useState } from 'react'
import confetti from 'canvas-confetti'
import { Heart, HeartCrack, Sparkles } from 'lucide-react'
import begImg from './assets/beg.jpg'

const PLEADING_MESSAGES = [
  "Are you sure? 🥺",
  "Pllleeeeaaassseee? 🥺",
  "I'll give you Chateraise ice cream! 🍦",
  "I'll give you a long massage! 💆‍♂️",
  "I'll be extra good, I promise! ✨",
  "Please don't break my heart... 💔",
  "You're being mean! 😭",
  "I'm gonna cry... 😿",
  "PLEASE PLEASE PLEASE! 🙏",
  "I love you! ❤️",
  "You're the best, please forgive me! ✨",
  "I'll be your bestest friend ever! 🧸",
  "Don't do this to me... 🥺",
  "Look at my puppy eyes! 🐶",
  "I'll listen to everything you say! 👂",
  "I'll be your biggest fan! 📣",
]

export default function App() {
  const [noCount, setNoCount] = useState(0)
  const [yesPressed, setYesPressed] = useState(false)
  
  // Yes button grows significantly
  const yesButtonSize = noCount * 40 + 16
  // No button shrinks exponentially
  const noButtonSize = Math.max(2, 16 * Math.pow(0.85, noCount))
  const noButtonPaddingY = Math.max(1, 8 * Math.pow(0.85, noCount))
  const noButtonPaddingX = Math.max(2, 24 * Math.pow(0.85, noCount))

  const handleNoClick = () => {
    setNoCount(noCount + 1)
  }

  const handleYesClick = () => {
    setYesPressed(true)
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffafbd', '#ffc3a0', '#ff6b6b']
    })
  }

  if (yesPressed) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-pink-50 animate-in fade-in duration-1000 overflow-hidden">
        <div className="bg-white p-12 rounded-3xl shadow-2xl border-4 border-pink-200 flex flex-col items-center text-center gap-6 transform hover:scale-105 transition-transform duration-300 z-10">
          <Sparkles className="text-pink-500 w-20 h-20 animate-bounce" />
          <h1 className="text-5xl font-bold text-pink-600 font-serif">Yay! Thank you! 💖</h1>
          <p className="text-2xl text-pink-400 font-medium">I knew you'd forgive me! I love you so much! ✨</p>
          <div className="flex gap-4">
            <Heart className="text-red-500 fill-red-500 w-12 h-12 animate-pulse" />
            <Heart className="text-pink-500 fill-pink-500 w-12 h-12 animate-pulse delay-75" />
            <Heart className="text-rose-400 fill-rose-400 w-12 h-12 animate-pulse delay-150" />
          </div>
        </div>
      </div>
    )
  }

  const currentPleadingMessage = noCount === 0 ? "" : PLEADING_MESSAGES[(noCount - 1) % PLEADING_MESSAGES.length]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 p-4 font-sans selection:bg-pink-200 overflow-hidden relative">
      <div className="max-w-md w-full bg-white p-10 rounded-3xl shadow-xl border-4 border-pink-100 flex flex-col items-center text-center gap-8 relative z-10">
        <div className="relative">
          {noCount > 8 ? (
            <HeartCrack className="w-24 h-24 text-pink-400 animate-bounce" />
          ) : (
            <Heart className="w-24 h-24 text-pink-500 fill-pink-100 animate-pulse" />
          )}
        </div>

        <h1 className="text-4xl font-bold text-gray-800 leading-tight">
          Forgive me? 🥺
        </h1>

        {noCount > 0 && (
          <div className="w-full max-w-[250px] animate-in zoom-in duration-500">
            <img 
              src={begImg} 
              alt="Pleading" 
              className="rounded-2xl shadow-md border-4 border-pink-100 w-full h-auto"
            />
          </div>
        )}

        {noCount > 0 && (
          <div className="min-h-[40px] flex items-center justify-center">
            <p className="text-xl text-pink-500 font-medium animate-bounce italic">
              {currentPleadingMessage}
            </p>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-6 w-full min-h-[150px] relative">
          <button
            onClick={handleYesClick}
            style={{ 
              fontSize: `${yesButtonSize}px`,
              transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-8 rounded-full shadow-lg hover:shadow-xl transform active:scale-95 z-20 whitespace-nowrap"
          >
            Yes
          </button>

          <button
            onClick={handleNoClick}
            className="bg-pink-500 hover:bg-pink-600 text-white font-bold rounded-full shadow-md hover:shadow-lg transform active:scale-95 transition-all duration-200 z-10"
            style={{ 
              fontSize: `${noButtonSize}px`,
              paddingTop: `${noButtonPaddingY}px`,
              paddingBottom: `${noButtonPaddingY}px`,
              paddingLeft: `${noButtonPaddingX}px`,
              paddingRight: `${noButtonPaddingX}px`,
              opacity: Math.max(0.1, 1 - noCount * 0.03)
            }}
          >
            No
          </button>
        </div>

        {noCount > 5 && (
          <p className="text-pink-300 text-sm italic">
            "I'm really starting to get worried... 😢"
          </p>
        )}
      </div>

      {/* Decorative background hearts that don't interfere */}
      <div className="absolute top-10 left-10 text-pink-200 rotate-12 opacity-50">
         <Heart size={64} fill="currentColor" />
      </div>
      <div className="absolute bottom-10 right-10 text-pink-200 -rotate-12 opacity-50">
         <Heart size={64} fill="currentColor" />
      </div>
      <div className="absolute top-1/2 left-20 text-pink-100 rotate-45 opacity-30">
         <Heart size={48} fill="currentColor" />
      </div>
    </div>
  )
}
