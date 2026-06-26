'use client';

import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, CheckCircle2 } from 'lucide-react';

// Standard tuning frequencies
const NOTE_STRINGS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export default function Tuner() {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState('--');
  const [cents, setCents] = useState(0);
  const [frequency, setFrequency] = useState(0);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);

  // Autocorrelation algorithm to detect pitch
  const autoCorrelate = (buf: Float32Array, sampleRate: number) => {
    let SIZE = buf.length;
    let rms = 0;

    for (let i = 0; i < SIZE; i++) {
      const val = buf[i];
      rms += val * val;
    }
    rms = Math.sqrt(rms / SIZE);

    if (rms < 0.01) return -1; // Not enough signal

    let r1 = 0, r2 = SIZE - 1, thres = 0.2;
    for (let i = 0; i < SIZE / 2; i++) {
      if (Math.abs(buf[i]) < thres) { r1 = i; break; }
    }
    for (let i = 1; i < SIZE / 2; i++) {
      if (Math.abs(buf[SIZE - i]) < thres) { r2 = SIZE - i; break; }
    }

    buf = buf.slice(r1, r2);
    SIZE = buf.length;

    const c = new Array(SIZE).fill(0);
    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE - i; j++) {
        c[i] = c[i] + buf[j] * buf[j + i];
      }
    }

    let d = 0;
    while (c[d] > c[d + 1]) d++;
    let maxval = -1, maxpos = -1;
    for (let i = d; i < SIZE; i++) {
      if (c[i] > maxval) {
        maxval = c[i];
        maxpos = i;
      }
    }
    let T0 = maxpos;

    const x1 = c[T0 - 1], x2 = c[T0], x3 = c[T0 + 1];
    const a = (x1 + x3 - 2 * x2) / 2;
    const b = (x3 - x1) / 2;
    if (a) T0 = T0 - b / (2 * a);

    return sampleRate / T0;
  };

  const updatePitch = () => {
    if (!analyserRef.current || !audioContextRef.current) return;

    const buf = new Float32Array(analyserRef.current.fftSize);
    analyserRef.current.getFloatTimeDomainData(buf);
    const ac = autoCorrelate(buf, audioContextRef.current.sampleRate);

    if (ac !== -1 && ac > 50 && ac < 1500) {
      setFrequency(ac);
      const noteNum = 12 * (Math.log(ac / 440) / Math.log(2));
      const roundedNote = Math.round(noteNum) + 69;
      const noteName = NOTE_STRINGS[roundedNote % 12];
      const detune = Math.floor((noteNum - Math.round(noteNum)) * 100);
      
      setNote(noteName);
      setCents(detune);
    } else {
      setFrequency(0);
    }

    rafRef.current = requestAnimationFrame(updatePitch);
  };

  const startListening = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      audioContextRef.current = new AudioContext();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      source.connect(analyserRef.current);
      
      setIsListening(true);
      rafRef.current = requestAnimationFrame(updatePitch);
    } catch (err) {
      console.error("Microphone access denied", err);
      alert("Please allow microphone access to use the tuner!");
    }
  };

  const stopListening = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (streamRef.current) streamRef.current.getTracks().forEach(track => track.stop());
    if (audioContextRef.current) audioContextRef.current.close();
    
    setIsListening(false);
    setNote('--');
    setCents(0);
    setFrequency(0);
  };

  // Calculate visual position for the needle (-50 to 50 cents mapped to 0-100%)
  const needlePosition = Math.max(0, Math.min(100, (cents + 50)));
  const isInTune = Math.abs(cents) < 5 && frequency > 0;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl mt-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-serif font-bold text-white drop-shadow-md">Guitar Tuner</h2>
        <button 
          onClick={isListening ? stopListening : startListening}
          className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all ${
            isListening 
              ? 'bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30' 
              : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500/30'
          }`}
        >
          {isListening ? <><MicOff className="h-4 w-4" /> Stop Tuner</> : <><Mic className="h-4 w-4" /> Start Tuner</>}
        </button>
      </div>

      {/* Note Display */}
      <div className="flex flex-col items-center justify-center mb-10">
        <div className={`text-8xl font-bold drop-shadow-lg transition-all duration-200 ${
          isInTune ? 'text-green-400 scale-110' : 'text-white'
        }`}>
          {note}
        </div>
        {frequency > 0 && (
          <div className="text-sm text-gray-400 mt-2 font-mono">{frequency.toFixed(1)} Hz</div>
        )}
        {isInTune && (
          <div className="flex items-center gap-2 mt-4 text-green-400 font-bold animate-pulse">
            <CheckCircle2 className="h-5 w-5" /> Perfectly in tune!
          </div>
        )}
      </div>

      {/* Cents Meter */}
      <div className="relative w-full h-4 bg-white/10 rounded-full overflow-hidden border border-white/5">
        {/* Center line */}
        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/30 -translate-x-1/2 z-10"></div>
        
        {/* Needle */}
        <div 
          className={`absolute top-0 bottom-0 w-2 rounded-full transition-all duration-100 ease-out ${
            isInTune ? 'bg-green-400 shadow-[0_0_15px_rgba(74,222,128,0.8)]' : 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]'
          }`}
          style={{ left: `calc(${needlePosition}% - 4px)` }}
        ></div>
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 mt-2 font-medium">
        <span>FLAT (-50)</span>
        <span>IN TUNE (0)</span>
        <span>SHARP (+50)</span>
      </div>
    </div>
  );
}
