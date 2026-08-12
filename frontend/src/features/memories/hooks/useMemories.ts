import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { memoriesApi } from '../api/memoriesApi';

export function useMemories() {
  return useQuery({ queryKey: ['memories'], queryFn: () => memoriesApi.list().then(x => x.memories) });
}

export function useCreateMemory() {
  const client = useQueryClient();
  return useMutation({ mutationFn: memoriesApi.create, onSuccess: () => client.invalidateQueries({ queryKey: ['memories'] }) });
}

export function useUploadMemoryMedia() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: ({ memoryId, file }: { memoryId: string; file: File }) => memoriesApi.uploadMedia(memoryId, file),
    onSuccess: () => client.invalidateQueries({ queryKey: ['memories'] }),
  });
}

export function useDeleteMemory() {
  const client = useQueryClient();
  return useMutation({ mutationFn: memoriesApi.remove, onSuccess: () => client.invalidateQueries({ queryKey: ['memories'] }) });
}
