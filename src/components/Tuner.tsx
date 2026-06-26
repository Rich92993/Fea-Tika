'use client';

import { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, CheckCircle2, ChevronDown, Play, Volume2 } from 'lucide-react';

const TUNINGS = {
  standard: {
    name: 'Standard (EADGBE)',
    strings: [
      { note: 'E2', freq: 82.41, num: 6 },
      { note: 'A2', freq: 110.00, num: 5 },
      { note: 'D3', freq: 146.83, num: 4 },
      { note: 'G3', freq: 196.00, num: 3 },
      { note: 'B3', freq: 246.94, num: 2 },
      { note: 'E4', freq: 329.63, num: 1 },
    ]
  },
  helepelu: {
    name: 'Helepelu (GCDGBD)',
    strings: [
      { note: 'G2', freq: 98.00, num: 6 },
      { note: 'C3', freq: 130.81, num: 5 },
      { note: 'D3', freq: 146.83, num: 4 },
      { note: 'G3', freq: 196.00, num: 3 },
      { note: 'B3', freq: 246.94, num: 2 },
      { note: 'D4', freq: 293.66, num: 1 },
    ]
  }
};

export default function Tuner() {
  const [isListening, setIsListening] = useState(false);
  const [selectedTuning, setSelectedTuning] = useState('standard');
  const [targetString, setTargetString] = useState({ note: '--', freq: 0 });
  const [cents, setCents] = useState(0);
  const [frequency, setFrequency] = useState(0);
  const [playingString, setPlayingString] = useState<number | null>(null);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const rafRef = useRef<number | null>(null);

  const initAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  };

  const playTone = (freq: number, stringIndex: number) => {
    initAudio();
    if (!audioContextRef.current) return;

    const ctx = audioContextRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Triangle wave sounds much more like a guitar string than a sine wave
    osc.type = 'triangle';
    osc.frequency.value = freq;

    // Plucked string envelope (quick attack, smooth decay)
    const now = ctx.currentTime;
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.6, now + 0.05); 
    gain.gain.exponentialRampToValueAtTime(0.001, now + 3.0); 

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 3.0);

    setPlayingString(stringIndex);
    setTimeout(() => setPlayingString(null), 3000);
  };

  const autoCorrelate = (buf: Float32Array, sampleRate: number) => {
    let SIZE = buf.length;
    let rms = 0;
    for (let i = 0; i < SIZE; i++) {
      const val = buf[i];
      rms += val * val;
    }
    rms = Math.sqrt(rms / SIZE);
    if (rms < 0.01) return -1;

    let r1 = 0, r2 = SIZE - 1, thres = 0.2;
    for (let i = 0; i < SIZE / 2; i++) if (Math.abs(buf[i]) < thres) { r1 = i; break; }
    for (let i = 1; i < SIZE / 2; i++) if (Math.abs(buf[SIZE - i]) < thres) { r2 = SIZE - i; break; }

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
      if (c[i] > maxval) { maxval = c[i]; maxpos = i; }
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

    if (ac !== -1 && ac > 60 && ac < 1500) {
      setFrequency(ac);
      
      const currentTuning = TUNINGS[selectedTuning as keyof typeof TUNINGS];
      let closest = currentTuning.strings[0];
      let minDiff = Math.abs(Math.log(ac / closest.freq));

      for (const str of currentTuning.strings) {
        const diff = Math.abs(Math.log(ac / str.freq));
        if (diff < minDiff) {
          minDiff = diff;
          closest = str;
        }
      }

      const centsOffset = 1200 * Math.log2(ac / closest.freq);
      
      setTargetString(closest);
      setCents(Math.round(centsOffset));
    } else {
      setFrequency(0);
    }

    rafRef.current = requestAnimationFrame(updatePitch);
  };

  const startListening = async () => {
    try {
      initAudio();
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      analyserRef.current = audioContextRef.current!.createAnalyser();
      const source = audioContextRef.current!.createMediaStreamSource(stream);
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
    
    setIsListening(false);
    setTargetString({ note: '--', freq: 0 });
    setCents(0);
    setFrequency(0);
  };

  const needlePosition = Math.max(0, Math.min(100, (cents + 50)));
  const isInTune = Math.abs(cents) < 5 && frequency > 0;
  const currentTuningStrings = TUNINGS[selectedTuning as keyof typeof TUNINGS].strings;

  return (
    <div className="w-full max-w-2xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl mt-8">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
        <h2 className="text-2xl font-serif font-bold text-white drop-shadow-md">Guitar Tuner</h2>
        
        <div className="relative">
          <select
            value={selectedTuning}
            onChange={(e) => setSelectedTuning(e.target.value)}
            className="appearance-none bg-white/10 border border-white/20 text-white text-sm font-medium rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer"
          >
            {Object.entries(TUNINGS).map(([key, tuning]) => (
              <option key={key} value={key} className="bg-gray-900 text-white">
                {tuning.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Note Display */}
      <div className="flex flex-col items-center justify-center mb-10">
        <div className={`text-8xl font-bold drop-shadow-lg transition-all duration-200 ${
          isInTune ? 'text-green-400 scale-110' : 'text-white'
        }`}>
          {targetString.note}
        </div>
        {frequency > 0 && (
          <div className="text-sm text-gray-400 mt-2 font-mono">
            Target: {targetString.freq} Hz | Playing: {frequency.toFixed(1)} Hz
          </div>
        )}
        {isInTune && (
          <div className="flex items-center gap-2 mt-4 text-green-400 font-bold animate-pulse">
            <CheckCircle2 className="h-5 w-5" /> Perfectly in tune!
          </div>
        )}
      </div>

      {/* Cents Meter */}
      <div className="relative w-full h-4 bg-white/10 rounded-full overflow-hidden border border-white/5 mb-12">
        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/30 -translate-x-1/2 z-10"></div>
        <div 
          className={`absolute top-0 bottom-0 w-2 rounded-full transition-all duration-100 ease-out ${
            isInTune ? 'bg-green-400 shadow-[0_0_15px_rgba(74,222,128,0.8)]' : 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]'
          }`}
          style={{ left: `calc(${needlePosition}% - 4px)` }}
        ></div>
      </div>
      
      <div className="flex justify-between text-xs text-gray-500 mb-10 font-medium">
        <span>FLAT (-50)</span>
        <span>IN TUNE (0)</span>
        <span>SHARP (+50)</span>
      </div>

      {/* Reference Tones Section */}
      <div className="border-t border-white/10 pt-8">
        <div className="flex items-center gap-2 mb-6">
          <Volume2 className="h-5 w-5 text-cyan-400" />
          <h3 className="text-lg font-bold text-white">Reference Tones (Tune by Ear)</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentTuningStrings.map((str, index) => {
            const isPlaying = playingString === index;
            return (
              <button
                key={str.num}
                onClick={() => playTone(str.freq, index)}
                className={`flex items-center justify-between p-3 rounded-xl border transition-all ${
                  isPlaying 
                    ? 'bg-cyan-500/20 border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.3)]' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 font-mono w-6">{str.num}th</span>
                  <span className="text-xl font-bold text-white">{str.note}</span>
                  <span className="text-xs text-gray-500 font-mono">{str.freq} Hz</span>
                </div>
                <div className={`p-2 rounded-full ${isPlaying ? 'bg-cyan-400 text-black' : 'bg-white/10 text-gray-400'}`}>
                  {isPlaying ? <Volume2 className="h-4 w-4 animate-pulse" /> : <Play className="h-4 w-4" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Start/Stop Mic Button */}
      <div className="flex justify-center mt-8">
        <button 
          onClick={isListening ? stopListening : startListening}
          className={`flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold transition-all ${
            isListening 
              ? 'bg-red-500/20 text-red-400 border border-red-500/50 hover:bg-red-500/30' 
              : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500/30'
          }`}
        >
          {isListening ? <><MicOff className="h-4 w-4" /> Stop Mic</> : <><Mic className="h-4 w-4" /> Start Mic</>}
        </button>
      </div>
    </div>
  );
}
