"use client";

import { useState, useEffect, useRef } from "react";

type Item = {
  id: string | number;
  name: string;
  [key: string]: unknown;
};

type SearchSelectProps = {
  placeholder: string;
  api: string;
  createApi: string;
  extraData?: Record<string, unknown>;
  onSelect: (item: Item) => void;
};

export default function SearchSelect({
  placeholder,
  api,
  createApi,
  extraData,
  onSelect,
}: SearchSelectProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Item[]>([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [error, setError] = useState("");

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  /* ── Close on outside click ── */
  useEffect(() => {
    const handleClickOutside = (event: PointerEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShow(false);
      }
    };

    document.addEventListener("pointerdown", handleClickOutside);
    return () => document.removeEventListener("pointerdown", handleClickOutside);
  }, []);

  /* ── Fetch results ── */
  useEffect(() => {
    if (query.length < 1) {
      setResults([]);
      setShow(false);
      return;
    }

    // Abort previous request
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError("");
      setActiveIndex(-1);

      try {
        const res = await fetch(`${api}?search=${encodeURIComponent(query)}`, {
          signal: abortRef.current?.signal,
        });

        if (!res.ok) throw new Error("Search failed");

        const data = await res.json();
        const items = Array.isArray(data) ? data : [];

        // Client-side filter as safety net
        const filtered = items.filter((item: Item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        );

        setResults(filtered);
        setShow(true);
      } catch (err: any) {
        if (err.name !== "AbortError") {
          setError("Search error. Try again?");
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchData, 200);
    return () => {
      clearTimeout(timer);
      abortRef.current?.abort();
    };
  }, [query, api]);

  /* ── Create new item ── */
  const handleCreate = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(createApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: query.trim(),
          ...extraData,
        }),
      });

      if (!res.ok) throw new Error("Creation failed");

      const data = await res.json();
      onSelect(data);
      setQuery(data.name);
      setShow(false);
      setResults([]);
    } catch (err: any) {
      setError(err.message || "Failed to create");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* ── Select item ── */
  const handleSelect = (item: Item) => {
    onSelect(item);
    setQuery(item.name);
    setShow(false);
    setResults([]);
  };

  /* ── Keyboard navigation ── */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!show) {
      if (e.key === "Enter" || e.key === " ") {
        setShow(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) => {
          const max = results.length + (query.trim() ? 1 : 0) - 1;
          return prev < max ? prev + 1 : 0;
        });
        break;

      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => {
          const max = results.length + (query.trim() ? 1 : 0) - 1;
          return prev > 0 ? prev - 1 : max;
        });
        break;

      case "Enter":
        e.preventDefault();
        if (activeIndex >= 0 && activeIndex < results.length) {
          handleSelect(results[activeIndex]);
        } else if (query.trim() && activeIndex === results.length) {
          handleCreate();
        }
        break;

      case "Escape":
        e.preventDefault();
        setShow(false);
        break;

      default:
        break;
    }
  };

  const createIsActive = activeIndex === results.length && query.trim().length > 0;

  return (
    <>
      <style>{STYLES}</style>

      <div className="ss-wrapper" ref={wrapperRef}>

        {/* ── Input wrapper ── */}
        <div className="ss-input-wrapper">
          <input
            ref={inputRef}
            type="text"
            className="ss-input"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length >= 1 && setShow(true)}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            spellCheck="false"
            aria-autocomplete="list"
            aria-expanded={show}
            aria-controls="ss-dropdown"
          />

          {/* Search icon */}
          <svg className="ss-icon-search" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1.8">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>

          {/* Clear button */}
          {query && (
            <button
              type="button"
              className="ss-btn-clear"
              onClick={() => {
                setQuery("");
                setResults([]);
                setShow(false);
                inputRef.current?.focus();
              }}
              aria-label="Clear search"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        {/* Error message */}
        {error && (
          <div className="ss-error" role="alert">
            {error}
          </div>
        )}

        {/* ── Dropdown ── */}
        {show && (
          <div className="ss-dropdown" id="ss-dropdown" role="listbox">

            {loading && (
              <div className="ss-state ss-state--loading">
                <span className="ss-spinner" />
                Searching...
              </div>
            )}

            {!loading && results.length === 0 && !query.trim() && (
              <div className="ss-state ss-state--empty">
                Start typing to search
              </div>
            )}

            {!loading && results.length === 0 && query.trim() && !createIsActive && (
              <div className="ss-state ss-state--empty">
                No results for "{query}"
              </div>
            )}

            {/* Results */}
            {results.map((item, idx) => (
              <div
                key={item.id}
                className={`ss-item${activeIndex === idx ? " ss-item--active" : ""}`}
                onPointerDown={(e) => {
                  e.preventDefault();
                  handleSelect(item);
                }}
                role="option"
                aria-selected={activeIndex === idx}
              >
                <span className="ss-item-icon">📌</span>
                <span className="ss-item-name">{item.name}</span>
              </div>
            ))}

            {/* Create option */}
            {query.trim() && (
              <div className={`ss-create${createIsActive ? " ss-create--active" : ""}`}
                onPointerDown={(e) => {
                  e.preventDefault();
                  handleCreate();
                }}
                role="option"
                aria-selected={createIsActive}
              >
                <span className="ss-create-icon">+</span>
                <span className="ss-create-text">
                  Create <strong>"{query}"</strong>
                </span>
              </div>
            )}

          </div>
        )}
      </div>
    </>
  );
}

