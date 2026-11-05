/**
 * Centralized Birthday Personalization Configuration
 * 
 * Customize this file to personalize the entire birthday experience!
 * All names, dates, memories, photos, letters, and custom wishes can be adjusted here.
 */

export interface MemoryItem {
  id: string
  title: string
  date?: string
  caption: string
  image: string
  tag: string
  note?: string
}

export interface SurpriseWish {
  id: string
  title: string
  message: string
  icon?: string
}

export interface BirthdayConfig {
  recipient: {
    name: string
    nickname: string
    title: string // e.g. "The Brightest Star in the Universe"
    birthDate: string
    age?: number | string
  }
  cinematicIntro: {
    teaserQuote: string
    preludeText: string
    buttonText: string
  }
  hero: {
    headline: string
    highlightWord: string
    subheadline: string
    badgeText: string
  }
  cake: {
    candleCount: number
    blowInstructions: string
    celebrationText: string
    flavorTitle: string
  }
  letter: {
    senderName: string
    envelopeLabel: string
    waxSealInitials: string
    salutation: string
    paragraphs: string[]
    closing: string
    signature: string
    postScript?: string
  }
  memories: {
    sectionTitle: string
    sectionSubtitle: string
    items: MemoryItem[]
  }
  wishingJar: {
    title: string
    subtitle: string
    reasons: SurpriseWish[]
  }
  finale: {
    title: string
    message: string
    toastText: string
    replayButtonText: string
    farewellWish: string
  }
  audio: {
    ambientVolume: number
    soundEffectsEnabled: boolean
  }
}

export const birthdayData: BirthdayConfig = {
  recipient: {
    name: "Alex",
    nickname: "Lexi",
    title: "To an Extraordinary Soul",
    birthDate: "Today",
    age: "Another Glorious Year",
  },
  cinematicIntro: {
    teaserQuote: "Some people bring a light so great to the world that even after they have gone, the light remains.",
    preludeText: "Tonight, the stars align just for you.",
    buttonText: "Open Your Surprise ✨",
  },
  hero: {
    headline: "Happy Birthday,",
    highlightWord: "Alex",
    subheadline: "May your day be filled with endless wonder, boundless joy, and all the magic you bring into the world.",
    badgeText: "✨ A Chapter of New Adventures Begins",
  },
  cake: {
    candleCount: 5,
    blowInstructions: "Click or tap the candles to make a wish and blow them out!",
    celebrationText: "🎉 Make a wish! May every single dream of yours come true!",
    flavorTitle: "Triple-Layer Velvet & Stardust Cake",
  },
  letter: {
    senderName: "With All My Love",
    envelopeLabel: "For Your Eyes Only",
    waxSealInitials: "★",
    salutation: "Dearest Alex,",
    paragraphs: [
      "On this special day, I wanted to pause time for a moment and celebrate everything that makes you so deeply special. Your laughter brightens the darkest rooms, and your kindness leaves an indelible warmth everywhere you go.",
      "Looking back at the memories we've shared, every adventure and late-night conversation feels like a treasure. You have this rare gift of making everyone around you feel valued, understood, and inspired.",
      "As you step into this next year of your life, I hope you chase every wild dream fearlessly. May you be greeted with unexpected miracles, profound peace, radiant health, and happiness that overflows.",
      "Thank you for being the incredible person you are. The world is undeniably brighter, gentler, and more wonderful simply because you are in it."
    ],
    closing: "Always cheering for you,",
    signature: "Your Best Friend",
    postScript: "P.S. Don't forget to eat an extra slice of cake today! 🎂",
  },
  memories: {
    sectionTitle: "Treasured Moments & Memories",
    sectionSubtitle: "Snapshots of laughter, spontaneous adventures, and milestones along the way.",
    items: [
      {
        id: "mem-1",
        title: "Golden Hour Escapes",
        date: "Summer Evenings",
        caption: "Chasing sunsets that painted the sky in shades of amber and gold.",
        image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80",
        tag: "Adventure",
        note: "Remember how we lost track of time talking about our wildest dreams?",
      },
      {
        id: "mem-2",
        title: "Coffee & Unfiltered Talks",
        date: "Crisp Autumn Mornings",
        caption: "Warm cups, steam rising, and conversations that lasted for hours.",
        image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
        tag: "Comfort",
        note: "The best conversations always started with a spontaneous coffee run.",
      },
      {
        id: "mem-3",
        title: "Starlit Campfire Nights",
        date: "Under the Constellations",
        caption: "Crackle of the fire and a sky overflowing with diamond stars.",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
        tag: "Wonder",
        note: "We spotted three shooting stars that night.",
      },
      {
        id: "mem-4",
        title: "The Unplanned Road Trip",
        date: "Spring Escapes",
        caption: "Windows down, playlists on repeat, and zero destinations in mind.",
        image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80",
        tag: "Freedom",
        note: "Pure freedom, endless laughs, and wrong turns that turned out to be the right ones.",
      },
      {
        id: "mem-5",
        title: "Celebrations & Milestones",
        date: "Unforgettable Wins",
        caption: "Toasting to every hurdle overcome and every dream achieved.",
        image: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80",
        tag: "Joy",
        note: "Proud of you then, proud of you now, proud of you always.",
      },
      {
        id: "mem-6",
        title: "Quiet Reflections",
        date: "Peaceful Mornings",
        caption: "Finding beauty in simplicity, quiet moments of clarity and peace.",
        image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
        tag: "Serenity",
        note: "A reminder of the inner peace you bring to everyone around you.",
      },
    ],
  },
  wishingJar: {
    title: "The Wishing Star Jar",
    subtitle: "Click each star to unlock a special reason why you are cherished.",
    reasons: [
      {
        id: "wish-1",
        title: "Unwavering Kindness",
        message: "You treat everyone with empathy and generosity that never goes unnoticed.",
        icon: "heart",
      },
      {
        id: "wish-2",
        title: "Contagious Laughter",
        message: "Your laugh has an irresistible energy that can turn anyone's day around.",
        icon: "sparkles",
      },
      {
        id: "wish-3",
        title: "Resilience & Grace",
        message: "Whatever storms come your way, you handle them with remarkable poise.",
        icon: "shield",
      },
      {
        id: "wish-4",
        title: "Pure Authenticity",
        message: "You stay true to yourself in a world that constantly tries to change people.",
        icon: "star",
      },
      {
        id: "wish-5",
        title: "Dreamer & Doer",
        message: "You dream big and you back it up with grit, passion, and heart.",
        icon: "compass",
      },
      {
        id: "wish-6",
        title: "The Best Listener",
        message: "You listen with your whole heart and remember the little things that matter.",
        icon: "gem",
      },
    ],
  },
  finale: {
    title: "May Your Year Be As Bright As You Are",
    message: "Here's to new memories, bold adventures, and all the love you deserve.",
    toastText: "Cheers to you on your birthday! 🥂",
    replayButtonText: "Experience the Magic Again ↺",
    farewellWish: "Made with all my heart just for you.",
  },
  audio: {
    ambientVolume: 0.3,
    soundEffectsEnabled: true,
  },
}
