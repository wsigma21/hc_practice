import { CommonUserType } from "./common";

export type StudentType = CommonUserType & {
  studyMinutes: number;
  taskCode: number;
  studyLangs: string[];
  score: number;
}