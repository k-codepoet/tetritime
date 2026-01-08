# Tetritime 아키텍처 문서

> 현재 상태 파악 및 개선 방향 정리

## 전체 구조

```mermaid
---
title: Tetritime 현재 아키텍처 (PoC)
---
flowchart TB
    subgraph Routes["라우트"]
        R1["/ (home.tsx)"]
        R2["/setup (setup.tsx)"]
    end

    subgraph Components["컴포넌트"]
        C1["WeeklyTimetable"]
        C2["SetupWizard"]
        C3["ImageUpload"]
        C4["AvailableTimeBlocks"]
    end

    subgraph DataLayer["데이터 레이어"]
        subgraph Legacy["레거시 (현재 사용)"]
            D1["data/types.ts<br/>LegacyProgram, TimeSlot"]
            D2["data/songhyun/programs.ts<br/>40개 방과후 프로그램"]
            D3["data/songhyun/school.ts<br/>기본 일과표, 하교시간"]
        end
        subgraph NewSchema["신규 스키마 (미사용)"]
            D4["types/schedule.ts<br/>ScheduleStore, Program"]
            D5["data/migrate.ts<br/>마이그레이션 헬퍼"]
        end
    end

    subgraph Utils["유틸리티"]
        U1["utils/time.ts<br/>시간 파싱, 충돌 검사"]
    end

    R1 --> C1
    R2 --> C2
    C2 --> C3
    C2 --> C4
    C1 --> D1
    C1 --> D2
    C1 --> D3
    C4 --> D5
    C4 --> U1
```

## 타입 시스템 현황 (이중 구조 문제)

```mermaid
---
title: 타입 시스템 현황
---
classDiagram
    class LegacyProgram {
        <<현재 사용>>
        +number id
        +string name
        +string class
        +string grade
        +string day
        +string time
        +number duration
        +number capacity
        +string category
    }

    class TimeSlot {
        <<현재 사용>>
        +string start
        +string end
        +string label
        +TimeSlotType type
    }

    class Program {
        <<신규 - 미사용>>
        +string id
        +string sourceId
        +string name
        +ProgramCategory category
        +TargetGrade targetGrade
        +DayTimeRange[] schedule
        +number durationMinutes
    }

    class SchoolSchedule {
        <<신규 - 미사용>>
        +string sourceId
        +string schoolName
        +number grade
        +SchoolTimeSlot[] timeSlots
        +DismissalSchedule dismissalSchedule
    }

    class ScheduleStore {
        <<신규 - 미사용>>
        +ScheduleSource[] sources
        +SchoolSchedule[] schoolSchedules
        +Program[] programs
        +ChildProfile[] children
        +OCRExtraction[] ocrQueue
    }

    LegacyProgram ..> Program : "마이그레이션 필요"
    TimeSlot ..> SchoolTimeSlot : "마이그레이션 필요"
```

## 데이터 흐름 (현재 vs 목표)

```mermaid
---
title: 데이터 흐름 비교
---
flowchart LR
    subgraph Current["현재 상태"]
        A1["하드코딩된<br/>송현초 데이터"] --> B1["WeeklyTimetable<br/>직접 렌더링"]
        A1 --> B2["AvailableTimeBlocks<br/>빈 시간 계산"]
    end

    subgraph Target["목표 상태"]
        C1["사진 OCR"] --> D1["OCRExtraction"]
        D1 --> E1["사용자 검토"]
        E1 --> F1["ScheduleStore"]
        F1 --> G1["Program[]"]
        G1 --> H1["WeeklyTimetable"]

        C2["수동 입력"] --> F1
        C3["학교 API?"] -.-> F1
    end
```

## 파일 구조

