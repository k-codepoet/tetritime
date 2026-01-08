/**
 * 시간표 셋업 위자드
 * 단계별로 시간표를 설정하는 멀티스텝 폼
 */

import { useState } from 'react';
import { ImageUpload } from './ImageUpload';
import { AvailableTimeBlocks } from './AvailableTimeBlocks';
import type {
  ScheduleSourceType,
  ScheduleSource,
  SchoolSchedule,
  Program,
  ChildProfile,
} from '~/types/schedule';
import {
  SONGHYUN_SCHOOL_SOURCE,
  SONGHYUN_AFTERSCHOOL_SOURCE,
  SONGHYUN_SCHOOL_SCHEDULE,
} from '~/data/migrate';

type WizardStep = 'intro' | 'school' | 'afterschool' | 'academy' | 'review';

interface SetupWizardProps {
  onComplete: (data: SetupResult) => void;
  onCancel: () => void;
}

interface SetupResult {
  child: Partial<ChildProfile>;
  sources: ScheduleSource[];
  schoolSchedule: SchoolSchedule | null;
  programs: Program[];
}

const STEPS: { key: WizardStep; label: string; icon: string }[] = [
  { key: 'intro', label: '시작', icon: '👋' },
  { key: 'school', label: '학교', icon: '🏫' },
  { key: 'afterschool', label: '방과후', icon: '📚' },
  { key: 'academy', label: '학원', icon: '✏️' },
  { key: 'review', label: '완료', icon: '✅' },
];

