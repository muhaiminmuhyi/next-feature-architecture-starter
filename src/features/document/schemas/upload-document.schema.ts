import { z } from "zod"

const maxFileSize = 10 * 1024 * 1024
const acceptedTypes = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]

const hasAcceptedExtension = (file: File) =>
  [".pdf", ".png", ".jpg", ".jpeg", ".doc", ".docx"].some((extension) =>
    file.name.toLowerCase().endsWith(extension)
  )

const isFile = (value: unknown): value is File =>
  typeof File !== "undefined" && value instanceof File

export const uploadDocumentSchema = z.object({
  documentType: z.string().min(1, "Document type is required"),
  file: z
    .custom<File>((value) => isFile(value), {
      message: "File is required",
    })
    .refine((file) => file.size <= maxFileSize, {
      message: "File must be 10MB or less",
    })
    .refine(
      (file) => acceptedTypes.includes(file.type) || hasAcceptedExtension(file),
      {
        message: "Accepted file types: PDF, PNG, JPG, JPEG, DOC, DOCX",
      }
    ),
  notes: z.string().max(500, "Notes must be 500 characters or less").optional(),
})

export type UploadDocumentFormValues = z.infer<typeof uploadDocumentSchema>
