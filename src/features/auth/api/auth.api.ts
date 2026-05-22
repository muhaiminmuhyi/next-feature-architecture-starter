import { ApiResponse } from "@/lib/api/api-response"
import { LoginCredentials, LoginResponse } from "@/features/auth/types/auth.type"

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function login(
  credentials: LoginCredentials
): Promise<ApiResponse<LoginResponse>> {
  await delay(700)

  return {
    data: {
      user: {
        id: "user_1",
        name: "Portal User",
        email: credentials.email,
      },
      accessToken: "mock_access_token",
    },
    message: "Logged in successfully",
  }
}