export function SetupWizard({ onComplete, onCancel }: SetupWizardProps) {
  const [currentStep, setCurrentStep] = useState<WizardStep>('intro');
  const [childName, setChildName] = useState('');
  const [childGrade, setChildGrade] = useState(1);
  const [schoolName, setSchoolName] = useState('');
  const [uploadedImages, setUploadedImages] = useState<
    { type: ScheduleSourceType; file: File; preview: string }[]
  >([]);
  const [selectedSourceType, setSelectedSourceType] =
    useState<ScheduleSourceType>('school');

  const currentStepIndex = STEPS.findIndex((s) => s.key === currentStep);

  const goNext = () => {
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < STEPS.length) {
      setCurrentStep(STEPS[nextIndex].key);
    }
  };

  const goPrev = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setCurrentStep(STEPS[prevIndex].key);
    }
  };

  const handleImageSelect = (file: File, preview: string) => {
    setUploadedImages((prev) => [
      ...prev,
      { type: selectedSourceType, file, preview },
    ]);
  };

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleComplete = () => {
    // 데모용: 송현초 기본 데이터 사용
    const result: SetupResult = {
      child: {
        name: childName || '우리 아이',
        grade: childGrade,
      },
      sources: [SONGHYUN_SCHOOL_SOURCE, SONGHYUN_AFTERSCHOOL_SOURCE],
      schoolSchedule: {
        ...SONGHYUN_SCHOOL_SCHEDULE,
        schoolName: schoolName || '송현초등학교',
      },
      programs: [],
    };
    onComplete(result);
  };

  return (
    <div className="min-h-screen bg-brand-black grid-bg gradient-mesh">
      <div className="max-w-2xl mx-auto p-4 py-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-display font-bold text-white mb-2">
            시간표 설정
          </h1>
          <p className="text-white/60 text-sm">
            아이의 시간표를 테트리스처럼 맞춰보세요
          </p>
        </div>

        {/* 단계 표시 */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2">
            {STEPS.map((step, idx) => (
              <div key={step.key} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${
                    idx < currentStepIndex
                      ? 'bg-green-500 text-white'
                      : idx === currentStepIndex
                      ? 'bg-brand-red text-white shadow-lg shadow-brand-red/30'
                      : 'bg-white/10 text-white/40'
                  }`}
                >
                  {idx < currentStepIndex ? '✓' : step.icon}
                </div>
                {idx < STEPS.length - 1 && (
                  <div
                    className={`w-8 h-0.5 mx-1 ${
                      idx < currentStepIndex ? 'bg-green-500' : 'bg-white/20'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 단계별 컨텐츠 */}
        <div className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-6">
          {currentStep === 'intro' && (
            <div className="text-center py-8">
              <div className="text-6xl mb-4">🎒</div>
              <h2 className="text-xl font-display font-bold text-white mb-2">
                환영합니다!
              </h2>
              <p className="text-white/60 mb-6">
                몇 가지 정보만 입력하면 맞춤 시간표를 만들어 드려요.
              </p>

              <div className="max-w-sm mx-auto space-y-4 text-left">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">
                    아이 이름
                  </label>
                  <input
                    type="text"
                    value={childName}
                    onChange={(e) => setChildName(e.target.value)}
                    placeholder="예: 윤슬이"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-brand-red"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">
                    학년
                  </label>
                  <select
                    value={childGrade}
                    onChange={(e) => setChildGrade(Number(e.target.value))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-brand-red"
                  >
                    {[1, 2, 3, 4, 5, 6].map((g) => (
                      <option key={g} value={g} className="bg-brand-dark">
                        {g}학년
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 'school' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-4xl mb-2">🏫</div>
                <h2 className="text-xl font-display font-bold text-white mb-1">
                  학교 시간표
                </h2>
                <p className="text-white/60 text-sm">
                  학교 시간표 사진을 찍거나 직접 입력하세요
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">
                  학교 이름
                </label>
                <input
                  type="text"
                  value={schoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  placeholder="예: 송현초등학교"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:border-brand-red"
                />
              </div>

              <ImageUpload
                onImageSelect={handleImageSelect}
                onSourceTypeChange={setSelectedSourceType}
                selectedSourceType="school"
              />

              <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4">
                <p className="text-amber-300 text-sm">
                  💡 <strong>팁:</strong> 학교에서 받은 가정통신문이나 학교생활
                  안내서의 시간표를 찍어 업로드하세요. 현재는 데모 버전으로
                  송현초등학교 1학년 시간표가 기본 설정됩니다.
                </p>
              </div>
            </div>
          )}

          {currentStep === 'afterschool' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-4xl mb-2">📚</div>
                <h2 className="text-xl font-display font-bold text-white mb-1">
                  방과후 프로그램
                </h2>
                <p className="text-white/60 text-sm">
                  방과후 프로그램 안내문을 업로드하세요
                </p>
              </div>

              <ImageUpload
                onImageSelect={handleImageSelect}
                onSourceTypeChange={setSelectedSourceType}
                selectedSourceType="afterschool"
              />

              {/* 업로드된 이미지 목록 */}
              {uploadedImages.filter((img) => img.type === 'afterschool')
                .length > 0 && (
                <div className="space-y-2">
                  <p className="text-sm font-medium text-white/80">
                    업로드된 이미지
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {uploadedImages
                      .filter((img) => img.type === 'afterschool')
                      .map((img, idx) => (
                        <div key={idx} className="relative">
                          <img
                            src={img.preview}
                            alt={`업로드 ${idx + 1}`}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              removeImage(
                                uploadedImages.findIndex((i) => i === img)
                              )
                            }
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full text-white text-xs flex items-center justify-center"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4">
                <p className="text-cyan-300 text-sm">
                  💡 <strong>팁:</strong> 여러 장의 사진을 업로드할 수 있어요.
                  현재는 데모 버전으로 자동 인식 기능은 준비 중입니다.
                </p>
              </div>
            </div>
          )}

          {currentStep === 'academy' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-4xl mb-2">✏️</div>
                <h2 className="text-xl font-display font-bold text-white mb-1">
                  학원 시간표
                </h2>
                <p className="text-white/60 text-sm">
                  학원 시간표가 있다면 추가해주세요
                </p>
              </div>

              <ImageUpload
                onImageSelect={handleImageSelect}
                onSourceTypeChange={setSelectedSourceType}
                selectedSourceType="academy"
              />

              {/* 빈 시간 블럭 미리보기 */}
              <AvailableTimeBlocks grade={childGrade} />

              <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4">
                <p className="text-purple-300 text-sm">
                  💡 <strong>팁:</strong> 학원이 없다면 이 단계를 건너뛰어도
                  됩니다. 나중에 언제든 추가할 수 있어요.
                </p>
              </div>
            </div>
          )}

          {currentStep === 'review' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="text-4xl mb-2">🎉</div>
                <h2 className="text-xl font-display font-bold text-white mb-1">
                  설정 완료!
                </h2>
                <p className="text-white/60 text-sm">
                  입력한 정보를 확인해주세요
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-white/5 rounded-xl p-4">
                  <h3 className="text-white/60 text-sm mb-2">기본 정보</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-white/40 text-xs">이름</p>
                      <p className="text-white font-medium">
                        {childName || '우리 아이'}
                      </p>
                    </div>
                    <div>
                      <p className="text-white/40 text-xs">학년</p>
                      <p className="text-white font-medium">{childGrade}학년</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-white/40 text-xs">학교</p>
                      <p className="text-white font-medium">
                        {schoolName || '송현초등학교'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 rounded-xl p-4">
                  <h3 className="text-white/60 text-sm mb-2">업로드된 시간표</h3>
                  {uploadedImages.length > 0 ? (
                    <div className="flex gap-2 flex-wrap">
                      {uploadedImages.map((img, idx) => (
                        <div key={idx} className="relative">
                          <img
                            src={img.preview}
                            alt={`업로드 ${idx + 1}`}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <span className="absolute -bottom-1 -right-1 px-2 py-0.5 bg-brand-dark text-white text-[10px] rounded-full border border-white/20">
                            {img.type === 'school'
                              ? '학교'
                              : img.type === 'afterschool'
                              ? '방과후'
                              : '학원'}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-white/40 text-sm">
                      업로드된 이미지가 없습니다. (기본 데이터 사용)
                    </p>
                  )}
                </div>

                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                  <p className="text-green-300 text-sm">
                    ✅ 데모 버전에서는 송현초등학교 1학년 기본 시간표와 방과후
                    프로그램 40개가 제공됩니다. 완료 버튼을 누르면 시간표
                    화면으로 이동합니다.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* 네비게이션 버튼 */}
          <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
            <button
              type="button"
              onClick={currentStepIndex === 0 ? onCancel : goPrev}
              className="px-6 py-2.5 text-white/60 hover:text-white transition-colors"
            >
              {currentStepIndex === 0 ? '취소' : '← 이전'}
            </button>

            {currentStep === 'review' ? (
              <button
                type="button"
                onClick={handleComplete}
                className="px-6 py-2.5 bg-brand-red text-white font-medium rounded-xl shadow-lg shadow-brand-red/30 hover:bg-brand-red/90 transition-colors"
              >
                완료 →
              </button>
            ) : (
              <button
                type="button"
                onClick={goNext}
                className="px-6 py-2.5 bg-brand-red text-white font-medium rounded-xl shadow-lg shadow-brand-red/30 hover:bg-brand-red/90 transition-colors"
              >
                다음 →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
