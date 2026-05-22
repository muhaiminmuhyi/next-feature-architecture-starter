import { PageHeader } from "@/components/shared/page-header"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Placeholder settings route for future client portal preferences."
      />
      <Card>
        <CardHeader>
          <CardTitle>Portal settings</CardTitle>
          <CardDescription>
            Keep this template intentionally small and add settings only when the
            product needs them.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This placeholder establishes the route, shell, and page structure
            without adding a permission engine, real authentication, or tenant
            administration features.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
