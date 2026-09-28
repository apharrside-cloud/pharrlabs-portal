import React, { useState } from 'react'
import { Lock, ShieldCheck, KeyRound, ArrowRight, Delete } from 'lucide-react'

interface AuthGateProps {
  onUnlock: () => void
}

const VALID_CODES = ['882400', '8824']

export const AuthGate: React.FC<AuthGateProps> = ({ onUnlock }) => {
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [useTextInput, setUseTextInput] = useState(false)

  const handleDigit = (digit: string) => {
    if (pin.length < 8) {
      const nextPin = pin + digit
      setPin(nextPin)
      setError(false)
      if (VALID_CODES.includes(nextPin.toLowerCase())) {
        successUnlock()
      } else if (nextPin.length === 6) {
        triggerError()
      }
    }
  }

  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1))
    setError(false)
  }

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (VALID_CODES.includes(pin.trim().toLowerCase())) {
      successUnlock()
    } else {
      triggerError()
    }
  }

  const triggerError = () => {
    setError(true)
    setTimeout(() => {
      setPin('')
      setError(false)
    }, 900)
  }

  const successUnlock = () => {
    if (rememberMe) {
      localStorage.setItem('pharrlabs_auth_session', JSON.stringify({
        authenticated: true,
        expiresAt: Date.now() + 30 * 24 * 60 * 60 * 1000 // 30 days
      }))
    } else {
      sessionStorage.setItem('pharrlabs_auth_session', 'true')
    }
    onUnlock()
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-[#070A10]">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-sky-500/10 via-indigo-500/10 to-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Lock Card */}
      <div className={`relative w-full max-w-sm rounded-3xl bg-[#0F172A]/80 backdrop-blur-2xl border border-slate-800/80 p-8 shadow-2xl shadow-black/80 transition-transform ${error ? 'animate-shake' : ''}`}>
        <div className="flex flex-col items-center text-center mb-6">
          <div className="relative mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 p-[2px] shadow-lg shadow-sky-500/25">
              <div className="w-full h-full bg-[#0B0F17] rounded-2xl flex items-center justify-center">
                <Lock className="w-7 h-7 text-sky-400" />
              </div>
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>

          <h1 className="text-2xl font-bold font-heading tracking-tight text-white mb-1">
            PharrLabs
          </h1>
          <p className="text-xs uppercase tracking-widest text-sky-400/90 font-medium">
            Executive Mission Control
          </p>
          <p className="text-xs text-slate-400 mt-2">
            Enter 6-digit master security PIN to unlock your application catalog.
          </p>
        </div>

        {/* PIN Indicators */}
        <div className="flex justify-center items-center gap-3 mb-6">
          {[0, 1, 2, 3, 4, 5].map(idx => (
            <div
              key={idx}
              className={`w-3.5 h-3.5 rounded-full transition-all duration-200 ${
                idx < pin.length
                  ? error
                    ? 'bg-rose-500 shadow-lg shadow-rose-500/50 scale-110'
                    : 'bg-sky-400 shadow-lg shadow-sky-400/50 scale-110'
                  : 'bg-slate-800 border border-slate-700/60'
              }`}
            />
          ))}
        </div>

        {error && (
          <p className="text-rose-400 text-xs font-medium text-center mb-4 animate-fade-in">
            Incorrect passcode. Please try again.
          </p>
        )}

        {/* Numeric Keypad vs Text Mode */}
        {!useTextInput ? (
          <div className="grid grid-cols-3 gap-2.5 mb-6">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(d => (
              <button
                key={d}
                type="button"
                onClick={() => handleDigit(d)}
                className="h-14 rounded-2xl bg-slate-800/50 hover:bg-slate-750 active:bg-slate-700/80 border border-slate-750/70 text-lg font-semibold text-white shadow-sm transition active:scale-95 flex items-center justify-center cursor-pointer"
              >
                {d}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setUseTextInput(true)}
              className="h-14 rounded-2xl bg-slate-800/30 hover:bg-slate-800/60 border border-slate-800/60 text-xs text-slate-400 hover:text-slate-200 transition flex items-center justify-center cursor-pointer"
              title="Switch to Keyboard input"
            >
              <KeyRound className="w-5 h-5 text-slate-400" />
            </button>
            <button
              type="button"
              onClick={() => handleDigit('0')}
              className="h-14 rounded-2xl bg-slate-800/50 hover:bg-slate-750 active:bg-slate-700/80 border border-slate-750/70 text-lg font-semibold text-white shadow-sm transition active:scale-95 flex items-center justify-center cursor-pointer"
            >
              0
            </button>
            <button
              type="button"
              onClick={handleDelete}
              className="h-14 rounded-2xl bg-slate-800/30 hover:bg-slate-800/60 border border-slate-800/60 text-slate-400 hover:text-rose-400 transition flex items-center justify-center cursor-pointer"
              title="Delete digit"
            >
              <Delete className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <form onSubmit={handleTextSubmit} className="space-y-4 mb-6">
            <div className="relative">
              <input
                type="password"
                value={pin}
                onChange={e => {
                  setPin(e.target.value)
                  setError(false)
                }}
                placeholder="Enter master passcode..."
                autoFocus
                className="w-full px-4 py-3 bg-slate-900/90 border border-slate-750 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-white transition cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => setUseTextInput(false)}
              className="w-full text-center text-xs text-slate-400 hover:text-sky-400 transition cursor-pointer"
            >
              Switch back to PIN keypad
            </button>
          </form>
        )}

        {/* Remember Device Toggle */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800/70 text-xs text-slate-400">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
              className="w-4 h-4 rounded border-slate-700 bg-slate-800 text-sky-500 focus:ring-0 cursor-pointer"
            />
            <span>Remember on this device</span>
          </label>
          <span className="text-[11px] text-slate-500">Auto-lock active</span>
        </div>
      </div>
    </div>
  )
}
