import React from 'react';
import DOMPurify from 'dompurify';

interface PreviewProps {
  content: string;
}

const Preview: React.FC<PreviewProps> = ({ content }) => {
  // Sanitize the content before rendering
  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <div className="preview-container">
      <div
        className="preview-content"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }} // Render the sanitized HTML
      />
    </div>
  );
};

export default Preview;
