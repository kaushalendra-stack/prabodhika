"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SearchPage() {
    const router = useRouter();

    const [q, setQ] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => {
            if (q.length > 1) {
                fetchData(q);
            } else {
                setResults([]);
                setHasSearched(false);
            }
        }, 300);

        return () => clearTimeout(t);
    }, [q]);

    const fetchData = async (query: string) => {
        setLoading(true);
        setHasSearched(true);

        try {
            const res = await fetch(`/api/content/search?q=${encodeURIComponent(query)}`);
            const data = await res.json();
            setResults(data || []);
        } catch (err) {
            console.error("Search failed", err);
            setResults([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="cs-shell">
            <div className="cs-orb-1" />
            <div className="cs-orb-2" />

            <div className="cs-container">
                {/* Header */}
                <div className="cs-header">
                    <Link href="/home" className="cs-back">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Back to Home
                    </Link>

                    <h1 className="cs-title">Search</h1>
                    <p className="cs-subtitle">Find notes, PDFs, and resources across your university</p>
                </div>

                {/* Search box */}
                <div className="cs-search-wrap">
                    <svg className="cs-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search notes, PDFs, topics..."
                        className="cs-search-input"
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        autoFocus
                    />
                    {q && (
                        <button
                            className="cs-search-clear"
                            onClick={() => {
                                setQ("");
                                setResults([]);
                                setHasSearched(false);
                            }}
                            aria-label="Clear search"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Loading */}
                {loading && <div className="cs-loading">Searching...</div>}

                {/* Results count */}
                {!loading && hasSearched && (
                    <p className="cs-results-count">
                        {results.length} result{results.length !== 1 ? "s" : ""} found
                    </p>
                )}

                {/* Results list */}
                {!loading && results.length > 0 && (
                    <div className="cs-results-list">
                        {results.map((item) => (
                            <div
                                key={item.id}
                                className="cs-result-card"
                                onClick={() => router.push(`/content/${item.id}`)}
                            >
                                <div className="cs-result-icon">
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                        <polyline points="14 2 14 8 20 8" />
                                    </svg>
                                </div>
                                <div className="cs-result-body">
                                    <h3 className="cs-result-title">{item.title}</h3>
                                    {item.description && (
                                        <p className="cs-result-desc">{item.description}</p>
                                    )}
                                    <div className="cs-result-meta">
                                        <span className="cs-result-meta-item">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8z" />
                                                <circle cx="12" cy="12" r="3" />
                                            </svg>
                                            {item.views_count || 0} views
                                        </span>
                                        <span className="cs-result-meta-item">
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                            </svg>
                                            {item.bookmarks_count || 0} bookmarks
                                        </span>
                                        {item.created_at && (
                                            <span className="cs-result-meta-item">
                                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                                    <circle cx="12" cy="12" r="10" />
                                                    <polyline points="12 6 12 12 14" />
                                                </svg>
                                                {new Date(item.created_at).toLocaleDateString("en-IN", {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div className="cs-result-arrow">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                                        <polyline points="9 18 15 12 9 6" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {!loading && hasSearched && results.length === 0 && (
                    <div className="cs-empty">
                        <div className="cs-empty-icon">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                            </svg>
                        </div>
                        <h3 className="cs-empty-title">No results found</h3>
                        <p className="cs-empty-sub">Try a different keyword or check your spelling</p>
                    </div>
                )}
            </div>
        </div>
    );
}
