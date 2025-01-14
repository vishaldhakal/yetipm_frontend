"use client";

import { useState } from "react";
import { FileIcon, X, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const FileUpload = ({
  value = [],
  onChange,
  onDelete,
  maxFiles = 1,
  accept,
  label = "Upload File",
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewFile, setPreviewFile] = useState(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFiles(files);
    }
  };

  const handleFiles = (files) => {
    const remainingSlots = maxFiles - value.length;
    const filesToAdd = files.slice(0, remainingSlots);

    const newFiles = filesToAdd.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    onChange([...value, ...newFiles]);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      handleFiles(files);
    }
  };

  const handlePreview = (file) => {
    setPreviewFile(file);
    setPreviewOpen(true);
  };

  const getFileType = (url) => {
    const extension = url.split(".").pop().toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "svg"].includes(extension)) {
      return "image";
    }
    if (["pdf"].includes(extension)) {
      return "pdf";
    }
    return "other";
  };

  return (
    <div>
      {value.length < maxFiles && (
        <div
          className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
            isDragging ? "border-primary bg-primary/10" : "border-gray-300"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById("file-upload").click()}
        >
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept={accept}
            multiple={maxFiles > 1}
          />
          <p>{label}</p>
          <p className="text-sm text-gray-500">
            Drag and drop or click to select files
          </p>
        </div>
      )}

      {value.length > 0 && (
        <div className="mt-4 space-y-2">
          {value.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 border rounded-lg"
            >
              <div className="flex items-center space-x-2">
                <FileIcon className="h-4 w-4" />
                <span className="text-sm truncate max-w-[200px]">
                  {file.file?.name || file.url.split("/").pop()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {file.url && (
                  <>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePreview(file)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const link = document.createElement("a");
                        link.href = file.url;
                        link.download = file.url.split("/").pop();
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      }}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </>
                )}
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(file)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>
              {previewFile?.file?.name || previewFile?.url?.split("/").pop()}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {previewFile && (
              <div className="relative w-full max-h-[80vh] overflow-auto">
                {getFileType(previewFile.url) === "image" ? (
                  <img
                    src={previewFile.url}
                    alt="Preview"
                    className="w-full h-auto"
                  />
                ) : getFileType(previewFile.url) === "pdf" ? (
                  <iframe
                    src={previewFile.url}
                    className="w-full h-[80vh]"
                    title="PDF Preview"
                  />
                ) : (
                  <div className="text-center py-8">
                    <p>Preview not available for this file type</p>
                    <Button
                      onClick={() => window.open(previewFile.url, "_blank")}
                      className="mt-4"
                    >
                      Open in new tab
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
