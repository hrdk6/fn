/**
 * Pure Web Audio API synthesized sound generator.
 * Zero external MP3 or audio asset dependencies.
 * Ensures instant playback, offline resilience, and zero network latency.
 */

import { birthdayData } from '../config/birthdayData'

let audioCtx: AudioContext | null = null
let soundEnabled = birthdayData.audio.soundEffectsEnabled ?? true
let ambientGainNode: GainNode | null = null
let ambientTimer: number | null = null
let isAmbientPlaying = false

/**
 * Lazily obtains or creates an active AudioContext upon user gesture.
 */
function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null

  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }

  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {
      // AudioContext resume will succeed on next user interaction
    })
  }

  return audioCtx
}

export function setAudioEnabled(enabled: boolean): void {
  soundEnabled = enabled
  if (!enabled && isAmbientPlaying) {
    stopAmbientMelody()
  }
}

export function isAudioEnabled(): boolean {
  return soundEnabled
}

export function toggleAudio(): boolean {
  setAudioEnabled(!soundEnabled)
  return soundEnabled
}

/**
 * Gentle, dreamy bell/celeste chime chords
 */
export function playChimeSound(): void {
  if (!soundEnabled) return
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime
  // Dreamy celestial chord frequencies: F5 (698.46), A5 (880), C6 (1046.5), E6 (1318.5)
  const notes = [698.46, 880, 1046.5, 1318.5]

  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    const pan = ctx.createStereoPanner ? ctx.createStereoPanner() : null

    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, now + idx * 0.06)

    // Detuned overtone for crystal bell character
    const harmonic = ctx.createOscillator()
    const harmonicGain = ctx.createGain()
    harmonic.type = 'triangle'
    harmonic.frequency.setValueAtTime(freq * 2.01, now + idx * 0.06)

    const startTime = now + idx * 0.06
    const duration = 1.6

    gain.gain.setValueAtTime(0, startTime)
    gain.gain.linearRampToValueAtTime(0.12 / (idx + 1), startTime + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration)

    harmonicGain.gain.setValueAtTime(0, startTime)
    harmonicGain.gain.linearRampToValueAtTime(0.04 / (idx + 1), startTime + 0.015)
    harmonicGain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration * 0.7)

    harmonic.connect(harmonicGain)
    harmonicGain.connect(gain)

    if (pan) {
      pan.pan.value = (idx - 1.5) * 0.4
      osc.connect(gain)
      gain.connect(pan)
      pan.connect(ctx.destination)
    } else {
      osc.connect(gain)
      gain.connect(ctx.destination)
    }

    osc.start(startTime)
    harmonic.start(startTime)
    osc.stop(startTime + duration)
    harmonic.stop(startTime + duration)
  })
}

/**
 * Soft air whoosh / extinguished candle sound
 */
export function playBlowSound(): void {
  if (!soundEnabled) return
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime
  const duration = 0.65

  // Generate white noise buffer
  const bufferSize = Math.floor(ctx.sampleRate * duration)
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const output = noiseBuffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    output[i] = Math.random() * 2 - 1
  }

  const whiteNoise = ctx.createBufferSource()
  whiteNoise.buffer = noiseBuffer

  // Bandpass filter swept downwards to mimic a warm breath
  const filter = ctx.createBiquadFilter()
  filter.type = 'bandpass'
  filter.frequency.setValueAtTime(900, now)
  filter.frequency.exponentialRampToValueAtTime(150, now + duration)
  filter.Q.setValueAtTime(2.5, now)

  const gain = ctx.createGain()
  gain.gain.setValueAtTime(0.001, now)
  gain.gain.linearRampToValueAtTime(0.22, now + 0.08)
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration)

  whiteNoise.connect(filter)
  filter.connect(gain)
  gain.connect(ctx.destination)

  whiteNoise.start(now)
  whiteNoise.stop(now + duration)
}

/**
 * Crisp balloon pop with sparkle pitch
 */
export function playPopSound(): void {
  if (!soundEnabled) return
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime

  // 1. Percussive pop punch
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = 'triangle'
  osc.frequency.setValueAtTime(420, now)
  osc.frequency.exponentialRampToValueAtTime(60, now + 0.09)

  gain.gain.setValueAtTime(0.3, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09)

  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(now)
  osc.stop(now + 0.1)

  // 2. High sparkle chime tail
  const sparkle = ctx.createOscillator()
  const sparkleGain = ctx.createGain()
  sparkle.type = 'sine'
  sparkle.frequency.setValueAtTime(1400, now + 0.02)
  sparkle.frequency.exponentialRampToValueAtTime(2200, now + 0.25)

  sparkleGain.gain.setValueAtTime(0.001, now + 0.02)
  sparkleGain.gain.linearRampToValueAtTime(0.09, now + 0.04)
  sparkleGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3)

  sparkle.connect(sparkleGain)
  sparkleGain.connect(ctx.destination)
  sparkle.start(now + 0.02)
  sparkle.stop(now + 0.3)
}

