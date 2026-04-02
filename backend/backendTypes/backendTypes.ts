import type {
  CreateApplicationRequest,
  UpdateApplicationRequest,
  SignupRequest,
  LoginRequest,
} from "../../sharedTypes/sharedTypes";

export type CreateApplicationEvent = {
  body: CreateApplicationRequest;
  user: {
    username: {
      S: string;
    };
  };
};

export type DeleteApplicationEvent = {
  pathParameters: {
    id: string;
  };
  user: {
    username: {
      S: string;
    };
    email: {
      S: string;
    };
  };
};

export type AuthenticatedEvent = {
  user: AuthUser;
};

export type AuthUser = {
  username: { S: string };
  email?: { S: string };
};

export type UpdateApplicationEvent = AuthenticatedEvent & {
  pathParameters: {
    id: string;
  };
  body: UpdateApplicationRequest;
};

export type UploadUrlEvent = AuthenticatedEvent & {
  body: {
    fileName: string;
    fileType: string;
  };
};

export type FormRequest = AuthenticatedEvent & {
  body: { name: string; comment: string; rating: number };
};

export type SignupEvent = {
  body: SignupRequest;
};
export type LoginEvent = {
  body: LoginRequest;
};
