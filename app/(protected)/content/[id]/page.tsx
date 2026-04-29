"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function ContentPage() {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFile, setActiveFile] = useState<any>(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError("");
        const res = await fetch(`/api/content/${id}`);
        const json = await res.json();

        if (!res.ok || json.error) {
          setError(json.error || "Failed to load content");
          setLoading(false);
          return;
        }

        setData(json);
        setActiveFile(json.files?.[0] || null);
        setLoading(false);
        // Record view (fire and forget)
        fetch(`/api/content/${id}/view`, { method: "POST" }).catch(() => {});

        // Check bookmark status
        if (session?.user) {
          const bmRes = await fetch(
            `/api/bookmarks?item_type=content&item_id=${id}`
          );
          const bmJson = await bmRes.json();
          setBookmarked(bmJson.bookmarked || false);
        }
      } catch (err) {
        setError("Connection error. Please try again.");
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id, session]);

  const toggleBookmark = async () => {
    if (!session?.user || bookmarkLoading) return;

    setBookmarkLoading(true);
    try {
      const res = await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item_type: "content", item_id: Number(id) }),
      });
      const json = await res.json();
      setBookmarked(json.bookmarked || false);

      // Update local count
      setData((prev: any) => ({
        ...prev,
        content: {
          ...prev.content,
          bookmarks_count: json.bookmarked
            ? (prev.content.bookmarks_count || 0) + 1
            : Math.max(0, (prev.content.bookmarks_count || 0) - 1),
        },
      }));
    } catch (err) {
      console.error("Bookmark toggle failed", err);
    } finally {
      setBookmarkLoading(false);
    }
  };

  // Parse metadata
  const metadata = data?.content?.metadata
    ? (typeof data.content.metadata === "string"
        ? JSON.parse(data.content.metadata)
        : data.content.metadata)
    : {};

  if (loading) return (
    <div className="cv-shell">
      <div className="cv-orb-1" />
      <div className="cv-orb-2" />
      <div className="cv-container">
        <div className="cv-loading">Loading...</div>
      </div>
    </div>
  );

  if (error || !data?.content) return (
    <div className="cv-shell">
      <div className="cv-orb-1" />
      <div className="cv-orb-2" />
      <div className="cv-container">
        <div className="cv-card cv-error">
          <h1 className="cv-error-title">Not Found</h1>
          <p className="cv-error-text">
            {error || "This content doesn't exist or has been removed."}
          </p>
          <Link href="/home" className="cv-error-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );

  const { content, files } = data;

  return (
    <div className="cv-shell">
      <div className="cv-orb-1" />
      <div className="cv-orb-2" />

      <div className="cv-container">
        {/* Back link */}
        <Link href="/home" className="cv-back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        <div className="cv-body">
          {/* Main content */}
          <div className="cv-main">
            <div className="cv-card">
              {/* Title + Bookmark */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px" }}>
                <h1 className="cv-title" style={{ marginBottom: 0, flex: 1 }}>
                  {content.title}
                </h1>
                {session?.user && (
                  <button
                    onClick={toggleBookmark}
                    disabled={bookmarkLoading}
                    className="cv-bookmark-btn"
                    aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "8px",
                      borderRadius: "12px",
                      display: "flex",
                      alignItems: "center",
                      transition: "background 0.2s, transform 0.2s",
                      opacity: bookmarkLoading ? 0.5 : 1,
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(232,96,10,0.08)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                  >
                    {bookmarked ? (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="#E8600A" stroke="#E8600A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    ) : (
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#E8600A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                      </svg>
                    )}
                  </button>
                )}
              </div>

              {/* Description */}
              {content.description && (
                <p className="cv-description">{content.description}</p>
              )}

              {/* Metadata */}
              <div className="cv-meta">
                <span className="cv-meta-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  {content.views_count || 0} views
                </span>
                <span className="cv-meta-item">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                  {content.bookmarks_count || 0} bookmarks
                </span>
                {metadata.semester && (
                  <span className="cv-meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M16 2v4h4" />
                    </svg>
                    {metadata.semester}
                  </span>
                )}
                {metadata.subjectCode && (
                  <span className="cv-meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                    {metadata.subjectCode}
                  </span>
                )}
                {metadata.professor && (
                  <span className="cv-meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    {metadata.professor}
                  </span>
                )}
                {content.created_at && (
                  <span className="cv-meta-item">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {new Date(content.created_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                )}
              </div>

              {/* Tags */}
              {metadata.tags && metadata.tags.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "16px" }}>
                  {metadata.tags.map((tag: string, i: number) => (
                    <span key={i} className="cv-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Body (Notes) */}
            {content.body && (
              <div className="cv-card cv-body-notes">
                <h3 className="cv-notes-title">Notes</h3>
                <div
                  className="cv-notes-html"
                  dangerouslySetInnerHTML={{ __html: content.body }}
                />
              </div>
            )}

            {/* File Viewer */}
            {activeFile && (
              <div className="cv-card cv-file-viewer">
                {activeFile.file_type?.includes("image") && (
                  <img
                    src={activeFile.file_path}
                    alt={activeFile.file_name}
                    className="cv-file-img"
                  />
                )}

                {activeFile.file_type?.includes("pdf") && (
                  <iframe
                    src={activeFile.file_path}
                    className="cv-file-frame"
                    style={{ height: "600px" }}
                  />
                )}

                {activeFile.file_type?.includes("text") && (
                  <iframe
                    src={activeFile.file_path}
                    className="cv-file-frame"
                    style={{ height: "400px" }}
                  />
                )}

                <div style={{ padding: "0 16px 16px" }}>
                  <a
                    href={activeFile.file_path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cv-download-btn"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" />
                    </svg>
                    Download File
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="cv-sidebar">
            <div className="cv-sidebar-card">
              <h3 className="cv-sidebar-title">Files ({files?.length || 0})</h3>
              <div className="cv-file-list">
                {files?.map((file: any) => (
                  <div
                    key={file.id}
                    onClick={() => setActiveFile(file)}
                    className={`cv-file-item${activeFile?.id === file.id ? " cv-file-item--active" : ""}`}
                  >
                    <div className="cv-file-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                      </svg>
                    </div>
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {file.file_name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Subject info */}
            {content.subject_name && (
              <div className="cv-sidebar-card">
                <h3 className="cv-sidebar-title">Subject</h3>
                <p style={{ fontSize: "14px", color: "var(--ph-text, #1c1917)", margin: 0 }}>
                  {content.subject_name}
                </p>
              </div>
            )}

            {/* Metadata sidebar card */}
            {(metadata.tags || metadata.semester || metadata.subjectCode || metadata.professor) && (
              <div className="cv-sidebar-card">
                <h3 className="cv-sidebar-title">Details</h3>
                {metadata.semester && (
                  <p style={{ fontSize: "13px", color: "var(--ph-muted, #78716c)", margin: "0 0 8px" }}>
                    <strong>Semester:</strong> {metadata.semester}
                  </p>
                )}
                {metadata.subjectCode && (
                  <p style={{ fontSize: "13px", color: "var(--ph-muted, #78716c)", margin: "0 0 8px" }}>
                    <strong>Code:</strong> {metadata.subjectCode}
                  </p>
                )}
                {metadata.professor && (
                  <p style={{ fontSize: "13px", color: "var(--ph-muted, #78716c)", margin: "0 0 8px" }}>
                    <strong>Professor:</strong> {metadata.professor}
                  </p>
                )}
                {metadata.tags && metadata.tags.length > 0 && (
                  <div style={{ marginTop: "8px" }}>
                    <p style={{ fontSize: "13px", color: "var(--ph-muted, #78716c)", margin: "0 0 8px" }}>
                      <strong>Tags:</strong>
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "6px" }}>
                      {metadata.tags.map((tag: string, i: number) => (
                        <span key={i} className="cv-tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