/**
 * Jubilant celebration fanfare harmony
 */
export function playFanfareSound(): void {
  if (!soundEnabled) return
  const ctx = getAudioContext()
  if (!ctx) return

  const now = ctx.currentTime
  // Grand C-major pentatonic celebration arpeggio: C5, E5, G5, C6, G6
  const chords = [
    { freq: 523.25, time: 0.0, dur: 0.4 },  // C5
    { freq: 659.25, time: 0.12, dur: 0.4 }, // E5
    { freq: 783.99, time: 0.24, dur: 0.4 }, // G5
    { freq: 1046.5, time: 0.36, dur: 1.2 }, // C6
    { freq: 1318.5, time: 0.42, dur: 1.4 }, // E6
    { freq: 1567.98, time: 0.48, dur: 1.6 } // G6
  ]

  chords.forEach(({ freq, time, dur }) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(freq, now + time)

    const startTime = now + time
    gain.gain.setValueAtTime(0.001, startTime)
    gain.gain.linearRampToValueAtTime(0.14, startTime + 0.03)
    gain.gain.exponentialRampToValueAtTime(0.0001, startTime + dur)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(startTime)
    osc.stop(startTime + dur)
  })
}

/**
 * Soft, looping dreamy synth arpeggio with volume control
 */
export function startAmbientMelody(customVolume?: number): void {
  if (!soundEnabled || isAmbientPlaying) return
  const ctx = getAudioContext()
  if (!ctx) return

  const targetVolume = customVolume ?? birthdayData.audio.ambientVolume ?? 0.25

  ambientGainNode = ctx.createGain()
  ambientGainNode.gain.setValueAtTime(0.001, ctx.currentTime)
  ambientGainNode.gain.linearRampToValueAtTime(targetVolume, ctx.currentTime + 2.0)
  ambientGainNode.connect(ctx.destination)

  isAmbientPlaying = true

  // Dreamy celestial progression (Pentatonic scale notes in Hz)
  // C4, E4, G4, B4, D5, E5, G5, A5
  const scale = [261.63, 329.63, 392.00, 493.88, 587.33, 659.25, 783.99, 880.00]
  let step = 0

  const playNextNote = () => {
    if (!isAmbientPlaying || !ambientGainNode || !audioCtx) return

    const now = audioCtx.currentTime
    const noteFreq = scale[step % scale.length]
    step = (step + 1 + Math.floor(Math.random() * 3)) % scale.length

    const osc = audioCtx.createOscillator()
    const noteGain = audioCtx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(noteFreq, now)

    const noteDuration = 2.4
    noteGain.gain.setValueAtTime(0.001, now)
    noteGain.gain.linearRampToValueAtTime(0.08, now + 0.3)
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + noteDuration)

    osc.connect(noteGain)
    noteGain.connect(ambientGainNode)

    osc.start(now)
    osc.stop(now + noteDuration)

    // Schedule next note with a gentle, breathing rhythmic cadence
    const delayMs = 600 + Math.random() * 400
    ambientTimer = window.setTimeout(playNextNote, delayMs)
  }

  playNextNote()
}

/**
 * Stops the ambient melody smoothly
 */
export function stopAmbientMelody(): void {
  if (!isAmbientPlaying) return
  isAmbientPlaying = false

  if (ambientTimer !== null) {
    clearTimeout(ambientTimer)
    ambientTimer = null
  }

  if (ambientGainNode && audioCtx) {
    try {
      const now = audioCtx.currentTime
      ambientGainNode.gain.cancelScheduledValues(now)
      ambientGainNode.gain.setValueAtTime(ambientGainNode.gain.value, now)
      ambientGainNode.gain.linearRampToValueAtTime(0.0001, now + 1.2)
      setTimeout(() => {
        ambientGainNode?.disconnect()
        ambientGainNode = null
      }, 1300)
    } catch {
      ambientGainNode = null
    }
  }
}

export function isAmbientActive(): boolean {
  return isAmbientPlaying
}
