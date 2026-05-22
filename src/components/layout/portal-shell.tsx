"use client"

import { ReactNode, useState } from "react"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
} from "@/components/ui/sheet"
import { PortalSidebar } from "@/components/layout/portal-sidebar"
import { PortalTopbar } from "@/components/layout/portal-topbar"
import { useUiStore } from "@/stores/ui.store"

interface PortalShellProps {
  companySlug: string
  children: ReactNode
}

export function PortalShell({ companySlug, children }: PortalShellProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false)
  const { isSidebarCollapsed, toggleSidebar } = useUiStore()

  return (
    <div className="min-h-screen bg-background">
      <div className="flex min-h-screen">
        <div className="hidden lg:block">
          <PortalSidebar
            companySlug={companySlug}
            collapsed={isSidebarCollapsed}
            onToggle={toggleSidebar}
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <PortalTopbar
            companySlug={companySlug}
            onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
            onToggleSidebar={toggleSidebar}
          />
          <main className="flex-1 bg-muted/20 px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto w-full max-w-7xl">{children}</div>
          </main>
        </div>
      </div>

      <Sheet open={isMobileSidebarOpen} onOpenChange={setIsMobileSidebarOpen}>
        <SheetContent side="left" className="w-80 p-0" showCloseButton={false}>
          <SheetTitle className="sr-only">Portal navigation</SheetTitle>
          <SheetDescription className="sr-only">
            Navigate between dashboard, documents, and settings.
          </SheetDescription>
          <PortalSidebar
            companySlug={companySlug}
            collapsed={false}
            onToggle={toggleSidebar}
            onNavigate={() => setIsMobileSidebarOpen(false)}
            showCollapseButton={false}
            className="w-full border-r-0"
          />
        </SheetContent>
      </Sheet>
    </div>
  )
}
