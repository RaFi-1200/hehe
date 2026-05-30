import { useState, useRef } from "react";

// ─── i18n & Curriculum Data ──────────────────────────────────────────────────
const T = {
  bn: {
    appTitle: "জিপিএ ক্যালকুলেটর", appSubtitle: "বাংলাদেশ শিক্ষা বোর্ড স্ট্যান্ডার্ড",
    tabCalc: "ক্যালকুলেটর", tabGuide: "কীভাবে কাজ করে?",
    selectLevel: "পরীক্ষার স্তর নির্বাচন করুন",
    selectGroup: "আপনার বিভাগ (Group) নির্বাচন করুন",
    groupScience: "বিজ্ঞান", groupHumanities: "মানবিক", groupBusiness: "ব্যবসায় শিক্ষা",
    pec: "পিইসি", pecFull: "প্রাথমিক সমাপনী পরীক্ষা",
    jsc: "জেএসসি", jscFull: "জুনিয়র স্কুল সার্টিফিকেট",
    ssc: "এসএসসি", sscFull: "মাধ্যমিক স্কুল সার্টিফিকেট",
    hsc: "এইচএসসি", hscFull: "উচ্চ মাধ্যমিক পরীক্ষা",
    university: "বিশ্ববিদ্যালয়", universityFull: "সিজিপিএ (৪.০ স্কেল)",
    subjectName: "বিষয়ের নাম", searchSubject: "বিষয় খুঁজুন...",
    paper1: "১ম পত্র (১০০)", paper2: "২য় পত্র (১০০)", total200: "মোট (২০০)",
    marks: "প্রাপ্ত নম্বর (১০০)", grade: "গ্রেড", optional: "ঐচ্ছিক",
    addSubject: "+ নতুন বিষয় যোগ করুন", calculate: "ফলাফল হিসাব করুন",
    reset: "রিসেট", share: "শেয়ার", print: "প্রিন্ট",
    result: "ফলাফল", yourGPA: "আপনার জিপিএ", yourCGPA: "আপনার সিজিপিএ",
    semester: "সেমিস্টার", addSemester: "+ সেমিস্টার যোগ করুন",
    removeSemester: "বাদ দিন", courseCode: "কোর্স কোড / নাম",
    credits: "ক্রেডিট", addCourse: "+ কোর্স যোগ করুন",
    totalCredits: "মোট ক্রেডিট", totalSubjects: "মোট বিষয়",
    improvement: "উন্নতি প্রয়োজন", good: "ভালো", excellent: "অসাধারণ",
    pass: "পাশ", fail: "অকৃতকার্য",
    markOptional: "ঐচ্ছিক বিষয়", tipText: "নম্বর দিলে গ্রেড অটো-সেট হবে",
    copied: "কপি হয়েছে!", shareText: "আমার জিপিএ: ",
    subjectWise: "বিষয়ভিত্তিক ফলাফল", semesterBreakdown: "সেমিস্টার ফলাফল",
    na: "তথ্য নেই", enterMarks: "নম্বর দিন",
    historyTitle: "সংরক্ষিত ফলাফল", saveResult: "ফলাফল সেভ করুন", noHistory: "কোনো ফলাফল নেই।",
    trendTitle: "সেমিস্টার জিপিএ ট্রেন্ড",
    themeLight: "লাইট মোড", themeDark: "ডার্ক মোড",
    selectOptionalTitle: "আপনার ঐচ্ছিক বিষয় (৪র্থ বিষয়) নির্বাচন করুন",
    chooseOptionalOpt: "-- ঐচ্ছিক বিষয় বেছে নিন --",
    saved: "সংরক্ষিত হয়েছে!", totalMarks: "মোট নম্বর", percentage: "শতকরা",
    invalidMarks: "নম্বর ০ থেকে ১০০-এর মধ্যে হতে হবে",
    remove: "মুছে ফেলুন"
  },
  en: {
    appTitle: "GPA Calculator", appSubtitle: "Bangladesh Education Board Standard",
    tabCalc: "Calculator", tabGuide: "How It Works",
    selectLevel: "Select Examination Level",
    selectGroup: "Select Your Group",
    groupScience: "Science", groupHumanities: "Humanities", groupBusiness: "Business Studies",
    pec: "PEC", pecFull: "Primary Education Completion",
    jsc: "JSC", jscFull: "Junior School Certificate",
    ssc: "SSC", sscFull: "Secondary School Certificate",
    hsc: "HSC", hscFull: "Higher Secondary Certificate",
    university: "University", universityFull: "CGPA (4.0 Scale)",
    subjectName: "Subject Name", searchSubject: "Search Subject...",
    paper1: "Paper 1 (100)", paper2: "Paper 2 (100)", total200: "Total (200)",
    marks: "Marks (100)", grade: "Grade", optional: "Optional",
    addSubject: "+ Add Subject", calculate: "Calculate Result",
    reset: "Reset", share: "Share", print: "Print",
    result: "Result", yourGPA: "Your GPA", yourCGPA: "Your CGPA",
    semester: "Semester", addSemester: "+ Add Semester",
    removeSemester: "Remove", courseCode: "Course Code / Name",
    credits: "Credits", addCourse: "+ Add Course",
    totalCredits: "Total Credits", totalSubjects: "Total Subjects",
    improvement: "Needs Improvement", good: "Good", excellent: "Excellent",
    pass: "Pass", fail: "Fail",
    markOptional: "Optional Subject", tipText: "Enter marks to auto-calculate grade",
    copied: "Copied!", shareText: "My GPA: ",
    subjectWise: "Subject-wise Breakdown", semesterBreakdown: "Semester Breakdown",
    na: "N/A", enterMarks: "Enter Marks",
    historyTitle: "Saved Results", saveResult: "Save Result", noHistory: "No saved results.",
    trendTitle: "Semester GPA Trend",
    themeLight: "Light Mode", themeDark: "Dark Mode",
    selectOptionalTitle: "Select Your Optional (4th) Subject",
    chooseOptionalOpt: "-- Choose Optional Subject --",
    saved: "Saved!", totalMarks: "Total Marks", percentage: "Percentage",
    invalidMarks: "Marks must be between 0 and 100",
    remove: "Remove"
  },
};

