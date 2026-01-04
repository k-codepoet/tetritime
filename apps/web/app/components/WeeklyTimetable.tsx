import { useState } from 'react';

interface Program {
  id: number;
  name: string;
  class: string;
  grade: string;
  day: string;
  time: string;
  duration: number;
  capacity: number;
  category: string;
}

interface CategoryStyle {
  label: string;
  icon: string;
  className: string;
  bgColor: string;
  textColor: string;
}

interface SlotContent {
  content: string;
  style: string;
  tooltip?: string;
  program?: Program;
}

// Tetris-inspired Logo Component
function TetritimeLogo() {
  return (
    <div className="flex items-center gap-3">
      <svg width="48" height="48" viewBox="0 0 290 174" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-lg">
        <path d="M231.527 86.9999C231.527 94.9642 228.297 102.173 223.067 107.387C217.837 112.606 210.614 115.835 202.634 115.835C194.654 115.835 187.43 119.059 182.206 124.278C176.977 129.498 173.741 136.707 173.741 144.671C173.741 152.635 170.51 159.844 165.281 165.058C160.051 170.277 152.828 173.507 144.847 173.507C136.867 173.507 129.644 170.277 124.42 165.058C119.19 159.844 115.954 152.635 115.954 144.671C115.954 136.707 119.19 129.498 124.42 124.278C129.644 119.059 136.867 115.835 144.847 115.835C152.828 115.835 160.051 112.606 165.281 107.387C170.51 102.173 173.741 94.9642 173.741 86.9999C173.741 71.0711 160.808 58.1643 144.847 58.1643C136.867 58.1643 129.644 54.9347 124.42 49.7155C119.19 44.502 115.954 37.2931 115.954 29.3287C115.954 21.3643 119.19 14.1555 124.42 8.93622C129.644 3.71698 136.867 0.493164 144.847 0.493164C160.808 0.493164 173.741 13.4 173.741 29.3287C173.741 37.2931 176.977 44.502 182.206 49.7155C187.43 54.9347 194.654 58.1643 202.634 58.1643C218.594 58.1643 231.527 71.0711 231.527 86.9999Z" fill="#F44250"/>
        <path d="M115.954 86.9996C115.954 71.0742 103.018 58.1641 87.0608 58.1641C71.1035 58.1641 58.1676 71.0742 58.1676 86.9996C58.1676 102.925 71.1035 115.835 87.0608 115.835C103.018 115.835 115.954 102.925 115.954 86.9996Z" fill="white"/>
        <path d="M58.1676 144.671C58.1676 128.745 45.2316 115.835 29.2743 115.835C13.317 115.835 0.381104 128.745 0.381104 144.671C0.381104 160.596 13.317 173.506 29.2743 173.506C45.2316 173.506 58.1676 160.596 58.1676 144.671Z" fill="white"/>
        <path d="M289.313 144.671C289.313 128.745 276.378 115.835 260.42 115.835C244.463 115.835 231.527 128.745 231.527 144.671C231.527 160.596 244.463 173.506 260.42 173.506C276.378 173.506 289.313 160.596 289.313 144.671Z" fill="white"/>
      </svg>
      <div>
        <h1 className="font-display text-2xl font-bold text-white tracking-tight">
          Tetritime
        </h1>
        <p className="text-xs text-white/60 font-medium tracking-wide">
          시간표를 테트리스처럼 맞춰요
        </p>
      </div>
    </div>
  );
}

