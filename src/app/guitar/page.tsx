import Navbar from '@/components/Navbar';
import GuitarVideoCard from '@/components/GuitarVideoCard';
import Metronome from '@/components/Metronome';
import Tuner from '@/components/Tuner';

// Placeholder data - You will change the videoIds to your own YouTube videos!
const guitarLessons = [
  {
    id: '1',
    title: 'Helepelu Tuning',
    videoId: '7IBfWBc0TJM', // Replace with your YouTube Video ID
    level: 'Beginner',
    description: 'Learn the fundamental open chords that every guitarist needs to know to start playing songs.',
  },
  {
    id: '2',
    title: 'Blues Scale & Bending',
    videoId: 'tYU1O0_5b0I', // Replace with your YouTube Video ID
    level: 'Intermediate',
    description: 'Dive into the blues scale, learn proper string bending techniques, and add emotion to your solos.',
  },
  {
    id: '3',
    title: 'Fingerstyle Patterns',
    videoId: 'k2Q_01J9Q6w', // Replace with your YouTube Video ID
    level: 'Advanced',
    description: 'Develop independent finger control and learn beautiful, complex fingerstyle picking patterns.',
  },
  {
    id: '4',
    title: 'Music Theory for Guitarists',
    videoId: 'h4UqMyldS7Q', // Replace with your YouTube Video ID
    level: 'Intermediate',
    description: 'Understand the fretboard, learn how scales connect to chords, and unlock the neck.',
  },
];

export default function GuitarPage() {
  return (
    <main className="flex-1">
      <Navbar />
      
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight text-white drop-shadow-xl">
          FEATIKA Guitar <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Academy</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-gray-200 font-normal drop-shadow-md">
          Level up your playing with exclusive tutorials, from beginner basics to advanced shredding.
        </p>
      </section>

      {/* Video Grid */}
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <Metronome />
        <Tuner />
      </section>
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2">
          {guitarLessons.map((lesson) => (
            <GuitarVideoCard 
              key={lesson.id}
              title={lesson.title}
              videoId={lesson.videoId}
              level={lesson.level}
              description={lesson.description}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
