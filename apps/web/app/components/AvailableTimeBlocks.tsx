/**
 * 빈 시간 블럭 표시 컴포넌트
 * 학교 시간표 기준으로 방과후/학원에 활용 가능한 시간대 표시
 */

import { useMemo } from 'react';
import type { DayOfWeek, AvailableTimeBlock, SchoolTimeSlot } from '~/types/schedule';
import { findAvailableBlocks, getDurationMinutes } from '~/utils/time';
import { SONGHYUN_SCHOOL_SCHEDULE } from '~/data/migrate';

interface AvailableTimeBlocksProps {
  grade: number;
  selectedPrograms?: { day: DayOfWeek; time: { start: string; end: string }; name: string }[];
}

const DAYS: DayOfWeek[] = ['월', '화', '수', '목', '금'];

const DAY_COLORS = [
  'from-rose-500/20 to-red-600/20 border-rose-500/30',
  'from-amber-500/20 to-orange-600/20 border-amber-500/30',
  'from-emerald-500/20 to-green-600/20 border-emerald-500/30',
  'from-cyan-500/20 to-teal-600/20 border-cyan-500/30',
  'from-violet-500/20 to-purple-600/20 border-violet-500/30',
];

export function AvailableTimeBlocks({
  grade,
  selectedPrograms = [],
}: AvailableTimeBlocksProps) {
  // 학년별 하교 시간 기준으로 빈 시간 블럭 계산
  const availableBlocks = useMemo(() => {
    const result: Record<DayOfWeek, AvailableTimeBlock[]> = {
      '월': [],
      '화': [],
      '수': [],
      '목': [],
      '금': [],
      '토': [],
      '일': [],
    };

    const schoolSlots = SONGHYUN_SCHOOL_SCHEDULE.timeSlots;
    const dismissalTimes = SONGHYUN_SCHOOL_SCHEDULE.dismissalSchedule.times;

    for (const day of DAYS) {
      // 해당 요일 하교 시간 이후부터 가용 시간
      const dismissalTime = dismissalTimes[day];
      if (!dismissalTime) continue;

      // 학교 시간표에서 해당 요일 수업들 필터링
      const daySchoolSlots = schoolSlots.filter(
        (slot) => !slot.daysApplicable || slot.daysApplicable.includes(day)
      );

      // 선택된 프로그램 중 해당 요일 것들
      const dayPrograms = selectedPrograms
        .filter((p) => p.day === day)
        .map((p) => ({
          id: p.name,
          sourceId: 'selected',
          name: p.name,
          category: 'other' as const,
          targetGrade: { min: 1, max: 6 },
          schedule: [{ day, time: { start: p.time.start as `${string}:${string}`, end: p.time.end as `${string}:${string}` } }],
          durationMinutes: 80,
          verified: true,
        }));

      result[day] = findAvailableBlocks(
        day,
        daySchoolSlots,
        dayPrograms,
        dismissalTime as `${string}:${string}`,
        '18:00',
        30
      );
    }

    return result;
  }, [grade, selectedPrograms]);

  const totalBlocks = Object.values(availableBlocks).flat().length;
  const totalMinutes = Object.values(availableBlocks)
    .flat()
    .reduce((sum, block) => sum + block.availableMinutes, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-medium flex items-center gap-2">
          <span className="text-lg">⏰</span>
          활용 가능한 시간
        </h3>
        <div className="text-white/60 text-sm">
          총 <span className="text-brand-red font-bold">{totalBlocks}</span>개 블럭,{' '}
          <span className="text-brand-red font-bold">{Math.floor(totalMinutes / 60)}</span>시간{' '}
          <span className="text-brand-red font-bold">{totalMinutes % 60}</span>분
        </div>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {DAYS.map((day, idx) => {
          const blocks = availableBlocks[day];
          return (
            <div key={day} className="space-y-2">
              {/* 요일 헤더 */}
              <div
                className={`text-center py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-br ${DAY_COLORS[idx]} border`}
              >
                {day}
              </div>

              {/* 빈 시간 블럭들 */}
              {blocks.length > 0 ? (
                blocks.map((block, blockIdx) => (
                  <div
                    key={blockIdx}
                    className="bg-white/5 border border-white/10 rounded-lg p-2 hover:bg-white/10 transition-colors cursor-pointer group"
                  >
                    <div className="text-xs text-white/80 font-mono">
                      {block.time.start}
                    </div>
                    <div className="text-xs text-white/40">~</div>
                    <div className="text-xs text-white/80 font-mono">
                      {block.time.end}
                    </div>
                    <div className="mt-1 text-[10px] text-brand-red/80 group-hover:text-brand-red">
                      {block.availableMinutes}분
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white/5 border border-white/10 rounded-lg p-2 text-center">
                  <div className="text-xs text-white/30">빈 시간 없음</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 활용 제안 */}
      <div className="bg-white/5 rounded-xl p-4 border border-white/10">
        <h4 className="text-white/80 text-sm font-medium mb-2">💡 추천</h4>
        <div className="space-y-2 text-sm text-white/60">
          {availableBlocks['월'].length > 0 && (
            <p>
              • 월요일 {availableBlocks['월'][0].time.start} 이후 -{' '}
              <span className="text-pink-400">예술 활동</span> (미술, 도자기)
            </p>
          )}
          {availableBlocks['화'].length > 0 && (
            <p>
              • 화요일 {availableBlocks['화'][0].time.start} 이후 -{' '}
              <span className="text-blue-400">언어 학습</span> (영어, 독서)
            </p>
          )}
          {availableBlocks['수'].length > 0 && (
            <p>
              • 수요일 {availableBlocks['수'][0].time.start} 이후 -{' '}
              <span className="text-green-400">체육 활동</span> (축구, 태권도)
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
