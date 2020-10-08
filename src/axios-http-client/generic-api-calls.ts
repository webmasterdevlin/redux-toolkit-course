import { api } from './api-config';

export async function getAxios<T>(endpoint: string) {
  return await api.get<Array<T>>(`${endpoint}`);
}

export async function deleteAxios<T>(endpoint: string, id: string) {
  return await api.delete<T>(`${endpoint}/${id}`);
}

export async function postAxios<T>(endpoint: string, arg: T) {
  return await api.post<T>(`${endpoint}`, arg);
}

export async function putAxios<T, AT>(endpoint: string, id: string, arg: AT) {
  return await api.put<T>(`${endpoint}/${id}`, arg);
}

export async function getByIdAxios<T>(endpoint: string, id: string) {
  return await api.get<T>(`${endpoint}/${id}`);
}
