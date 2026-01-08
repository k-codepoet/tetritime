/**
 * 시간 관련 유틸리티 함수
 */

import type {
  TimeString,
  TimeRange,
  DayOfWeek,
  DayTimeRange,
  ParsedTime,
  AvailableTimeBlock,
  TimeConflict,
  Program,
  SchoolTimeSlot,
} from '~/types/schedule';

// ============================================
// 시간 파싱
// ============================================

/**
 * TimeString을 파싱하여 시/분/총분으로 반환
 */
export function parseTime(time: TimeString): ParsedTime {
  const [hours, minutes] = time.split(':').map(Number);
  return {
    hours,
    minutes,
    totalMinutes: hours * 60 + minutes,
  };
}

/**
 * 총 분을 TimeString으로 변환
 */
export function minutesToTimeString(totalMinutes: number): TimeString {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}` as TimeString;
}

/**
 * "13:00~14:20" 형식의 문자열을 TimeRange로 파싱
 */
export function parseTimeRange(rangeStr: string): TimeRange {
  const [start, end] = rangeStr.split('~') as [TimeString, TimeString];
  return { start, end };
}

/**
 * TimeRange를 "13:00~14:20" 형식으로 변환
 */
export function formatTimeRange(range: TimeRange): string {
  return `${range.start}~${range.end}`;
}

// ============================================
// 시간 비교 및 충돌 검사
// ============================================

/**
 * 두 시간 범위가 겹치는지 확인
 */
export function hasTimeOverlap(range1: TimeRange, range2: TimeRange): boolean {
  const t1Start = parseTime(range1.start).totalMinutes;
  const t1End = parseTime(range1.end).totalMinutes;
  const t2Start = parseTime(range2.start).totalMinutes;
  const t2End = parseTime(range2.end).totalMinutes;

  return !(t1End <= t2Start || t2End <= t1Start);
}

/**
 * 두 시간 범위의 겹치는 시간(분) 계산
 */
export function getOverlapMinutes(range1: TimeRange, range2: TimeRange): number {
  const t1Start = parseTime(range1.start).totalMinutes;
  const t1End = parseTime(range1.end).totalMinutes;
  const t2Start = parseTime(range2.start).totalMinutes;
  const t2End = parseTime(range2.end).totalMinutes;

  const overlapStart = Math.max(t1Start, t2Start);
  const overlapEnd = Math.min(t1End, t2End);

  return Math.max(0, overlapEnd - overlapStart);
}

/**
 * 시간 범위의 길이(분) 계산
 */
export function getDurationMinutes(range: TimeRange): number {
  const start = parseTime(range.start).totalMinutes;
  const end = parseTime(range.end).totalMinutes;
  return end - start;
}

// ============================================
// 프로그램 충돌 검사
// ============================================

/**
 * 두 프로그램 간의 시간 충돌 검사
 * @param travelTimeMinutes 이동 시간 (기본 10분)
 */
export function checkProgramConflict(
  programA: Program,
  programB: Program,
  travelTimeMinutes = 10
): TimeConflict | null {
  // 같은 요일에 있는 스케줄끼리만 비교
  for (const scheduleA of programA.schedule) {
    for (const scheduleB of programB.schedule) {
      if (scheduleA.day !== scheduleB.day) continue;

      const overlap = getOverlapMinutes(scheduleA.time, scheduleB.time);

      if (overlap > 0) {
        // 완전 겹침
        return {
          programA: programA.id,
          programB: programB.id,
          day: scheduleA.day,
          overlapMinutes: overlap,
          severity: 'hard',
        };
      }

      // 이동 시간 부족 검사
      const aEnd = parseTime(scheduleA.time.end).totalMinutes;
      const bStart = parseTime(scheduleB.time.start).totalMinutes;
      const bEnd = parseTime(scheduleB.time.end).totalMinutes;
      const aStart = parseTime(scheduleA.time.start).totalMinutes;

      const gapAtoB = bStart - aEnd;
      const gapBtoA = aStart - bEnd;

      if (gapAtoB > 0 && gapAtoB < travelTimeMinutes) {
        return {
          programA: programA.id,
          programB: programB.id,
          day: scheduleA.day,
          overlapMinutes: travelTimeMinutes - gapAtoB,
          severity: 'soft',
        };
      }

      if (gapBtoA > 0 && gapBtoA < travelTimeMinutes) {
        return {
          programA: programA.id,
          programB: programB.id,
          day: scheduleA.day,
          overlapMinutes: travelTimeMinutes - gapBtoA,
          severity: 'soft',
        };
      }
    }
  }

  return null;
}

/**
 * 프로그램 목록에서 모든 충돌 찾기
 */
export function findAllConflicts(
  programs: Program[],
  travelTimeMinutes = 10
): TimeConflict[] {
  const conflicts: TimeConflict[] = [];

  for (let i = 0; i < programs.length; i++) {
    for (let j = i + 1; j < programs.length; j++) {
      const conflict = checkProgramConflict(
        programs[i],
        programs[j],
        travelTimeMinutes
      );
      if (conflict) {
        conflicts.push(conflict);
      }
    }
  }

  return conflicts;
}

// ============================================
// 빈 시간 블럭 찾기
// ============================================

const DAY_ORDER: DayOfWeek[] = ['월', '화', '수', '목', '금', '토', '일'];

/**
 * 특정 요일의 빈 시간 블럭 찾기
 * @param day 요일
 * @param schoolSlots 학교 시간표 (해당 요일)
 * @param programs 선택된 프로그램 (해당 요일)
 * @param dayStart 하루 시작 시간 (기본 08:00)
 * @param dayEnd 하루 종료 시간 (기본 18:00)
 * @param minBlockMinutes 최소 블럭 크기 (기본 30분)
 */
export function findAvailableBlocks(
  day: DayOfWeek,
  schoolSlots: SchoolTimeSlot[],
  programs: Program[],
  dayStart: TimeString = '08:00',
  dayEnd: TimeString = '18:00',
  minBlockMinutes = 30
): AvailableTimeBlock[] {
  // 모든 점유 시간을 수집
  interface OccupiedSlot {
    time: TimeRange;
    type: 'school' | 'program';
    name: string;
  }

  const occupied: OccupiedSlot[] = [];

  // 학교 시간표 추가 (수업, 점심 등)
  for (const slot of schoolSlots) {
    if (slot.daysApplicable && !slot.daysApplicable.includes(day)) continue;
    if (slot.type === 'class' || slot.type === 'lunch') {
      occupied.push({
        time: slot.time,
        type: 'school',
        name: slot.label,
      });
    }
  }

  // 선택된 프로그램 추가
  for (const program of programs) {
    for (const schedule of program.schedule) {
      if (schedule.day === day) {
        occupied.push({
          time: schedule.time,
          type: 'program',
          name: program.name,
        });
      }
    }
  }

  // 시작 시간 기준 정렬
  occupied.sort((a, b) => {
    const aStart = parseTime(a.time.start).totalMinutes;
    const bStart = parseTime(b.time.start).totalMinutes;
    return aStart - bStart;
  });

  // 빈 블럭 찾기
  const blocks: AvailableTimeBlock[] = [];
  let currentTime = parseTime(dayStart).totalMinutes;
  const endTime = parseTime(dayEnd).totalMinutes;

  for (let i = 0; i < occupied.length; i++) {
    const slot = occupied[i];
    const slotStart = parseTime(slot.time.start).totalMinutes;
    const slotEnd = parseTime(slot.time.end).totalMinutes;

    // 현재 시간부터 다음 점유 시간 시작까지 빈 블럭
    if (slotStart > currentTime) {
      const gap = slotStart - currentTime;
      if (gap >= minBlockMinutes) {
        blocks.push({
          day,
          time: {
            start: minutesToTimeString(currentTime),
            end: minutesToTimeString(slotStart),
          },
          before: i > 0
            ? {
                type: occupied[i - 1].type,
                name: occupied[i - 1].name,
                endTime: occupied[i - 1].time.end,
              }
            : undefined,
          after: {
            type: slot.type,
            name: slot.name,
            startTime: slot.time.start,
          },
          availableMinutes: gap,
        });
      }
    }

    currentTime = Math.max(currentTime, slotEnd);
  }

  // 마지막 점유 이후부터 하루 종료까지
  if (currentTime < endTime) {
    const gap = endTime - currentTime;
    if (gap >= minBlockMinutes) {
      const lastOccupied = occupied[occupied.length - 1];
      blocks.push({
        day,
        time: {
          start: minutesToTimeString(currentTime),
          end: minutesToTimeString(endTime),
        },
        before: lastOccupied
          ? {
              type: lastOccupied.type,
              name: lastOccupied.name,
              endTime: lastOccupied.time.end,
            }
          : undefined,
        availableMinutes: gap,
      });
    }
  }

  return blocks;
}

/**
 * 전체 주간 빈 시간 블럭 찾기
 */
export function findWeeklyAvailableBlocks(
  schoolSlots: SchoolTimeSlot[],
  programs: Program[],
  days: DayOfWeek[] = ['월', '화', '수', '목', '금'],
  dayStart: TimeString = '08:00',
  dayEnd: TimeString = '18:00',
  minBlockMinutes = 30
): Record<DayOfWeek, AvailableTimeBlock[]> {
  const result: Partial<Record<DayOfWeek, AvailableTimeBlock[]>> = {};

  for (const day of days) {
    result[day] = findAvailableBlocks(
      day,
      schoolSlots,
      programs,
      dayStart,
      dayEnd,
      minBlockMinutes
    );
  }

  return result as Record<DayOfWeek, AvailableTimeBlock[]>;
}

// ============================================
// 요일 관련 유틸리티
// ============================================

/**
 * 요일 정렬
 */
export function sortByDay<T extends { day: DayOfWeek }>(items: T[]): T[] {
  return [...items].sort(
    (a, b) => DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day)
  );
}

/**
 * 요일 인덱스 반환 (월=0, 화=1, ...)
 */
export function getDayIndex(day: DayOfWeek): number {
  return DAY_ORDER.indexOf(day);
}

/**
 * 인덱스로 요일 반환
 */
export function getDayFromIndex(index: number): DayOfWeek {
  return DAY_ORDER[index];
}
