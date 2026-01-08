/**
 * 송현초등학교 방과후 프로그램 데이터
 * 2026년 1학기 기준
 */

import type { LegacyProgram } from '../types';

/**
 * 송현초등학교 방과후 프로그램 목록
 * - 총 40개 프로그램
 * - 1학년 신청 가능 프로그램
 */
export const SONGHYUN_AFTERSCHOOL_PROGRAMS: LegacyProgram[] = [
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
