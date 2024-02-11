import { AllUserType } from "./allUser";
import { MentorType } from "./mentor";

export type StudentType = AllUserType & {
  role: "student";
  studyMinutes: number;
  taskCode: number;
  studyLangs: string[];
  score: number;
  mentorList: MentorType[],
}