// ─── Grade Data ───────────────────────────────────────────────────────────────
const bdGrades = [
  { min:80, max:100, point:5.0, letter:"A+", color:"#10b981" },
  { min:70, max:79,  point:4.0, letter:"A",  color:"#3b82f6" },
  { min:60, max:69,  point:3.5, letter:"A-", color:"#6366f1" },
  { min:50, max:59,  point:3.0, letter:"B",  color:"#8b5cf6" },
  { min:40, max:49,  point:2.0, letter:"C",  color:"#f59e0b" },
  { min:33, max:39,  point:1.0, letter:"D",  color:"#f97316" },
  { min:0,  max:32,  point:0.0, letter:"F",  color:"#ef4444" },
];
const uniGrades = [
  { point:4.00, letter:"A+",  color:"#10b981" },
  { point:3.75, letter:"A",   color:"#34d399" },
  { point:3.50, letter:"A-",  color:"#3b82f6" },
  { point:3.25, letter:"B+",  color:"#6366f1" },
  { point:3.00, letter:"B",   color:"#8b5cf6" },
  { point:2.75, letter:"B-",  color:"#a855f7" },
  { point:2.50, letter:"C+",  color:"#f59e0b" },
  { point:2.25, letter:"C",   color:"#f97316" },
  { point:2.00, letter:"D",   color:"#fb923c" },
  { point:0.00, letter:"F",   color:"#ef4444" },
];

const marksToGrade = (m) => bdGrades.find((g) => m >= g.min && m <= g.max) || bdGrades[6];
const getStatus = (gpa, isUni, t) => {
  const r = gpa / (isUni ? 4.0 : 5.0);
  if (gpa === 0 || (isUni ? gpa < 2.0 : gpa < 1.0)) return { label: t.fail, color: "#ef4444" };
  if (r < 0.5)  return { label: t.pass,        color: "#f97316" };
  if (r < 0.72) return { label: t.improvement, color: "#f59e0b" };
  if (r < 0.9)  return { label: t.good,        color: "#3b82f6" };
  return { label: t.excellent, color: "#10b981" };
};

// ─── Official Curriculum Definitions ──────────────────────────────────────────
const CURRICULUM = {
  bn: {
    pec: [
      { name: "বাংলা", dual: false }, { name: "ইংরেজি", dual: false }, { name: "গণিত", dual: false },
      { name: "প্রাথমিক বিজ্ঞান", dual: false }, { name: "বাংলাদেশ ও বিশ্বপরিচয়", dual: false }, { name: "ধর্ম ও নৈতিক শিক্ষা", dual: false }
    ],
    jsc: [
      { name: "বাংলা", dual: false }, { name: "ইংরেজি", dual: false }, { name: "গণিত", dual: false },
      { name: "বিজ্ঞান", dual: false }, { name: "তথ্য ও যোগাযোগ প্রযুক্তি", dual: false }, 
      { name: "বাংলাদেশ ও বিশ্বপরিচয়", dual: false }, { name: "ধর্ম ও নৈতিক শিক্ষা", dual: false }
    ],
    ssc: {
      common: [
        { name: "বাংলা", dual: true }, { name: "ইংরেজি", dual: true }, { name: "গণিত", dual: false },
        { name: "তথ্য ও যোগাযোগ প্রযুক্তি", dual: false }, { name: "ধর্ম ও নৈতিক শিক্ষা", dual: false }
      ],
      science: [
        { name: "পদার্থবিজ্ঞান", dual: false }, { name: "রসায়ন", dual: false }, { name: "বাংলাদেশ ও বিশ্বপরিচয়", dual: false }
      ],
      humanities: [
        { name: "বাংলাদেশের ইতিহাস ও বিশ্বসভ্যতা", dual: false }, { name: "ভূগোল ও পরিবেশ", dual: false }, 
        { name: "অর্থনীতি / পৌরনীতি ও নাগরিকতা", dual: false }, { name: "সাধারণ বিজ্ঞান", dual: false }
      ],
      business: [
        { name: "হিসাববিজ্ঞান", dual: false }, { name: "ফিন্যান্স ও ব্যাংকিং", dual: false }, 
        { name: "ব্যবসায় উদ্যোগ", dual: false }, { name: "সাধারণ বিজ্ঞান", dual: false }
      ]
    },
    hsc: {
      common: [
        { name: "বাংলা", dual: true }, { name: "ইংরেজি", dual: true }, { name: "তথ্য ও যোগাযোগ প্রযুক্তি", dual: false }
      ],
      science: [
        { name: "পদার্থবিজ্ঞান", dual: true }, { name: "রসায়ন", dual: true }
      ],
      humanities: [
        { name: "যুক্তিবিদ্যা / ইসলামের ইতিহাস", dual: true }, { name: "পৌরনীতি ও সুশাসন", dual: true }, { name: "সমাজবিজ্ঞান / সমাজকর্ম", dual: true }
      ],
      business: [
        { name: "হিসাববিজ্ঞান", dual: true }, { name: "ব্যবসায় সংগঠন ও ব্যবস্থাপনা", dual: true }, { name: "ফিন্যান্স, ব্যাংকিং ও বিমা", dual: true }
      ]
    }
  },
  en: {
    pec: [
      { name: "Bangla", dual: false }, { name: "English", dual: false }, { name: "Mathematics", dual: false },
      { name: "Elementary Science", dual: false }, { name: "Bangladesh & Global Studies", dual: false }, { name: "Religion & Moral Education", dual: false }
    ],
    jsc: [
      { name: "Bangla", dual: false }, { name: "English", dual: false }, { name: "Mathematics", dual: false },
      { name: "Science", dual: false }, { name: "ICT", dual: false }, 
      { name: "Bangladesh & Global Studies", dual: false }, { name: "Religion & Moral Education", dual: false }
    ],
    ssc: {
      common: [
        { name: "Bangla", dual: true }, { name: "English", dual: true }, { name: "Mathematics", dual: false },
        { name: "ICT", dual: false }, { name: "Religion & Moral Education", dual: false }
      ],
      science: [
        { name: "Physics", dual: false }, { name: "Chemistry", dual: false }, { name: "Bangladesh & Global Studies", dual: false }
      ],
      humanities: [
        { name: "History of BD & World Civ.", dual: false }, { name: "Geography & Environment", dual: false }, 
        { name: "Economics / Civics", dual: false }, { name: "General Science", dual: false }
      ],
      business: [
        { name: "Accounting", dual: false }, { name: "Finance & Banking", dual: false }, 
        { name: "Business Entrepreneurship", dual: false }, { name: "General Science", dual: false }
      ]
    },
    hsc: {
      common: [
        { name: "Bangla", dual: true }, { name: "English", dual: true }, { name: "ICT", dual: false }
      ],
      science: [
        { name: "Physics", dual: true }, { name: "Chemistry", dual: true }
      ],
      humanities: [
        { name: "Logic / Islamic History", dual: true }, { name: "Civics & Good Governance", dual: true }, { name: "Sociology / Social Work", dual: true }
      ],
      business: [
        { name: "Accounting", dual: true }, { name: "Business Org. & Management", dual: true }, { name: "Finance, Banking & Insurance", dual: true }
      ]
    }
  }
};

