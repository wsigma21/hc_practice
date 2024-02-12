import { AllUserType } from "./allUser"

export type MentorType = AllUserType & {
  role: "mentor";
  experienceDays: number;
  useLangs: string[];
  availableStartCode: number;
  availableEndCode: number;
  studentList: string[];
}