/* ────────────────────────────────────────────────
   Styles
──────────────────────────────────────────────── */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600&display=swap');

:root {
  --ss-saffron: #E8600A;
  --ss-amber: #F59E0B;
  --ss-indigo: #1E1B4B;
  --ss-cream: #FFFBF5;
  --ss-cream2: #FEF3E8;
  --ss-text: #1C1917;
  --ss-muted: #78716C;
  --ss-border: #E7E5E2;
  --ss-font: 'Outfit', system-ui, sans-serif;
}

.dark {
  --ss-text: #E7E5E4;
  --ss-muted: #A8A29E;
  --ss-border: #3D352E;
  --ss-cream2: #241F1A;
}

@keyframes ss-fadeIn {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes ss-spin {
  to { transform: rotate(360deg); }
}

/* ── Wrapper ── */
.ss-wrapper {
  position: relative;
  width: 100%;
  font-family: var(--ss-font);
}

/* ── Input box ── */
.ss-input-wrapper {
  position: relative;
  width: 100%;
}

.ss-input {
  width: 100%;
  padding: 12px 40px 12px 16px;
  border-radius: 14px;
  border: 1.5px solid var(--ss-border);
  background: var(--ss-cream2);
  font-family: var(--ss-font);
  font-size: 15px;
  color: var(--ss-text);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  -webkit-appearance: none;
  -moz-appearance: textfield;
}

.dark .ss-input {
  background: #1A1714;
  border-color: #3D352E;
}

.ss-input:focus {
  border-color: var(--ss-saffron);
  background: white;
  box-shadow: 0 0 0 3px rgba(232, 96, 10, 0.12);
}

.dark .ss-input:focus {
  background: #2a241f;
}

.ss-input::placeholder {
  color: var(--ss-muted);
}

/* ── Icons ── */
.ss-icon-search {
  position: absolute;
  right: 14px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: var(--ss-muted);
  pointer-events: none;
}

.ss-btn-clear {
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: var(--ss-muted);
  cursor: pointer;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  transition: color 0.2s;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}

.ss-btn-clear:hover {
  color: var(--ss-saffron);
}

.ss-btn-clear svg {
  width: 14px;
  height: 14px;
  stroke: currentColor;
}

/* ── Error ── */
.ss-error {
  font-size: 12px;
  color: #DC2626;
  margin-top: 6px;
  padding: 0 4px;
  font-weight: 500;
}

/* ── Dropdown ── */
.ss-dropdown {
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  background: white;
  border: 1px solid var(--ss-border);
  border-radius: 14px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1), 0 1px 4px rgba(0, 0, 0, 0.06);
  max-height: 280px;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 200;
  animation: ss-fadeIn 0.18s ease;
  -webkit-overflow-scrolling: touch;
}

.dark .ss-dropdown {
  background: #23201C;
  border-color: rgba(232, 96, 10, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

/* Scrollbar */
.ss-dropdown::-webkit-scrollbar {
  width: 6px;
}

.ss-dropdown::-webkit-scrollbar-track {
  background: transparent;
}

.ss-dropdown::-webkit-scrollbar-thumb {
  background: var(--ss-border);
  border-radius: 3px;
}

.ss-dropdown::-webkit-scrollbar-thumb:hover {
  background: var(--ss-muted);
}

/* ── States ── */
.ss-state {
  padding: 16px;
  text-align: center;
  font-size: 14px;
  color: var(--ss-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.ss-state--loading {
  color: var(--ss-saffron);
  font-weight: 500;
}

.ss-spinner {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(232, 96, 10, 0.2);
  border-top-color: var(--ss-saffron);
  border-radius: 50%;
  animation: ss-spin 0.7s linear infinite;
}

/* ── Item ── */
.ss-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 14px;
  cursor: pointer;
  transition: background 0.15s;
  border-bottom: 1px solid rgba(232, 96, 10, 0.08);
}

.ss-item:last-of-type {
  border-bottom: none;
}

.ss-item:hover,
.ss-item--active {
  background: rgba(232, 96, 10, 0.08);
}

.ss-item-icon {
  font-size: 14px;
  flex-shrink: 0;
  opacity: 0.5;
}

.ss-item-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--ss-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* ── Create ── */
.ss-create {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 14px;
  cursor: pointer;
  color: var(--ss-saffron);
  font-weight: 500;
  border-top: 1px solid var(--ss-border);
  transition: background 0.15s;
}

.ss-create:hover,
.ss-create--active {
  background: rgba(232, 96, 10, 0.08);
}

.ss-create-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(232, 96, 10, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  flex-shrink: 0;
  font-weight: 700;
}

.ss-create-text {
  font-size: 14px;
}

.ss-create-text strong {
  font-weight: 600;
  color: var(--ss-indigo);
}

/* ── Mobile ── */
@media (max-width: 640px) {
  .ss-dropdown {
    max-height: 240px;
  }

  .ss-input {
    font-size: 16px;
  }
}
`;