"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ImageIcon, UploadIcon, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onChange: (url: string | null) => void;
  value: string | null | undefined;
  disabled?: boolean;
}

export function FileUpload({ onChange, value, disabled }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null | undefined>(value);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create a preview
    const filePreview = URL.createObjectURL(file);
    setPreview(filePreview);

    // Start upload
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      onChange(data.url);
    } catch (error) {
      console.error("Error uploading file:", error);
      setPreview(null);
      onChange(null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="space-y-4">
      <Input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
        disabled={disabled || isUploading}
      />

      {!preview ? (
        <div
          onClick={disabled ? undefined : handleClick}
          className={cn(
            "border-2 border-dashed rounded-md p-8 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/50 transition",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          <ImageIcon className="h-10 w-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground font-medium">
            Kliknij, aby dodać zdjęcie
          </p>
          <p className="text-xs text-muted-foreground">
            JPG, PNG, GIF (max 5MB)
          </p>
        </div>
      ) : (
        <div className="relative rounded-md overflow-hidden aspect-video">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover"
          />
          {!disabled && (
            <Button
              onClick={handleRemove}
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 rounded-full"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}

      {isUploading && (
        <div className="w-full bg-muted rounded-full h-2.5">
          <div className="bg-primary h-2.5 rounded-full animate-pulse w-full"></div>
        </div>
      )}
    </div>
  );
}