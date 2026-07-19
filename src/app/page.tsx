"use client";

import { ChangeEvent, useMemo, useRef, useState } from "react";
import {
  ArrowLeft, Bell, BookOpen, Brain, ChevronDown, ChevronLeft, ChevronRight,
  CircleHelp, Clock3, FileText, Folder, Highlighter, Home, Languages,
  LayoutGrid, Library, ListFilter, MoreHorizontal, Music2, NotebookPen,
  Play, Plus, Search, Send, Settings, Share2, Sparkles, Upload, Volume2,
  X, Zap,
} from "lucide-react";

type Doc = { id: number; title: string; meta: string; progress: number; color: string; type: string; time: string };

const starterDocs: Doc[] = [
  { id: 1, title: "Indian Polity — Fundamental Rights", meta: "PDF · 42 pages", progress: 64, color: "violet", type: "Exam prep", time: "2h ago" },
  { id: 2, title: "Introduction to Microeconomics", meta: "PDF · 118 pages", progress: 21, color: "amber", type: "College", time: "Yesterday" },
  { id: 3, title: "भगवद्गीता — अध्याय 2", meta: "PDF · 31 pages", progress: 82, color: "rose", type: "Sanskrit", time: "3 days ago" },
  { id: 4, title: "Research Methods: A Practical Guide", meta: "EPUB · 204 pages", progress: 9, color: "teal", type: "Research", time: "5 days ago" },
];

function MiniLogo() {
  return <div className="logo-mark"><span>ज्</span></div>;
}

