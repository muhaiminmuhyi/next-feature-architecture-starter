"use client"

import { useMutation } from "@tanstack/react-query"

import { login } from "@/features/auth/api/auth.api"
import { LoginCredentials } from "@/features/auth/types/auth.type"

export function useLogin() {
  return useMutation({
    mutationFn: (credentials: LoginCredentials) => login(credentials),
  })
}