const OPTIONAL_SUBJECTS = {
  ssc: {
    science: { bn: ["উচ্চতর গণিত", "জীববিজ্ঞান", "কৃষি শিক্ষা"], en: ["Higher Mathematics", "Biology", "Agriculture"] },
    humanities: { bn: ["কৃষি শিক্ষা", "গার্হস্থ্য বিজ্ঞান", "পৌরনীতি ও নাগরিকতা", "অর্থনীতি"], en: ["Agriculture", "Home Science", "Civics", "Economics"] },
    business: { bn: ["কৃষি শিক্ষা", "গার্হস্থ্য বিজ্ঞান"], en: ["Agriculture", "Home Science"] }
  },
  hsc: {
    science: { bn: ["উচ্চতর গণিত", "জীববিজ্ঞান", "পরিসংখ্যান"], en: ["Higher Mathematics", "Biology", "Statistics"], isDual: true },
    humanities: { bn: ["ভূগোল", "অর্থনীতি", "যুক্তিবিদ্যা", "মনোবিজ্ঞান", "কৃষি শিক্ষা", "পরিসংখ্যান"], en: ["Geography", "Economics", "Logic", "Psychology", "Agriculture", "Statistics"], isDual: true },
    business: { bn: ["উৎপাদন ব্যবস্থাপনা ও বিপণন", "পরিসংখ্যান", "ভূগোল", "কৃষি শিক্ষা"], en: ["Production Management & Marketing", "Statistics", "Geography", "Agriculture"], isDual: true }
  }
};

const ALL_SUBJECTS_POOL = {
  bn: ["উচ্চতর গণিত", "জীববিজ্ঞান", "পরিসংখ্যান", "ভূগোল", "অর্থনীতি", "মনোবিজ্ঞান", "কৃষি শিক্ষা", "গার্হস্থ্য বিজ্ঞান", "পৌরনীতি ও নাগরিকতা"],
  en: ["Higher Mathematics", "Biology", "Statistics", "Geography", "Economics", "Psychology", "Agriculture", "Home Science", "Civics"]
};

let sid = 100, cid = 200, semid = 10;

const makeSubject = (id, name, dual, isOptional = false) => ({
  id, name, dual, p1:"", p2:"", marks:"", gradePoint:"", letter:"", color:"", isOptional, isEditing:false
});
const makeCourse  = (id) => ({ id, code:"", gradePoint:"", credits:"", letter:"", color:"" });
const makeSemester= (id, num) => ({ id, num, courses:[makeCourse(0)] });

