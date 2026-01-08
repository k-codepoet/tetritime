/**
 * 데이터 레이어 메인 엔트리
 *
 * 학교별 데이터와 공통 타입을 export
 */

// 타입
export type {
  LegacyProgram,
  TimeSlot,
  TimeSlotType,
  DismissalInfo,
  CategoryStyle,
} from './types';

// 상수
export { CATEGORY_STYLES, DAYS, DAY_COLORS } from './types';

// 송현초등학교 데이터
export {
  SONGHYUN_AFTERSCHOOL_PROGRAMS,
  SONGHYUN_TIME_SLOTS,
  SONGHYUN_DISMISSAL_INFO,
  SONGHYUN_SCHOOL_INFO,
} from './songhyun';

// 마이그레이션 유틸 (새 스키마용)
export {
  migrateLegacyProgram,
  migrateLegacyPrograms,
  createInitialStore,
  addSource,
  addProgram,
  SONGHYUN_SCHOOL_SOURCE,
  SONGHYUN_AFTERSCHOOL_SOURCE,
  SONGHYUN_SCHOOL_SCHEDULE,
} from './migrate';