export default function WeeklyTimetable() {
  const afterSchoolPrograms: Program[] = [
    // ===== 월요일 (Monday) =====
    { id: 1, name: '도자기', class: 'A', grade: '1-2', day: '월', time: '13:00~14:20', duration: 80, capacity: 22, category: 'art' },
    { id: 2, name: '도자기', class: 'B', grade: '1~6', day: '월', time: '14:40~16:00', duration: 80, capacity: 22, category: 'art' },
    { id: 3, name: '바둑', class: 'A', grade: '1~2', day: '월', time: '13:00~14:20', duration: 80, capacity: 22, category: 'thinking' },
    { id: 4, name: '바둑', class: 'B', grade: '1~6', day: '월', time: '14:40~16:00', duration: 80, capacity: 22, category: 'thinking' },
    { id: 5, name: '축구', class: 'A', grade: '1~2', day: '월', time: '13:00~14:20', duration: 80, capacity: 22, category: 'sports' },
    { id: 6, name: '미술(회화)', class: 'A', grade: '1-2', day: '월', time: '13:00~14:20', duration: 80, capacity: 22, category: 'art' },
    { id: 7, name: '미술(회화)', class: 'B', grade: '1~6', day: '월', time: '14:40~16:00', duration: 80, capacity: 22, category: 'art' },

    // ===== 화요일 (Tuesday) =====
    { id: 8, name: '독서논술', class: 'A', grade: '1~2', day: '화', time: '13:50~15:10', duration: 80, capacity: 22, category: 'language' },
    { id: 9, name: '주산암산', class: 'A', grade: '1~2', day: '화', time: '13:50~15:10', duration: 80, capacity: 22, category: 'thinking' },
    { id: 10, name: '한자', class: 'A', grade: '1~2', day: '화', time: '13:50~15:10', duration: 80, capacity: 22, category: 'language' },
    { id: 11, name: '한자', class: 'B', grade: '1~6', day: '화', time: '15:20~16:40', duration: 80, capacity: 22, category: 'language' },
    { id: 12, name: '배드민턴', class: 'B', grade: '1~6', day: '화', time: '16:00~17:10', duration: 70, capacity: 22, category: 'sports' },

    // ===== 수요일 (Wednesday) =====
    { id: 13, name: '로봇', class: 'A', grade: '1-2', day: '수', time: '13:50~15:10', duration: 80, capacity: 22, category: 'science' },
    { id: 14, name: '로봇', class: 'B', grade: '1~6', day: '수', time: '15:20~16:40', duration: 80, capacity: 22, category: 'science' },
    { id: 15, name: '방송댄스', class: 'A', grade: '1~2', day: '수', time: '13:50~15:00', duration: 70, capacity: 22, category: 'sports' },
    { id: 16, name: '방송댄스', class: 'B', grade: '1~6', day: '수', time: '15:10~16:20', duration: 70, capacity: 22, category: 'sports' },
    { id: 17, name: '항공우주과학', class: 'A', grade: '1~2', day: '수', time: '13:50~15:10', duration: 80, capacity: 22, category: 'science' },
    { id: 18, name: '아동요리', class: 'A', grade: '1~2', day: '수', time: '13:50~15:10', duration: 80, capacity: 22, category: 'life' },
    { id: 19, name: '음악줄넘기', class: 'A', grade: '1~6', day: '수', time: '13:50~15:00', duration: 70, capacity: 22, category: 'sports' },
    { id: 20, name: '음악줄넘기', class: 'B', grade: '1~6', day: '수', time: '15:10~16:20', duration: 70, capacity: 22, category: 'sports' },

    // ===== 목요일 (Thursday) =====
    { id: 21, name: '생명과학', class: 'A', grade: '1~2', day: '목', time: '13:50~15:10', duration: 80, capacity: 22, category: 'science' },
    { id: 22, name: '생명과학', class: 'B', grade: '1~6', day: '목', time: '15:20~16:40', duration: 80, capacity: 22, category: 'science' },
    { id: 23, name: '독서논술', class: 'C', grade: '1~2', day: '목', time: '13:50~15:10', duration: 80, capacity: 22, category: 'language' },
    { id: 24, name: '바이올린', class: 'A', grade: '1-2', day: '목', time: '13:50~15:10', duration: 80, capacity: 15, category: 'music' },
    { id: 25, name: '바이올린', class: 'B', grade: '1~6', day: '목', time: '15:20~16:40', duration: 80, capacity: 15, category: 'music' },
    { id: 26, name: '미술(회화)', class: 'C', grade: '1~2', day: '목', time: '13:50~15:10', duration: 80, capacity: 22, category: 'art' },
    { id: 27, name: '미술(회화)', class: 'D', grade: '1~6', day: '목', time: '15:20~16:40', duration: 80, capacity: 22, category: 'art' },
    { id: 28, name: '컴퓨터기초', class: 'B', grade: '1~2', day: '목', time: '13:50~15:10', duration: 80, capacity: 20, category: 'computer' },

    // ===== 금요일 (Friday) =====
    { id: 29, name: '바둑', class: 'C', grade: '1~2', day: '금', time: '13:00~14:20', duration: 80, capacity: 22, category: 'thinking' },
    { id: 30, name: '바둑', class: 'D', grade: '1~6', day: '금', time: '14:40~16:00', duration: 80, capacity: 22, category: 'thinking' },
    { id: 31, name: '퍼니스포츠', class: 'A', grade: '1~2', day: '금', time: '13:00~14:10', duration: 70, capacity: 22, category: 'sports' },
    { id: 32, name: '로봇', class: 'C', grade: '1~2', day: '금', time: '13:00~14:20', duration: 80, capacity: 22, category: 'science' },
    { id: 33, name: '로봇', class: 'D', grade: '1~6', day: '금', time: '14:40~16:00', duration: 80, capacity: 22, category: 'science' },
    { id: 34, name: '생명과학', class: 'C', grade: '1~2', day: '금', time: '13:00~14:20', duration: 80, capacity: 22, category: 'science' },
    { id: 35, name: '생명과학', class: 'D', grade: '1~6', day: '금', time: '14:40~16:00', duration: 80, capacity: 22, category: 'science' },
    { id: 36, name: '주산암산', class: 'C', grade: '1~2', day: '금', time: '13:00~14:20', duration: 80, capacity: 22, category: 'thinking' },
    { id: 37, name: '주산암산', class: 'D', grade: '1~6', day: '금', time: '14:40~16:00', duration: 80, capacity: 22, category: 'thinking' },
    { id: 38, name: '영어그림책', class: 'A', grade: '1~2', day: '금', time: '13:00~14:20', duration: 80, capacity: 15, category: 'language' },
    { id: 39, name: '영어그림책', class: 'B', grade: '1~2', day: '금', time: '14:30~15:50', duration: 80, capacity: 15, category: 'language' },
    { id: 40, name: '컴퓨터기초', class: 'A', grade: '1~2', day: '금', time: '13:00~14:20', duration: 80, capacity: 20, category: 'computer' },
  ];

  const [selectedPrograms, setSelectedPrograms] = useState<Program[]>([]);
  const [filterCategory, setFilterCategory] = useState('all');

  const days = ['월', '화', '수', '목', '금'];
  const dayColors = [
    'from-rose-500 to-red-600',
    'from-amber-500 to-orange-600',
    'from-emerald-500 to-green-600',
    'from-cyan-500 to-teal-600',
    'from-violet-500 to-purple-600',
  ];

  const categories: Record<string, CategoryStyle> = {
    all: { label: '전체', icon: '◼', className: '', bgColor: 'bg-white/10', textColor: 'text-white' },
    art: { label: '예술', icon: '🎨', className: 'category-art', bgColor: 'bg-pink-500/20', textColor: 'text-pink-300' },
    thinking: { label: '사고력', icon: '🧠', className: 'category-thinking', bgColor: 'bg-purple-500/20', textColor: 'text-purple-300' },
    sports: { label: '체육', icon: '⚽', className: 'category-sports', bgColor: 'bg-green-500/20', textColor: 'text-green-300' },
    language: { label: '언어', icon: '📚', className: 'category-language', bgColor: 'bg-blue-500/20', textColor: 'text-blue-300' },
    science: { label: '과학', icon: '🔬', className: 'category-science', bgColor: 'bg-cyan-500/20', textColor: 'text-cyan-300' },
    music: { label: '음악', icon: '🎵', className: 'category-music', bgColor: 'bg-amber-500/20', textColor: 'text-amber-300' },
    life: { label: '생활', icon: '🍳', className: 'category-life', bgColor: 'bg-orange-500/20', textColor: 'text-orange-300' },
    computer: { label: '컴퓨터', icon: '💻', className: 'category-computer', bgColor: 'bg-indigo-500/20', textColor: 'text-indigo-300' },
  };

  const getCategoryStyle = (category: string) => categories[category] || categories.all;

  const hasTimeConflict = (time1: string, time2: string) => {
    const parseTime = (t: string) => {
      const [start, end] = t.split('~');
      return {
        start: parseInt(start.replace(':', '')),
        end: parseInt(end.replace(':', ''))
      };
    };
    const t1 = parseTime(time1);
    const t2 = parseTime(time2);
    return !(t1.end <= t2.start || t2.end <= t1.start);
  };

  const toggleProgram = (program: Program) => {
    const isSelected = selectedPrograms.find(p => p.id === program.id);
    if (isSelected) {
      setSelectedPrograms(selectedPrograms.filter(p => p.id !== program.id));
    } else {
      const conflict = selectedPrograms.find(p =>
        p.day === program.day && hasTimeConflict(p.time, program.time)
      );
      if (conflict) {
        alert(`⚠️ 시간 충돌!\n${conflict.name} ${conflict.class}반 (${conflict.time})과 겹칩니다.`);
        return;
      }
      setSelectedPrograms([...selectedPrograms, program]);
    }
  };

  const timeSlots = [
    { start: '08:50', end: '09:00', label: '아침독서', type: 'morning' },
    { start: '09:00', end: '09:40', label: '1교시', type: 'class' },
    { start: '09:40', end: '09:50', label: '쉬는시간', type: 'break' },
    { start: '09:50', end: '10:30', label: '2교시', type: 'class' },
    { start: '10:30', end: '10:40', label: '쉬는시간', type: 'break' },
    { start: '10:40', end: '11:20', label: '3교시', type: 'class' },
    { start: '11:20', end: '11:30', label: '쉬는시간', type: 'break' },
    { start: '11:30', end: '12:10', label: '4교시', type: 'class' },
    { start: '12:10', end: '13:00', label: '점심', type: 'lunch' },
    { start: '13:00', end: '14:00', label: '', type: 'afternoon' },
    { start: '14:00', end: '15:00', label: '', type: 'afternoon' },
    { start: '15:00', end: '16:00', label: '', type: 'afternoon' },
    { start: '16:00', end: '17:00', label: '', type: 'afternoon' },
    { start: '17:00', end: '18:00', label: '', type: 'afternoon' },
  ];

  const getSlotContent = (slot: typeof timeSlots[0], dayIdx: number): SlotContent => {
    const dayName = days[dayIdx];

    if (slot.type === 'morning') return { content: '📖', style: 'bg-amber-900/30 text-amber-400' };
    if (slot.type === 'break') return { content: '', style: 'bg-white/5' };
    if (slot.type === 'lunch') return { content: '🍚', style: 'bg-green-900/30 text-green-400' };
    if (slot.type === 'class') return { content: slot.label, style: 'bg-blue-900/30 text-blue-400 text-xs font-medium' };

    const slotStart = parseInt(slot.start.replace(':', ''));
    const slotEnd = parseInt(slot.end.replace(':', ''));

    const programsInSlot = selectedPrograms.filter(p => {
      if (p.day !== dayName) return false;
      const [pStart, pEnd] = p.time.split('~');
      const pStartNum = parseInt(pStart.replace(':', ''));
      const pEndNum = parseInt(pEnd.replace(':', ''));
      return (pStartNum < slotEnd && pEndNum > slotStart);
    });

    if (programsInSlot.length > 0) {
      const program = programsInSlot[0];
      const style = getCategoryStyle(program.category);
      return {
        content: `${style.icon}`,
        tooltip: `${program.name} ${program.class}\n${program.time}`,
        style: `${style.className} tetris-block tetris-block-selected`,
        program
      };
    }

    if (slot.start === '13:00' && (dayIdx === 1 || dayIdx === 2 || dayIdx === 3)) {
      return { content: '5교시', style: 'bg-blue-900/30 text-blue-400 text-xs font-medium' };
    }

    if (slot.start === '13:00' && (dayIdx === 0 || dayIdx === 4)) {
      return { content: '🏠', style: 'bg-orange-900/20 text-orange-400' };
    }

    return { content: '', style: 'bg-white/5' };
  };

  const filteredPrograms = filterCategory === 'all'
    ? afterSchoolPrograms
    : afterSchoolPrograms.filter(p => p.category === filterCategory);

  const programsByDay = days.map(day =>
    filteredPrograms.filter(p => p.day === day)
  );

  const totalPrograms = afterSchoolPrograms.length;

  return (
    <div className="min-h-screen bg-brand-black grid-bg gradient-mesh relative overflow-hidden">
      {/* Floating decorative blocks */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-brand-red/20 rounded-lg blur-xl animate-pulse" style={{ animationDelay: '0s' }} />
      <div className="absolute top-40 right-20 w-12 h-12 bg-cyan-500/20 rounded-lg blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-40 left-1/4 w-20 h-20 bg-purple-500/20 rounded-lg blur-xl animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="max-w-7xl mx-auto p-4 relative z-10">
        {/* Header */}
        <header className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 py-4">
          <TetritimeLogo />
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <span className="text-white/60 text-sm">1학년</span>
              <span className="ml-2 text-white font-display font-semibold">주간 시간표</span>
            </div>
            <div className="px-3 py-2 bg-brand-red/20 backdrop-blur-sm rounded-xl border border-brand-red/30">
              <span className="text-brand-red font-display font-bold">{totalPrograms}</span>
              <span className="text-white/60 text-sm ml-1">개 프로그램</span>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Timetable */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="bg-brand-dark/80 text-white/60 px-2 py-3 w-16 text-xs font-medium tracking-wide">
                      시간
                    </th>
                    {days.map((day, idx) => (
                      <th key={day} className={`text-white px-2 py-3 text-sm font-display font-bold bg-gradient-to-br ${dayColors[idx]}`}>
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((slot, rowIdx) => (
                    <tr key={rowIdx} className="border-b border-white/5">
                      <td className="bg-brand-dark/50 px-2 py-2 text-[10px] text-white/40 font-mono text-center border-r border-white/5">
                        {slot.start}
                      </td>
                      {days.map((_, dayIdx) => {
                        const cellData = getSlotContent(slot, dayIdx);
                        return (
                          <td
                            key={dayIdx}
                            className={`px-1 py-2 text-center border-r border-white/5 transition-all duration-200 ${cellData.style}`}
                            title={cellData.tooltip}
                          >
                            <div className="text-sm">{cellData.content}</div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  <tr>
                    <td className="bg-brand-dark/80 text-white/40 px-2 py-2 text-[10px] text-center font-mono">18:00</td>
                    {days.map((_, idx) => (
                      <td key={idx} className="bg-brand-dark/30 text-center text-[10px] text-white/20 py-2">끝</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Selected Programs */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <h3 className="font-display font-bold text-white mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-brand-red rounded flex items-center justify-center text-xs">✓</span>
                선택한 프로그램
                <span className="ml-auto text-brand-red font-bold">{selectedPrograms.length}개</span>
              </h3>
              {selectedPrograms.length === 0 ? (
                <p className="text-white/40 text-sm">오른쪽에서 프로그램을 선택하세요</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {selectedPrograms.sort((a, b) => days.indexOf(a.day) - days.indexOf(b.day)).map(p => {
                    const style = getCategoryStyle(p.category);
                    return (
                      <button
                        key={p.id}
                        onClick={() => toggleProgram(p)}
                        className={`tetris-block ${style.className} px-3 py-2 text-white text-xs font-medium cursor-pointer flex items-center gap-2 group`}
                      >
                        <span>{style.icon}</span>
                        <span>{p.name} {p.class}</span>
                        <span className="text-white/60">({p.day})</span>
                        <span className="text-white/40 group-hover:text-white transition-colors">✕</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Legend */}
            <div className="bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <div className="flex flex-wrap gap-3 justify-center">
                {Object.entries(categories).filter(([k]) => k !== 'all').map(([key, cat]) => (
                  <div key={key} className="flex items-center gap-2">
                    <div className={`w-6 h-6 rounded tetris-block ${cat.className} flex items-center justify-center text-sm`}>
                      {cat.icon}
                    </div>
                    <span className="text-white/60 text-xs">{cat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Program Selection Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 overflow-hidden sticky top-4">
              {/* Category Filter */}
              <div className="bg-brand-dark/50 p-3 border-b border-white/10">
                <div className="flex flex-wrap gap-1.5">
                  {Object.entries(categories).map(([key, cat]) => (
                    <button
                      key={key}
                      onClick={() => setFilterCategory(key)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                        filterCategory === key
                          ? 'bg-brand-red text-white shadow-lg shadow-brand-red/30'
                          : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      {cat.icon} {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Programs List */}
              <div className="p-3 max-h-[60vh] overflow-y-auto">
                {days.map((day, dayIdx) => {
                  const dayPrograms = programsByDay[dayIdx];
                  if (dayPrograms.length === 0) return null;

                  return (
                    <div key={day} className="mb-4">
                      <h3 className={`font-display font-semibold text-xs mb-2 px-3 py-2 rounded-lg sticky top-0 z-10 bg-gradient-to-r ${dayColors[dayIdx]} text-white shadow-lg`}>
                        {day}요일
                        <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-[10px]">
                          {dayPrograms.length}개
                        </span>
                      </h3>
                      <div className="space-y-2">
                        {dayPrograms.map(program => {
                          const isSelected = selectedPrograms.find(p => p.id === program.id);
                          const style = getCategoryStyle(program.category);
                          return (
                            <div
                              key={program.id}
                              onClick={() => toggleProgram(program)}
                              className={`p-3 rounded-xl cursor-pointer transition-all duration-200 text-xs border ${
                                isSelected
                                  ? `tetris-block ${style.className} border-white/30 text-white`
                                  : 'bg-white/5 hover:bg-white/10 border-transparent hover:border-white/10'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className={`font-medium ${isSelected ? 'text-white' : 'text-white/90'}`}>
                                  {style.icon} {program.name} {program.class}반
                                </span>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                                  program.grade.includes('6')
                                    ? 'bg-white/10 text-white/60'
                                    : 'bg-amber-500/20 text-amber-300'
                                }`}>
                                  {program.grade}학년
                                </span>
                              </div>
                              <div className={`flex justify-between items-center mt-2 ${isSelected ? 'text-white/80' : 'text-white/50'}`}>
                                <span className="font-mono">{program.time}</span>
                                <span>정원 {program.capacity}명</span>
                                {isSelected && <span className="text-white font-bold bg-white/20 px-2 py-0.5 rounded">✓</span>}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-6 text-center py-4 border-t border-white/5">
          <div className="flex flex-wrap justify-center gap-4 text-xs text-white/40">
            <span>⏰ 등교 08:50</span>
            <span className="text-white/20">|</span>
            <span>🏠 하교: 월금 12:40 / 화수목 13:40</span>
            <span className="text-white/20">|</span>
            <span className="text-amber-400/60">노란 태그 = 저학년 전용반</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