// ─── Main Component ──────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang]         = useState("bn");
  const [theme, setTheme]       = useState("dark");
  const [level, setLevel]       = useState(null);
  const [group, setGroup]       = useState("science"); // science, humanities, business

  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [semesters, setSemesters] = useState([makeSemester(0,1)]);
  const [result, setResult]     = useState(null);

  const [selectedOptionalId, setSelectedOptionalId] = useState("");
  const [history, setHistory] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [activePickerId, setActivePickerId] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);
  const [markErrors, setMarkErrors] = useState({});

  const t = T[lang];
  const isDualLevel = level === "ssc" || level === "hsc";

  // Unified Theme Palette
  const colors = {
    bg: theme === "dark" ? "#0b0f19" : "#f1f5f9",
    card: theme === "dark" ? "#1e293b" : "#ffffff",
    border: theme === "dark" ? "#334155" : "#e2e8f0",
    text: theme === "dark" ? "#f8fafc" : "#0f172a",
    textMuted: theme === "dark" ? "#94a3b8" : "#64748b",
    inputBg: theme === "dark" ? "#0f172a" : "#f8fafc",
    primary: "#3b82f6",
    primaryHover: "#2563eb",
    accent: "#8b5cf6",
    success: "#10b981",
    danger: "#ef4444",
    warning: "#f59e0b"
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  const validateMarks = (val) => {
    if (val === "" || val === undefined) return true;
    const num = Number(val);
    return !isNaN(num) && num >= 0 && num <= 100;
  };

  const loadSubjects = (lvl, grp, language) => {
    if (lvl === "pec" || lvl === "jsc") {
      setSubjects(CURRICULUM[language][lvl].map((d,i) => makeSubject(i, d.name, d.dual)));
    } else if (lvl === "ssc" || lvl === "hsc") {
      const common = CURRICULUM[language][lvl].common;
      const specialized = CURRICULUM[language][lvl][grp];
      setSubjects([...common, ...specialized].map((d,i) => makeSubject(i, d.name, d.dual)));
    } else {
      setSemesters([makeSemester(0,1)]);
    }
    setSelectedOptionalId("");
    setMarkErrors({});
  };

  const handleLevelSelect = (lv) => {
    setLevel(lv); setResult(null); sid = 100;
    if (lv === "pec" || lv === "jsc" || lv === "university") {
      loadSubjects(lv, null, lang);
      setIsCalcOpen(true);
    } else {
      // For SSC/HSC, keep modal closed until group is selected
      setSubjects([]); 
      setIsCalcOpen(false);
    }
  };

  const handleGroupSelect = (grp) => {
    setGroup(grp); setResult(null);
    loadSubjects(level, grp, lang);
    setIsCalcOpen(true);
  };

  const switchLang = (l) => {
    setLang(l); setResult(null);
    if (level) loadSubjects(level, group, l);
  };

  // ── Subject Methods ──
  const updateSubject = (id, field, val) => {
    // Validate marks input
    if ((field === "p1" || field === "p2" || field === "marks") && !validateMarks(val)) {
      setMarkErrors(prev => ({ ...prev, [id + field]: t.invalidMarks }));
      return;
    }

    // Clear error if valid
    setMarkErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[id + field];
      return newErrors;
    });

    setSubjects(prev => prev.map(s => {
      if (s.id !== id) return s;
      const u = { ...s, [field]: val };
      if ((field==="p1"||field==="p2")) {
        const p1 = field==="p1" ? val : s.p1;
        const p2 = field==="p2" ? val : s.p2;
        if (p1!=="" && p2!=="" && validateMarks(p1) && validateMarks(p2)) {
          const total = Number(p1)+Number(p2);
          const avg = total / 2;
          const g     = marksToGrade(avg);
          u.gradePoint=g.point; u.letter=g.letter; u.color=g.color; u.marks = total;
        }
      }
      if (field==="marks" && val!=="" && validateMarks(val)) {
        const g = marksToGrade(Number(val));
        u.gradePoint=g.point; u.letter=g.letter; u.color=g.color;
      }
      if (field==="gradePoint" && val!=="") {
        const g = bdGrades.find(x => x.point===Number(val));
        u.letter=g?g.letter:""; u.color=g?g.color:""; u.marks=""; u.p1=""; u.p2="";
      }
      return u;
    }));
  };

  const addSubject = () => setSubjects(p=>[...p, makeSubject(++sid,"",isDualLevel)]);
  const removeSubject = id => {
    setSubjects(p=>p.filter(s=>s.id!==id));
    if (id === "dropdown-optional") setSelectedOptionalId("");
    setMarkErrors(prev => {
      const newErrors = { ...prev };
      Object.keys(newErrors).forEach(k => {
        if (k.startsWith(id)) delete newErrors[k];
      });
      return newErrors;
    });
  };
  const toggleDual = id => setSubjects(p=>p.map(s=>s.id===id?{...s,dual:!s.dual,p1:"",p2:"",marks:"",gradePoint:"",letter:"",color:""}:s));

  const handleOptionalDropdownChange = (e) => {
    const chosenName = e.target.value;
    setSelectedOptionalId(chosenName);
    setSubjects(prev => prev.filter(s => s.id !== "dropdown-optional"));
    if (chosenName) {
      const isHscOptDual = level === 'hsc' ? true : false;
      const optSub = makeSubject("dropdown-optional", chosenName, isHscOptDual, true);
      setSubjects(prev => [...prev, optSub]);
    }
  };

  // ── University Methods ──
  const updateCourse = (semId, cId, field, val) => {
    setSemesters(prev=>prev.map(sem=>sem.id!==semId?sem:{
      ...sem, courses:sem.courses.map(c=>{
        if(c.id!==cId)return c;
        const u={...c,[field]:val};
        if(field==="gradePoint"&&val!==""){
          const g=uniGrades.find(x=>x.point===Number(val));
          u.letter=g?g.letter:""; u.color=g?g.color:"";
        }
        return u;
      })
    }));
  };
  const addCourse = semId => setSemesters(p=>p.map(sem=>sem.id!==semId?sem:{...sem,courses:[...sem.courses,makeCourse(++cid)]}));
  const removeCourse = (semId,cId) => setSemesters(p=>p.map(sem=>sem.id!==semId?sem:{...sem,courses:sem.courses.filter(c=>c.id!==cId)}));
  const addSemester = () => setSemesters(p=>[...p,makeSemester(++semid,semesters.length+1)]);
  const removeSemester = id => { if(semesters.length>1) setSemesters(p=>p.filter(s=>s.id!==id)); };

  // ── Calculation ──
  const calculateSchool = () => {
    const valid = subjects.filter(s=>s.gradePoint!==""&&s.gradePoint!==undefined);
    const mandatory = valid.filter(s=>!s.isOptional);
    const optional  = valid.filter(s=>s.isOptional);
    if(!mandatory.length) return;

    // Calculate total marks and percentage
    let totalMarks = 0;
    let totalMaxMarks = 0;

    mandatory.forEach(s => {
      if (s.dual) {
        totalMarks += (Number(s.p1) || 0) + (Number(s.p2) || 0);
        totalMaxMarks += 200;
      } else {
        totalMarks += Number(s.marks) || 0;
        totalMaxMarks += 100;
      }
    });

    optional.forEach(s => {
      if (s.dual) {
        totalMarks += (Number(s.p1) || 0) + (Number(s.p2) || 0);
        totalMaxMarks += 200;
      } else {
        totalMarks += Number(s.marks) || 0;
        totalMaxMarks += 100;
      }
    });

    const percentage = totalMaxMarks > 0 ? ((totalMarks / totalMaxMarks) * 100).toFixed(2) : 0;

    const baseGPA = mandatory.reduce((sum,s)=>sum+Number(s.gradePoint),0)/mandatory.length;
    let finalGPA  = baseGPA;
    if(optional.length){
      const optAvg = optional.reduce((sum,s)=>sum+Number(s.gradePoint),0)/optional.length;
      if(optAvg > 2.0) finalGPA = Math.min(5.0, baseGPA + (optAvg - 2.0)/mandatory.length);
    }
    setResult({ gpa:finalGPA.toFixed(2), status:getStatus(finalGPA,false,t), mandatory, optional, isUni:false, totalMarks, totalMaxMarks, percentage });
  };

  const calculateCGPA = () => {
    let totalWP=0, totalCr=0;
    const semResults = semesters.map(sem=>{
      let wp=0,cr=0;
      sem.courses.forEach(c=>{
        if(c.gradePoint!==""&&c.credits!==""){
          wp+=Number(c.gradePoint)*Number(c.credits);cr+=Number(c.credits);
        }
      });
      totalWP+=wp; totalCr+=cr;
      return { num:sem.num, gpa:cr?(wp/cr).toFixed(2):null, credits:cr };
    });
    if(!totalCr) return;
    const cgpa = totalWP/totalCr;
    setResult({ gpa:cgpa.toFixed(2), status:getStatus(cgpa,true,t), semResults, totalCr, isUni:true });
  };

  const handleCalculate = () => level==="university" ? calculateCGPA() : calculateSchool();

  const saveToHistory = () => {
    if (!result) return;
    const entry = {
      id: Date.now(),
      level: level.toUpperCase() + (['ssc','hsc'].includes(level) ? ` (${t['group'+group.charAt(0).toUpperCase()+group.slice(1)]})` : ''),
      gpa: result.gpa,
      date: new Date().toLocaleDateString(),
    };
    setHistory([entry, ...history]);
    showToast(t.saved);
  };

  const removeHistoryItem = (id) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const handleReset = () => {
    setResult(null); setSelectedOptionalId("");
    loadSubjects(level, group, lang);
  };

  const filteredSearchPool = ALL_SUBJECTS_POOL[lang].filter(name => 
    name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div style={{minHeight:"100vh", background:colors.bg, color:colors.text, fontFamily:"'Inter', 'Hind Siliguri', sans-serif", transition:"background 0.3s ease, color 0.3s ease"}}>

      {/* Toast Notification */}
      {toastMsg && (
        <div style={{
          position: "fixed", top: "24px", left: "50%", transform: "translateX(-50%)",
          background: colors.success, color: "#fff", padding: "12px 24px", borderRadius: "12px",
          fontWeight: 700, fontSize: "14px", zIndex: 200, boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          animation: "fadeInDown 0.3s ease"
        }}>
          {toastMsg}
        </div>
      )}

      {/* ── HEADER ── */}
      <header style={{background:colors.card, borderBottom:`1px solid ${colors.border}`, padding:"16px 24px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:20, boxShadow:"0 4px 6px -1px rgba(0, 0, 0, 0.05)"}}>
        <div>
          <div style={{fontSize:"22px", fontWeight:800, background:`linear-gradient(90deg, ${colors.primary}, ${colors.accent})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent"}}>{t.appTitle}</div>
          <div style={{fontSize:"13px", color:colors.textMuted, fontWeight:500}}>{t.appSubtitle}</div>
        </div>
        <div style={{display:"flex", gap:"12px", alignItems:"center"}}>
          <button style={{background:colors.inputBg, color:colors.text, border:`1px solid ${colors.border}`, padding:"8px 14px", borderRadius:"10px", cursor:"pointer", display:"flex", alignItems:"center", gap:"6px", fontWeight:600, transition:"all 0.2s"}}
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? "☀️" : "🌙"} <span style={{fontSize:"13px"}}>{theme==="dark"?t.themeLight:t.themeDark}</span>
          </button>

          <div style={{display:"flex", background:colors.inputBg, border:`1px solid ${colors.border}`, borderRadius:"10px", padding:"4px"}}>
            {["bn","en"].map(l=>(
              <button key={l} onClick={()=>switchLang(l)}
                style={{padding:"6px 14px", borderRadius:"8px", border:"none", cursor:"pointer", background:lang===l?colors.primary:"transparent", color:lang===l?"#fff":colors.textMuted, fontWeight:700, fontSize:"13px", transition:"all 0.2s"}}>
                {l==="bn"?"বাংলা":"EN"}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* ── MAIN DASHBOARD ── */}
      <div style={{maxWidth:850, margin:"0 auto", padding:"30px 20px"}}>

        {/* 1. Level Selection */}
        <div style={{background:colors.card, border:`1px solid ${colors.border}`, borderRadius:"20px", padding:"24px", marginBottom:"24px", boxShadow:"0 10px 15px -3px rgba(0, 0, 0, 0.05)"}}>
          <div style={{fontSize:"16px", fontWeight:700, marginBottom:"16px", color:colors.text}}>{t.selectLevel}</div>
          <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(130px, 1fr))", gap:"12px"}}>
            {[
              { id:"pec", icon:"🎒" }, { id:"jsc", icon:"📚" }, 
              { id:"ssc", icon:"🏫" }, { id:"hsc", icon:"🎓" }, 
              { id:"university", icon:"🏛️" }
            ].map(lv=>(
              <button key={lv.id} onClick={() => handleLevelSelect(lv.id)}
                style={{padding:"20px 10px", background:level===lv.id?`${colors.primary}15`:colors.bg, border:`2px solid ${level===lv.id?colors.primary:colors.border}`, borderRadius:"16px", color:colors.text, cursor:"pointer", textAlign:"center", transition:"all 0.2s", transform:level===lv.id?"scale(1.02)":"scale(1)"}}>
                <div style={{fontSize:"32px", marginBottom:"8px"}}>{lv.icon}</div>
                <div style={{fontWeight:800, fontSize:"15px"}}>{t[lv.id]}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Group Selection (Only visible if SSC or HSC is selected) */}
        {(level === "ssc" || level === "hsc") && (
          <div style={{background:colors.card, border:`1px solid ${colors.border}`, borderRadius:"20px", padding:"24px", marginBottom:"24px", animation:"fadeIn 0.3s ease", boxShadow:"0 10px 15px -3px rgba(0, 0, 0, 0.05)"}}>
            <div style={{fontSize:"16px", fontWeight:700, marginBottom:"16px", color:colors.accent}}>{t.selectGroup}</div>
            <div style={{display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:"12px"}}>
              {['science', 'humanities', 'business'].map(grp => (
                <button key={grp} onClick={() => handleGroupSelect(grp)}
                  style={{padding:"16px", background:group===grp?`${colors.accent}15`:colors.bg, border:`2px solid ${group===grp?colors.accent:colors.border}`, borderRadius:"14px", color:colors.text, cursor:"pointer", textAlign:"center", fontWeight:700, transition:"all 0.2s"}}>
                  {t['group'+grp.charAt(0).toUpperCase()+grp.slice(1)]}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 3. History & Charts Section */}
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", gap:"24px", marginBottom:"40px"}}>

          <div style={{background:colors.card, border:`1px solid ${colors.border}`, borderRadius:"20px", padding:"24px", boxShadow:"0 4px 6px -1px rgba(0, 0, 0, 0.05)"}}>
            <div style={{fontWeight:800, marginBottom:"16px", color:colors.primary, fontSize:"16px", display:"flex", alignItems:"center", gap:"8px"}}>
              📈 {t.trendTitle}
            </div>
            {result && result.isUni && result.semResults ? (
              <div style={{display:"flex", alignItems:"flex-end", gap:"12px", height:"140px", padding:"10px 0", borderBottom:`2px solid ${colors.border}`}}>
                {result.semResults.map((sr, idx) => (
                  <div key={idx} style={{flex:1, display:"flex", flexDirection:"column", alignItems:"center", position:"relative"}}>
                    <div style={{fontSize:"11px", fontWeight:700, color:colors.text, marginBottom:"4px"}}>{sr.gpa||"-"}</div>
                    <div style={{width:"100%", maxWidth:"40px", background:`linear-gradient(0deg, ${colors.primary}, #60a5fa)`, borderRadius:"6px 6px 0 0", height:`${(sr.gpa || 0) * 28}px`, minHeight:"5px", transition:"height 0.5s ease"}} />
                    <div style={{fontSize:"11px", marginTop:"8px", color:colors.textMuted, fontWeight:600}}>S{sr.num}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{color:colors.textMuted, fontSize:"14px", textAlign:"center", padding:"40px 0", background:colors.bg, borderRadius:"12px", border:`1px dashed ${colors.border}`}}>
                বিশ্ববিদ্যালয় স্তরের সেমিস্টার ডেটা এখানে প্রদর্শিত হবে।
              </div>
            )}
          </div>

          <div style={{background:colors.card, border:`1px solid ${colors.border}`, borderRadius:"20px", padding:"24px", boxShadow:"0 4px 6px -1px rgba(0, 0, 0, 0.05)"}}>
            <div style={{fontWeight:800, marginBottom:"16px", color:colors.success, fontSize:"16px", display:"flex", alignItems:"center", gap:"8px"}}>
              💾 {t.historyTitle}
            </div>
            {history.length === 0 ? (
              <div style={{color:colors.textMuted, fontSize:"14px", textAlign:"center", padding:"40px 0", background:colors.bg, borderRadius:"12px", border:`1px dashed ${colors.border}`}}>
                {t.noHistory}
              </div>
            ) : (
              <div style={{maxHeight:"140px", overflowY:"auto", display:"flex", flexDirection:"column", gap:"10px", paddingRight:"4px"}}>
                {history.map(item => (
                  <div key={item.id} style={{display:"flex", alignItems:"center", justifyContent:"space-between", background:colors.bg, padding:"12px 16px", borderRadius:"12px", border:`1px solid ${colors.border}`}}>
                    <div style={{display:"flex", flexDirection:"column", flex:1}}>
                      <span style={{fontWeight:700, fontSize:"14px"}}>{item.level}</span>
                      <span style={{fontSize:"11px", color:colors.textMuted}}>{item.date}</span>
                    </div>
                    <div style={{display:"flex", alignItems:"center", gap:"8px"}}>
                      <span style={{color:colors.success, fontWeight:800, fontSize:"16px", background:`${colors.success}15`, padding:"4px 10px", borderRadius:"8px"}}>
                        {item.gpa}
                      </span>
                      <button 
                        onClick={() => removeHistoryItem(item.id)}
                        style={{background:`${colors.danger}15`, border:"none", color:colors.danger, width:"28px", height:"28px", borderRadius:"6px", cursor:"pointer", fontSize:"12px", display:"flex", alignItems:"center", justifyContent:"center"}}
                        title={t.remove}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* ════════ FULL-SCREEN CALCULATOR OVERLAY ════════ */}
      {isCalcOpen && (
        <div style={{position:"fixed", inset:0, background:`${colors.bg}FA`, backdropFilter:"blur(8px)", zIndex:100, overflowY:"auto", padding:"20px 10px", animation:"fadeIn 0.2s ease"}}>
          <div style={{maxWidth:"750px", margin:"20px auto", background:colors.card, border:`1px solid ${colors.border}`, borderRadius:"24px", padding:"30px", position:"relative", boxShadow:"0 25px 50px -12px rgba(0, 0, 0, 0.25)"}}>

            <button onClick={() => setIsCalcOpen(false)}
              style={{position:"absolute", top:"24px", right:"24px", background:colors.bg, color:colors.text, border:`1px solid ${colors.border}`, borderRadius:"50%", width:"36px", height:"36px", cursor:"pointer", fontSize:"18px", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.2s"}}>
              ✕
            </button>

            <div style={{display:"flex", alignItems:"center", gap:"16px", marginBottom:"24px"}}>
              <div style={{width:"56px", height:"56px", background:`${colors.primary}15`, borderRadius:"16px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"28px"}}>
                {level==="university"?"🏛️":level==="hsc"?"🎓":level==="ssc"?"🏫":level==="jsc"?"📚":"🎒"}
              </div>
              <div>
                <h2 style={{margin:0, fontSize:"24px", fontWeight:800, color:colors.text}}>{t[level]} {['ssc','hsc'].includes(level) ? `- ${t['group'+group.charAt(0).toUpperCase()+group.slice(1)]}` : ''}</h2>
                <p style={{margin:"4px 0 0", color:colors.textMuted, fontSize:"14px", fontWeight:500}}>{t[level+"Full"]}</p>
              </div>
            </div>

            <div style={{height:"1px", background:colors.border, margin:"24px 0"}} />

            {/* ── SCHOOL / COLLEGE CALCULATION DOM ── */}
            {level && level !== "university" && (
              <div style={{display:"flex", flexDirection:"column", gap:"12px"}}>
                {subjects.filter(s => s.id !== "dropdown-optional").map(s => (
                  <div key={s.id} style={{background:colors.bg, border:`1px solid ${colors.border}`, borderRadius:"16px", padding:"16px", transition:"all 0.2s"}}>
                    <div style={{display:"flex", gap:"12px", alignItems:"center", marginBottom:"12px"}}>

                      <button onClick={() => setActivePickerId(s.id)}
                        style={{flex:1, textAlign:"left", padding:"12px 16px", background:colors.inputBg, border:`1px solid ${colors.border}`, borderRadius:"10px", color:colors.text, cursor:"pointer", fontSize:"14px", fontWeight:600}}>
                        {s.name || t.searchSubject} <span style={{opacity:0.5, fontSize:"12px", marginLeft:"8px"}}>✎</span>
                      </button>

                      {isDualLevel && (
                        <button onClick={() => toggleDual(s.id)}
                          style={{padding:"10px 14px", border:"none", borderRadius:"10px", cursor:"pointer", background:s.dual?colors.accent:colors.border, color:s.dual?"#fff":colors.text, fontSize:"12px", fontWeight:600, transition:"all 0.2s"}}>
                          {s.dual ? "২-পত্র" : "১-পত্র"}
                        </button>
                      )}

                      <button onClick={() => removeSubject(s.id)} style={{background:`${colors.danger}15`, border:"none", color:colors.danger, width:"40px", height:"40px", borderRadius:"10px", cursor:"pointer", fontWeight:"bold", fontSize:"16px", display:"flex", alignItems:"center", justifyContent:"center"}}>
                        ✕
                      </button>
                    </div>

                    {s.dual ? (
                      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px"}}>
                        <div>
                          <input style={{padding:"14px", borderRadius:"10px", border:`1px solid ${markErrors[s.id + 'p1'] ? colors.danger : colors.border}`, background:colors.inputBg, color:colors.text, fontSize:"15px", fontWeight:500, width:"100%"}} type="number" placeholder={t.paper1} value={s.p1} onChange={e=>updateSubject(s.id,"p1",e.target.value)} />
                          {markErrors[s.id + 'p1'] && <div style={{color:colors.danger, fontSize:"12px", marginTop:"4px"}}>{markErrors[s.id + 'p1']}</div>}
                        </div>
                        <div>
                          <input style={{padding:"14px", borderRadius:"10px", border:`1px solid ${markErrors[s.id + 'p2'] ? colors.danger : colors.border}`, background:colors.inputBg, color:colors.text, fontSize:"15px", fontWeight:500, width:"100%"}} type="number" placeholder={t.paper2} value={s.p2} onChange={e=>updateSubject(s.id,"p2",e.target.value)} />
                          {markErrors[s.id + 'p2'] && <div style={{color:colors.danger, fontSize:"12px", marginTop:"4px"}}>{markErrors[s.id + 'p2']}</div>}
                        </div>
                      </div>
                    ) : (
                      <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px"}}>
                        <div>
                          <input style={{padding:"14px", borderRadius:"10px", border:`1px solid ${markErrors[s.id + 'marks'] ? colors.danger : colors.border}`, background:colors.inputBg, color:colors.text, fontSize:"15px", fontWeight:500, width:"100%"}} type="number" placeholder={t.enterMarks} value={s.marks} onChange={e=>updateSubject(s.id,"marks",e.target.value)} />
                          {markErrors[s.id + 'marks'] && <div style={{color:colors.danger, fontSize:"12px", marginTop:"4px"}}>{markErrors[s.id + 'marks']}</div>}
                        </div>
                        <select style={{padding:"14px", borderRadius:"10px", border:`1px solid ${colors.border}`, background:colors.inputBg, color:colors.text, fontSize:"15px", fontWeight:600}} value={s.gradePoint} onChange={e=>updateSubject(s.id,"gradePoint",e.target.value)}>
                          <option value="">{t.grade}</option>
                          {bdGrades.map(g=><option key={g.letter} value={g.point}>{g.letter} ({g.point})</option>)}
                        </select>
                      </div>
                    )}
                  </div>
                ))}

                <button onClick={addSubject} style={{width:"100%", padding:"16px", background:`${colors.primary}10`, border:`2px dashed ${colors.primary}50`, color:colors.primary, borderRadius:"16px", cursor:"pointer", marginTop:"8px", fontSize:"15px", fontWeight:700, transition:"all 0.2s"}}>
                  {t.addSubject}
                </button>

                {/* ── OPTIONAL SUBJECT SECTION FOR SSC & HSC ── */}
                {(level === "ssc" || level === "hsc") && (
                  <div style={{marginTop:"30px", padding:"20px", background:`${colors.warning}10`, border:`1px solid ${colors.warning}30`, borderRadius:"20px"}}>
                    <h4 style={{margin:"0 0 16px 0", color:colors.warning, fontSize:"15px", fontWeight:800, display:"flex", alignItems:"center", gap:"8px"}}>
                      ★ {t.selectOptionalTitle}
                    </h4>
                    <select 
                      value={selectedOptionalId} 
                      onChange={handleOptionalDropdownChange}
                      style={{padding:"14px", width:"100%", borderRadius:"12px", border:`1px solid ${colors.border}`, background:colors.inputBg, color:colors.text, marginBottom:"16px", fontSize:"15px", fontWeight:600}}
                    >
                      <option value="">{t.chooseOptionalOpt}</option>
                      {OPTIONAL_SUBJECTS[level][group][lang].map((optName) => (
                        <option key={optName} value={optName}>{optName}</option>
                      ))}
                    </select>

                    {subjects.filter(s => s.id === "dropdown-optional").map(s => (
                      <div key={s.id} style={{background:colors.card, border:`1px solid ${colors.border}`, borderRadius:"16px", padding:"16px"}}>
                        <div style={{fontSize:"14px", fontWeight:700, marginBottom:"12px", color:colors.text}}>{s.name} <span style={{color:colors.warning, fontSize:"12px", marginLeft:"4px"}}>(ঐচ্ছিক)</span></div>
                        {s.dual ? (
                          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px"}}>
                            <div>
                              <input style={{padding:"12px", borderRadius:"10px", border:`1px solid ${markErrors[s.id + 'p1'] ? colors.danger : colors.border}`, background:colors.inputBg, color:colors.text, width:"100%"}} type="number" placeholder={t.paper1} value={s.p1} onChange={e=>updateSubject(s.id,"p1",e.target.value)} />
                              {markErrors[s.id + 'p1'] && <div style={{color:colors.danger, fontSize:"12px", marginTop:"4px"}}>{markErrors[s.id + 'p1']}</div>}
                            </div>
                            <div>
                              <input style={{padding:"12px", borderRadius:"10px", border:`1px solid ${markErrors[s.id + 'p2'] ? colors.danger : colors.border}`, background:colors.inputBg, color:colors.text, width:"100%"}} type="number" placeholder={t.paper2} value={s.p2} onChange={e=>updateSubject(s.id,"p2",e.target.value)} />
                              {markErrors[s.id + 'p2'] && <div style={{color:colors.danger, fontSize:"12px", marginTop:"4px"}}>{markErrors[s.id + 'p2']}</div>}
                            </div>
                          </div>
                        ) : (
                          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px"}}>
                            <div>
                              <input style={{padding:"12px", borderRadius:"10px", border:`1px solid ${markErrors[s.id + 'marks'] ? colors.danger : colors.border}`, background:colors.inputBg, color:colors.text, width:"100%"}} type="number" placeholder={t.enterMarks} value={s.marks} onChange={e=>updateSubject(s.id,"marks",e.target.value)} />
                              {markErrors[s.id + 'marks'] && <div style={{color:colors.danger, fontSize:"12px", marginTop:"4px"}}>{markErrors[s.id + 'marks']}</div>}
                            </div>
                            <select style={{padding:"12px", borderRadius:"10px", border:`1px solid ${colors.border}`, background:colors.inputBg, color:colors.text, fontWeight:600}} value={s.gradePoint} onChange={e=>updateSubject(s.id,"gradePoint",e.target.value)}>
                              <option value="">{t.grade}</option>
                              {bdGrades.map(g=><option key={g.letter} value={g.point}>{g.letter} ({g.point})</option>)}
                            </select>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ── UNIVERSITY CALCULATION DOM ── */}
            {level === "university" && (
              <div style={{display:"flex", flexDirection:"column", gap:"16px"}}>
                {semesters.map(sem => (
                  <div key={sem.id} style={{background:colors.bg, border:`1px solid ${colors.border}`, borderRadius:"16px", padding:"20px"}}>
                    <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"16px"}}>
                      <h4 style={{margin:0, fontSize:"16px", fontWeight:700, color:colors.text}}>{t.semester} {sem.num}</h4>
                      {semesters.length > 1 && <button onClick={()=>removeSemester(sem.id)} style={{color:colors.danger, background:"none", border:"none", cursor:"pointer", fontWeight:600, fontSize:"13px"}}>{t.removeSemester}</button>}
                    </div>
                    {sem.courses.map(c => (
                      <div key={c.id} style={{display:"grid", gridTemplateColumns:"1fr 110px 90px 40px", gap:"10px", marginBottom:"10px"}}>
                        <input style={{padding:"12px", borderRadius:"10px", border:`1px solid ${colors.border}`, background:colors.inputBg, color:colors.text, fontWeight:500}} placeholder={t.courseCode} value={c.code} onChange={e=>updateCourse(sem.id,c.id,"code",e.target.value)} />
                        <select style={{padding:"12px", borderRadius:"10px", border:`1px solid ${colors.border}`, background:colors.inputBg, color:colors.text, fontWeight:600}} value={c.gradePoint} onChange={e=>updateCourse(sem.id,c.id,"gradePoint",e.target.value)}>
                          <option value="">{t.grade}</option>
                          {uniGrades.map(g=><option key={g.letter} value={g.point}>{g.letter} ({g.point})</option>)}
                        </select>
                        <input style={{padding:"12px", borderRadius:"10px", border:`1px solid ${colors.border}`, background:colors.inputBg, color:colors.text, fontWeight:500}} type="number" placeholder={t.credits} value={c.credits} onChange={e=>updateCourse(sem.id,c.id,"credits",e.target.value)} />
                        <button onClick={()=>removeCourse(sem.id,c.id)} style={{background:`${colors.danger}15`, border:"none", color:colors.danger, borderRadius:"10px", cursor:"pointer", fontWeight:"bold", display:"flex", alignItems:"center", justifyContent:"center"}}>✕</button>
                      </div>
                    ))}
                    <button onClick={()=>addCourse(sem.id)} style={{width:"100%", padding:"12px", background:"transparent", border:`2px dashed ${colors.border}`, color:colors.textMuted, borderRadius:"10px", cursor:"pointer", fontSize:"13px", fontWeight:600, marginTop:"8px"}}>{t.addCourse}</button>
                  </div>
                ))}
                <button onClick={addSemester} style={{width:"100%", padding:"16px", background:`${colors.primary}10`, border:`2px dashed ${colors.primary}50`, color:colors.primary, borderRadius:"16px", cursor:"pointer", marginTop:"8px", fontSize:"15px", fontWeight:700}}>{t.addSemester}</button>
              </div>
            )}

            {/* ── ACTION BUTTONS ── */}
            <div style={{display:"flex", gap:"12px", marginTop:"32px"}}>
              <button onClick={handleCalculate} style={{flex:2, padding:"16px", background:colors.primary, color:"#fff", border:"none", borderRadius:"14px", fontSize:"16px", fontWeight:800, cursor:"pointer", boxShadow:`0 4px 14px ${colors.primary}40`, transition:"transform 0.2s"}}>{t.calculate}</button>
              <button onClick={saveToHistory} disabled={!result} style={{flex:1, padding:"16px", background:colors.success, color:"#fff", border:"none", borderRadius:"14px", fontSize:"14px", fontWeight:700, cursor:"pointer", opacity:result?1:0.4, transition:"opacity 0.2s"}}>{t.saveResult}</button>
              <button onClick={handleReset} style={{flex:1, padding:"16px", background:colors.bg, border:`2px solid ${colors.border}`, color:colors.text, borderRadius:"14px", fontSize:"14px", fontWeight:700, cursor:"pointer"}}>{t.reset}</button>
            </div>

            {/* ── RESULT DISPLAY ── */}
            {result && (
              <div style={{marginTop:"32px", padding:"30px", background:colors.bg, borderRadius:"20px", border:`2px solid ${result.status.color}`, textAlign:"center", position:"relative", overflow:"hidden", animation:"fadeInUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)"}}>
                <div style={{position:"absolute", inset:0, background:`radial-gradient(circle at top, ${result.status.color}15, transparent 70%)`}} />
                <h3 style={{color:result.status.color, fontSize:"56px", fontWeight:900, margin:0, lineHeight:1}}>{result.gpa}</h3>
                <p style={{fontSize:"16px", margin:"8px 0 0", color:colors.text, fontWeight:700}}>{result.isUni ? t.yourCGPA : t.yourGPA} <span style={{opacity:0.7}}>({result.status.label})</span></p>

                {!result.isUni && (
                  <div style={{display:"flex", justifyContent:"center", gap:"24px", marginTop:"16px", flexWrap:"wrap"}}>
                    <div style={{background:colors.card, padding:"12px 20px", borderRadius:"12px", border:`1px solid ${colors.border}`}}>
                      <div style={{fontSize:"12px", color:colors.textMuted, fontWeight:600, marginBottom:"4px"}}>{t.totalMarks}</div>
                      <div style={{fontSize:"20px", fontWeight:800, color:colors.primary}}>{result.totalMarks} / {result.totalMaxMarks}</div>
                    </div>
                    <div style={{background:colors.card, padding:"12px 20px", borderRadius:"12px", border:`1px solid ${colors.border}`}}>
                      <div style={{fontSize:"12px", color:colors.textMuted, fontWeight:600, marginBottom:"4px"}}>{t.percentage}</div>
                      <div style={{fontSize:"20px", fontWeight:800, color:colors.accent}}>{result.percentage}%</div>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      )}

      {/* ════════ SEARCHABLE SUBJECT PICKER MODAL ════════ */}
      {activePickerId !== null && (
        <div style={{position:"fixed", inset:0, background:"rgba(0,0,0,0.6)", backdropFilter:"blur(4px)", zIndex:110, display:"flex", alignItems:"center", justifyContent:"center", padding:"20px"}}>
          <div style={{background:colors.card, border:`1px solid ${colors.border}`, borderRadius:"24px", padding:"24px", width:"100%", maxWidth:"450px", boxShadow:"0 20px 25px -5px rgba(0, 0, 0, 0.1)"}}>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"20px"}}>
              <h4 style={{margin:0, fontSize:"18px", fontWeight:800, color:colors.text}}>{t.searchSubject}</h4>
              <button onClick={() => setActivePickerId(null)} style={{background:`${colors.danger}15`, border:"none", color:colors.danger, width:"32px", height:"32px", borderRadius:"50%", cursor:"pointer", fontWeight:"bold"}}>✕</button>
            </div>

            <input style={{padding:"14px", width:"100%", borderRadius:"12px", border:`2px solid ${colors.primary}50`, background:colors.inputBg, color:colors.text, marginBottom:"16px", fontSize:"15px", outline:"none"}}
              type="text" placeholder={t.searchSubject} value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} autoFocus />

            <div style={{maxHeight:"300px", overflowY:"auto", display:"flex", flexDirection:"column", gap:"8px", paddingRight:"4px"}}>
              {filteredSearchPool.length > 0 ? filteredSearchPool.map((subjectName, idx) => (
                <button key={idx} onClick={() => {
                    setSubjects(prev => prev.map(s => s.id === activePickerId ? { ...s, name: subjectName } : s));
                    setActivePickerId(null);
                    setSearchQuery("");
                  }}
                  style={{padding:"14px", textAlign:"left", background:colors.bg, border:`1px solid ${colors.border}`, borderRadius:"12px", color:colors.text, cursor:"pointer", fontSize:"14px", fontWeight:600, transition:"background 0.2s"}}>
                  {subjectName}
                </button>
              )) : (
                <div style={{padding:"20px", textAlign:"center", color:colors.textMuted}}>{t.na}</div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Global Styles for Animations */}
      <style>{`
        * { box-sizing: border-box; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${colors.bg}; }
        ::-webkit-scrollbar-thumb { background: ${colors.border}; border-radius: 10px; }
      `}</style>
    </div>
  );
}