```mermaid
---
title: 파일 구조
---
graph TB
    subgraph app["app/"]
        subgraph data["data/"]
            DI["index.ts - 통합 export"]
            DT["types.ts - 레거시 타입"]
            DM["migrate.ts - 마이그레이션"]
            subgraph songhyun["songhyun/"]
                SP["programs.ts - 40개 프로그램"]
                SS["school.ts - 일과표"]
                SI["index.ts"]
            end
        end

        subgraph types["types/"]
            TS["schedule.ts - 신규 스키마"]
        end

        subgraph utils["utils/"]
            UT["time.ts - 시간 유틸"]
        end

        subgraph components["components/"]
            CW["WeeklyTimetable.tsx"]
            CSW["SetupWizard.tsx"]
            CIU["ImageUpload.tsx"]
            CAT["AvailableTimeBlocks.tsx"]
        end

        subgraph routes["routes/"]
            RH["home.tsx"]
            RS["setup.tsx"]
        end
    end

    DI --> DT
    DI --> songhyun
    DI --> DM
    CW --> DI
    CSW --> DM
    CAT --> DM
    CAT --> UT
```

## 현재 상태 요약

| 구분 | 상태 | 설명 |
|------|------|------|
| **레거시 타입** | 사용 중 | `LegacyProgram`, `TimeSlot` - UI 렌더링에 직접 사용 |
| **신규 스키마** | 정의만 됨 | `types/schedule.ts` - OCR, 다중소스 지원용 설계 완료 |
| **마이그레이션** | 헬퍼만 존재 | `migrate.ts` - 변환 함수 있으나 미적용 |
| **데이터 저장** | 없음 | 모든 데이터가 하드코딩, 상태 관리 없음 |
| **OCR 연동** | UI만 존재 | `ImageUpload` 있으나 실제 처리 없음 |

## 해결해야 할 문제

### 1. 이중 타입 시스템
- Legacy ↔ New Schema 공존
- 컴포넌트마다 다른 타입 사용

### 2. 상태 관리 부재
- 선택한 프로그램이 새로고침 시 사라짐
- localStorage 또는 DB 연동 필요

### 3. OCR 미연동
- 사진 업로드 후 처리 로직 없음
- Cloudflare AI 또는 외부 API 연동 필요

### 4. 하드코딩 데이터
- 다른 학교 지원 불가
- 동적 데이터 로딩 필요

## 개선 우선순위

```mermaid
---
title: 개선 로드맵
---
gantt
    title 개선 작업 순서
    dateFormat X
    axisFormat %s

    section Phase 1 - 통합
    레거시 타입 신규 스키마로 통합    :a1, 0, 1
    컴포넌트 타입 일원화              :a2, after a1, 1

    section Phase 2 - 저장
    localStorage 상태 저장            :b1, after a2, 1
    선택 프로그램 영속화              :b2, after b1, 1

    section Phase 3 - OCR
    Cloudflare AI 연동               :c1, after b2, 1
    시간표 파싱 로직                  :c2, after c1, 1

    section Phase 4 - 확장
    다중 학교 지원                    :d1, after c2, 1
    다중 자녀 지원                    :d2, after d1, 1
```

## 주요 파일 설명

### 데이터 레이어

| 파일 | 역할 | 상태 |
|------|------|------|
| `data/types.ts` | UI용 레거시 타입 정의 | 사용 중 |
| `data/songhyun/programs.ts` | 송현초 방과후 40개 | 사용 중 |
| `data/songhyun/school.ts` | 송현초 일과표 | 사용 중 |
| `types/schedule.ts` | 확장 스키마 (OCR, 다중소스) | 미사용 |
| `data/migrate.ts` | Legacy→New 변환 | 부분 사용 |
| `utils/time.ts` | 시간 파싱/충돌 검사 | 사용 중 |

### 컴포넌트

| 파일 | 역할 | 사용 타입 |
|------|------|----------|
| `WeeklyTimetable.tsx` | 메인 시간표 렌더링 | Legacy |
| `SetupWizard.tsx` | 셋업 위자드 | Mixed |
| `ImageUpload.tsx` | 사진 업로드 | New Schema |
| `AvailableTimeBlocks.tsx` | 빈 시간 표시 | New Schema |
