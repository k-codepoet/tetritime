/**
 * Tetritime Schedule Data Model
 *
 * 다중 소스(학교 시간표, 방과후, 학원, 돌봄) 통합 스키마
 * 사진 OCR 기반 시간표 셋업을 위한 확장 가능한 구조
 */

// ============================================
// 1. 시간 관련 기본 타입
// ============================================

/** 시간 문자열 (HH:MM 형식) */
export type TimeString = `${string}:${string}`;

/** 시간 범위 */
export interface TimeRange {
  start: TimeString;
  end: TimeString;
}

/** 요일 */
export type DayOfWeek = '월' | '화' | '수' | '목' | '금' | '토' | '일';

/** 요일별 시간 범위 (요일마다 다를 수 있음) */
export interface DayTimeRange {
  day: DayOfWeek;
  time: TimeRange;
}

// ============================================
// 2. 스케줄 소스 타입 (어디서 온 시간표인가)
// ============================================

/** 스케줄 소스 타입 */
export type ScheduleSourceType =
  | 'school'        // 학교 정규 시간표
  | 'afterschool'   // 학교 방과후 프로그램
  | 'daycare'       // 학교 돌봄교실
  | 'academy'       // 외부 학원
  | 'private'       // 개인 레슨
  | 'custom';       // 사용자 정의

/** 스케줄 소스 메타데이터 */
export interface ScheduleSource {
  id: string;
  type: ScheduleSourceType;
  name: string;                    // "송현초등학교", "YBM어학원" 등
  address?: string;
  phone?: string;
  website?: string;
  /** OCR로 추출된 원본 이미지 참조 */
  ocrImageRef?: string;
  /** OCR 추출 신뢰도 (0-1) */
  ocrConfidence?: number;
  /** 수동 검증 여부 */
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}

// ============================================
// 3. 학교 시간표 (기본 일과표)
// ============================================

/** 학교 기본 일과 슬롯 타입 */
export type SchoolSlotType =
  | 'registration'  // 등교
  | 'morning'       // 아침 활동 (독서 등)
  | 'class'         // 수업
  | 'break'         // 쉬는시간
  | 'lunch'         // 점심
  | 'cleaning'      // 청소
  | 'dismissal';    // 하교

/** 학교 기본 일과 슬롯 */
export interface SchoolTimeSlot {
  type: SchoolSlotType;
  label: string;              // "1교시", "점심시간" 등
  time: TimeRange;
  /** 요일별로 다를 경우 */
  daysApplicable?: DayOfWeek[];
}

/** 학년별 하교 시간 (요일별) */
export interface DismissalSchedule {
  grade: number;
  /** 요일별 하교 시간 */
  times: Partial<Record<DayOfWeek, TimeString>>;
}

/** 학교 시간표 전체 */
export interface SchoolSchedule {
  sourceId: string;           // ScheduleSource.id 참조
  schoolName: string;
  grade: number;
  year: number;               // 학년도
  semester?: 1 | 2;
  /** 기본 일과표 */
  timeSlots: SchoolTimeSlot[];
  /** 학년별 하교 시간 */
  dismissalSchedule: DismissalSchedule;
}

// ============================================
// 4. 프로그램 (방과후/학원/돌봄)
// ============================================

/** 프로그램 카테고리 */
export type ProgramCategory =
  | 'art'           // 예술 (미술, 도자기)
  | 'music'         // 음악 (피아노, 바이올린)
  | 'sports'        // 체육 (축구, 태권도, 수영)
  | 'language'      // 언어 (영어, 한자, 독서논술)
  | 'science'       // 과학 (로봇, 코딩)
  | 'math'          // 수학 (주산암산, 수학)
  | 'thinking'      // 사고력 (바둑, 체스)
  | 'life'          // 생활 (요리, 공예)
  | 'computer'      // 컴퓨터 (코딩, 기초)
  | 'daycare'       // 돌봄
  | 'other';        // 기타

/** 프로그램 기본 정보 */
export interface Program {
  id: string;
  sourceId: string;           // ScheduleSource.id 참조
  name: string;
  category: ProgramCategory;
  description?: string;

  /** 대상 학년 범위 */
  targetGrade: {
    min: number;
    max: number;
  };

  /** 분반 정보 (A반, B반 등) */
  classId?: string;

  /** 수업 일정 (여러 요일에 진행 가능) */
  schedule: DayTimeRange[];

  /** 수업 시간 (분) */
  durationMinutes: number;

  /** 정원 */
  capacity?: number;

  /** 비용 (원/월) */
  monthlyFee?: number;

  /** 추가 메타데이터 */
  metadata?: {
    instructor?: string;
    location?: string;
    materials?: string[];
    notes?: string;
  };

  /** OCR 추출 신뢰도 */
  ocrConfidence?: number;

  /** 수동 검증 여부 */
  verified: boolean;
}

// ============================================
// 5. 돌봄교실 특화 타입
// ============================================

/** 돌봄 유형 */
export type DaycareType =
  | 'morning'       // 아침돌봄
  | 'afternoon'     // 오후돌봄
  | 'evening';      // 저녁돌봄

/** 돌봄교실 정보 */
export interface DaycareInfo extends Program {
  daycareType: DaycareType;
  /** 간식 제공 여부 */
  snackProvided: boolean;
  /** 운영 시간 */
  operatingHours: TimeRange;
}

// ============================================
// 6. 사용자 선택/설정
// ============================================

/** 선택된 프로그램 */
export interface SelectedProgram {
  programId: string;
  /** 선택 상태 */
  status: 'selected' | 'waitlist' | 'confirmed';
  /** 선택 일시 */
  selectedAt: string;
  /** 메모 */
  note?: string;
}

