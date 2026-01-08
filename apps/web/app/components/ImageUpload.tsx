/**
 * 사진 업로드 컴포넌트
 * 학교 전단지/시간표 이미지를 업로드하여 OCR 처리
 */

import { useState, useRef, useCallback } from 'react';
import type { ScheduleSourceType } from '~/types/schedule';
import { SOURCE_TYPE_LABELS } from '~/types/schedule';

interface ImageUploadProps {
  onImageSelect: (file: File, preview: string) => void;
  onSourceTypeChange?: (type: ScheduleSourceType) => void;
  selectedSourceType?: ScheduleSourceType;
  isProcessing?: boolean;
}

export function ImageUpload({
  onImageSelect,
  onSourceTypeChange,
  selectedSourceType = 'afterschool',
  isProcessing = false,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith('image/')) {
        alert('이미지 파일만 업로드 가능합니다.');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
        onImageSelect(file, result);
      };
      reader.readAsDataURL(file);
    },
    [onImageSelect]
  );

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        handleFile(e.dataTransfer.files[0]);
      }
    },
    [handleFile]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        handleFile(e.target.files[0]);
      }
    },
    [handleFile]
  );

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const clearPreview = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const sourceTypes: ScheduleSourceType[] = [
    'school',
    'afterschool',
    'daycare',
    'academy',
  ];

  return (
    <div className="space-y-4">
      {/* 소스 타입 선택 */}
      <div>
        <label className="block text-sm font-medium text-white/80 mb-2">
          시간표 종류
        </label>
        <div className="flex flex-wrap gap-2">
          {sourceTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => onSourceTypeChange?.(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                selectedSourceType === type
                  ? 'bg-brand-red text-white shadow-lg shadow-brand-red/30'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {SOURCE_TYPE_LABELS[type]}
            </button>
          ))}
        </div>
      </div>

      {/* 이미지 업로드 영역 */}
      <div
        className={`relative border-2 border-dashed rounded-2xl transition-all duration-200 ${
          dragActive
            ? 'border-brand-red bg-brand-red/10'
            : preview
            ? 'border-white/30 bg-white/5'
            : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="hidden"
          disabled={isProcessing}
        />

        {preview ? (
          <div className="relative p-4">
            <img
              src={preview}
              alt="업로드된 이미지"
              className="max-h-64 mx-auto rounded-lg object-contain"
            />
            {!isProcessing && (
              <button
                type="button"
                onClick={clearPreview}
                className="absolute top-2 right-2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-colors"
              >
                ✕
              </button>
            )}
            {isProcessing && (
              <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-10 h-10 border-4 border-brand-red border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                  <p className="text-white text-sm">분석 중...</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            type="button"
            onClick={handleClick}
            disabled={isProcessing}
            className="w-full p-8 text-center cursor-pointer"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-2xl flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white/60"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <p className="text-white/80 font-medium mb-1">
              시간표 사진을 업로드하세요
            </p>
            <p className="text-white/50 text-sm">
              클릭하거나 이미지를 드래그하세요
            </p>
            <p className="text-white/40 text-xs mt-2">
              학교 전단지, 방과후 안내문, 학원 시간표 등
            </p>
          </button>
        )}
      </div>
    </div>
  );
}
