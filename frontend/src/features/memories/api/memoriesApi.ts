import { api } from '../../../lib/api';
import type { Media, Memory, MemoryInput } from '../types';

export const memoriesApi = {
  list: () => api<{ memories: Memory[] }>('/memories'),
  create: (input: MemoryInput) => api<{ memory: Memory }>('/memories', { method: 'POST', body: JSON.stringify(input) }),
  uploadMedia: (memoryId: string, file: File) => {
    const form = new FormData();
    form.append('file', file);
    return api<{ media: Media }>(`/memories/${memoryId}/media`, { method: 'POST', body: form });
  },
  update: (id: string, input: Partial<MemoryInput>) =>
    api<{ memory: Memory }>(`/memories/${id}`, { method: 'PATCH', body: JSON.stringify(input) }),
  remove: (id: string) => api<void>(`/memories/${id}`, { method: 'DELETE' }),
};
