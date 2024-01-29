import { HttpStatus } from '@nestjs/common';

type DataResponse<TData> = TData | null;

export class ApiResponse<TData> {
  statusCode: number;
  message: string;
  data: DataResponse<TData>;

  constructor(statusCode: number, message: string, data: DataResponse<TData>) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }

  static success<TData>(params: { statusCode?: number; message?: string; data?: DataResponse<TData> }): ApiResponse<TData> {
    const code: number = params.statusCode || HttpStatus.OK;

    return new ApiResponse<TData>(code, params.message, params.data);
  }

  static error<TData>(params: { statusCode?: number; message: string; data?: DataResponse<TData> }): ApiResponse<TData> {
    const code: number = params.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
    const message: string = params.message || 'Internal Server Error';

    return new ApiResponse<TData>(code, message, params.data);
  }
}
