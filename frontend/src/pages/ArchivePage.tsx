import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { artifactApi, Artifact } from '../services/api';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { Search, Download, Filter, MapPin, Grid, List, Tag, Eye } from 'lucide-react';

export const ArchivePage: React.FC = () => {
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [region, setRegion] = useState<string>('');
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const fetchArtifacts = async () => {
    setLoading(true);
    try {
      const data = await artifactApi.getArtifacts({
        category: category || undefined,
        region: region || undefined,
        search: search || undefined,
        page,
        size: 12
      });
      setArtifacts(data.content || []);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("Failed to load artifacts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtifacts();
  }, [category, page]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(0);
    fetchArtifacts();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-heritage-gold/30 pb-6">
        <div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-heritage-indigo">Heritage Digital Archive</h1>
          <p className="text-heritage-slate/80 text-sm mt-1">Preservation catalog for classified Indian cultural patterns & expert metadata.</p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={artifactApi.exportCsvUrl()}
            download
            className="px-4 py-2.5 rounded-xl bg-heritage-indigo text-heritage-ivory hover:bg-heritage-gold transition-colors text-xs font-semibold flex items-center gap-2 shadow-sm"
          >
            <Download className="w-4 h-4 text-heritage-gold" /> Export CSV Catalog
          </a>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-heritage-card p-4 rounded-2xl border border-heritage-gold/20 shadow-sm space-y-4 md:space-y-0 md:flex md:items-center md:justify-between gap-4">
        
        <form onSubmit={handleSearchSubmit} className="flex-1 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-heritage-slate/50 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search title, motifs, description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-heritage-ivory border border-heritage-gold/30 text-sm text-heritage-slate"
            />
          </div>
          <button type="submit" className="px-4 py-2 rounded-xl bg-heritage-terracotta text-heritage-ivory text-xs font-semibold">
            Search
          </button>
        </form>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(0); }}
            className="px-3 py-2 rounded-xl bg-heritage-ivory border border-heritage-gold/30 text-xs text-heritage-slate font-medium"
          >
            <option value="">All Categories</option>
            <option value="warli">Warli Art</option>
            <option value="madhubani">Madhubani Painting</option>
            <option value="textile">Indian Textile Patterns</option>
          </select>

          <div className="flex items-center border border-heritage-gold/30 rounded-xl overflow-hidden bg-heritage-ivory">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-heritage-indigo text-heritage-ivory' : 'text-heritage-slate'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 transition-colors ${viewMode === 'table' ? 'bg-heritage-indigo text-heritage-ivory' : 'text-heritage-slate'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Artifacts Grid / Table */}
      {loading ? (
        <LoadingSpinner message="Querying digital preservation archive..." />
      ) : artifacts.length === 0 ? (
        <div className="bg-heritage-card rounded-2xl p-16 text-center text-heritage-slate/60 space-y-2 border border-heritage-gold/20">
          <p className="font-serif font-bold text-heritage-indigo text-lg">No Artifact Records Found</p>
          <p className="text-xs">Try adjusting search query or category filters.</p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {artifacts.map((art) => (
            <div key={art.id} className="bg-heritage-card rounded-2xl overflow-hidden border border-heritage-gold/20 shadow-md hover:shadow-xl transition-all group space-y-3 p-4 flex flex-col justify-between">
              
              <div className="space-y-3">
                <div className="w-full h-48 rounded-xl bg-heritage-ivory overflow-hidden border border-heritage-gold/10 relative flex items-center justify-center">
                  {art.mainImage?.storageUrl ? (
                    <img src={art.mainImage.storageUrl} alt={art.title} className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform" />
                  ) : (
                    <div className="text-xs text-heritage-slate/40">No Image Preview</div>
                  )}
                  <span className="absolute top-2 right-2 px-2.5 py-1 rounded-md text-[10px] uppercase font-bold bg-heritage-indigo text-heritage-ivory">
                    {art.culturalCategory}
                  </span>
                </div>

                <div>
                  <h3 className="font-serif font-bold text-heritage-indigo text-base line-clamp-1">{art.title}</h3>
                  {art.region && (
                    <p className="text-xs text-heritage-slate/60 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-heritage-terracotta" /> {art.region}
                    </p>
                  )}
                </div>

                <p className="text-xs text-heritage-slate/80 line-clamp-2">{art.description || 'No detailed description provided.'}</p>
              </div>

              <div className="pt-3 border-t border-heritage-gold/10 flex items-center justify-between text-xs">
                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                  art.reviewStatus === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {art.reviewStatus}
                </span>

                <Link
                  to={`/archive/${art.id}`}
                  className="text-heritage-terracotta font-semibold hover:text-heritage-gold flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" /> View Details
                </Link>
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="bg-heritage-card rounded-2xl overflow-hidden border border-heritage-gold/20 shadow-md">
          <table className="w-full text-left text-sm text-heritage-slate">
            <thead className="bg-heritage-ivory text-heritage-indigo uppercase text-xs font-semibold border-b border-heritage-gold/20">
              <tr>
                <th className="p-3">Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Region</th>
                <th className="p-3">Status</th>
                <th className="p-3">Created</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-heritage-gold/10">
              {artifacts.map((art) => (
                <tr key={art.id} className="hover:bg-heritage-ivory/50 transition-colors">
                  <td className="p-3 font-semibold text-heritage-indigo">{art.title}</td>
                  <td className="p-3 uppercase text-xs font-bold text-heritage-terracotta">{art.culturalCategory}</td>
                  <td className="p-3 text-xs">{art.region || '—'}</td>
                  <td className="p-3 text-xs">{art.reviewStatus}</td>
                  <td className="p-3 text-xs text-heritage-slate/60">{new Date(art.createdAt).toLocaleDateString()}</td>
                  <td className="p-3">
                    <Link to={`/archive/${art.id}`} className="text-heritage-indigo hover:text-heritage-gold font-bold text-xs">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="px-4 py-2 rounded-xl bg-heritage-card border border-heritage-gold/30 disabled:opacity-40 text-xs font-semibold text-heritage-indigo"
          >
            Previous
          </button>
          <span className="text-xs font-semibold text-heritage-slate">
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="px-4 py-2 rounded-xl bg-heritage-card border border-heritage-gold/30 disabled:opacity-40 text-xs font-semibold text-heritage-indigo"
          >
            Next
          </button>
        </div>
      )}

    </div>
  );
};
