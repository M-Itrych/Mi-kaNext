"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import TextAlign from '@tiptap/extension-text-align';
import RichTextToolbar from './rich-text-toolbar';

interface RichTextEditorProps {
  content?: string;
  onChange?: (html: string) => void;
  className?: string;
}

export default function RichTextEditor({
  content = '<p></p>',
  onChange,
  className = '',
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          rel: 'noopener noreferrer',
        },
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph', 'blockquote'],
        alignments: ['left', 'center', 'right'],
        defaultAlignment: 'left',
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  return (
    <div className={`border rounded-md ${className}`}>
      <div className="border-b p-2 bg-muted/50">
        <RichTextToolbar editor={editor} />
      </div>
      <EditorContent editor={editor} className="p-4 min-h-[200px]" />
    </div>
  );
}