import { AxiosResponse } from "axios";
import client from "./client";

const UPLOAD_FILE = '/admin/file';

export const uploadFile = async (params: FormData) => {
    const response = await client.post<AxiosResponse>(
        UPLOAD_FILE,
        params
    );
    return response.data;
  };