export interface Company {
  id: string
  name: string
  slug: string
  description: string
  status: "active" | "pending"
}
