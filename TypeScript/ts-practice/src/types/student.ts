import { AllUserType } from "./allUser";

export type StudentType = AllUserType & {
  role: "student";
  studyMinutes: number;
  taskCode: number;
  studyLangs: string[];
  score: number;
  mentorList: string[],
}