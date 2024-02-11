import { AllUserType } from "./allUser"
import { StudentType } from "./student";

export type MentorType = AllUserType & {
  role: "mentor";
  experienceDays: number;
  useLangs: string[];
  availableStartCode: number;
  availableEndCode: number;
  studentList: StudentType[];
}