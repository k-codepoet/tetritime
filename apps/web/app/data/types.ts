/**
 * 데이터 레이어 타입 정의
 * UI 렌더링에 직접 사용되는 레거시 타입들
 */

/** 레거시 프로그램 타입 (UI 호환용) */
export interface LegacyProgram {
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

/** 시간표 슬롯 타입 */
export type TimeSlotType = 'morning' | 'class' | 'break' | 'lunch' | 'afternoon';

/** 시간표 슬롯 */
export interface TimeSlot {
  start: string;
  end: string;
  label: string;
  type: TimeSlotType;
}

/** 하교 정보 */
export interface DismissalInfo {
  grade: number;
  fourClassDays: string[];
  fiveClassDays: string[];
  fourClassDismissal: string;
  fiveClassDismissal: string;
}

/** 카테고리 스타일 */
export interface CategoryStyle {
  label: string;
  icon: string;
  className: string;
  bgColor: string;
  textColor: string;
}

/** 카테고리 스타일 맵 */
export const CATEGORY_STYLES: Record<string, CategoryStyle> = {
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

/** 요일 목록 */
export const DAYS = ['월', '화', '수', '목', '금'] as const;

/** 요일별 색상 */
export const DAY_COLORS = [
  'from-rose-500 to-red-600',
  'from-amber-500 to-orange-600',
  'from-emerald-500 to-green-600',
  'from-cyan-500 to-teal-600',
  'from-violet-500 to-purple-600',
] as const;
