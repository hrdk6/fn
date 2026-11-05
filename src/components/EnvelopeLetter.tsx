import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Sparkles, Heart, RotateCcw } from 'lucide-react'
import { birthdayData } from '../config/birthdayData'
import { playChimeSound, playPopSound } from '../creative/soundEffects'
import confetti from 'canvas-confetti'

export const EnvelopeLetter: React.FC = () => {
  const { letter } = birthdayData
  const [isOpen, setIsOpen] = useState(false)

  const handleOpenEnvelope = () => {
    if (isOpen) return
    playPopSound()
    setTimeout(() => {
      playChimeSound()
    }, 250)

    // Gentle gold and rose confetti sprinkle
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#FDE047', '#FACC15', '#FB7185', '#FFFBEB'],
    })

    setIsOpen(true)
  }

  const handleCloseEnvelope = () => {
    playPopSound()
    setIsOpen(false)
  }

  return (
    <section
      id="envelope-section"
      className="relative py-24 px-6 max-w-5xl mx-auto flex flex-col items-center overflow-hidden"
      aria-label="Handwritten Birthday Letter"
    >
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-medium tracking-widest uppercase mb-4 shadow-sm">
          <Mail className="w-3.5 h-3.5 text-amber-300" />
          <span>A Letter From The Heart</span>
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-starlight mb-3">
          For Your Eyes Only
        </h2>
        <p className="text-base sm:text-lg text-champagne/80 font-light">
          {isOpen
            ? 'A sealed keepsake penned especially for you.'
            : 'Break the wax seal to unveil your personal birthday note.'}
        </p>
      </div>

      {/* Main Interactive Container */}
      <div className="w-full flex flex-col items-center">
        {/* Envelope & Letter Stage */}
        <div className="relative w-full max-w-2xl min-h-[480px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isOpen ? (
              /* CLOSED ENVELOPE VIEW */
              <motion.div
                key="envelope-closed"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.4 }}
                className="relative w-full max-w-lg aspect-16/10 rounded-2xl bg-gradient-to-br from-[#1c1829] via-[#241f36] to-[#151221] border-2 border-amber-400/30 p-6 sm:p-8 flex flex-col items-center justify-center shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] cursor-pointer group hover:border-amber-400/60 transition-all duration-300 hover:shadow-[0_0_35px_rgba(250,204,21,0.25)]"
                onClick={handleOpenEnvelope}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleOpenEnvelope()
                  }
                }}
                aria-label="Click to break wax seal and open envelope"
              >
                {/* Vintage Envelope Flap Lines */}
                <div
                  className="absolute inset-x-0 top-0 h-1/2 border-b-2 border-amber-400/20 pointer-events-none"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                    background: 'linear-gradient(180deg, rgba(38, 31, 56, 0.9) 0%, rgba(25, 20, 38, 0.95) 100%)',
                  }}
                  aria-hidden="true"
                />

                {/* Envelope Front Label */}
                <div className="absolute top-6 left-8 flex items-center gap-2 text-xs font-serif italic text-amber-200/60 uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300/70" />
                  <span>{letter.envelopeLabel}</span>
                </div>

                {/* Sender Tag Bottom Right */}
                <div className="absolute bottom-6 right-8 text-xs font-serif italic text-champagne/70">
                  {letter.senderName}
                </div>

                {/* Centered Crimson / Gold Wax Seal */}
                <div className="relative z-20 flex flex-col items-center mt-4">
                  <motion.div
                    whileHover={{ scale: 1.12 }}
                    whileTap={{ scale: 0.92 }}
                    className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-rose-700 via-red-800 to-rose-950 border-4 border-amber-300/80 shadow-[0_0_25px_rgba(225,29,72,0.5)] flex items-center justify-center cursor-pointer group-hover:border-amber-200"
                  >
                    {/* Inner seal ring */}
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-dashed border-amber-200/50 flex items-center justify-center">
                      <span className="text-2xl sm:text-3xl font-serif text-amber-200 drop-shadow-md select-none">
                        {letter.waxSealInitials}
                      </span>
                    </div>

                    {/* Seal gleam effect */}
                    <div className="absolute top-2 left-4 w-5 h-2.5 bg-white/30 rounded-full rotate-[-35deg] blur-xs pointer-events-none" />
                  </motion.div>

                  <span className="mt-4 text-xs font-medium tracking-widest uppercase text-amber-300/90 group-hover:text-amber-200 transition-colors animate-pulse">
                    Click Wax Seal to Open ✨
                  </span>
                </div>
              </motion.div>
            ) : (
              /* OPENED PARCHMENT LETTER VIEW */
              <motion.article
                key="letter-opened"
                initial={{ opacity: 0, y: 35, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 30, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-2xl bg-[#FFFDF5] text-slate-800 rounded-2xl p-8 sm:p-12 md:p-16 border-2 border-amber-200 shadow-[0_30px_70px_rgba(0,0,0,0.8)] overflow-hidden"
              >
                {/* Parchment Vintage Frame Border */}
                <div className="absolute inset-3 border border-amber-700/20 rounded-xl pointer-events-none" />
                <div className="absolute inset-4 border border-amber-600/10 rounded-lg pointer-events-none" />

                {/* Decorative Vintage Corner Flourishes */}
                <div className="absolute top-6 left-6 text-amber-800/20 text-xl font-serif select-none pointer-events-none">
                  ❦
                </div>
                <div className="absolute top-6 right-6 text-amber-800/20 text-xl font-serif select-none pointer-events-none">
                  ❦
                </div>
                <div className="absolute bottom-6 left-6 text-amber-800/20 text-xl font-serif select-none pointer-events-none">
                  ❦
                </div>
                <div className="absolute bottom-6 right-6 text-amber-800/20 text-xl font-serif select-none pointer-events-none">
                  ❦
                </div>

                {/* Letter Header */}
                <header className="mb-6 border-b border-amber-800/15 pb-4">
                  <div className="flex items-center justify-between text-xs font-serif text-amber-800/60 uppercase tracking-widest mb-2">
                    <span>A Keepsake Note</span>
                    <span>★ ★ ★</span>
                  </div>
                  <h3 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                    {letter.salutation}
                  </h3>
                </header>

                {/* Letter Paragraphs */}
                <div className="space-y-4 font-serif text-base sm:text-lg text-slate-700 leading-relaxed">
                  {letter.paragraphs.map((para, i) => (
                    <p key={i} className="first-letter:text-2xl first-letter:font-bold">
                      {para}
                    </p>
                  ))}
                </div>

                {/* Sign-off */}
                <footer className="mt-8 pt-4 border-t border-amber-800/15 flex flex-col items-end">
                  <span className="font-serif italic text-base text-slate-600">
                    {letter.closing}
                  </span>
                  <span className="font-script text-3xl sm:text-4xl text-amber-900 mt-1">
                    {letter.signature}
                  </span>
                </footer>

                {/* Post Script */}
                {letter.postScript && (
                  <aside className="mt-6 pt-4 border-t border-dashed border-amber-800/20 text-sm font-serif italic text-amber-900/80">
                    {letter.postScript}
                  </aside>
                )}

                {/* Action Controls: Fold Back */}
                <div className="mt-10 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={handleCloseEnvelope}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-amber-100 hover:bg-slate-800 transition-colors text-xs sm:text-sm font-medium shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
                    aria-label="Fold letter back into envelope"
                  >
                    <RotateCcw className="w-4 h-4 text-amber-400" />
                    <span>Fold Letter Back</span>
                    <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                  </button>
                </div>
              </motion.article>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default EnvelopeLetter
