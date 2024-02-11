import { MentorType } from "./mentor";
import { StudentType } from "./student";

export type AllUserType = {
  id: number;
  role: string;
  name: string;
  email: string;
  age: number;
  postCode: string;
  phone: string;
  hobbies: string[];
  url: string;
  studyMinutes?: number;
  taskCode?: number;
  studyLangs?: string[];
  score?: number;
  mentorList?: MentorType[],
  experienceDays?: number;
  useLangs?: string[];
  availableStartCode?: number;
  availableEndCode?: number;
  studentList?: StudentType[];
}
