export type UploadFile = {
  name: string;
  url: string;
  key: string;
  contentType: string;
};
export type ApplicationLocation = {
  city: string;
  latitude: number | null;
  longitude: number | null;
};

export type CreateApplicationRequest = {
  title: string;
  extraInfo: string[];
  applicationDate: string | null;
  priority: number;
  reminder: boolean;
  reminderDate: string | null;
  files: UploadFile[];
  location: ApplicationLocation;
  category: string;
};

export type UpdateApplicationRequest = {
  title: string;
  extraInfo: string[];
  applicationDate: string | null;
  priority: number;
  reminder: boolean;
  reminderDate: string | null;
  files: UploadFile[];
  location: ApplicationLocation;
  category: string;
  removedFileKeys: string[];
};
export type LoginRequest = {
  username: string;
  password: string;
};

export type SignupRequest = {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
};
export type Application = {
  pk: string;
  sk: string;
  title: string;
  category: string;
  extraInfo: string[];
  applicationDate: string | null;
  priority: number;
  reminder: boolean;
  reminderDate: string | null;
  files: UploadFile[];
  location: ApplicationLocation;
  send: boolean;
  createdAt: string;
};
