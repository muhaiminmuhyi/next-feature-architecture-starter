import { FileText, LayoutDashboard, type LucideIcon, Settings } from "lucide-react"

export interface PortalNavigationItem {
  label: string
  href: (companySlug: string) => string
  icon: LucideIcon
}

export const portalNavigation: PortalNavigationItem[] = [
  {
    label: "Dashboard",
    href: (companySlug) => `/connect/${companySlug}/dashboard`,
    icon: LayoutDashboard,
  },
  {
    label: "Documents",
    href: (companySlug) => `/connect/${companySlug}/documents`,
    icon: FileText,
  },
  {
    label: "Settings",
    href: (companySlug) => `/connect/${companySlug}/settings`,
    icon: Settings,
  },
]
