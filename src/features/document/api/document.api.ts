import {
  ApiResponse,
  PaginatedResponse,
} from "@/lib/api/api-response"
import {
  DocumentFilters,
  DocumentItem,
  UploadDocumentInput,
} from "@/features/document/types/document.type"

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

let mockedDocuments: DocumentItem[] = [
  {
    id: "doc_1",
    companySlug: "client-a",
    name: "Client A onboarding pack.pdf",
    documentType: "Onboarding Pack",
    status: "approved",
    uploadedBy: "Operations Team",
    createdAt: "2026-05-18T10:15:00.000Z",
    sizeLabel: "1.2 MB",
  },
  {
    id: "doc_2",
    companySlug: "client-a",
    name: "Quarterly renewal.docx",
    documentType: "Renewal",
    status: "pending",
    uploadedBy: "Portal User",
    createdAt: "2026-05-20T07:20:00.000Z",
    sizeLabel: "420 KB",
  },
  {
    id: "doc_3",
    companySlug: "client-a",
    name: "Compliance certificate.png",
    documentType: "Certificate",
    status: "archived",
    uploadedBy: "Compliance Team",
    createdAt: "2026-05-12T16:35:00.000Z",
    sizeLabel: "980 KB",
  },
  {
    id: "doc_4",
    companySlug: "client-b",
    name: "Client B service summary.pdf",
    documentType: "Service Summary",
    status: "approved",
    uploadedBy: "Account Team",
    createdAt: "2026-05-15T11:10:00.000Z",
    sizeLabel: "860 KB",
  },
  {
    id: "doc_5",
    companySlug: "client-b",
    name: "Implementation checklist.doc",
    documentType: "Checklist",
    status: "pending",
    uploadedBy: "Portal User",
    createdAt: "2026-05-21T09:45:00.000Z",
    sizeLabel: "310 KB",
  },
]

const defaultDocumentFilters: DocumentFilters = {
  page: 1,
  limit: 10,
  search: "",
  status: "all",
  sortBy: "createdAt",
  sortOrder: "desc",
}

function sortDocuments(documents: DocumentItem[], filters: DocumentFilters) {
  return [...documents].sort((left, right) => {
    const leftValue = left[filters.sortBy]
    const rightValue = right[filters.sortBy]

    const comparison =
      typeof leftValue === "string" && typeof rightValue === "string"
        ? leftValue.localeCompare(rightValue)
        : 0

    return filters.sortOrder === "asc" ? comparison : comparison * -1
  })
}

function formatFileSize(bytes: number) {
  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  return `${Math.max(1, Math.round(bytes / 1024))} KB`
}

export async function getDocuments(
  companySlug: string,
  filters: DocumentFilters = defaultDocumentFilters
): Promise<PaginatedResponse<DocumentItem>> {
  await delay(550)

  const scopedDocuments = mockedDocuments.filter(
    (document) => document.companySlug === companySlug
  )

  const filteredDocuments = scopedDocuments.filter((document) => {
    const matchesSearch =
      filters.search.length === 0 ||
      document.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      document.documentType
        .toLowerCase()
        .includes(filters.search.toLowerCase()) ||
      document.uploadedBy.toLowerCase().includes(filters.search.toLowerCase())

    const matchesStatus =
      filters.status === "all" || document.status === filters.status

    return matchesSearch && matchesStatus
  })

  const sortedDocuments = sortDocuments(filteredDocuments, filters)
  const startIndex = (filters.page - 1) * filters.limit
  const endIndex = startIndex + filters.limit
  const pageDocuments = sortedDocuments.slice(startIndex, endIndex)
  const total = filteredDocuments.length

  return {
    data: pageDocuments,
    meta: {
      page: filters.page,
      limit: filters.limit,
      total,
      totalPages: Math.max(1, Math.ceil(total / filters.limit)),
    },
  }
}

export async function uploadDocument(
  input: UploadDocumentInput
): Promise<ApiResponse<DocumentItem>> {
  await delay(700)

  const newDocument: DocumentItem = {
    id: `doc_${Date.now()}`,
    companySlug: input.companySlug,
    name: input.file.name,
    documentType: input.documentType,
    status: "pending",
    uploadedBy: "Portal User",
    createdAt: new Date().toISOString(),
    sizeLabel: formatFileSize(input.file.size),
    notes: input.notes,
  }

  mockedDocuments = [newDocument, ...mockedDocuments]

  return {
    data: newDocument,
    message: "Document uploaded successfully",
  }
}
