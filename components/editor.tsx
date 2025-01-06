'use client';
import React, { useState, useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

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

  // Instead of using internal state, rely on the value from props
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: 'Start typing...',
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
