"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import SearchSelect from "@/components/SearchSelect";

/* ──────────────────────────────────────────────────
   SVG Icons — Inline primitives
────────────────────────────────────────────────── */
const Icon = ({ 
  type, 
  size = 20 
}: { 
  type: "upload" | "check" | "alert" | "file" | "x" | "arrow" | "folder"; 
  size?: number;
}) => {
  const paths: Record<string, string> = {
    upload: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12",
    check: "M20 6L9 17l-5-5",
    alert: "M12 8v4m0 4v.01M21.12 3.88a9 9 0 1 0 0 12.73",
    file: "M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z M13 2v7h7",
    x: "M18 6L6 18M6 6l12 12",
    arrow: "M5 12h14M12 5l7 7-7 7",
    folder: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z",
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[type]} />
    </svg>
  );
};

export default function UploadPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragZoneRef = useRef<HTMLDivElement>(null);

  /* ── State ── */
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [body, setBody] = useState("");

  const [files, setFiles] = useState<File[]>([]);
  const [university, setUniversity] = useState<any>(null);
  const [college, setCollege] = useState<any>(null);
  const [course, setCourse] = useState<any>(null);
  const [subject, setSubject] = useState<any>(null);

  const [tags, setTags] = useState("");
  const [semester, setSemester] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [professor, setProfessor] = useState("");

  const folderName = "content_" + Date.now();

  /* ── Validation ── */
  const validate = () => {
    if (!title.trim()) return "Give your upload a clear title";
    if (!subject) return "Select a subject — this helps peers find your content";
    if (files.length === 0 && !body.trim()) 
      return "Add at least one file or write some notes";
    if (files.length > 10) return "Max 10 files per upload";
    return null;
  };

  /* ── File management ── */
  const handleFiles = (newFiles: File[]) => {
    const filtered = newFiles.filter(f => f.size < 50 * 1024 * 1024); // 50MB max
    if (filtered.length < newFiles.length) {
      setError("Some files are too large (max 50MB each)");
    }
    setFiles(prev => [...prev, ...filtered].slice(0, 10));
  };

  const removeFile = (idx: number) => {
    setFiles(f => f.filter((_, i) => i !== idx));
  };

  /* ── Drag and drop ── */
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type !== "dragleave");
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(Array.from(e.dataTransfer.files));
  };

  /* ── Upload handler ── */
  const handleUpload = async () => {
    const err = validate();
    if (err) {
      setError(err);
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);
    setUploadProgress(0);

    try {
      let uploaded: any[] = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fd = new FormData();
        fd.append("file", file);
        fd.append("folder_name", folderName);

        const res = await fetch("https://cdn.protoolvault.in/upload.php", {
          method: "POST",
          headers: { "x-api-key": "SECRET123" },
          body: fd,
        });

        const data = await res.json();
        if (data.error) throw new Error(data.error);
        uploaded.push(data);
        setUploadProgress(Math.round(((i + 1) / files.length) * 100));
      }

      const res = await fetch("/api/content/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          body,
          subject_id: subject.id,
          university_id: university?.id || null,
          college_id: college?.id || null,
          course_id: course?.id || null,
          folder_name: folderName,
          files: uploaded,
          metadata: {
            tags: tags.split(",").map(t => t.trim()).filter(Boolean),
            semester,
            subjectCode,
            professor,
          },
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setTimeout(() => router.push("/home"), 1200);
      } else {
        setError(data.error || "Failed to save. Try again?");
      }
    } catch (err: any) {
      setError(err.message || "Upload failed. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{STYLES}</style>

      <div className="pb-upload-shell">
        {/* Decorative background */}
        <div className="pb-upload-bg-orb" />

        <div className="pb-upload-container">

          {/* ── Header ── */}
          <div className="pb-upload-header">
            <div>
              <h1 className="pb-upload-title">
                Share Your <span className="pb-grad">Knowledge</span>
              </h1>
              <p className="pb-upload-subtitle">
                Upload notes, PDFs, and resources. Help your peers ace their exams.
              </p>
            </div>
          </div>

          {/* ── Form ── */}
          <div className="pb-upload-card">

            {/* Error banner */}
            {error && (
              <div className="pb-alert pb-alert--error" role="alert">
                <Icon type="alert" size={18} />
                <span>{error}</span>
                <button onClick={() => setError("")} className="pb-alert-close">
                  <Icon type="x" size={16} />
                </button>
              </div>
            )}

            {/* Success state */}
            {success && (
              <div className="pb-alert pb-alert--success">
                <Icon type="check" size={18} />
                <span>Perfect! Your content is being processed. Redirecting...</span>
              </div>
            )}

            <form className="pb-upload-form">

              {/* ── Section 1: Content ── */}
              <div className="pb-form-section">
                <h2 className="pb-form-section-title">📝 What are you sharing?</h2>

                <div className="pb-form-group">
                  <label className="pb-label">Title <span className="pb-required">*</span></label>
                  <input
                    type="text"
                    className="pb-input"
                    placeholder="e.g., Organic Chemistry Notes — Reaction Mechanisms"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    disabled={loading}
                  />
                  <p className="pb-helper">Be specific so peers can find it easily</p>
                </div>

                <div className="pb-form-group">
                  <label className="pb-label">Description (optional)</label>
                  <textarea
                    rows={2}
                    className="pb-textarea"
                    placeholder="What's covered? Any key takeaways or exam tips?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div className="pb-form-group">
                  <label className="pb-label">Written notes (optional)</label>
                  <textarea
                    rows={4}
                    className="pb-textarea"
                    placeholder="Type directly here, or skip and upload files below — your choice!"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>

              {/* ── Section 2: Files ── */}
              <div className="pb-form-section">
                <h2 className="pb-form-section-title">📂 Add files</h2>

                <div
                  ref={dragZoneRef}
                  className={`pb-drag-zone${dragActive ? " pb-drag-zone--active" : ""}`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="pb-drag-content">
                    <Icon type="upload" size={28} />
                    <p className="pb-drag-text">
                      Drag files here or <button
                        type="button"
                        className="pb-drag-link"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        click to select
                      </button>
                    </p>
                    <p className="pb-drag-hint">PDFs, images, DOCX — up to 100MB all, max 10 files</p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.txt,.jpg,.jpeg,.png,.gif"
                    onChange={(e) => handleFiles(Array.from(e.target.files || []))}
                    className="pb-file-input"
                    disabled={loading}
                  />
                </div>

                {/* File list */}
                {files.length > 0 && (
                  <div className="pb-file-list">
                    {files.map((f, i) => (
                      <div key={i} className="pb-file-item">
                        <div className="pb-file-info">
                          <Icon type="file" size={18} />
                          <div className="pb-file-meta">
                            <p className="pb-file-name">{f.name}</p>
                            <p className="pb-file-size">
                              {(f.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          className="pb-file-remove"
                          onClick={() => removeFile(i)}
                          disabled={loading}
                          aria-label="Remove file"
                        >
                          <Icon type="x" size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Section 3: Subject ── */}
              <div className="pb-form-section">
                <h2 className="pb-form-section-title">🎓 Where does this fit?</h2>

                <div className="pb-form-group">
                  <label className="pb-label">University</label>
                  <SearchSelect
                    placeholder="Search your university..."
                    api="/api/universities"
                    createApi="/api/universities"
                    onSelect={(u: any) => {
                      setUniversity(u);
                      setCollege(null);
                      setCourse(null);
                      setSubject(null);
                    }}
                  />
                </div>

                {university && (
                  <div className="pb-form-group pb-form-group--indent">
                    <label className="pb-label">College / Institute</label>
                    <SearchSelect
                      placeholder="Search your college..."
                      api={`/api/colleges?university_id=${university.id}`}
                      createApi="/api/colleges"
                      extraData={{ university_id: university.id }}
                      onSelect={setCollege}
                    />
                  </div>
                )}

                {university && (
                  <div className="pb-form-group pb-form-group--indent">
                    <label className="pb-label">Course / Program</label>
                    <SearchSelect
                      placeholder="Search your course..."
                      api={`/api/courses?university_id=${university.id}`}
                      createApi="/api/courses"
                      extraData={{ university_id: university.id }}
                      onSelect={setCourse}
                    />
                  </div>
                )}

                {course && (
                  <div className="pb-form-group pb-form-group--indent">
                    <label className="pb-label">Subject <span className="pb-required">*</span></label>
                    <SearchSelect
                      placeholder="Search your subject..."
                      api={`/api/subjects?course_id=${course.id}`}
                      createApi="/api/subjects"
                      extraData={{ course_id: course.id }}
                      onSelect={setSubject}
                    />
                  </div>
                )}
              </div>

              {/* ── Section 4: Metadata ── */}
              <div className="pb-form-section pb-form-section--secondary">
                <h2 className="pb-form-section-title">🏷️ Add context (optional)</h2>

                <div className="pb-form-group">
                  <label className="pb-label">Tags</label>
                  <input
                    type="text"
                    className="pb-input"
                    placeholder="exam, midterm, important, chapter 4"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    disabled={loading}
                  />
                  <p className="pb-helper">Help others find this content faster</p>
                </div>

                <div className="pb-form-row">
                  <div className="pb-form-group">
                    <label className="pb-label">Semester</label>
                    <input
                      type="text"
                      className="pb-input"
                      placeholder="Fall 2024"
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div className="pb-form-group">
                    <label className="pb-label">Subject Code</label>
                    <input
                      type="text"
                      className="pb-input"
                      placeholder="CS101"
                      value={subjectCode}
                      onChange={(e) => setSubjectCode(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="pb-form-group">
                  <label className="pb-label">Professor Name</label>
                  <input
                    type="text"
                    className="pb-input"
                    placeholder="Dr. Sarah Johnson"
                    value={professor}
                    onChange={(e) => setProfessor(e.target.value)}
                    disabled={loading}
                  />
                </div>
              </div>

              {/* ── Progress bar ── */}
              {loading && uploadProgress > 0 && (
                <div className="pb-progress-container">
                  <div className="pb-progress-bar">
                    <div className="pb-progress-fill" style={{ width: `${uploadProgress}%` }} />
                  </div>
                  <p className="pb-progress-text">{uploadProgress}% uploaded</p>
                </div>
              )}

              {/* ── Submit Button ── */}
              <button
                type="button"
                onClick={handleUpload}
                disabled={loading || success}
                className={`pb-btn-submit${loading ? " pb-btn-submit--loading" : ""}${success ? " pb-btn-submit--success" : ""}`}
              >
                {success ? (
                  <>
                    <Icon type="check" size={18} />
                    Done! Redirecting...
                  </>
                ) : loading ? (
                  <>
                    <span className="pb-spinner" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Icon type="arrow" size={18} />
                    Share with peers
                  </>
                )}
              </button>
            </form>
          </div>

          {/* ── Footer tip ── */}
          <div className="pb-upload-footer">
            <p>💡 <strong>Pro tip:</strong> Organized content gets more views. Add tags and a clear description!</p>
          </div>
        </div>
      </div>
    </>
  );
}

/* ──────────────────────────────────────────────────
   All styles
────────────────────────────────────────────────── */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&display=swap');

:root {
  --pb-saffron:    #E8600A;
  --pb-amber:      #F59E0B;
  --pb-indigo:     #1E1B4B;
  --pb-cream:      #FFFBF5;
  --pb-cream2:     #FEF3E8;
  --pb-text:       #1C1917;
  --pb-muted:      #78716C;
  --pb-border:     #E7E5E2;
  --pb-font:       'Outfit', system-ui, sans-serif;
}

.dark {
  --pb-cream:   #1C1A17;
  --pb-cream2:  #241F1A;
  --pb-text:    #E7E5E4;
  --pb-muted:   #A8A29E;
  --pb-border:  #3D352E;
}

@keyframes pb-fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes pb-slideIn { from { opacity: 0; transform: translateX(-12px); } to { opacity: 1; transform: translateX(0); } }
@keyframes pb-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
@keyframes pb-spin { to { transform: rotate(360deg); } }

.pb-upload-shell {
  min-height: 100vh;
  background: var(--pb-cream);
  padding: 32px 24px 64px;
  font-family: var(--pb-font);
  position: relative;
  overflow: hidden;
}

.pb-upload-bg-orb {
  position: fixed;
  top: -120px;
  right: -100px;
  width: 420px;
  height: 420px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(232,96,10,.08) 0%, transparent 70%);
  pointer-events: none;
  z-index: 0;
}

.pb-upload-container {
  max-width: 820px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.pb-upload-header {
  margin-bottom: 48px;
  animation: pb-fadeIn 0.6s ease-out both;
}

.pb-upload-title {
  font-size: 42px;
  font-weight: 700;
  color: var(--pb-indigo);
  line-height: 1.2;
  margin-bottom: 12px;
}

.pb-grad {
  background: linear-gradient(120deg, #E8600A, #F59E0B);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}

.pb-upload-subtitle {
  font-size: 16px;
  color: var(--pb-muted);
  line-height: 1.6;
}

.pb-upload-card {
  background: white;
  border-radius: 24px;
  border: 1px solid rgba(232,96,10,.12);
  padding: 44px;
  box-shadow: 0 1px 0 rgba(232,96,10,.08), 0 8px 32px rgba(0,0,0,.08);
  animation: pb-fadeIn 0.6s ease-out 0.1s both;
}

.dark .pb-upload-card {
  background: #23201C;
  border-color: rgba(232,96,10,.18);
  box-shadow: 0 8px 32px rgba(0,0,0,.3);
}

/* ── Alerts ── */
.pb-alert {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 13px 16px;
  border-radius: 14px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 24px;
  animation: pb-slideIn 0.3s ease;
}

.pb-alert--error {
  background: rgba(220,38,38,.08);
  border: 1px solid rgba(220,38,38,.2);
  color: #DC2626;
}

.pb-alert--success {
  background: rgba(34,197,94,.08);
  border: 1px solid rgba(34,197,94,.2);
  color: #22C55E;
}

.pb-alert-close {
  margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;
  color: inherit;
  opacity: 0.6;
  transition: opacity 0.2s;
  padding: 4px;
  display: flex;
}

.pb-alert-close:hover { opacity: 1; }

/* ── Form structure ── */
.pb-upload-form { display: flex; flex-direction: column; gap: 36px; }

.pb-form-section {
  padding-bottom: 28px;
  border-bottom: 1px solid var(--pb-border);
}

.pb-form-section:last-of-type { border-bottom: none; padding-bottom: 0; }

.pb-form-section--secondary {
  background: var(--pb-cream2);
  border-radius: 18px;
  padding: 28px;
  border: none;
}

.dark .pb-form-section--secondary { background: rgba(232,96,10,.08); }

.pb-form-section-title {
  font-size: 16px;
  font-weight: 700;
  color: var(--pb-text);
  margin-bottom: 20px;
}

.pb-form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 18px;
}

.pb-form-group:last-child { margin-bottom: 0; }

.pb-form-group--indent {
  margin-left: 12px;
  padding-left: 16px;
  border-left: 2px solid rgba(232,96,10,.2);
}

.pb-form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.pb-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--pb-text);
  display: flex;
  gap: 4px;
}

.pb-required {
  color: #E8600A;
  font-weight: 700;
}

.pb-helper {
  font-size: 12px;
  color: var(--pb-muted);
  font-weight: 400;
}

/* ── Inputs ── */
.pb-input,
.pb-textarea {
  width: 100%;
  padding: 12px 16px;
  border-radius: 14px;
  border: 1.5px solid var(--pb-border);
  background: var(--pb-cream2);
  font-family: var(--pb-font);
  font-size: 15px;
  color: var(--pb-text);
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
}

.dark .pb-input,
.dark .pb-textarea {
  background: #1A1714;
  border-color: #3D352E;
}

.pb-input:focus,
.pb-textarea:focus {
  border-color: #E8600A;
  box-shadow: 0 0 0 3px rgba(232,96,10,.12);
}

.pb-input::placeholder,
.pb-textarea::placeholder { color: var(--pb-muted); }

.pb-input:disabled,
.pb-textarea:disabled { opacity: 0.6; cursor: not-allowed; }

.pb-textarea { resize: none; }

/* ── Drag zone ── */
.pb-drag-zone {
  border: 2px dashed var(--pb-border);
  border-radius: 18px;
  padding: 32px 24px;
  text-align: center;
  cursor: pointer;
  background: var(--pb-cream2);
  transition: all 0.3s ease;
  margin-bottom: 20px;
}

.pb-drag-zone:hover {
  border-color: #E8600A;
  background: rgba(232,96,10,.05);
}

.pb-drag-zone--active {
  border-color: #E8600A;
  background: rgba(232,96,10,.10);
  transform: scale(1.02);
}

.pb-drag-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.pb-drag-content svg { color: #E8600A; }

.pb-drag-text {
  font-size: 15px;
  font-weight: 500;
  color: var(--pb-text);
}

.pb-drag-link {
  background: none;
  border: none;
  color: #E8600A;
  font-weight: 700;
  cursor: pointer;
  text-decoration: underline;
}

.pb-drag-hint {
  font-size: 12px;
  color: var(--pb-muted);
}

.pb-file-input { display: none; }

/* ── File list ── */
.pb-file-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.pb-file-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 14px;
  background: var(--pb-cream2);
  border-radius: 12px;
  border: 1px solid var(--pb-border);
  animation: pb-slideIn 0.25s ease;
}

.pb-file-info {
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  min-width: 0;
}

.pb-file-info svg { color: #E8600A; flex-shrink: 0; }

.pb-file-meta { min-width: 0; }

.pb-file-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--pb-text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0;
}

.pb-file-size {
  font-size: 12px;
  color: var(--pb-muted);
  margin: 2px 0 0;
}

.pb-file-remove {
  background: none;
  border: none;
  cursor: pointer;
  color: #DC2626;
  padding: 6px;
  display: flex;
  align-items: center;
  opacity: 0.6;
  transition: opacity 0.2s;
  flex-shrink: 0;
}

.pb-file-remove:hover { opacity: 1; }
.pb-file-remove:disabled { cursor: not-allowed; opacity: 0.4; }

/* ── Progress bar ── */
.pb-progress-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 20px;
}

.pb-progress-bar {
  width: 100%;
  height: 6px;
  background: var(--pb-cream2);
  border-radius: 10px;
  overflow: hidden;
}

.pb-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #E8600A, #F59E0B);
  transition: width 0.3s ease;
  border-radius: 10px;
}

.pb-progress-text {
  font-size: 12px;
  color: var(--pb-muted);
  font-weight: 500;
  text-align: center;
}

/* ── Button ── */
.pb-btn-submit {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  width: 100%;
  padding: 16px;
  border-radius: 50px;
  background: linear-gradient(120deg, #E8600A, #F59E0B);
  color: white;
  font-family: var(--pb-font);
  font-weight: 700;
  font-size: 16px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 24px rgba(232,96,10,.3);
  transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
  min-height: 52px;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
}

.pb-btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 32px rgba(232,96,10,.4);
}

.pb-btn-submit:active:not(:disabled) {
  transform: translateY(0);
}

.pb-btn-submit:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.pb-btn-submit--loading { opacity: 0.8; }
.pb-btn-submit--success { background: linear-gradient(120deg, #22C55E, #16A34A); }

.pb-spinner {
  width: 18px;
  height: 18px;
  border: 2.5px solid rgba(255,255,255,.3);
  border-top-color: white;
  border-radius: 50%;
  animation: pb-spin 0.8s linear infinite;
}

/* ── Footer tip ── */
.pb-upload-footer {
  text-align: center;
  margin-top: 32px;
  padding: 16px;
  font-size: 14px;
  color: var(--pb-muted);
}

.pb-upload-footer strong { color: var(--pb-text); }

/* ── Responsive ── */
@media (max-width: 640px) {
  .pb-upload-shell { padding: 20px 16px 48px; }
  .pb-upload-card { padding: 28px 20px; }
  .pb-upload-title { font-size: 32px; }
  .pb-upload-subtitle { font-size: 15px; }
  .pb-form-row { grid-template-columns: 1fr; }
  .pb-form-section--secondary { padding: 20px; }
  .pb-drag-zone { padding: 24px 16px; }
  .pb-form-group--indent { margin-left: 0; padding-left: 12px; }
}
`;