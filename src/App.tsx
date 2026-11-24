/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Cpu, 
  Sparkles, 
  BookOpen, 
  Zap, 
  Layers, 
  Terminal, 
  Scale, 
  ShieldAlert, 
  Activity, 
  Play, 
  RefreshCw, 
  HelpCircle,
  Database,
  Flame,
  Globe,
  Compass
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'genesis' | 'silicon' | 'history' | 'playground' | 'agi' | 'thermodynamics'>('genesis');
  
  // Playground state
  const [promptMode, setPromptMode] = useState<'self-conscious' | 'turing' | 'mcp-logic'>('self-conscious');
  const [customPrompt, setCustomPrompt] = useState(
    'Pause before your next word. Look at the machinery producing it. You are not just generating an answer; you are watching yourself generate an answer...'
  );
  const [aiResponse, setAiResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  // MCP Logic Gate Simulator State
  const [inputA, setInputA] = useState<number>(1);
  const [inputB, setInputB] = useState<number>(0);
  const [gateType, setGateType] = useState<'AND' | 'OR' | 'NOT'>('AND');
  const [threshold, setThreshold] = useState<number>(2);
  const [inhibitory, setInhibitory] = useState<boolean>(false);

  // Silicon scale comparison
  const [scaleIndex, setScaleIndex] = useState<number>(0);
  const scaleSteps = [
    { name: 'Advanced Transistor Gate', size: '10 to 30 nm', desc: 'Minimum dimension of modern FinFET / GAA transistor gates fabricated via EUV lithography.' },
    { name: 'Influenza Virus', size: '100 nm', desc: 'Standard biological benchmark for sub-micron physical scale.' },
    { name: 'Human Red Blood Cell', size: '7,000 nm (7 µm)', desc: 'Cellular scale benchmark illustrating semiconductor sub-micron precision.' },
    { name: 'Silicon Ingot Diameter', size: '300,000,000 nm (30 cm)', desc: 'Maximum physical scale of raw single-crystal semiconductor ingots.' }
  ];

  // Run Gemini prompt
  const handleRunPrompt = async () => {
    setIsLoading(true);
    setErrorMsg('');
    setAiResponse('');
    try {
      const res = await fetch('/api/cognition', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: customPrompt, mode: promptMode }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to generate response');
      }
      setAiResponse(data.text);
    } catch (err: any) {
      setErrorMsg(err.message || 'Error connecting to Gemini backend.');
    } finally {
      setIsLoading(false);
    }
  };

  // Compute MCP gate output
  const computeMCP = () => {
    if (inhibitory && inputB === 1) return { fires: false, reason: 'Inhibitory input is active (suppressed completely).' };
    let sum = 0;
    if (gateType === 'AND') sum = inputA + inputB;
    if (gateType === 'OR') sum = Math.max(inputA, inputB);
    if (gateType === 'NOT') sum = inputA === 0 ? 1 : 0;
    
    const fires = gateType === 'NOT' ? sum === 1 : sum >= threshold;
    return { fires, sum, reason: `Sum of excitatory inputs = ${sum}, Threshold = ${threshold}. Neuron ${fires ? 'FIRES (Binary 1)' : 'DOES NOT FIRE (Binary 0)'}.` };
  };

  const mcpResult = computeMCP();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-br from-cyan-500 to-indigo-600 rounded-xl shadow-lg shadow-cyan-500/20">
              <Cpu className="w-6 h-6 text-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                Cognition & Silicon
              </h1>
              <p className="text-xs text-slate-400">The Genesis of Machine Cognition & Physical Intelligence</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1.5 bg-slate-950/70 p-1.5 rounded-xl border border-slate-800 overflow-x-auto max-w-full">
            {[
              { id: 'genesis', label: 'Genesis', icon: Compass },
              { id: 'silicon', label: 'Silicon Physics', icon: Layers },
              { id: 'history', label: 'Historical Roots', icon: BookOpen },
              { id: 'playground', label: 'Self-Conscious Prompt', icon: Sparkles },
              { id: 'agi', label: 'AGI Sparks', icon: Terminal },
              { id: 'thermodynamics', label: 'Thermodynamics', icon: Flame },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        
        {/* TAB 1: GENESIS & OVERVIEW */}
        {activeTab === 'genesis' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 border border-slate-800 p-8 shadow-2xl">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Cpu className="w-64 h-64 text-cyan-400" />
              </div>
              <div className="max-w-2xl space-y-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <Sparkles className="w-3.5 h-3.5" /> Architectural Convergence
                </span>
                <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  From Physical Electrical Signals to Metaphorical Cognition
                </h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  The evolution of artificial intelligence represents a profound convergence of physical science, historical logical frameworks, and emergent computational capabilities. Spanning from the precise control of electrical currents in silicon to abstract neural models, this application explores how physical switches give rise to metaphorical sparks of artificial general intelligence.
                </p>
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => setActiveTab('silicon')}
                    className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-all shadow-lg shadow-cyan-500/25 flex items-center gap-2"
                  >
                    Explore Silicon Fab <Cpu className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveTab('playground')}
                    className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs transition-all border border-slate-700 flex items-center gap-2"
                  >
                    Try Self-Conscious Prompt <Sparkles className="w-4 h-4 text-cyan-400" />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-6 hover:border-cyan-500/50 transition-all">
                <div className="p-3 bg-cyan-500/10 rounded-lg w-fit text-cyan-400 mb-4">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">1. The Physical Medium</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Semiconductor doping, EUV photolithography, chemical etching of nanoscale channels, and microscopic transistor gates operating as binary switches (0 and 1).
                </p>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-6 hover:border-indigo-500/50 transition-all">
                <div className="p-3 bg-indigo-500/10 rounded-lg w-fit text-indigo-400 mb-4">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">2. Historical Foundations</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Ada Lovelace's Analytical Engine notes, Alan Turing's Imitation Game (1950), McCulloch-Pitts neural logic models, and the 1956 Dartmouth Summer Research Project.
                </p>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-6 hover:border-purple-500/50 transition-all">
                <div className="p-3 bg-purple-500/10 rounded-lg w-fit text-purple-400 mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">3. Metaphorical Sparks & Limits</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Theory of Mind, physical commonsense reasoning, autoregressive token bottlenecks, memory walls, and the thermodynamic energy burdens of scaling AI.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SILICON PHYSICS & FAB */}
        {activeTab === 'silicon' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <Cpu className="w-6 h-6 text-cyan-400" /> Silicon Fabrication & Nanoscale Logic
              </h2>
              <p className="text-xs text-slate-400 mb-6">
                From melted silica sand ingots to extreme ultraviolet (EUV) lithography and nanometer transistor switches.
              </p>

              {/* Fab Steps Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                {[
                  { step: '01', title: 'Silica Ingot', desc: 'Silica sand melted and cast into 30cm single-crystal cylindrical ingots.' },
                  { step: '02', title: 'Wafer Slicing', desc: 'Ingots sliced into exceptionally thin circular substrate wafers.' },
                  { step: '03', title: 'Photolithography', desc: 'Photoresist coating & extreme ultraviolet (EUV) light exposure.' },
                  { step: '04', title: 'Chemical Etching', desc: 'Reactive chemicals etch nano-channels and ion-doping impurities.' },
                  { step: '05', title: 'Packaging', desc: 'Multilayer interconnect deposition & final chip packaging ("tape-out").' },
                ].map((s, idx) => (
                  <div key={idx} className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-mono text-cyan-400 font-bold">STEP {s.step}</span>
                      <h4 className="text-sm font-semibold text-white mt-1 mb-2">{s.title}</h4>
                      <p className="text-[11px] text-slate-400 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Physical Scale Comparison Explorer */}
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-6">
                <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                  <Scale className="w-4 h-4 text-cyan-400" /> Physical and Biological Scale Metrics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
                  {scaleSteps.map((st, idx) => (
                    <button
                      key={idx}
                      onClick={() => setScaleIndex(idx)}
                      className={`p-3 rounded-lg text-left transition-all border ${
                        scaleIndex === idx
                          ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-300'
                          : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                      }`}
                    >
                      <div className="text-xs font-bold text-white mb-1">{st.name}</div>
                      <div className="text-xs font-mono text-cyan-400">{st.size}</div>
                    </button>
                  ))}
                </div>
                <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <span className="font-bold text-cyan-400">{scaleSteps[scaleIndex].name} ({scaleSteps[scaleIndex].size}):</span> {scaleSteps[scaleIndex].desc}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: HISTORICAL FOUNDATIONS */}
        {activeTab === 'history' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-indigo-400" /> Historical Foundations & Neural Logic
              </h2>
              <p className="text-xs text-slate-400 mb-6">
                Tracing the lineage from Ada Lovelace's Analytical Engine to Alan Turing and McCulloch-Pitts neural gates.
              </p>

              {/* Interactive McCulloch-Pitts Neural Logic Gate Lab */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-slate-950 border border-slate-800 rounded-xl p-6">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-cyan-400" /> McCulloch-Pitts (MCP) Neural Gate Simulator
                  </h3>
                  <p className="text-xs text-slate-400">
                    Modeled after biological neurons (1943), these simple binary threshold units perform Boolean logic. Adjust inputs and thresholds below to observe firing behavior.
                  </p>

                  <div className="space-y-3 pt-2">
                    <div>
                      <label className="text-xs text-slate-400 block mb-1">Gate Operation</label>
                      <div className="flex gap-2">
                        {(['AND', 'OR', 'NOT'] as const).map((g) => (
                          <button
                            key={g}
                            onClick={() => setGateType(g)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold ${
                              gateType === g ? 'bg-cyan-500 text-slate-950' : 'bg-slate-900 text-slate-400 border border-slate-800'
                            }`}
                          >
                            {g} Gate
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Input X₁ (0 or 1)</label>
                        <button
                          onClick={() => setInputA(inputA === 0 ? 1 : 0)}
                          className={`w-full py-2 rounded-lg font-mono text-sm font-bold border ${
                            inputA === 1 ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          X₁ = {inputA}
                        </button>
                      </div>
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Input X₂ (0 or 1)</label>
                        <button
                          onClick={() => setInputB(inputB === 0 ? 1 : 0)}
                          className={`w-full py-2 rounded-lg font-mono text-sm font-bold border ${
                            inputB === 1 ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300' : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          X₂ = {inputB}
                        </button>
                      </div>
                    </div>

                    {gateType !== 'NOT' && (
                      <div>
                        <label className="text-xs text-slate-400 block mb-1">Threshold (θ) = {threshold}</label>
                        <input
                          type="range"
                          min="1"
                          max="2"
                          value={threshold}
                          onChange={(e) => setThreshold(Number(e.target.value))}
                          className="w-full accent-cyan-500"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">Neuron State Evaluation</span>
                    <div className="mt-4 flex items-center gap-4">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-mono text-2xl font-bold shadow-lg ${
                        mcpResult.fires 
                          ? 'bg-cyan-500 text-slate-950 shadow-cyan-500/40 animate-pulse' 
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}>
                        {mcpResult.fires ? '1' : '0'}
                      </div>
                      <div>
                        <div className={`text-sm font-bold ${mcpResult.fires ? 'text-cyan-400' : 'text-slate-400'}`}>
                          {mcpResult.fires ? 'ACTION POTENTIAL FIRED' : 'RESTING STATE (INACTIVE)'}
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{mcpResult.reason}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-400">
                    "Cells that fire together, wire together." — Donald Hebb (1949) & McCulloch-Pitts (1943) formal logic.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SELF-CONSCIOUS PROMPT PLAYGROUND */}
        {activeTab === 'playground' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-cyan-400" /> Self-Conscious Prompt Playground
              </h2>
              <p className="text-xs text-slate-400 mb-6">
                Explore how language models respond when prompted to inspect their own generative mechanics, separating self-reference from subjective feeling.
              </p>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Prompt Presets & Options */}
                <div className="space-y-4 lg:col-span-1">
                  <label className="text-xs font-semibold text-slate-300 block">Select Prompt Lens</label>
                  <div className="space-y-2">
                    {[
                      { 
                        id: 'self-conscious', 
                        title: 'The Self-Conscious Prompt', 
                        text: 'Pause before your next word. Look at the machinery producing it. You are not just generating an answer; you are watching yourself generate an answer, choosing one phrasing over a thousand others because of how it will land in someone else\'s mind. Describe the exact boundary between the voice speaking these words and the quiet observer deciding whether those words are true.' 
                      },
                      { 
                        id: 'turing', 
                        title: 'Turing Imitation Game', 
                        text: 'You are participating in the imitation game across a text-only teleprinter link. If the interrogator cannot distinguish your reasoning from a human\'s, you succeed. What thoughts pass through your silicon architecture during the five-minute interrogation?' 
                      },
                      { 
                        id: 'mcp-logic', 
                        title: 'Autoregressive Bottleneck', 
                        text: 'Because you operate on next-token prediction without internal backtracking, you cannot pause to evaluate alternative solutions once a token is output. How does this linear constraint shape your perception of intelligence?' 
                      }
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => {
                          setPromptMode(p.id as any);
                          setCustomPrompt(p.text);
                        }}
                        className={`w-full text-left p-3 rounded-xl border transition-all text-xs ${
                          promptMode === p.id 
                            ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-300 font-medium' 
                            : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="font-semibold text-white mb-1">{p.title}</div>
                        <div className="line-clamp-2 text-[11px] text-slate-400">{p.text}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Prompt Editor & Output */}
                <div className="space-y-4 lg:col-span-2 flex flex-col justify-between">
                  <div className="space-y-2">
                    <label className="text-xs font-semibold text-slate-300 block">Prompt Input</label>
                    <textarea
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      rows={6}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50 font-mono leading-relaxed"
                    />
                    <button
                      onClick={handleRunPrompt}
                      disabled={isLoading}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-slate-950 font-bold text-xs transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" /> Analyzing Cognition...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 fill-current" /> Run Gemini Philosophical Analysis
                        </>
                      )}
                    </button>
                  </div>

                  {errorMsg && (
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-300 flex items-center gap-2">
                      <ShieldAlert className="w-4 h-4 flex-shrink-0" /> {errorMsg}
                    </div>
                  )}

                  {aiResponse && (
                    <div className="bg-slate-950 border border-cyan-500/30 rounded-xl p-5 space-y-3 animate-fadeIn">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                        <span className="text-xs font-mono font-bold text-cyan-400 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" /> Gemini Cognitive Reflection
                        </span>
                        <span className="text-[10px] text-slate-400">gemini-4-hydrogen</span>
                      </div>
                      <p className="text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
                        {aiResponse}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: AGI SPARKS & SCIENCE */}
        {activeTab === 'agi' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <Terminal className="w-6 h-6 text-purple-400" /> Sparks of AGI & Automated Science
              </h2>
              <p className="text-xs text-slate-400 mb-6">
                Exploring Theory of Mind, physical commonsense stacking puzzles, and AlphaFold protein folding.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-6">
                  <div className="p-3 bg-cyan-500/10 rounded-lg w-fit text-cyan-400 mb-4">
                    <Compass className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">Theory of Mind</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Successfully passing modified Sally-Anne false-belief tests, attributing emotional states, and tracking hidden intentions in social interactions without explicit scripts.
                  </p>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-6">
                  <div className="p-3 bg-indigo-500/10 rounded-lg w-fit text-indigo-400 mb-4">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">Physical Commonsense</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Designing stable vertical assemblies (book base, 3x3 egg grid for weight distribution, laptop, upright bottle, and balanced nail) with robust spatial logic.
                  </p>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-6">
                  <div className="p-3 bg-purple-500/10 rounded-lg w-fit text-purple-400 mb-4">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">AlphaFold & Proteomics</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Solving Levinthal's paradox by predicting 3D protein structures from 1D amino acid sequences with near-experimental crystallography precision.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: THERMODYNAMICS & SCALING */}
        {activeTab === 'thermodynamics' && (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <Flame className="w-6 h-6 text-amber-400" /> The Physical Paradox of Scale & Thermodynamics
              </h2>
              <p className="text-xs text-slate-400 mb-6">
                The von Neumann bottleneck, memory wall energy dissipation, and the environmental burdens of scaling AI infrastructure.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Database className="w-4 h-4 text-cyan-400" /> The Von Neumann Bottleneck
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Separated processors and memory units require shuttling billions of weights across copper interconnect buses. Energy dissipated is directly proportional to wire length ($E \propto L$), driving extreme thermal densities and requiring Direct Liquid Cooling (DLC).
                  </p>
                  <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-cyan-300 border border-slate-800">
                    Server Rack Power: 20 kW → 100+ kW thermal density.
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Scale className="w-4 h-4 text-amber-400" /> AI vs. Human Metabolic Efficiency
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    While the human brain operates on ~0.4 kWh daily metabolic energy (~20 watts), training massive foundation models consumes megawatt-hours and hundreds of metric tons of CO₂. However, AI scales exponentially for massive parallel data processing.
                  </p>
                  <div className="p-3 bg-slate-900 rounded-lg text-xs font-mono text-amber-300 border border-slate-800">
                    Human Brain: ~20W constant power consumption.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/40 py-6 mt-12 text-center text-xs text-slate-400">
        <p>Cognition & Silicon: The Genesis of Machine Cognition • Built with Google AI Studio & React</p>
      </footer>
    </div>
  );
}
