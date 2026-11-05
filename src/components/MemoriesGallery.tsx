import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, X, Sparkles, Calendar, Tag, ZoomIn } from 'lucide-react'
import { birthdayData, type MemoryItem } from '../config/birthdayData'
import { playPopSound } from '../creative/soundEffects'

export const MemoriesGallery: React.FC = () => {
  const { memories } = birthdayData
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null)
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({})
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({})
  const [activeCategory, setActiveCategory] = useState<string>('All')

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(memories.items.map((m) => m.tag)))]

  // Filter items
  const filteredItems = activeCategory === 'All'
    ? memories.items
    : memories.items.filter((item) => item.tag === activeCategory)

  // Handle Heart click with sound
  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    playPopSound()
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }))
    setLikeCounts((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + (likedMap[id] ? -1 : 1),
    }))
  }

  // Keyboard close for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedMemory(null)
      }
    }
    if (selectedMemory) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [selectedMemory])

  // Tilt variations for scrapbook feel
  const tilts = ['-rotate-2 hover:rotate-0', 'rotate-2 hover:rotate-0', '-rotate-1 hover:rotate-0', 'rotate-1 hover:rotate-0']

  return (
    <section
      id="memories-section"
      className="relative py-24 px-6 max-w-7xl mx-auto overflow-hidden"
      aria-label="Memories Scrapbook Gallery"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-medium tracking-widest uppercase mb-4 shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Polaroid Scrapbook</span>
        </div>
        <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-starlight mb-4">
          {memories.sectionTitle}
        </h2>
        <p className="text-base sm:text-lg text-champagne/80 font-light leading-relaxed">
          {memories.sectionSubtitle}
        </p>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-amber-400 text-midnight shadow-[0_0_15px_rgba(250,204,21,0.4)]'
                  : 'glass-panel text-champagne/70 hover:text-champagne hover:border-amber-400/40'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Polaroid Scrapbook Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 items-start"
      >
        {filteredItems.map((item, index) => {
          const tiltClass = tilts[index % tilts.length]
          const isLiked = !!likedMap[item.id]
          const currentLikes = (likeCounts[item.id] || 0) + (isLiked ? 1 : 0)

          return (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative bg-[#FFFDF8] rounded-xl p-4 sm:p-5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_40px_rgba(250,204,21,0.2)] transform ${tiltClass}`}
              onClick={() => setSelectedMemory(item)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setSelectedMemory(item)
                }
              }}
              aria-label={`View memory: ${item.title}`}
            >
              {/* Scrapbook Tape Effect on Top Center */}
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-amber-100/50 backdrop-blur-xs border border-amber-200/40 shadow-xs -rotate-1 rounded-[2px] z-20 pointer-events-none"
                aria-hidden="true"
              />

              {/* Photo Frame Container */}
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg bg-slate-900 mb-4">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108 brightness-95 group-hover:brightness-105"
                />

                {/* Inspect Overlay Badge */}
                <div className="absolute inset-0 bg-slate-950/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-starlight text-xs font-medium border border-white/20">
                    <ZoomIn className="w-3.5 h-3.5 text-amber-300" />
                    Inspect Memory
                  </span>
                </div>

                {/* Category Tag pill */}
                <span className="absolute top-2.5 right-2.5 px-2.5 py-0.5 rounded-full bg-slate-950/70 backdrop-blur-md text-amber-200 text-[11px] font-medium border border-amber-300/30">
                  {item.tag}
                </span>
              </div>

              {/* Polaroid Bottom Caption Area */}
              <div className="pt-1 text-slate-800">
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-slate-900 leading-tight">
                    {item.title}
                  </h3>
                  {/* Heart Reaction Button */}
                  <button
                    type="button"
                    onClick={(e) => handleLike(item.id, e)}
                    className="p-1.5 -mr-1.5 rounded-full hover:bg-rose-50 transition-colors flex items-center gap-1 text-xs"
                    aria-label={`Like memory ${item.title}`}
                  >
                    <Heart
                      className={`w-4 h-4 transition-transform active:scale-125 ${
                        isLiked
                          ? 'fill-rose-500 text-rose-500 scale-110'
                          : 'text-slate-400 hover:text-rose-400'
                      }`}
                    />
                    {currentLikes > 0 && (
                      <span className="text-[11px] font-semibold text-rose-600">
                        {currentLikes}
                      </span>
                    )}
                  </button>
                </div>

                {/* Date Tag */}
                {item.date && (
                  <p className="text-xs text-amber-700/80 font-medium mb-2 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-amber-600" />
                    <span>{item.date}</span>
                  </p>
                )}

                {/* Handwritten-feel caption */}
                <p className="font-script text-xl sm:text-2xl text-slate-700 leading-snug line-clamp-2">
                  "{item.caption}"
                </p>
              </div>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Memory Inspect Modal */}
      <AnimatePresence>
        {selectedMemory && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-midnight/85 backdrop-blur-md"
              onClick={() => setSelectedMemory(null)}
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 max-w-3xl w-full bg-[#111728] border border-amber-400/30 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedMemory(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full glass-panel text-starlight hover:text-amber-300 hover:border-amber-400/50 transition-colors"
                aria-label="Close memory modal"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Full Image */}
              <div className="relative aspect-16/9 w-full bg-slate-950 overflow-hidden">
                <img
                  src={selectedMemory.image}
                  alt={selectedMemory.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111728] via-transparent to-transparent opacity-80" />
              </div>

              {/* Details Content */}
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                      <Tag className="w-3 h-3" />
                      {selectedMemory.tag}
                    </span>
                    {selectedMemory.date && (
                      <span className="text-xs text-champagne/70 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" />
                        {selectedMemory.date}
                      </span>
                    )}
                  </div>

                  {/* Heart button inside modal */}
                  <button
                    type="button"
                    onClick={(e) => handleLike(selectedMemory.id, e)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel hover:border-rose-400/50 transition-colors"
                    aria-label="Like memory"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        likedMap[selectedMemory.id]
                          ? 'fill-rose-500 text-rose-500'
                          : 'text-champagne/70 hover:text-rose-400'
                      }`}
                    />
                    <span className="text-xs font-medium text-starlight">
                      {(likeCounts[selectedMemory.id] || 0) + (likedMap[selectedMemory.id] ? 1 : 0)}
                    </span>
                  </button>
                </div>

                <h3 id="modal-title" className="font-serif text-3xl sm:text-4xl font-bold text-starlight mb-3">
                  {selectedMemory.title}
                </h3>

                <p className="font-script text-2xl sm:text-3xl text-amber-200/90 mb-4 leading-relaxed">
                  "{selectedMemory.caption}"
                </p>

                {selectedMemory.note && (
                  <div className="mt-4 p-4 rounded-xl glass-panel border-l-4 border-l-amber-400 bg-amber-500/5">
                    <p className="text-xs font-bold tracking-wider uppercase text-amber-300 mb-1">
                      Personal Memory Note
                    </p>
                    <p className="text-sm sm:text-base text-starlight/90 italic font-light leading-relaxed">
                      {selectedMemory.note}
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}

export default MemoriesGallery
