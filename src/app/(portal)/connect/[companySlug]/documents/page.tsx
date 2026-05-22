import { DocumentsPage } from "@/features/document/components/documents-page"

interface DocumentsRoutePageProps {
  params: Promise<{
    companySlug: string
  }>
}

export default async function DocumentsRoutePage({
  params,
}: DocumentsRoutePageProps) {
  const { companySlug } = await params

  return <DocumentsPage companySlug={companySlug} />
}
