import React from 'react';
import { Palette, MapPin, Tag, FileText, Info } from 'lucide-react';

export const CategoriesPage: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      <div className="border-b border-heritage-gold/30 pb-8 space-y-3">
        <h1 className="font-serif text-4xl font-bold text-heritage-indigo">
          Cultural Pattern Taxonomy & Categories
        </h1>
        <p className="text-heritage-slate/80 text-lg">
          Verified research domain knowledge for the three supported Indian cultural pattern categories.
        </p>
      </div>

      <div className="space-y-12">
        
        {/* Warli Category Card */}
        <div id="warli" className="bg-heritage-card rounded-2xl p-8 border border-heritage-gold/30 shadow-md grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-1 bg-heritage-terracotta text-heritage-ivory p-8 rounded-xl space-y-4 text-center">
            <div className="w-16 h-16 rounded-full bg-white/10 mx-auto flex items-center justify-center font-serif text-2xl font-bold">
              W
            </div>
            <h2 className="font-serif text-2xl font-bold">Warli Art Motifs</h2>
            <div className="inline-flex items-center gap-1 text-xs bg-white/20 px-3 py-1 rounded-full font-medium">
              <MapPin className="w-3.5 h-3.5" /> Maharashtra, India
            </div>
          </div>

          <div className="md:col-span-2 space-y-4 text-heritage-slate">
            <h3 className="font-serif text-xl font-bold text-heritage-indigo">Geometric Tribal Expression</h3>
            <p className="text-sm leading-relaxed text-heritage-slate/80">
              Warli art is an indigenous tribal art style practiced primarily by the Warli community living in the North Sahyadri Range of Maharashtra. The art style uses basic geometric shapes: circles representing the Sun and Moon, triangles derived from mountains and trees, and squares indicating sacred enclosures.
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs pt-2">
              <div className="bg-heritage-ivory p-3 rounded-lg border border-heritage-gold/20">
                <span className="font-bold text-heritage-indigo block">Primary Motifs:</span>
                Tarpa Dance Circle, Spiral Human Chains, Triangular Bodies, Tree of Life.
              </div>
              <div className="bg-heritage-ivory p-3 rounded-lg border border-heritage-gold/20">
                <span className="font-bold text-heritage-indigo block">Visual Characteristics:</span>
                White rice-paste pigment applied over red ochre/terracotta wall backgrounds.
              </div>
            </div>
          </div>
        </div>

        {/* Madhubani Category Card */}
        <div id="madhubani" className="bg-heritage-card rounded-2xl p-8 border border-heritage-gold/30 shadow-md grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-1 bg-heritage-gold text-heritage-indigo p-8 rounded-xl space-y-4 text-center">
            <div className="w-16 h-16 rounded-full bg-heritage-indigo/10 mx-auto flex items-center justify-center font-serif text-2xl font-bold">
              M
            </div>
            <h2 className="font-serif text-2xl font-bold">Madhubani Paintings</h2>
            <div className="inline-flex items-center gap-1 text-xs bg-heritage-indigo/10 px-3 py-1 rounded-full font-semibold">
              <MapPin className="w-3.5 h-3.5" /> Mithila, Bihar, India
            </div>
          </div>

          <div className="md:col-span-2 space-y-4 text-heritage-slate">
            <h3 className="font-serif text-xl font-bold text-heritage-indigo">Double-Outlined Folk Tradition</h3>
            <p className="text-sm leading-relaxed text-heritage-slate/80">
              Madhubani (or Mithila) painting originated in the Mithila region of Bihar. It is distinguished by two-dimensional line drawings, prominent double outlines along all figure borders, intricate line-hatching fills, and zero empty background space (filled with floral, bird, or geometric motifs).
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs pt-2">
              <div className="bg-heritage-ivory p-3 rounded-lg border border-heritage-gold/20">
                <span className="font-bold text-heritage-indigo block">Primary Motifs:</span>
                Sacred Fish (Matsya), Peacocks, Lotus Blooms, Geometric Double Borders.
              </div>
              <div className="bg-heritage-ivory p-3 rounded-lg border border-heritage-gold/20">
                <span className="font-bold text-heritage-indigo block">Visual Characteristics:</span>
                Vibrant natural colors, double outlines, fine parallel line hatchings.
              </div>
            </div>
          </div>
        </div>

        {/* Textile Category Card */}
        <div id="textile" className="bg-heritage-card rounded-2xl p-8 border border-heritage-gold/30 shadow-md grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-1 bg-heritage-indigo text-heritage-ivory p-8 rounded-xl space-y-4 text-center">
            <div className="w-16 h-16 rounded-full bg-heritage-gold/20 mx-auto flex items-center justify-center font-serif text-2xl font-bold text-heritage-gold">
              T
            </div>
            <h2 className="font-serif text-2xl font-bold">Indian Textile Patterns</h2>
            <div className="inline-flex items-center gap-1 text-xs bg-white/20 px-3 py-1 rounded-full font-medium">
              <MapPin className="w-3.5 h-3.5" /> Pan-Indian Weaving & Block Print
            </div>
          </div>

          <div className="md:col-span-2 space-y-4 text-heritage-slate">
            <h3 className="font-serif text-xl font-bold text-heritage-indigo">Woven & Printed Heritage Motifs</h3>
            <p className="text-sm leading-relaxed text-heritage-slate/80">
              Indian Textile Patterns encompass iconic woven, block-printed, and resist-dyed traditions across India. This category includes Paisley (Kalka/Mango shape motifs), Bandhani tie-dye grid dot matrices, Ajrakh block prints, and traditional sari borders.
            </p>

            <div className="grid grid-cols-2 gap-4 text-xs pt-2">
              <div className="bg-heritage-ivory p-3 rounded-lg border border-heritage-gold/20">
                <span className="font-bold text-heritage-indigo block">Primary Motifs:</span>
                Paisley (Kalka), Bandhani Dot Grids, Floral Block Repeats, Geometric Borders.
              </div>
              <div className="bg-heritage-ivory p-3 rounded-lg border border-heritage-gold/20">
                <span className="font-bold text-heritage-indigo block">Visual Characteristics:</span>
                Rhythmic repeating units, rich indigo/maroon/gold palettes, woven texture grids.
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
