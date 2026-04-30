import React from 'react';
import { motion as Motion } from 'framer-motion';
import { Bug, Upload, Scan, AlertTriangle, CheckCircle2, Shield, Leaf, Zap, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import api from '../lib/api';

const anim = (d = 0) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 0.5, ease: [0.16,1,0.3,1] } });
const severityColors = { None: '#4ade80', Low: '#facc15', Medium: '#fb923c', High: '#f87171', Critical: '#ef4444' };

export default function PestId() {
  const [scanning, setScanning] = React.useState(false);
  const [result, setResult] = React.useState(null);
  const [database, setDatabase] = React.useState([]);
  const [showDb, setShowDb] = React.useState(false);
  const [expandedSections, setExpanded] = React.useState({ symptoms: true, treatment: true, prevention: false });

  React.useEffect(() => {
    api.get('/pest/database').then(({ data }) => setDatabase(data.data)).catch(() => {});
  }, []);

  const handleScan = async () => {
    setScanning(true); setResult(null);
    try {
      const { data } = await api.post('/pest/identify', {});
      setResult(data.data);
    } catch {} finally { setScanning(false); }
  };

  const toggle = (key) => setExpanded((e) => ({ ...e, [key]: !e[key] }));

  return (
    <div className="p-6 space-y-6 min-h-screen">
      <Motion.div {...anim(0)} className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Space Grotesk' }}>AI Pest Identification</h1>
          <p className="text-sm text-emerald-400/50 mt-1">Powered by deep learning analysis</p>
        </div>
        <button onClick={() => setShowDb(!showDb)}
          className="px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 transition-all text-emerald-400/60 hover:text-emerald-400"
          style={{ background: 'rgba(74,222,128,0.06)', border: '1px solid rgba(74,222,128,0.1)' }}>
          <BookOpen className="w-4 h-4" /> Pest Database
        </button>
      </Motion.div>

      <div className="grid grid-cols-12 gap-6">
        {/* Upload / Scan Area */}
        <Motion.div {...anim(0.1)} className="col-span-12 lg:col-span-5">
          <div className="glass-card p-8 text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-emerald-500/20 to-green-700/10 flex items-center justify-center border border-emerald-500/10">
              {scanning ? (
                <div className="w-10 h-10 border-2 border-emerald-400/20 border-t-emerald-400 rounded-full animate-spin" />
              ) : (
                <Bug className="w-10 h-10 text-emerald-400/60" />
              )}
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                {scanning ? 'Analyzing...' : result ? 'Scan Complete' : 'Upload Plant Image'}
              </h2>
              <p className="text-xs text-emerald-400/40 mt-1">
                {scanning ? 'AI is processing your sample' : 'Take a photo or upload an image of your crop'}
              </p>
            </div>

            {/* Drop Zone */}
            <div className="border-2 border-dashed rounded-2xl p-8 transition-colors hover:border-emerald-400/20 cursor-pointer"
              style={{ borderColor: 'rgba(74,222,128,0.08)', background: 'rgba(10,30,20,0.3)' }}>
              <Upload className="w-8 h-8 text-emerald-400/20 mx-auto mb-3" />
              <p className="text-xs text-emerald-400/30">Drag & drop or click to upload</p>
              <p className="text-[10px] text-emerald-400/20 mt-1">JPG, PNG up to 10MB</p>
            </div>

            <button onClick={handleScan} disabled={scanning}
              className="btn-glow w-full py-3.5 rounded-xl text-white text-sm flex items-center justify-center gap-2">
              <Scan className="w-4 h-4" />
              {scanning ? 'Scanning...' : 'Run AI Analysis'}
            </button>

            <div className="flex justify-center gap-6 text-[10px] text-emerald-400/25">
              <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> 96% Accuracy</span>
              <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> {'<'}1s Response</span>
            </div>
          </div>
        </Motion.div>

        {/* Results */}
        <div className="col-span-12 lg:col-span-7 space-y-4">
          {result ? (
            <>
              {/* Main Result Card */}
              <Motion.div {...anim(0.15)} className="glass-card p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[80px] opacity-20 pointer-events-none"
                  style={{ background: severityColors[result.severity] }} />
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ background: `${severityColors[result.severity]}15` }}>
                    {result.severity === 'None'
                      ? <CheckCircle2 className="w-7 h-7" style={{ color: severityColors[result.severity] }} />
                      : <AlertTriangle className="w-7 h-7" style={{ color: severityColors[result.severity] }} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white">{result.name}</h3>
                    <p className="text-xs text-emerald-400/40 italic">{result.scientificName}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="badge text-[10px]" style={{ background: `${severityColors[result.severity]}15`, color: severityColors[result.severity] }}>
                        {result.severity} Severity
                      </span>
                      <span className="badge-green text-[10px]">{result.confidence}% Confidence</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-emerald-400/50 mt-4 leading-relaxed">{result.description}</p>
                <div className="text-[10px] text-emerald-400/20 mt-3">Analyzed in {result.processingTimeMs}ms</div>
              </Motion.div>

              {/* Expandable Sections */}
              {[
                { key: 'symptoms', title: 'Symptoms', items: result.symptoms, color: '#fb923c' },
                { key: 'treatment', title: 'Treatment', items: result.treatment, color: '#4ade80' },
                { key: 'prevention', title: 'Prevention', items: result.prevention, color: '#22d3ee' },
              ].map((section) => section.items?.length > 0 && (
                <Motion.div key={section.key} {...anim(0.2)} className="glass-card overflow-hidden">
                  <button onClick={() => toggle(section.key)} className="w-full flex items-center justify-between p-4 text-left">
                    <span className="text-sm font-semibold text-white">{section.title}</span>
                    {expandedSections[section.key] ? <ChevronUp className="w-4 h-4 text-emerald-400/40" /> : <ChevronDown className="w-4 h-4 text-emerald-400/40" />}
                  </button>
                  {expandedSections[section.key] && (
                    <div className="px-4 pb-4 space-y-2">
                      {section.items.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm text-emerald-400/50">
                          <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: section.color }} />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </Motion.div>
              ))}

              {/* Affected Crops */}
              {result.affectedCrops?.length > 0 && (
                <Motion.div {...anim(0.25)} className="glass-card p-4">
                  <p className="text-xs font-semibold text-white mb-2">Affected Crops</p>
                  <div className="flex gap-2 flex-wrap">
                    {result.affectedCrops.map((c) => (
                      <span key={c} className="badge-yellow text-[10px]"><Leaf className="w-2.5 h-2.5 mr-0.5" />{c}</span>
                    ))}
                  </div>
                </Motion.div>
              )}
            </>
          ) : (
            <Motion.div {...anim(0.15)} className="glass-card p-12 text-center">
              <Scan className="w-16 h-16 text-emerald-400/10 mx-auto mb-4" />
              <h3 className="text-white font-semibold">Ready to Analyze</h3>
              <p className="text-sm text-emerald-400/40 mt-1">Upload an image and run AI analysis to identify pests and diseases</p>
            </Motion.div>
          )}
        </div>
      </div>

      {/* Pest Database */}
      {showDb && database.length > 0 && (
        <Motion.div {...anim(0)} className="glass-card p-6">
          <h3 className="text-base font-semibold text-white mb-4">Known Pest Database</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {database.map((p) => (
              <div key={p.id} className="p-4 rounded-xl" style={{ background: 'rgba(10,30,20,0.4)', border: '1px solid rgba(74,222,128,0.06)' }}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-white">{p.name}</span>
                  <span className="badge text-[9px]" style={{ background: `${severityColors[p.severity]}15`, color: severityColors[p.severity] }}>{p.severity}</span>
                </div>
                <p className="text-[10px] text-emerald-400/30 italic">{p.scientificName}</p>
                {p.affectedCrops?.length > 0 && (
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {p.affectedCrops.map(c => <span key={c} className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: 'rgba(74,222,128,0.06)', color: 'rgba(74,222,128,0.4)' }}>{c}</span>)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Motion.div>
      )}
    </div>
  );
}
