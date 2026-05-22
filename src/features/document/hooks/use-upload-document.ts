"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"

import { uploadDocument } from "@/features/document/api/document.api"
import { UploadDocumentInput } from "@/features/document/types/document.type"

interface UseUploadDocumentOptions {
  onSuccess?: () => void
}

export function useUploadDocument(
  companySlug: string,
  options?: UseUploadDocumentOptions
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UploadDocumentInput) => uploadDocument(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["documents", companySlug],
      })
      options?.onSuccess?.()
    },
  })
}
