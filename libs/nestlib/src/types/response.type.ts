export interface IResponse {
  data?: unknown;
  message?: string;
  errors?: Record<string, string[]>;
}
