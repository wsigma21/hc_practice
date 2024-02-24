import { CommonUserType } from "./common"

export type MentorType = CommonUserType & {
  experienceDays: number;
  useLangs: string[];
  availableStartCode: number;
  availableEndCode: number;
}