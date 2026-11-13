import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Shield, Layers, Image as ImageIcon, Database, CheckCircle2, Cpu } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="space-y-20 pb-16">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-heritage-indigo text-heritage-ivory py-24 px-4 sm:px-6 lg:px-8 rounded-b-3xl shadow-xl">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#C7A45A_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-heritage-gold/20 border border-heritage-gold/40 text-heritage-gold text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" /> Research-Grade Deep Learning Platform
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl font-bold leading-tight tracking-tight">
            Automatic Identification & Preservation of <span className="text-heritage-gold italic">Cultural Patterns</span>
          </h1>

          <p className="text-lg sm:text-xl text-heritage-ivory/80 max-w-3xl mx-auto leading-relaxed font-light">
            Empowering archivists, researchers, and cultural institutions with a CNN-based deep learning computer vision pipeline designed specifically for traditional Indian heritage motifs.
          </p>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/analyzer"
              className="px-8 py-4 rounded-xl bg-heritage-terracotta hover:bg-heritage-gold text-heritage-ivory font-semibold flex items-center gap-3 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
            >
              Launch Pattern Analyzer <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              to="/archive"
              className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 border border-heritage-gold/30 text-heritage-ivory font-semibold flex items-center gap-3 transition-colors"
            >
              Explore Digital Archive <Database className="w-5 h-5 text-heritage-gold" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3 Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <h2 className="font-serif text-3xl font-bold text-heritage-indigo">Supported Cultural Categories</h2>
          <p className="text-heritage-slate/80 max-w-2xl mx-auto">
            The paper establishes an experimental classification taxonomy for three distinct indigenous Indian pattern traditions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Warli */}
          <div className="bg-heritage-card rounded-2xl p-8 border border-heritage-gold/20 shadow-md hover:shadow-xl transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-heritage-terracotta/10 text-heritage-terracotta flex items-center justify-center">
              <PaletteIcon />
            </div>
            <h3 className="font-serif text-2xl font-bold text-heritage-indigo">Warli Art Motifs</h3>
            <p className="text-sm text-heritage-slate/80 leading-relaxed">
              Tribal art form from Maharashtra characterized by rudimentary geometric shapes: circles, triangles, and lines depicting communal tarpa dances, rituals, and harvest celebrations.
            </p>
            <div className="pt-2 text-xs font-semibold text-heritage-gold uppercase tracking-wider">
              Keywords: Geometric, Tarpa Circle, Stick Motifs
            </div>
          </div>

          {/* Madhubani */}
          <div className="bg-heritage-card rounded-2xl p-8 border border-heritage-gold/20 shadow-md hover:shadow-xl transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-heritage-gold/20 text-heritage-gold flex items-center justify-center">
              <PaletteIcon />
            </div>
            <h3 className="font-serif text-2xl font-bold text-heritage-indigo">Madhubani Paintings</h3>
            <p className="text-sm text-heritage-slate/80 leading-relaxed">
              Folk painting tradition from Mithila region of Bihar featuring double-outlined geometric borders, vibrant natural dyes, fine line hatchings, and sacred fish or floral iconography.
            </p>
            <div className="pt-2 text-xs font-semibold text-heritage-gold uppercase tracking-wider">
              Keywords: Double Outlines, Fish Motif, Mithila Hatching
            </div>
          </div>

          {/* Textile */}
          <div className="bg-heritage-card rounded-2xl p-8 border border-heritage-gold/20 shadow-md hover:shadow-xl transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-heritage-indigo/10 text-heritage-indigo flex items-center justify-center">
              <PaletteIcon />
            </div>
            <h3 className="font-serif text-2xl font-bold text-heritage-indigo">Indian Textile Patterns</h3>
            <p className="text-sm text-heritage-slate/80 leading-relaxed">
              Woven and printed textile traditions comprising intricate Paisley (Kalka) motifs, Bandhani tie-dye geometric dot matrices, Ajrakh block prints, and traditional sari borders.
            </p>
            <div className="pt-2 text-xs font-semibold text-heritage-gold uppercase tracking-wider">
              Keywords: Paisley / Kalka, Bandhani Dots, Block Print
            </div>
          </div>

        </div>
      </section>

      {/* Workflow Section */}
      <section className="bg-heritage-card py-16 border-y border-heritage-gold/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="font-serif text-3xl font-bold text-heritage-indigo">Research Pipeline Workflow</h2>
            <p className="text-heritage-slate/80 max-w-2xl mx-auto">
              From raw cultural artifact acquisition to neural network feature extraction and verified preservation cataloging.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
            <div className="p-6 bg-heritage-ivory rounded-xl border border-heritage-gold/30 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-heritage-indigo text-heritage-ivory font-bold flex items-center justify-center mx-auto">1</div>
              <h4 className="font-serif font-bold text-heritage-indigo">Image Preprocessing</h4>
              <p className="text-xs text-heritage-slate/80">Aspect-ratio preserving resize to 224x224x3 RGB, EXIF rotation correction, [0,1] pixel scaling.</p>
            </div>

            <div className="p-6 bg-heritage-ivory rounded-xl border border-heritage-gold/30 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-heritage-indigo text-heritage-ivory font-bold flex items-center justify-center mx-auto">2</div>
              <h4 className="font-serif font-bold text-heritage-indigo">CNN Deep Inference</h4>
              <p className="text-xs text-heritage-slate/80">Stacked Conv2D feature maps, 2x2 max-pooling, dense FC layers with 0.45 dropout, Softmax probabilities.</p>
            </div>

            <div className="p-6 bg-heritage-ivory rounded-xl border border-heritage-gold/30 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-heritage-indigo text-heritage-ivory font-bold flex items-center justify-center mx-auto">3</div>
              <h4 className="font-serif font-bold text-heritage-indigo">Grad-CAM Explainability</h4>
              <p className="text-xs text-heritage-slate/80">Gradient attention heatmaps highlight spatial motif regions driving model classification decisions.</p>
            </div>

            <div className="p-6 bg-heritage-ivory rounded-xl border border-heritage-gold/30 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-heritage-indigo text-heritage-ivory font-bold flex items-center justify-center mx-auto">4</div>
              <h4 className="font-serif font-bold text-heritage-indigo">Preservation & Audit</h4>
              <p className="text-xs text-heritage-slate/80">PostgreSQL cataloging, expert human review workflows, versioned audit logging, CSV exports.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

function PaletteIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
    </svg>
  );
}
