"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { useRef, useState } from "react"
import { Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useUploadDocument } from "@/features/document/hooks/use-upload-document"
import {
  uploadDocumentSchema,
  UploadDocumentFormValues,
} from "@/features/document/schemas/upload-document.schema"

interface UploadDocumentDialogProps {
  companySlug: string
}

export function UploadDocumentDialog({
  companySlug,
}: UploadDocumentDialogProps) {
  const [open, setOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const form = useForm<UploadDocumentFormValues>({
    resolver: zodResolver(uploadDocumentSchema),
    defaultValues: {
      documentType: "",
      notes: "",
    },
  })

  const uploadMutation = useUploadDocument(companySlug, {
    onSuccess: () => {
      setOpen(false)
      form.reset({
        documentType: "",
        notes: "",
      })
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    },
  })

  async function onSubmit(values: UploadDocumentFormValues) {
    await uploadMutation.mutateAsync({
      companySlug,
      documentType: values.documentType,
      file: values.file,
      notes: values.notes,
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload />
          Upload document
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Upload document</DialogTitle>
          <DialogDescription>
            This is a mocked upload flow that demonstrates form validation and
            query invalidation.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="documentType">Document type</Label>
            <Controller
              control={form.control}
              name="documentType"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full" id="documentType">
                    <SelectValue placeholder="Select a document type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Agreement">Agreement</SelectItem>
                    <SelectItem value="Certificate">Certificate</SelectItem>
                    <SelectItem value="Plan">Plan</SelectItem>
                    <SelectItem value="Renewal">Renewal</SelectItem>
                    <SelectItem value="Service Summary">
                      Service Summary
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {form.formState.errors.documentType ? (
              <p className="text-xs text-destructive">
                {form.formState.errors.documentType.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="file">File</Label>
            <Input
              id="file"
              ref={fileInputRef}
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
              onChange={(event) => {
                const file = event.target.files?.[0]
                form.setValue("file", file as UploadDocumentFormValues["file"], {
                  shouldValidate: true,
                })
              }}
            />
            <p className="text-xs text-muted-foreground">
              Accepted types: PDF, PNG, JPG, JPEG, DOC, DOCX. Maximum 10MB.
            </p>
            {form.formState.errors.file ? (
              <p className="text-xs text-destructive">
                {form.formState.errors.file.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              rows={4}
              placeholder="Optional context for reviewers"
              {...form.register("notes")}
            />
            {form.formState.errors.notes ? (
              <p className="text-xs text-destructive">
                {form.formState.errors.notes.message}
              </p>
            ) : null}
          </div>

          <DialogFooter>
            <Button type="submit" disabled={uploadMutation.isPending}>
              {uploadMutation.isPending ? "Uploading..." : "Upload"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
