'use client';
import React, { useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import JoditEditor with SSR disabled
const JoditEditor = dynamic(() => import('jodit-react'), {
  ssr: false,
});

interface EditorFormProps {
  description: string | null;
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

export default function EditorForm({
  description,
  value,
  onChange,
  placeholder,
}: EditorFormProps) {
  const editor = useRef(null);

  // Memoize the editor config to avoid re-creating on each render
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || 'Start typing...',
    }),
    [placeholder]
  );

  return (
    <JoditEditor
      ref={editor}
      value={value} // Pass value from props (React Hook Form field)
      config={config}
      onBlur={(newContent) => onChange(newContent)} // Call onChange from props
      onChange={(newContent) => onChange(newContent)} // Call onChange from props
    />
  );
}
