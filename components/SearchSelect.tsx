"use client";

import { useState, useEffect, useRef } from "react";

type SearchSelectItem = {
    id: string | number;
    name: string;
    [key: string]: unknown;
};

type SearchSelectProps = {
    placeholder: string;
    api: string;
    createApi: string;
    extraData?: Record<string, unknown>;
    onSelect: (item: SearchSelectItem) => void;
};

export default function SearchSelect({
    placeholder,
    api,
    createApi,
    extraData,
    onSelect,
}: SearchSelectProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchSelectItem[]>([]);
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShow(false);
            }
        };
        document.addEventListener("pointerdown", handleClickOutside);
        return () => document.removeEventListener("pointerdown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (query.length < 2) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(`${api}?search=${encodeURIComponent(query)}`);
                const data = await res.json();
                setResults(Array.isArray(data) ? data : []);
                setShow(true);
            } catch (error) {
                console.error("Search error:", error);
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(fetchData, 300);
        return () => clearTimeout(timer);
    }, [query, api]);

    const handleQueryChange = (value: string) => {
        setQuery(value);
        if (value.length < 2) {
            setResults([]);
            setShow(false);
        }
    };

    const handleCreate = async () => {
        if (!query.trim()) return;
        setLoading(true);
        try {
            const res = await fetch(createApi, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name: query.trim(), ...extraData }),
            });
            const data = await res.json();
            onSelect(data);
            setQuery(data.name);
            setShow(false);
        } catch (error) {
            console.error("Create error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="search-select-wrapper" ref={wrapperRef}>
            <input
                type="text"
                placeholder={placeholder}
                value={query}
                onChange={(e) => handleQueryChange(e.target.value)}
                className="lp-input"
                autoComplete="off"
                onFocus={() => query.length >= 2 && setShow(true)}
            />

            {show && (
                <div className="search-select-dropdown">
                    {loading && (
                        <div className="search-select-loading">
                            <span className="lp-spinner-dark" />
                            Searching...
                        </div>
                    )}

                    {!loading && results.length === 0 && query && query.length >= 2 && (
                        <div
                            onClick={handleCreate}
                            className="search-select-item search-select-create"
                        >
                            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M12 5v14M5 12h14" />
                            </svg>
                            Create &quot;{query}&quot;
                        </div>
                    )}

                    {!loading && results.map((item) => (
                        <div
                            key={item.id}
                            onClick={() => {
                                onSelect(item);
                                setQuery(item.name);
                                setShow(false);
                            }}
                            className="search-select-item"
                        >
                            {item.name}
                        </div>
                    ))}
                </div>
            )}

            <style>{`
                .search-select-wrapper {
                    position: relative;
                    width: 100%;
                }

                .lp-input {
                    width: 100%;
                    padding: 13px 44px 13px 46px;
                    border-radius: var(--radius-input, 14px);
                    border: 1.5px solid #e7e5e4;
                    background: var(--color-warm-bg, #FEF3E8);
                    font-family: var(--font-body, 'Outfit', system-ui);
                    font-size: 15px;
                    color: #1c1917;
                    outline: none;
                    transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
                }
                .dark .lp-input {
                    background: #1a1714;
                    border-color: #3d352e;
                    color: #e7e5e4;
                }
                .lp-input:focus {
                    border-color: #E8600A;
                    background: #fff;
                    box-shadow: 0 0 0 3px rgba(232,96,10,0.12);
                }
                .dark .lp-input:focus {
                    background: #2a241f;
                }
                .lp-input::placeholder {
                    color: var(--color-muted, #78716c);
                }

                .search-select-dropdown {
                    position: absolute;
                    top: calc(100% + 4px);
                    left: 0;
                    right: 0;
                    background: #ffffff;
                    border-radius: 14px;
                    border: 1px solid rgba(232,96,10,0.15);
                    box-shadow: 0 8px 24px rgba(0,0,0,0.12);
                    z-index: 50;
                    max-height: 240px;
                    overflow-y: auto;
                    font-family: var(--font-body, 'Outfit');
                    pointer-events: auto;
                }
                .dark .search-select-dropdown {
                    background: #23201c;
                    border-color: rgba(232,96,10,0.2);
                }

                .search-select-item {
                    padding: 12px 16px;
                    cursor: pointer;
                    transition: background 0.15s, color 0.15s;
                    color: #1c1917;
                    border-bottom: 1px solid #f0ede8;
                    font-size: 14px;
                }
                .dark .search-select-item {
                    color: #e7e5e4;
                    border-bottom-color: #3d352e;
                }
                .search-select-item:last-child {
                    border-bottom: none;
                }
                .search-select-item:hover {
                    background: rgba(232,96,10,0.08);
                    color: #E8600A;
                }

                .search-select-create {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: #E8600A;
                    font-weight: 500;
                }
                .search-select-create svg {
                    flex-shrink: 0;
                }

                .search-select-loading {
                    padding: 12px 16px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    color: var(--color-muted);
                    font-size: 13px;
                }

                @keyframes search-spin {
                    to { transform: rotate(360deg); }
                }
                .lp-spinner-dark {
                    width: 16px;
                    height: 16px;
                    border: 2px solid rgba(0,0,0,0.15);
                    border-top-color: #E8600A;
                    border-radius: 50%;
                    animation: search-spin 0.6s linear infinite;
                    display: inline-block;
                }
                .dark .lp-spinner-dark {
                    border-color: rgba(255,255,255,0.2);
                    border-top-color: #F59E0B;
                }
            `}</style>
        </div>
    );
}
