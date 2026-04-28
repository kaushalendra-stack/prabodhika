"use client";

import { useState } from "react";
import Link from "next/link";

interface ContentItem {
  id: number;
  title: string;
  created_at: string;
}

export default function HomeClient({
  name,
  email,
  universityId,
  personal,
  latest,
}: {
  name: string;
  email: string;
  universityId: number;
  personal: ContentItem[];
  latest: ContentItem[];
}) {
  const [activeTab, setActiveTab] = useState<"for-you" | "latest">("for-you");
  const [searchQuery, setSearchQuery] = useState("");

  const firstName = name?.split(" ")[0] || "Student";

  const forYouContent = personal || [];
  const latestContent = latest || [];

  const filteredForYou = searchQuery
    ? forYouContent.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : forYouContent;

  const filteredLatest = searchQuery
    ? latestContent.filter((item) =>
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : latestContent;

  const currentContent =
    activeTab === "for-you" ? filteredForYou : filteredLatest;

  return (
    <div className="ph-shell">
      {/* Decorative orbs */}
      <div className="ph-orb ph-orb--1" />
      <div className="ph-orb ph-orb--2" />

      <div className="ph-container">
        {/* ── Header ── */}
        <header className="ph-header">
          <div className="ph-header-text">
            <h1 className="ph-title">
              Welcome back, <span className="ph-title-accent">{firstName}</span>
            </h1>
            <p className="ph-subtitle">
              Discover and share knowledge from your university
            </p>
          </div>

          <Link href="/upload" className="ph-upload-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Upload Content
          </Link>
        </header>

        {/* ── Stats Row ── */}
        <div className="ph-stats">
          <div className="ph-stat-card">
            <div className="ph-stat-icon ph-stat-icon--personal">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
              </svg>
            </div>
            <div>
              <p className="ph-stat-value">{forYouContent.length}</p>
              <p className="ph-stat-label">For You</p>
            </div>
          </div>

          <div className="ph-stat-card">
            <div className="ph-stat-icon ph-stat-icon--latest">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <p className="ph-stat-value">{latestContent.length}</p>
              <p className="ph-stat-label">Latest</p>
            </div>
          </div>

          <div className="ph-stat-card">
            <div className="ph-stat-icon ph-stat-icon--uni">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                <path d="M6 12v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" />
              </svg>
            </div>
            <div>
              <p className="ph-stat-value">Uni</p>
              <p className="ph-stat-label">Your Network</p>
            </div>
          </div>
        </div>

        {/* ── Search ── */}
        <div className="ph-search-wrap">
          <svg className="ph-search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="10.5" cy="10.5" r="7.5" />
            <path d="M16 16l6 6" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search notes, resources, or topics..."
            className="ph-search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="ph-search-clear"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* ── Two-Column Layout ── */}
        <div className="ph-body">
          {/* Main Content */}
          <div className="ph-main">

            {/* Tabs */}
            <div className="ph-tabs">
              <button
                className={`ph-tab${activeTab === "for-you" ? " ph-tab--active" : ""}`}
                onClick={() => setActiveTab("for-you")}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                For You
                <span className="ph-tab-count">{forYouContent.length}</span>
              </button>
              <button
                className={`ph-tab${activeTab === "latest" ? " ph-tab--active" : ""}`}
                onClick={() => setActiveTab("latest")}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
                Latest
                <span className="ph-tab-count">{latestContent.length}</span>
              </button>
            </div>

            {/* Content Grid */}
            {currentContent.length === 0 ? (
              <div className="ph-empty">
                <div className="ph-empty-icon">
                  {activeTab === "for-you" ? (
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                  ) : (
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                  )}
                </div>
                <p className="ph-empty-title">
                  {searchQuery
                    ? "No matching content found"
                    : activeTab === "for-you"
                    ? "No personalized content yet"
                    : "No content yet"}
                </p>
                <p className="ph-empty-sub">
                  {searchQuery
                    ? "Try a different search term"
                    : activeTab === "for-you"
                    ? "Content from your university will appear here"
                    : "Be the first to share something!"}
                </p>
                {!searchQuery && (
                  <Link href="/upload" className="ph-empty-btn">
                    Upload Content
                  </Link>
                )}
              </div>
            ) : (
              <div className="ph-content-grid">
                {currentContent.map((item) => (
                  <Link
                    key={item.id}
                    href={`/content/${item.id}`}
                    className="ph-content-card"
                  >
                    <div className="ph-card-icon">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                    </div>
                    <div className="ph-card-body">
                      <h3 className="ph-card-title">{item.title}</h3>
                      <p className="ph-card-date">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        {new Date(item.created_at).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="ph-card-arrow">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="ph-sidebar">
            {/* Quick Actions */}
            <div className="ph-sidebar-card">
              <h3 className="ph-sidebar-title">Quick Actions</h3>
              <div className="ph-actions">
                <Link href="/upload" className="ph-action-btn ph-action-btn--primary">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                  Upload Notes
                </Link>
                <Link href="/latest" className="ph-action-btn ph-action-btn--outline">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                  Browse All
                </Link>
              </div>
            </div>

            {/* User Info */}
            <div className="ph-sidebar-card">
              <h3 className="ph-sidebar-title">Your Study Info</h3>
              <div className="ph-user-info">
                <div className="ph-user-avatar">
                  {firstName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="ph-user-name">{name}</p>
                  <p className="ph-user-email">{email}</p>
                </div>
              </div>
              <div className="ph-study-tags">
                <span className="ph-tag">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    </svg>
                  University #{universityId}
                </span>
              </div>
            </div>

            {/* Tips */}
            <div className="ph-sidebar-card ph-tips-card">
              <h3 className="ph-sidebar-title">💡 Study Tip</h3>
              <p className="ph-tip-text">
                Sharing your notes helps you revise and earn peer recognition. Upload your best materials today!
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