export default function HomePage() {
  const [documents, setDocuments] = useState<Doc[]>(starterDocs);
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"library" | "learn" | "groups" | "studio">("library");
  const [activeDoc, setActiveDoc] = useState<Doc | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [explainOpen, setExplainOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [highlighted, setHighlighted] = useState(false);
  const [chat, setChat] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => documents.filter((doc) => doc.title.toLowerCase().includes(query.toLowerCase())), [documents, query]);

  function addDocuments(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    const newDocs = files.map((file, index) => ({
      id: Date.now() + index,
      title: file.name.replace(/\.[^/.]+$/, ""),
      meta: `${file.name.split(".").pop()?.toUpperCase() ?? "FILE"} · Processing`,
      progress: 0,
      color: ["violet", "teal", "amber"][index % 3],
      type: "New upload",
      time: "Just now",
    }));
    setDocuments((old) => [...newDocs, ...old]);
    setUploadOpen(false);
  }

  if (activeDoc) {
    return <Reader document={activeDoc} onBack={() => setActiveDoc(null)} explainOpen={explainOpen} setExplainOpen={setExplainOpen} chatOpen={chatOpen} setChatOpen={setChatOpen} audioPlaying={audioPlaying} setAudioPlaying={setAudioPlaying} highlighted={highlighted} setHighlighted={setHighlighted} chat={chat} setChat={setChat} />;
  }

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand"><MiniLogo /><span>ज्ञानसेतु</span></div>
        <button className="upload-button" onClick={() => setUploadOpen(true)}><Plus size={18} /> नया दस्तावेज़</button>
        <nav>
          <NavItem icon={<Home size={19} />} label="होम" active={view === "library"} onClick={() => setView("library")} />
          <NavItem icon={<Library size={19} />} label="मेरी लाइब्रेरी" active={view === "library"} onClick={() => setView("library")} />
          <NavItem icon={<Brain size={19} />} label="सीखें" active={view === "learn"} onClick={() => setView("learn")} />
          <NavItem icon={<Music2 size={19} />} label="सुनें" />
          <NavItem icon={<Share2 size={19} />} label="Study Groups" active={view === "groups"} onClick={() => setView("groups")} />
          <NavItem icon={<NotebookPen size={19} />} label="Jnana Studio" active={view === "studio"} onClick={() => setView("studio")} />
        </nav>
        <div className="nav-label">WORKSPACE</div>
        <nav><NavItem icon={<Folder size={19} />} label="UPSC तैयारी" /><NavItem icon={<Folder size={19} />} label="कॉलेज नोट्स" /></nav>
        <div className="sidebar-bottom">
          <div className="plan-card"><Zap size={16} fill="currentColor" /><div><b>Free Trial</b><span>6 दिन शेष</span></div><ChevronRight size={16} /></div>
          <NavItem icon={<Settings size={19} />} label="सेटिंग्स" />
          <div className="profile"><div className="avatar">I</div><div><b>Ishan Patel</b><span>Hindi · Gujarati</span></div><ChevronDown size={16} /></div>
        </div>
      </aside>

      <section className="content-area">
        <header className="topbar"><div className="mobile-brand"><MiniLogo /></div><label className="global-search"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="अपनी लाइब्रेरी में खोजें..." /></label><div className="top-actions"><button className="icon-button"><Bell size={19} /></button><button className="help-button"><CircleHelp size={17} /> सहायता</button></div></header>
        <div className="dashboard">
          {view === "studio" ? <StudioDashboard /> : view === "groups" ? <GroupsDashboard /> : view === "learn" ? <LearningDashboard onOpenDocument={() => setActiveDoc(documents[0])} /> : <>
          <section className="welcome-row"><div><p className="eyebrow">शनिवार, 19 जुलाई</p><h1>नमस्ते, Ishan <span>✦</span></h1><p className="subtle">आज कुछ नया समझने के लिए तैयार हैं?</p></div><button className="primary-button" onClick={() => setUploadOpen(true)}><Upload size={18} /> दस्तावेज़ अपलोड करें</button></section>

          <section className="continue-card">
            <div className="continue-book"><div className="book-lines"><i /><i /><i /><i /></div><span>INDIAN<br/>POLITY</span><small>M. LAXMIKANTH</small></div>
            <div className="continue-info"><div className="pill"><Clock3 size={14} /> जहाँ छोड़ा था</div><h2>Fundamental Rights</h2><p>Indian Polity — Chapter 7</p><div className="progress-line"><span style={{ width: "64%" }} /></div><div className="progress-meta"><span>64% पूरा</span><span>Page 27 of 42</span></div></div>
            <button className="continue-button" onClick={() => setActiveDoc(documents[0])}>पढ़ना जारी रखें <ArrowLeft size={17} /></button>
            <div className="continue-orb orb-one" /><div className="continue-orb orb-two" />
          </section>

          <section className="stats-row"><Stat icon={<BookOpen size={21} />} label="इस सप्ताह पढ़ा" value="2 घं 18 मि" trend="+32%" color="purple" /><Stat icon={<Sparkles size={21} />} label="AI समझाया" value="18 विषय" trend="+6" color="orange" /><Stat icon={<Highlighter size={21} />} label="Highlights" value="46" trend="+12" color="blue" /></section>

          <section className="library-section"><div className="section-heading"><div><h2>हाल के दस्तावेज़</h2><p>आपकी निजी लाइब्रेरी में सब कुछ सुरक्षित है</p></div><div className="library-tools"><button><ListFilter size={17} /> फ़िल्टर</button><button><LayoutGrid size={17} /></button></div></div>
            <div className="document-grid">{filtered.map((doc) => <DocumentCard key={doc.id} doc={doc} onOpen={() => setActiveDoc(doc)} />)}{filtered.length === 0 && <div className="empty-search">कोई दस्तावेज़ नहीं मिला। दूसरा शब्द खोजें या नया दस्तावेज़ upload करें।</div>}</div>
          </section>
          </>}
        </div>
      </section>
      {uploadOpen && <UploadModal inputRef={inputRef} onClose={() => setUploadOpen(false)} onChange={addDocuments} />}
    </main>
  );
}

