'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';

export default function Metronome() {
  const [bpm, setBpm] = useState(100);
  const [isPlaying, setIsPlaying] = useState(false);
  const [beat, setBeat] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const timerRef = useRef<number | null>(null);

  const initAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  };

  const playClick = (isAccent: boolean) => {
    if (!audioContextRef.current) return;
    const osc = audioContextRef.current.createOscillator();
    const gain = audioContextRef.current.createGain();
    
    osc.connect(gain);
    gain.connect(audioContextRef.current.destination);
    
    osc.frequency.value = isAccent ? 1200 : 800;
    gain.gain.setValueAtTime(0.8, audioContextRef.current.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 0.1);
    
    osc.start();
    osc.stop(audioContextRef.current.currentTime + 0.1);
  };

  useEffect(() => {
    if (isPlaying) {
      const interval = 60000 / bpm;
      timerRef.current = window.setInterval(() => {
        setBeat((prev) => {
          const nextBeat = (prev % 4) + 1;
          playClick(nextBeat === 1);
          return nextBeat;
        });
      }, interval);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setBeat(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, bpm]);

  const handlePlay = () => {
    initAudio();
    setIsPlaying(!isPlaying);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setBpm(100);
    setBeat(0);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-serif font-bold text-white drop-shadow-md">Web Metronome</h2>
        <button onClick={handleReset} className="p-2 text-gray-400 hover:text-white transition-colors">
          <RotateCcw className="h-5 w-5" />
        </button>
      </div>

      {/* Beat Indicators */}
      <div className="flex justify-center gap-4 mb-10">
        {[1, 2, 3, 4].map((num) => (
          <div
            key={num}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-100 ${
              beat === num
                ? num === 1 
                  ? 'bg-cyan-400 text-black shadow-[0_0_20px_rgba(34,211,238,0.8)] scale-110' 
                  : 'bg-purple-400 text-black shadow-[0_0_20px_rgba(192,132,252,0.8)] scale-110'
                : 'bg-white/10 text-gray-500 border border-white/5'
            }`}
          >
            {num}
          </div>
        ))}
      </div>

      {/* BPM Display & Slider */}
      <div className="text-center mb-8">
        <div className="text-6xl font-bold text-white drop-shadow-lg mb-2">
          {bpm} <span className="text-2xl text-gray-400 font-normal">BPM</span>
        </div>
        <input
          type="range"
          min="30"
          max="240"
          value={bpm}
          onChange={(e) => setBpm(Number(e.target.value))}
          className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-2">
          <span>30</span>
          <span>120</span>
          <span>240</span>
        </div>
      </div>

      {/* Play Button */}
      <div className="flex justify-center">
        <button
          onClick={handlePlay}
          className={`flex items-center gap-3 px-10 py-4 rounded-full text-lg font-bold transition-all transform hover:scale-105 ${
            isPlaying
              ? 'bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30'
              : 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg hover:shadow-cyan-500/25'
          }`}
        >
          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          {isPlaying ? 'Stop' : 'Start'}
        </button>
      </div>
    </div>
  );
}
