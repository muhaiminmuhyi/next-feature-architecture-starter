import { AlertTriangle } from "lucide-react"

interface ErrorStateProps {
  title?: string
  description?: string
}

export function ErrorState({
  title = "Something went wrong",
  description = "Please try again in a moment.",
}: ErrorStateProps) {
  return (
    <div className="flex min-h-48 flex-col items-center justify-center gap-3 rounded-lg border border-destructive/20 bg-destructive/5 px-6 py-10 text-center">
      <AlertTriangle className="size-8 text-destructive" />
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-foreground">{title}</h3>
        <p className="max-w-md text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
