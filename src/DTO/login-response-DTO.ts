export interface LoginResponseDTO {
  succes: boolean;
  author: string;
  aplication: string;
  version: string | undefined;
  message: string;
  date: Date;
  status: number;
  content: {
    token: string;
    user: {
      id: number;
      email: string;
      role: "USER";
    };
  };
}
