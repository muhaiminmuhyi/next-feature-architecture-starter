"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { PanelLeftClose, PanelLeftOpen } from "lucide-react"

import { Button } from "@/components/ui/button"
import { portalNavigation } from "@/config/navigation"
import { cn } from "@/lib/utils"

interface PortalSidebarProps {
  companySlug: string
  collapsed: boolean
  onToggle: () => void
  onNavigate?: () => void
  showCollapseButton?: boolean
  className?: string
}

export function PortalSidebar({
  companySlug,
  collapsed,
  onToggle,
  onNavigate,
  showCollapseButton = true,
  className,
}: PortalSidebarProps) {
  const pathname = usePathname()

  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width]",
        collapsed ? "w-20" : "w-64",
        className
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        <div className={cn("min-w-0", collapsed && "sr-only")}>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
            Starter
          </p>
          <p className="truncate text-sm font-semibold">CRM Connect Portal</p>
        </div>
        {showCollapseButton ? (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={onToggle}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <PanelLeftOpen /> : <PanelLeftClose />}
          </Button>
        ) : null}
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {portalNavigation.map((item) => {
          const href = item.href(companySlug)
          const isActive = pathname === href
          const Icon = item.icon

          return (
            <Link
              key={item.label}
              href={href}
              onClick={onNavigate}
              className={cn(
                "flex h-10 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                collapsed && "justify-center px-0"
              )}
            >
              <Icon className="size-4 shrink-0" />
              {!collapsed ? <span>{item.label}</span> : null}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-sidebar-border px-4 py-4">
        <p
          className={cn(
            "text-xs leading-5 text-muted-foreground",
            collapsed && "sr-only"
          )}
        >
          Minimal multi-tenant foundation for dashboard, documents, and
          settings flows.
        </p>
      </div>
    </aside>
  )
}
