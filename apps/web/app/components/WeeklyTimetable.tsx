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
  bg?: string;
  border?: string;
  text?: string;
}

interface SlotContent {
  content: string;
  style: string;
  tooltip?: string;
  program?: Program;
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

  const categories: Record<string, CategoryStyle> = {
    all: { label: '전체', icon: '📋' },
    art: { label: '예술', icon: '🎨', bg: 'bg-pink-100', border: 'border-pink-300', text: 'text-pink-700' },
    thinking: { label: '사고력', icon: '🧠', bg: 'bg-purple-100', border: 'border-purple-300', text: 'text-purple-700' },
    sports: { label: '체육', icon: '⚽', bg: 'bg-green-100', border: 'border-green-300', text: 'text-green-700' },
    language: { label: '언어', icon: '📚', bg: 'bg-blue-100', border: 'border-blue-300', text: 'text-blue-700' },
    science: { label: '과학', icon: '🔬', bg: 'bg-cyan-100', border: 'border-cyan-300', text: 'text-cyan-700' },
    music: { label: '음악', icon: '🎵', bg: 'bg-amber-100', border: 'border-amber-300', text: 'text-amber-700' },
    life: { label: '생활', icon: '🍳', bg: 'bg-orange-100', border: 'border-orange-300', text: 'text-orange-700' },
    computer: { label: '컴퓨터', icon: '💻', bg: 'bg-indigo-100', border: 'border-indigo-300', text: 'text-indigo-700' },
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

    if (slot.type === 'morning') return { content: '📖', style: 'bg-amber-50 text-amber-700' };
    if (slot.type === 'break') return { content: '', style: 'bg-gray-100' };
    if (slot.type === 'lunch') return { content: '🍚', style: 'bg-green-50 text-green-700' };
    if (slot.type === 'class') return { content: slot.label, style: 'bg-blue-50 text-blue-700 text-xs' };

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
        style: `${style.bg} ${style.text}`,
        program
      };
    }

    if (slot.start === '13:00' && (dayIdx === 1 || dayIdx === 2 || dayIdx === 3)) {
      return { content: '5교시', style: 'bg-blue-50 text-blue-700 text-xs' };
    }

    if (slot.start === '13:00' && (dayIdx === 0 || dayIdx === 4)) {
      return { content: '🏠', style: 'bg-orange-50 text-orange-600' };
    }

    return { content: '', style: 'bg-slate-50' };
  };

  const filteredPrograms = filterCategory === 'all'
    ? afterSchoolPrograms
    : afterSchoolPrograms.filter(p => p.category === filterCategory);

  const programsByDay = days.map(day =>
    filteredPrograms.filter(p => p.day === day)
  );

  const totalPrograms = afterSchoolPrograms.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-blue-100 p-3">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-3">
          <h1 className="text-2xl font-bold text-gray-800">🎒 1학년 주간 시간표</h1>
          <p className="text-gray-500 text-sm">방과후 프로그램 총 {totalPrograms}개 (1학년 신청 가능)</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
          {/* Timetable - wider */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr>
                    <th className="bg-gray-700 text-white px-1 py-2 w-14 text-xs">시간</th>
                    {days.map((day, idx) => (
                      <th key={day} className={`text-white px-1 py-2 text-sm font-bold ${
                        ['bg-red-400', 'bg-orange-400', 'bg-yellow-500', 'bg-green-500', 'bg-blue-500'][idx]
                      }`}>
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {timeSlots.map((slot, rowIdx) => (
                    <tr key={rowIdx} className="border-b border-gray-100">
                      <td className="bg-gray-50 px-1 py-1.5 text-[10px] text-gray-500 font-mono text-center border-r">
                        {slot.start}
                      </td>
                      {days.map((_, dayIdx) => {
                        const cellData = getSlotContent(slot, dayIdx);
                        return (
                          <td
                            key={dayIdx}
                            className={`px-1 py-1.5 text-center border-r border-gray-100 ${cellData.style}`}
                            title={cellData.tooltip}
                          >
                            <div className="text-sm">{cellData.content}</div>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  <tr>
                    <td className="bg-gray-700 text-white px-1 py-1 text-[10px] text-center">18:00</td>
                    {days.map((_, idx) => (
                      <td key={idx} className="bg-gray-200 text-center text-[10px] text-gray-400 py-1">끝</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Selected Programs */}
            <div className="mt-3 bg-white rounded-xl p-3 shadow-lg">
              <h3 className="font-bold text-gray-700 mb-2 text-sm">
                ✅ 선택한 프로그램 ({selectedPrograms.length}개)
              </h3>
              {selectedPrograms.length === 0 ? (
                <p className="text-gray-400 text-sm">오른쪽에서 프로그램을 선택하세요</p>
              ) : (
                <div className="flex flex-wrap gap-1.5">
                  {selectedPrograms.sort((a, b) => days.indexOf(a.day) - days.indexOf(b.day)).map(p => {
                    const style = getCategoryStyle(p.category);
                    return (
                      <span
                        key={p.id}
                        onClick={() => toggleProgram(p)}
                        className={`${style.bg} ${style.text} ${style.border} border px-2 py-1 rounded-lg text-xs cursor-pointer hover:opacity-70 transition flex items-center gap-1`}
                      >
                        <span>{style.icon}</span>
                        <span className="font-medium">{p.name} {p.class}</span>
                        <span className="text-gray-500">({p.day})</span>
                        <span className="ml-1 text-gray-400">✕</span>
                      </span>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Legend */}
            <div className="mt-3 bg-white rounded-xl p-3 shadow-lg">
              <div className="flex flex-wrap gap-2 text-xs justify-center">
                {Object.entries(categories).filter(([k]) => k !== 'all').map(([key, cat]) => (
                  <div key={key} className="flex items-center gap-1">
                    <div className={`w-5 h-5 rounded ${cat.bg} ${cat.border} border flex items-center justify-center`}>
                      {cat.icon}
                    </div>
                    <span className="text-gray-600">{cat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Program Selection Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Category Filter */}
              <div className="bg-gray-50 p-2 border-b">
                <div className="flex flex-wrap gap-1">
                  {Object.entries(categories).map(([key, cat]) => (
                    <button
                      key={key}
                      onClick={() => setFilterCategory(key)}
                      className={`px-2 py-1 rounded-full text-xs transition ${
                        filterCategory === key
                          ? 'bg-gray-700 text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {cat.icon} {cat.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Programs List */}
              <div className="p-2 max-h-[60vh] overflow-y-auto">
                {days.map((day, dayIdx) => {
                  const dayPrograms = programsByDay[dayIdx];
                  if (dayPrograms.length === 0) return null;

                  return (
                    <div key={day} className="mb-3">
                      <h3 className={`font-semibold text-xs mb-1.5 px-2 py-1 rounded sticky top-0 ${
                        ['bg-red-100 text-red-700', 'bg-orange-100 text-orange-700', 'bg-yellow-100 text-yellow-700', 'bg-green-100 text-green-700', 'bg-blue-100 text-blue-700'][dayIdx]
                      }`}>
                        {day}요일 ({dayPrograms.length}개)
                      </h3>
                      <div className="space-y-1">
                        {dayPrograms.map(program => {
                          const isSelected = selectedPrograms.find(p => p.id === program.id);
                          const style = getCategoryStyle(program.category);
                          return (
                            <div
                              key={program.id}
                              onClick={() => toggleProgram(program)}
                              className={`p-2 rounded-lg cursor-pointer transition-all text-xs ${
                                isSelected
                                  ? `${style.bg} ${style.border} border-2 ${style.text}`
                                  : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium">
                                  {style.icon} {program.name} {program.class}반
                                </span>
                                <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                                  program.grade.includes('6') ? 'bg-gray-200 text-gray-600' : 'bg-yellow-200 text-yellow-700'
                                }`}>
                                  {program.grade}학년
                                </span>
                              </div>
                              <div className="flex justify-between items-center mt-1 text-gray-500">
                                <span>🕐 {program.time}</span>
                                <span>👥 {program.capacity}명</span>
                                {isSelected && <span className="text-green-500 font-bold">✓</span>}
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
        <div className="mt-3 text-center text-gray-400 text-xs">
          ⏰ 등교 08:50 | 🏠 하교: 월금 12:40 / 화수목 13:40 | 노란색 태그 = 저학년 전용반
        </div>
      </div>
    </div>
  );
}
