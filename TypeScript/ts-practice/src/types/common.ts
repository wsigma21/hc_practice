export type CommonUserType = {
  id: number;
  role: string;
  name: string;
  email: string;
  age: number;
  postCode: string;
  phone: string;
  hobbies: string[];
  url: string;
  availableList?: string[];
}