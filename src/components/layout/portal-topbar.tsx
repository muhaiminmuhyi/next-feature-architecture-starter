"use client"

import { Menu, PanelLeft } from "lucide-react"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui/button"
import { portalNavigation } from "@/config/navigation"
import { CompanySwitcher } from "@/features/company/components/company-switcher"

interface PortalTopbarProps {
  companySlug: string
  onOpenMobileSidebar: () => void
  onToggleSidebar: () => void
}

export function PortalTopbar({
  companySlug,
  onOpenMobileSidebar,
  onToggleSidebar,
}: PortalTopbarProps) {
  const pathname = usePathname()
  const currentItem = portalNavigation.find(
    (item) => item.href(companySlug) === pathname
  )

  return (
    <header className="sticky top-0 z-20 border-b bg-background/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onOpenMobileSidebar}
          >
            <Menu />
            <span className="sr-only">Open navigation</span>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="hidden lg:inline-flex"
            onClick={onToggleSidebar}
          >
            <PanelLeft />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Connect
            </p>
            <h1 className="truncate text-sm font-semibold">
              {currentItem?.label ?? "Portal"}
            </h1>
          </div>
        </div>

        <CompanySwitcher currentCompanySlug={companySlug} />
      </div>
    </header>
  )
}