/** 자녀 프로필 */
export interface ChildProfile {
  id: string;
  name: string;
  birthDate: string;
  grade: number;
  schoolSourceId: string;     // 다니는 학교의 ScheduleSource.id
  /** 선택한 프로그램 목록 */
  selectedPrograms: SelectedProgram[];
  createdAt: string;
  updatedAt: string;
}

// ============================================
// 7. OCR 파싱 결과 (임시 데이터)
// ============================================

/** OCR 추출 상태 */
export type OCRStatus =
  | 'pending'       // 대기 중
  | 'processing'    // 처리 중
  | 'completed'     // 완료
  | 'failed'        // 실패
  | 'review';       // 검토 필요

/** OCR 추출 결과 */
export interface OCRExtraction {
  id: string;
  imageUrl: string;
  status: OCRStatus;
  /** 자동 감지된 문서 타입 */
  detectedType: ScheduleSourceType | 'unknown';
  /** 감지 신뢰도 */
  typeConfidence: number;
  /** 추출된 원시 텍스트 */
  rawText?: string;
  /** 파싱된 프로그램 목록 (검토 전) */
  parsedPrograms?: Partial<Program>[];
  /** 파싱된 학교 시간표 (검토 전) */
  parsedSchoolSchedule?: Partial<SchoolSchedule>;
  /** 오류 메시지 */
  error?: string;
  createdAt: string;
  processedAt?: string;
}

// ============================================
// 8. 시간 충돌 관련
// ============================================

/** 시간 충돌 정보 */
export interface TimeConflict {
  programA: string;           // Program.id
  programB: string;           // Program.id
  day: DayOfWeek;
  overlapMinutes: number;
  /** 충돌 심각도 */
  severity: 'hard' | 'soft';  // hard: 완전 겹침, soft: 이동 시간 부족
}

/** 빈 시간 블럭 */
export interface AvailableTimeBlock {
  day: DayOfWeek;
  time: TimeRange;
  /** 이전 일정 */
  before?: {
    type: 'school' | 'program';
    name: string;
    endTime: TimeString;
  };
  /** 이후 일정 */
  after?: {
    type: 'school' | 'program';
    name: string;
    startTime: TimeString;
  };
  /** 사용 가능 시간 (분) */
  availableMinutes: number;
}

// ============================================
// 9. 전체 스케줄 스토어
// ============================================

/** 전체 스케줄 데이터 */
export interface ScheduleStore {
  /** 버전 (마이그레이션용) */
  version: number;
  /** 스케줄 소스 목록 */
  sources: ScheduleSource[];
  /** 학교 시간표 */
  schoolSchedules: SchoolSchedule[];
  /** 프로그램 목록 */
  programs: Program[];
  /** 돌봄 정보 */
  daycareInfos: DaycareInfo[];
  /** 자녀 프로필 */
  children: ChildProfile[];
  /** OCR 추출 대기열 */
  ocrQueue: OCRExtraction[];
  /** 마지막 업데이트 */
  lastUpdated: string;
}

// ============================================
// 10. 유틸리티 타입
// ============================================

/** 시간 파싱 결과 */
export interface ParsedTime {
  hours: number;
  minutes: number;
  totalMinutes: number;
}

/** 카테고리 스타일 (UI용) */
export interface CategoryStyle {
  label: string;
  icon: string;
  className: string;
  bgColor: string;
  textColor: string;
}

/** 카테고리별 스타일 맵 */
export const CATEGORY_STYLES: Record<ProgramCategory | 'all', CategoryStyle> = {
  all: { label: '전체', icon: '◼', className: '', bgColor: 'bg-white/10', textColor: 'text-white' },
  art: { label: '예술', icon: '🎨', className: 'category-art', bgColor: 'bg-pink-500/20', textColor: 'text-pink-300' },
  music: { label: '음악', icon: '🎵', className: 'category-music', bgColor: 'bg-amber-500/20', textColor: 'text-amber-300' },
  sports: { label: '체육', icon: '⚽', className: 'category-sports', bgColor: 'bg-green-500/20', textColor: 'text-green-300' },
  language: { label: '언어', icon: '📚', className: 'category-language', bgColor: 'bg-blue-500/20', textColor: 'text-blue-300' },
  science: { label: '과학', icon: '🔬', className: 'category-science', bgColor: 'bg-cyan-500/20', textColor: 'text-cyan-300' },
  math: { label: '수학', icon: '🔢', className: 'category-math', bgColor: 'bg-violet-500/20', textColor: 'text-violet-300' },
  thinking: { label: '사고력', icon: '🧠', className: 'category-thinking', bgColor: 'bg-purple-500/20', textColor: 'text-purple-300' },
  life: { label: '생활', icon: '🍳', className: 'category-life', bgColor: 'bg-orange-500/20', textColor: 'text-orange-300' },
  computer: { label: '컴퓨터', icon: '💻', className: 'category-computer', bgColor: 'bg-indigo-500/20', textColor: 'text-indigo-300' },
  daycare: { label: '돌봄', icon: '🏠', className: 'category-daycare', bgColor: 'bg-teal-500/20', textColor: 'text-teal-300' },
  other: { label: '기타', icon: '📌', className: 'category-other', bgColor: 'bg-gray-500/20', textColor: 'text-gray-300' },
};

/** 소스 타입별 라벨 */
export const SOURCE_TYPE_LABELS: Record<ScheduleSourceType, string> = {
  school: '학교 시간표',
  afterschool: '방과후 프로그램',
  daycare: '돌봄교실',
  academy: '학원',
  private: '개인 레슨',
  custom: '직접 입력',
};