function NavItem({ icon, label, active, badge, onClick }: { icon: React.ReactNode; label: string; active?: boolean; badge?: string; onClick?: () => void }) { return <button onClick={onClick} className={`nav-item ${active ? "active" : ""}`}>{icon}<span>{label}</span>{badge && <em>{badge}</em>}</button>; }
function Stat({ icon, label, value, trend, color }: { icon: React.ReactNode; label: string; value: string; trend: string; color: string }) { return <article className="stat"><div className={`stat-icon ${color}`}>{icon}</div><div><p>{label}</p><strong>{value}</strong></div><span className="trend">{trend}</span></article>; }
function DocumentCard({ doc, onOpen }: { doc: Doc; onOpen: () => void }) { return <article className="document-card" onClick={onOpen}><div className={`doc-cover ${doc.color}`}><FileText size={26} /><span>{doc.type}</span><div className="cover-pattern" /></div><div className="doc-info"><button className="more" onClick={(e) => e.stopPropagation()}><MoreHorizontal size={19} /></button><h3>{doc.title}</h3><p>{doc.meta}</p><div className="doc-bottom"><div className="tiny-progress"><span style={{ width: `${doc.progress}%` }} /></div><small>{doc.progress}% पढ़ा</small></div><time>{doc.time}</time></div></article>; }
function StudioDashboard() {
  const [uploadOpen, setUploadOpen] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState("नहीं");
  const [submitted, setSubmitted] = useState(false);
  const titles = [
    { title: "भारतीय संविधान: एक परिचय", author: "A. Kulkarni", status: "Published", detail: "Hindi · 1,284 readers", color: "violet" },
    { title: "The Modern Indian State", author: "A. Kulkarni", status: "Review required", detail: "English · Translation pending", color: "teal" },
    { title: "नीतिशास्त्र के मूल सिद्धांत", author: "A. Kulkarni", status: "Draft", detail: "Gujarati · Audio in progress", color: "amber" },
  ];
  return <section className="studio-dashboard">
    <div className="studio-hero"><div><p className="eyebrow">PHASE 4 · AUTHOR & PUBLISHER ECOSYSTEM</p><h1>Jnana Studio <span>✦</span></h1><p>अपने authorized content को multilingual, listenable और distributable बनाएँ।</p></div><button className="primary-button" onClick={() => setUploadOpen(true)}><Plus size={18} /> नया title जोड़ें</button></div>
    <section className="studio-notice"><div className="notice-icon"><Sparkles size={18} /></div><div><b>Rights-first publishing</b><span>केवल public-domain, licensed या आपके द्वारा authorized content को catalog में publish करें।</span></div><button>Rights policy पढ़ें <ChevronRight size={15} /></button></section>
    <div className="studio-stats"><StudioStat label="Published titles" value="12" note="+2 इस महीने" color="purple" /><StudioStat label="Qualified readers" value="3,842" note="Privacy-preserving aggregate" color="orange" /><StudioStat label="Estimated royalties" value="₹18,460" note="Current settlement period" color="green" /></div>
    <section className="catalog-section"><div className="section-heading"><div><h2>आपका catalog</h2><p>Title status, rights और distribution का overview</p></div><div className="catalog-actions"><button><Search size={16} /></button><button><ListFilter size={16} /> Status</button></div></div><div className="title-table"><div className="table-head"><span>Title</span><span>Status</span><span>Languages</span><span>Distribution</span><span /></div>{titles.map((title) => <article className="title-row" key={title.title}><div className="title-cell"><div className={`studio-cover ${title.color}`}><BookOpen size={18} /></div><div><b>{title.title}</b><span>{title.author} · {title.detail}</span></div></div><span className={`title-status ${title.status === "Published" ? "published" : title.status === "Draft" ? "draft" : "review"}`}>{title.status}</span><span className="language-pills"><i>हि</i><i>EN</i>{title.status === "Published" && <i>ગુ</i>}</span><span className="distribution">{title.status === "Published" ? "Subscription + Individual" : "Not live"}</span><button className="row-more" onClick={() => setSelectedTitle(title.title)}><MoreHorizontal size={19} /></button></article>)}</div></section>
    <div className="studio-grid"><section className="production-card"><div className="section-heading"><div><p className="eyebrow">PRODUCTION QUEUE</p><h2>AI-assisted workflows</h2></div><button className="outline-button">सभी देखें</button></div><Workflow icon={<Languages size={18} />} color="translation" title="English → Hindi translation" detail="The Modern Indian State · 72% complete" status="Human review needed" /><Workflow icon={<Volume2 size={18} />} color="audio" title="Gujarati audiobook generation" detail="नीतिशास्त्र के मूल सिद्धांत · Chapter 4" status="Voice quality check" /><Workflow icon={<FileText size={18} />} color="metadata" title="Metadata review" detail="2 titles need ISBN / territory confirmation" status="Action required" /></section><aside className="rights-card"><p className="eyebrow">RIGHTS & LICENSING</p><h3>2 actions need review</h3><p>Distribution शुरू करने से पहले territory और license expiry confirm करें।</p><div className="rights-item"><span>नीतिशास्त्र के मूल सिद्धांत</span><b>Territory missing</b></div><div className="rights-item"><span>Introduction to Ethics</span><b>License expires in 24 days</b></div><button onClick={() => setSelectedTitle("Rights review")}>Rights dashboard खोलें <ChevronRight size={15} /></button></aside></div>
    {selectedTitle !== "नहीं" && <div className="modal-backdrop" onClick={() => setSelectedTitle("नहीं")}><div className="title-detail-modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setSelectedTitle("नहीं")}><X size={20} /></button><div className="upload-icon"><BookOpen size={25} /></div><p className="eyebrow">TITLE MANAGEMENT</p><h2>{selectedTitle}</h2><p>इस title के metadata, rights, territories, pricing और distribution settings को एक सुरक्षित workflow में manage करें।</p><div className="detail-checks"><span>✓ Rights declaration recorded</span><span>✓ Content storage isolated</span><span>• Human review pending where required</span></div><button className="primary-button invite-send" onClick={() => setSelectedTitle("नहीं")}>Title settings खोलें <ChevronRight size={16} /></button></div></div>}
    {uploadOpen && <div className="modal-backdrop" onClick={() => setUploadOpen(false)}><div className="studio-upload-modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setUploadOpen(false)}><X size={20} /></button><div className="upload-icon"><Upload size={25} /></div><h2>नया title जोड़ें</h2><p>Upload से पहले ensure करें कि आपके पास distribution और transformation के आवश्यक अधिकार हैं।</p><label>Title<input placeholder="Book या document का नाम" /></label><label>Rights status<select defaultValue="owned"><option value="owned">मैं rights holder हूँ</option><option value="licensed">मेरे पास license है</option><option value="public">Verified public domain</option></select></label><button className="studio-drop"><Upload size={18} /> Manuscript या EPUB चुनें</button><button className="primary-button invite-send" onClick={() => { setUploadOpen(false); setSubmitted(true); }}>Rights declaration के साथ जारी रखें <ChevronRight size={16} /></button>{submitted && <span className="submit-status">Draft title बनाया गया — rights review अगला कदम है।</span>}</div></div>}
  </section>;
}
function StudioStat({ label, value, note, color }: { label: string; value: string; note: string; color: string }) { return <article className="studio-stat"><div className={`studio-stat-dot ${color}`} /><div><span>{label}</span><b>{value}</b><small>{note}</small></div></article>; }
function Workflow({ icon, color, title, detail, status }: { icon: React.ReactNode; color: string; title: string; detail: string; status: string }) { return <article className="workflow"><div className={`workflow-icon ${color}`}>{icon}</div><div><b>{title}</b><p>{detail}</p></div><span>{status}</span><ChevronRight size={17} /></article>; }

function GroupsDashboard() {
  const [inviteOpen, setInviteOpen] = useState(false);
  const [offline, setOffline] = useState(false);
  const [comments, setComments] = useState([
    { name: "Meera Shah", initials: "MS", color: "meera", text: "Article 14 और Article 15 का फर्क याद रखने का अच्छा तरीका मिला?", anchor: "Page 27 · Right to Equality", time: "12 min ago" },
    { name: "Rahul Mehta", initials: "RM", color: "rahul", text: "मैंने इस section का एक short note जोड़ा है — खासकर equality before law वाला हिस्सा।", anchor: "Page 28 · Note", time: "38 min ago" },
  ]);
  const [comment, setComment] = useState("");
  const postComment = () => { if (!comment.trim()) return; setComments([{ name: "Ishan Patel", initials: "IP", color: "ishan", text: comment, anchor: "Page 27 · Right to Equality", time: "Just now" }, ...comments]); setComment(""); };
  return <section className="groups-dashboard">
    <div className="groups-hero"><div><p className="eyebrow">PHASE 3 · COLLABORATIVE LEARNING</p><h1>साथ मिलकर पढ़ें <span>✦</span></h1><p>आपके notes निजी रहते हैं, जब तक आप उन्हें साझा न करें।</p></div><button className="primary-button" onClick={() => setInviteOpen(true)}><Plus size={18} /> सदस्य आमंत्रित करें</button></div>
    <section className="workspace-banner"><div className="workspace-icon"><BookOpen size={24} /></div><div className="workspace-info"><span className="workspace-label">INVITE-ONLY STUDY SPACE</span><h2>UPSC Polity Study Circle</h2><p>Indian Polity · Fundamental Rights</p><div className="member-row"><div className="member-stack"><i className="member-avatar meera">MS</i><i className="member-avatar rahul">RM</i><i className="member-avatar ishan">IP</i></div><span>3 सदस्य · Owner: आप</span></div></div><div className="workspace-actions"><button><Share2 size={16} /> Invite link</button><button><MoreHorizontal size={18} /></button></div></section>
    <div className="collab-grid"><section className="discussion-panel"><div className="section-heading"><div><h2>Document discussion</h2><p>Page और text से जुड़े comments</p></div><button className="filter-comments"><ListFilter size={15} /> सभी comments</button></div><div className="comment-input"><div className="avatar">I</div><div><input value={comment} onChange={(e) => setComment(e.target.value)} onKeyDown={(e) => e.key === "Enter" && postComment()} placeholder="इस document पर कोई विचार जोड़ें..." /><div><span><FileText size={13} /> Page 27 से जुड़ा हुआ</span><button onClick={postComment}>पोस्ट करें <Send size={14} /></button></div></div></div><div className="comment-list">{comments.map((item, index) => <article className="comment-card" key={`${item.name}-${index}`}><div className={`member-avatar ${item.color}`}>{item.initials}</div><div className="comment-body"><div><b>{item.name}</b><time>{item.time}</time></div><p>{item.text}</p><button className="anchor"><FileText size={13} /> {item.anchor}</button><div className="comment-actions"><button>Reply</button><button>Helpful</button><span>···</span></div></div></article>)}</div></section>
    <aside className="collab-side"><section className="sync-card"><div className="sync-title"><div className="sync-icon"><Zap size={17} /></div><div><b>Cross-device sync</b><span>सभी बदलाव सुरक्षित हैं</span></div></div><div className="sync-status"><i /><span>अभी sync हुआ</span><small>just now</small></div><div className="sync-items"><span><Highlighter size={14} /> 8 highlights</span><span><NotebookPen size={14} /> 3 notes</span><span><BookOpen size={14} /> Page 27</span></div></section><section className="offline-card"><div><div className="offline-icon"><Music2 size={18} /></div><h3>Offline access</h3><p>इस document को app में encrypted रूप से उपलब्ध रखें।</p></div><button className={`toggle ${offline ? "on" : ""}`} onClick={() => setOffline(!offline)} aria-label="Toggle offline access"><i /></button><div className="offline-note">{offline ? "Offline copy तैयार है · इस device तक सीमित" : "Premium feature · Download disabled"}</div></section><section className="permissions-card"><div className="section-heading"><div><h3>Members & permissions</h3></div><button onClick={() => setInviteOpen(true)}><Plus size={15} /></button></div><Member name="Ishan Patel" meta="Owner" initials="IP" color="ishan" /><Member name="Meera Shah" meta="Commenter" initials="MS" color="meera" /><Member name="Rahul Mehta" meta="Viewer" initials="RM" color="rahul" /></section></aside></div>
    {inviteOpen && <div className="modal-backdrop" onClick={() => setInviteOpen(false)}><div className="invite-modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={() => setInviteOpen(false)}><X size={20} /></button><div className="upload-icon"><Share2 size={25} /></div><h2>सदस्य आमंत्रित करें</h2><p>यह invite-only workspace है। नए सदस्य केवल वही देख पाएँगे जिसकी अनुमति आप देंगे।</p><label>ईमेल पता<input placeholder="student@example.com" type="email" /></label><label>भूमिका<select defaultValue="commenter"><option value="viewer">Viewer — केवल पढ़ें</option><option value="commenter">Commenter — comments कर सकते हैं</option><option value="editor">Editor — shared annotations जोड़ सकते हैं</option></select></label><button className="primary-button invite-send" onClick={() => setInviteOpen(false)}>Invite भेजें <Send size={16} /></button></div></div>}
  </section>;
}
function Member({ name, meta, initials, color }: { name: string; meta: string; initials: string; color: string }) { return <div className="permission-member"><i className={`member-avatar ${color}`}>{initials}</i><div><b>{name}</b><span>{meta}</span></div><ChevronDown size={14} /></div>; }

function LearningDashboard({ onOpenDocument }: { onOpenDocument: () => void }) {
  const [tab, setTab] = useState<"today" | "cards" | "quiz">("today");
  const [cardIndex, setCardIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [answer, setAnswer] = useState<string | null>(null);
  const cards = [
    { prompt: "Fundamental Rights संविधान के किस भाग में हैं?", answer: "Part III — Articles 12 से 35 तक।", source: "Indian Polity · Page 27" },
    { prompt: "Rights को ‘justiciable’ क्यों कहा जाता है?", answer: "क्योंकि उल्लंघन होने पर व्यक्ति उनके enforcement के लिए अदालत जा सकता है।", source: "Indian Polity · Page 27" },
    { prompt: "Right to Equality का मूल उद्देश्य क्या है?", answer: "कानून के समक्ष समानता और भेदभाव से सुरक्षा सुनिश्चित करना।", source: "Indian Polity · Page 27" },
  ];
  const current = cards[cardIndex];
  const nextCard = () => { setCardIndex((cardIndex + 1) % cards.length); setShowAnswer(false); };
  return <section className="learning-dashboard">
    <div className="learn-hero"><div><p className="eyebrow">AI EDUCATION MODE</p><h1>सीखने का समय है <span>✦</span></h1><p>आपके documents से बना निजी, source-linked अभ्यास।</p></div><button className="primary-button" onClick={onOpenDocument}><BookOpen size={18} /> पढ़ना जारी रखें</button></div>
    <div className="learn-tabs"><button className={tab === "today" ? "active" : ""} onClick={() => setTab("today")}>आज का प्लान</button><button className={tab === "cards" ? "active" : ""} onClick={() => setTab("cards")}>Flashcards <span>12</span></button><button className={tab === "quiz" ? "active" : ""} onClick={() => setTab("quiz")}>Chapter quiz</button></div>
    {tab === "today" && <>
      <section className="study-streak"><div className="streak-glyph">✦</div><div><span>आपकी learning streak</span><h2>4 दिन <small>लगातार</small></h2></div><div className="week-dots">{["M","T","W","T","F","S","S"].map((day, i) => <div className={i < 4 ? "done" : ""} key={`${day}-${i}`}><b>{i < 4 ? "✓" : day}</b><span>{i < 4 ? "पूरा" : ""}</span></div>)}</div></section>
      <div className="learning-grid"><section className="today-plan"><div className="section-heading"><div><h2>आज का revision plan</h2><p>लगभग 18 मिनट · आपकी हालिया reading के आधार पर</p></div><span className="plan-count">3 tasks</span></div><StudyTask number="01" title="Fundamental Rights" subtitle="8 flashcards review करें" duration="6 min" kind="cards" action={() => setTab("cards")} /><StudyTask number="02" title="Right to Equality" subtitle="5 प्रश्नों का source-based quiz" duration="7 min" kind="quiz" action={() => setTab("quiz")} /><StudyTask number="03" title="Microeconomics" subtitle="Chapter 1 का short summary पढ़ें" duration="5 min" kind="read" action={onOpenDocument} /></section><aside className="insight-card"><span className="eyebrow">LEARNING INSIGHT</span><h3>Equality वाला topic दोहराएँ</h3><p>हाल के answers में इस topic पर confidence कम दिखा है। यह केवल आपके practice responses का संकेत है, definitive assessment नहीं।</p><div className="insight-meter"><span style={{ width: "42%" }} /></div><div className="meter-label"><span>अभ्यास confidence</span><b>42%</b></div><button onClick={() => setTab("quiz")}>अभ्यास शुरू करें <ChevronRight size={15} /></button></aside></div>
      <section className="source-promise"><Sparkles size={19} /><div><b>हर अभ्यास source-linked है</b><span>Flashcards और quiz answers आपके document के page references के साथ आते हैं।</span></div><button onClick={onOpenDocument}>Source खोलें</button></section>
    </>}
    {tab === "cards" && <section className="practice-area"><div className="practice-head"><div><p className="eyebrow">ACTIVE RECALL · 3 OF 12</p><h2>Fundamental Rights</h2></div><button className="outline-button" onClick={() => setTab("today")}>प्लान पर वापस</button></div><article className={`flashcard ${showAnswer ? "flipped" : ""}`} onClick={() => setShowAnswer(!showAnswer)}><span className="card-label">{showAnswer ? "उत्तर" : "प्रश्न"}</span><h3>{showAnswer ? current.answer : current.prompt}</h3>{showAnswer && <div className="card-source"><BookOpen size={15} /> {current.source}</div>}<small>{showAnswer ? "अगला card चुनने के लिए नीचे click करें" : "उत्तर देखने के लिए card पर click करें"}</small></article>{showAnswer && <div className="recall-actions"><button className="hard" onClick={nextCard}>फिर से पढ़ें</button><button className="good" onClick={nextCard}>याद है</button><button className="easy" onClick={nextCard}>बहुत आसान</button></div>}</section>}
    {tab === "quiz" && <section className="practice-area"><div className="practice-head"><div><p className="eyebrow">SOURCE-BASED QUIZ · QUESTION 1 OF 5</p><h2>Right to Equality</h2></div><span className="quiz-score">Best: 4/5</span></div><article className="quiz-card"><span className="card-label">बहुविकल्पी प्रश्न</span><h3>Fundamental Rights के enforcement के लिए व्यक्ति किसके पास जा सकता है?</h3><div className="quiz-options">{["संसद", "न्यायालय", "निर्वाचन आयोग", "नीति आयोग"].map((option, i) => <button className={answer === option ? (i === 1 ? "correct" : "wrong") : ""} onClick={() => setAnswer(option)} key={option}><i>{"ABCD"[i]}</i>{option}</button>)}</div>{answer && <div className="quiz-feedback"><b>{answer === "न्यायालय" ? "सही उत्तर" : "सही उत्तर: न्यायालय"}</b><p>Document में rights को justiciable बताया गया है, अर्थात उल्लंघन होने पर व्यक्ति अदालत जा सकता है।</p><div><BookOpen size={14} /> Source: Indian Polity · Page 27</div></div>}</article></section>}
  </section>;
}
function StudyTask({ number, title, subtitle, duration, kind, action }: { number: string; title: string; subtitle: string; duration: string; kind: string; action: () => void }) { return <article className="study-task"><span className={`task-icon ${kind}`}>{number}</span><div><b>{title}</b><p>{subtitle}</p></div><span className="task-time"><Clock3 size={13} /> {duration}</span><button onClick={action}>{kind === "cards" ? "Review" : kind === "quiz" ? "Start" : "Read"}<ChevronRight size={15} /></button></article>; }

function UploadModal({ inputRef, onClose, onChange }: { inputRef: React.RefObject<HTMLInputElement | null>; onClose: () => void; onChange: (event: ChangeEvent<HTMLInputElement>) => void }) { return <div className="modal-backdrop" onClick={onClose}><div className="upload-modal" onClick={(e) => e.stopPropagation()}><button className="modal-close" onClick={onClose}><X size={20} /></button><div className="upload-icon"><Upload size={27} /></div><h2>अपना दस्तावेज़ जोड़ें</h2><p>PDF, EPUB या image अपलोड करें। आपकी सामग्री निजी और सुरक्षित रहती है।</p><button className="dropzone" onClick={() => inputRef.current?.click()}><FileText size={27} /><b>फ़ाइल चुनें या यहाँ drag करें</b><span>PDF, EPUB, JPG, PNG · अधिकतम 100 MB</span></button><input ref={inputRef} type="file" hidden multiple accept=".pdf,.epub,.jpg,.jpeg,.png,.webp,.txt" onChange={onChange} /><div className="secure-note">✦ Upload से पहले file safety check की जाती है</div></div></div>; }

function Reader({ document, onBack, explainOpen, setExplainOpen, chatOpen, setChatOpen, audioPlaying, setAudioPlaying, highlighted, setHighlighted, chat, setChat }: { document: Doc; onBack: () => void; explainOpen: boolean; setExplainOpen: (v: boolean) => void; chatOpen: boolean; setChatOpen: (v: boolean) => void; audioPlaying: boolean; setAudioPlaying: (v: boolean) => void; highlighted: boolean; setHighlighted: (v: boolean) => void; chat: string[]; setChat: (v: string[]) => void }) {
  const [message, setMessage] = useState("");
  function sendMessage() { if (!message.trim()) return; setChat([...chat, message]); setMessage(""); }
  return <main className="reader-shell">
    <header className="reader-top"><button className="back-button" onClick={onBack}><ChevronLeft size={20} /> लाइब्रेरी</button><div className="reader-title"><span>{document.title}</span><small>निजी दस्तावेज़ · सुरक्षित</small></div><div className="reader-actions"><button className="reader-action" onClick={() => setChatOpen(!chatOpen)}><Sparkles size={17} /> दस्तावेज़ से पूछें</button><button className="icon-button"><Share2 size={18} /></button><button className="icon-button"><MoreHorizontal size={19} /></button></div></header>
    <div className="reader-layout">
      <aside className="reader-sidebar"><div className="mini-toc"><b>विषय सूची</b><button>1. Introduction</button><button className="toc-active">2. Fundamental Rights</button><button>3. Directive Principles</button><button>4. Fundamental Duties</button></div><div className="reader-progress"><span>पढ़ने की प्रगति</span><b>64%</b><div><i /></div></div></aside>
      <article className="page-paper"><div className="page-kicker">CHAPTER 7</div><h1>Fundamental Rights</h1><p className="lead">The Constitution of India guarantees certain fundamental rights to all citizens. These rights are essential for the development of an individual and for preserving human dignity.</p><hr /><h2>Meaning and significance</h2><p>The Fundamental Rights are enshrined in <mark>Part III of the Constitution, from Articles 12 to 35.</mark> They are justiciable, meaning that a person can move the court for their enforcement when a right is violated.</p><p>These rights limit the powers of the State and protect individuals from arbitrary action. They also establish the conditions necessary for democratic life and equal citizenship.</p><div className="selection-tools"><button className={highlighted ? "selected" : ""} onClick={() => setHighlighted(!highlighted)}><Highlighter size={16} /> Highlight</button><button onClick={() => setExplainOpen(true)}><Sparkles size={16} /> सरल अर्थ</button><button><Languages size={16} /> हिंदी में</button><button onClick={() => setAudioPlaying(!audioPlaying)}><Volume2 size={16} /> सुनें</button></div><h2>Right to Equality</h2><p>The Right to Equality ensures equal treatment before law. It includes equality before law, prohibition of discrimination, equality of opportunity in public employment, abolition of untouchability, and abolition of titles.</p><div className="page-number">27</div></article>
      <aside className="ai-rail"><button className="rail-item active" onClick={() => setExplainOpen(!explainOpen)}><Sparkles size={20} /><span>Explain</span></button><button className="rail-item" onClick={() => setChatOpen(!chatOpen)}><Brain size={20} /><span>Ask</span></button><button className="rail-item"><NotebookPen size={20} /><span>Notes</span></button><button className="rail-item"><Languages size={20} /><span>Translate</span></button></aside>
      {explainOpen && <section className="explain-panel"><div className="panel-top"><div><span className="eyebrow">AI EXPLAIN</span><h3>सरल अर्थ</h3></div><button onClick={() => setExplainOpen(false)}><X size={18} /></button></div><p className="explain-hindi">भारतीय संविधान के अनुच्छेद 12 से 35 तक नागरिकों को कुछ बुनियादी अधिकार देता है। अगर सरकार या कोई संस्था इन अधिकारों का उल्लंघन करे, तो व्यक्ति अदालत जा सकता है।</p><div className="source-card"><span>स्रोत</span><b>Page 27 · Meaning and significance</b><p>“They are justiciable, meaning that a person can move the court...”</p></div><div className="explain-options"><button>उदाहरण से समझाएँ</button><button>10 साल के बच्चे की तरह</button></div></section>}
      {chatOpen && <section className="chat-panel"><div className="panel-top"><div><span className="eyebrow">SOURCE-GROUNDED CHAT</span><h3>इस दस्तावेज़ से पूछें</h3></div><button onClick={() => setChatOpen(false)}><X size={18} /></button></div><div className="chat-scroll">{chat.length === 0 ? <><p className="chat-hint">मैं केवल इस document के आधार पर उत्तर दूँगा और source citation दिखाऊँगा।</p><button className="suggestion" onClick={() => setChat(["Fundamental Rights का मुख्य उद्देश्य क्या है?"])}>मुख्य उद्देश्य क्या है?</button><button className="suggestion" onClick={() => setChat(["इसमें Articles 12–35 का क्या महत्व है?"])}>Articles 12–35 का महत्व</button></> : chat.map((q, i) => <div key={i}><div className="user-question">{q}</div><div className="ai-answer">यह chapter बताता है कि Fundamental Rights व्यक्ति की गरिमा, समानता और State की मनमानी कार्रवाई से सुरक्षा के लिए आवश्यक हैं।<div className="answer-citation"><BookOpen size={14} /> Page 27 · Meaning and significance</div></div></div>)}</div><div className="chat-input"><input value={message} onChange={(e) => setMessage(e.target.value)} onKeyDown={(e) => e.key === "Enter" && sendMessage()} placeholder="इस document से पूछें..." /><button onClick={sendMessage}><Send size={17} /></button></div></section>}
    </div>
    <footer className="audio-bar"><button className="play-button" onClick={() => setAudioPlaying(!audioPlaying)}>{audioPlaying ? <span className="pause">Ⅱ</span> : <Play size={17} fill="currentColor" />}</button><div className="audio-copy"><b>{audioPlaying ? "अब चल रहा है" : "सुनने के लिए तैयार"}</b><span>Fundamental Rights · English</span></div><div className="audio-track"><i style={{ width: audioPlaying ? "43%" : "0%" }} /></div><button className="speed">1×</button><Volume2 size={18} /></footer>
  </main>;
}
