/**
 * 송현초등학교 기본 일과표 데이터
 * 2026년 1학기 기준
 */

import type { TimeSlot, DismissalInfo } from '../types';

/**
 * 송현초등학교 기본 시간표 슬롯
 */
export const SONGHYUN_TIME_SLOTS: TimeSlot[] = [
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

/**
 * 송현초 1학년 하교 시간 정보
 */
export const SONGHYUN_DISMISSAL_INFO: DismissalInfo = {
  grade: 1,
  // 월/금: 4교시 후 하교, 화/수/목: 5교시 후 하교
  fourClassDays: ['월', '금'],
  fiveClassDays: ['화', '수', '목'],
  fourClassDismissal: '12:40',
  fiveClassDismissal: '13:40',
};

/**
 * 학교 메타 정보
 */
export const SONGHYUN_SCHOOL_INFO = {
  name: '송현초등학교',
  address: '서울특별시',
  year: 2026,
  semester: 1,
};
