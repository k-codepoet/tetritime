/**
 * 기존 데이터를 새 스키마로 마이그레이션하는 헬퍼
 *
 * 현재 WeeklyTimetable.tsx의 하드코딩된 데이터를
 * 새로운 ScheduleStore 형식으로 변환
 */

import type {
  ScheduleSource,
  SchoolSchedule,
  SchoolTimeSlot,
  Program,
  DayOfWeek,
  TimeString,
  ScheduleStore,
  ProgramCategory,
} from '~/types/schedule';

// ============================================
// 기존 데이터 형식 (마이그레이션 소스)
// ============================================

interface LegacyProgram {
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

// ============================================
// 기본 데이터: 송현초등학교
// ============================================

const SONGHYUN_SCHOOL_SOURCE: ScheduleSource = {
  id: 'source-songhyun-school',
  type: 'school',
  name: '송현초등학교',
  verified: true,
  createdAt: '2026-01-03T00:00:00Z',
  updatedAt: '2026-01-03T00:00:00Z',
};

const SONGHYUN_AFTERSCHOOL_SOURCE: ScheduleSource = {
  id: 'source-songhyun-afterschool',
  type: 'afterschool',
  name: '송현초등학교 방과후',
  verified: true,
  createdAt: '2026-01-03T00:00:00Z',
  updatedAt: '2026-01-03T00:00:00Z',
};

/** 송현초 1학년 기본 일과표 */
const SONGHYUN_SCHOOL_SCHEDULE: SchoolSchedule = {
  sourceId: SONGHYUN_SCHOOL_SOURCE.id,
  schoolName: '송현초등학교',
  grade: 1,
  year: 2026,
  semester: 1,
  timeSlots: [
    { type: 'registration', label: '등교', time: { start: '08:50' as TimeString, end: '08:50' as TimeString } },
    { type: 'morning', label: '아침독서', time: { start: '08:50' as TimeString, end: '09:00' as TimeString } },
    { type: 'class', label: '1교시', time: { start: '09:00' as TimeString, end: '09:40' as TimeString } },
    { type: 'break', label: '쉬는시간', time: { start: '09:40' as TimeString, end: '09:50' as TimeString } },
    { type: 'class', label: '2교시', time: { start: '09:50' as TimeString, end: '10:30' as TimeString } },
    { type: 'break', label: '쉬는시간', time: { start: '10:30' as TimeString, end: '10:40' as TimeString } },
    { type: 'class', label: '3교시', time: { start: '10:40' as TimeString, end: '11:20' as TimeString } },
    { type: 'break', label: '쉬는시간', time: { start: '11:20' as TimeString, end: '11:30' as TimeString } },
    { type: 'class', label: '4교시', time: { start: '11:30' as TimeString, end: '12:10' as TimeString } },
    { type: 'lunch', label: '점심시간', time: { start: '12:10' as TimeString, end: '13:00' as TimeString } },
    {
      type: 'class',
      label: '5교시',
      time: { start: '13:00' as TimeString, end: '13:40' as TimeString },
      daysApplicable: ['화', '수', '목'],
    },
    {
      type: 'dismissal',
      label: '하교',
      time: { start: '12:40' as TimeString, end: '12:40' as TimeString },
      daysApplicable: ['월', '금'],
    },
    {
      type: 'dismissal',
      label: '하교',
      time: { start: '13:40' as TimeString, end: '13:40' as TimeString },
      daysApplicable: ['화', '수', '목'],
    },
  ],
  dismissalSchedule: {
    grade: 1,
    times: {
      '월': '12:40' as TimeString,
      '화': '13:40' as TimeString,
      '수': '13:40' as TimeString,
      '목': '13:40' as TimeString,
      '금': '12:40' as TimeString,
    },
  },
};

// ============================================
// 마이그레이션 함수
// ============================================

/**
 * 학년 문자열 파싱 (예: "1-2", "1~6")
 */
function parseGradeRange(gradeStr: string): { min: number; max: number } {
  const normalized = gradeStr.replace(/[-~]/g, '-');
  const parts = normalized.split('-').map((s) => parseInt(s.trim()));

  if (parts.length === 1) {
    return { min: parts[0], max: parts[0] };
  }
  return { min: parts[0], max: parts[1] };
}

/**
 * 시간 문자열 파싱 (예: "13:00~14:20")
 */
function parseTimeString(timeStr: string): { start: TimeString; end: TimeString } {
  const [start, end] = timeStr.split('~') as [TimeString, TimeString];
  return { start, end };
}

/**
 * 카테고리 매핑 (기존 → 새 스키마)
 */
function mapCategory(oldCategory: string): ProgramCategory {
  const mapping: Record<string, ProgramCategory> = {
    art: 'art',
    thinking: 'thinking',
    sports: 'sports',
    language: 'language',
    science: 'science',
    music: 'music',
    life: 'life',
    computer: 'computer',
  };
  return mapping[oldCategory] || 'other';
}

/**
 * 기존 Program 형식을 새 스키마로 변환
 */
export function migrateLegacyProgram(
  legacy: LegacyProgram,
  sourceId: string
): Program {
  const time = parseTimeString(legacy.time);
  const gradeRange = parseGradeRange(legacy.grade);

  return {
    id: `program-${sourceId}-${legacy.id}`,
    sourceId,
    name: legacy.name,
    category: mapCategory(legacy.category),
    targetGrade: gradeRange,
    classId: legacy.class,
    schedule: [
      {
        day: legacy.day as DayOfWeek,
        time,
      },
    ],
    durationMinutes: legacy.duration,
    capacity: legacy.capacity,
    verified: true,
  };
}

/**
 * 기존 방과후 프로그램 배열을 새 스키마로 일괄 변환
 */
export function migrateLegacyPrograms(
  legacyPrograms: LegacyProgram[],
  sourceId: string
): Program[] {
  return legacyPrograms.map((p) => migrateLegacyProgram(p, sourceId));
}

// ============================================
// 초기 데이터 생성
// ============================================

/**
 * 송현초등학교 기본 데이터로 ScheduleStore 초기화
 */
export function createInitialStore(legacyPrograms: LegacyProgram[]): ScheduleStore {
  const programs = migrateLegacyPrograms(
    legacyPrograms,
    SONGHYUN_AFTERSCHOOL_SOURCE.id
  );

  return {
    version: 1,
    sources: [SONGHYUN_SCHOOL_SOURCE, SONGHYUN_AFTERSCHOOL_SOURCE],
    schoolSchedules: [SONGHYUN_SCHOOL_SCHEDULE],
    programs,
    daycareInfos: [],
    children: [],
    ocrQueue: [],
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * 새 소스 추가 헬퍼
 */
export function addSource(
  store: ScheduleStore,
  source: Omit<ScheduleSource, 'id' | 'createdAt' | 'updatedAt'>
): ScheduleStore {
  const newSource: ScheduleSource = {
    ...source,
    id: `source-${source.type}-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return {
    ...store,
    sources: [...store.sources, newSource],
    lastUpdated: new Date().toISOString(),
  };
}

/**
 * 프로그램 추가 헬퍼
 */
export function addProgram(
  store: ScheduleStore,
  program: Omit<Program, 'id'>
): ScheduleStore {
  const newProgram: Program = {
    ...program,
    id: `program-${program.sourceId}-${Date.now()}`,
  };

  return {
    ...store,
    programs: [...store.programs, newProgram],
    lastUpdated: new Date().toISOString(),
  };
}

// ============================================
// 기본 송현초 데이터 Export
// ============================================

export {
  SONGHYUN_SCHOOL_SOURCE,
  SONGHYUN_AFTERSCHOOL_SOURCE,
  SONGHYUN_SCHOOL_SCHEDULE,
};
