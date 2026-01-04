import type { Route } from "./+types/home";
import WeeklyTimetable from "../components/WeeklyTimetable";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Tetritime - 시간표를 테트리스처럼 맞춰요" },
    { name: "description", content: "초등학교 방과후 프로그램 스케줄링 도구" },
  ];
}

export default function Home() {
  return <WeeklyTimetable />;
}
