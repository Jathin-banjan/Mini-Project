import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { artifactApi, Artifact } from '../services/api';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ArrowLeft, MapPin, Tag, ShieldCheck, Calendar, User, FileText, CheckCircle2 } from 'lucide-react';

export const ArtifactDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [artifact, setArtifact] = useState<Artifact | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;
    const loadArtifact = async () => {
      try {
        const data = await artifactApi.getArtifactById(id);
        setArtifact(data);
      } catch (err) {
        console.error("Failed to load artifact details", err);
      } finally {
        setLoading(false);
      }
    };
    loadArtifact();
  }, [id]);

  if (loading) {
    return <LoadingSpinner message="Retrieving digital artifact details..." />;
  }

  if (!artifact) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <p className="font-serif text-2xl font-bold text-heritage-indigo">Artifact Not Found</p>
        <Link to="/archive" className="inline-block px-4 py-2 rounded-xl bg-heritage-indigo text-heritage-ivory text-xs font-semibold">
          Return to Archive
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <Link to="/archive" className="inline-flex items-center gap-2 text-xs font-semibold text-heritage-terracotta hover:text-heritage-gold">
        <ArrowLeft className="w-4 h-4" /> Back to Digital Archive
      </Link>

      <div className="bg-heritage-card rounded-2xl p-8 border border-heritage-gold/30 shadow-lg space-y-8">
        
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-heritage-gold/20 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-1 rounded-full text-xs uppercase font-bold bg-heritage-indigo text-heritage-gold">
                {artifact.culturalCategory}
              </span>
              {artifact.reviewStatus === 'VERIFIED' && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified Catalog Record
                </span>
              )}
            </div>
            <h1 className="font-serif text-3xl font-bold text-heritage-indigo">{artifact.title}</h1>
          </div>

          <div className="text-xs text-heritage-slate/60 font-mono">
            ID: {artifact.id}
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Main Image View */}
          <div className="bg-heritage-ivory rounded-2xl p-4 border border-heritage-gold/20 flex items-center justify-center min-h-[320px]">
            {artifact.mainImage?.storageUrl ? (
              <img src={artifact.mainImage.storageUrl} alt={artifact.title} className="max-h-96 max-w-full object-contain rounded-lg shadow-sm" />
            ) : (
              <div className="text-xs text-heritage-slate/40">No Image Available</div>
            )}
          </div>

          {/* Metadata Specs */}
          <div className="space-y-4 text-sm text-heritage-slate">
            
            <div className="bg-heritage-ivory p-4 rounded-xl border border-heritage-gold/20 space-y-3">
              <h3 className="font-serif font-bold text-heritage-indigo text-base border-b border-heritage-gold/20 pb-2">
                Provenancial Metadata
              </h3>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="font-bold text-heritage-indigo block">Cultural Category:</span>
                  <span className="capitalize">{artifact.culturalCategory}</span>
                </div>
                <div>
                  <span className="font-bold text-heritage-indigo block">Verified Category:</span>
                  <span>{artifact.verifiedCategory || 'Pending Expert Verification'}</span>
                </div>
                <div>
                  <span className="font-bold text-heritage-indigo block">Region / Provenance:</span>
                  <span>{artifact.region || 'Unspecified'}</span>
                </div>
                <div>
                  <span className="font-bold text-heritage-indigo block">Artifact Type:</span>
                  <span>{artifact.artifactType || 'Visual Art'}</span>
                </div>
                <div>
                  <span className="font-bold text-heritage-indigo block">Creation Period:</span>
                  <span>{artifact.creationPeriod || 'Undated'}</span>
                </div>
                <div>
                  <span className="font-bold text-heritage-indigo block">Attribution / Creator:</span>
                  <span>{artifact.creatorAttribution || 'Traditional Community'}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-serif font-bold text-heritage-indigo text-sm">Description & Cultural Notes</h4>
              <p className="text-xs leading-relaxed text-heritage-slate/80 bg-heritage-ivory p-4 rounded-xl border border-heritage-gold/20">
                {artifact.description || 'No detailed description recorded.'}
              </p>
            </div>

            {artifact.sourceLicense && (
              <div className="text-xs text-heritage-slate/60 pt-2">
                <strong>License:</strong> {artifact.sourceLicense}
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
