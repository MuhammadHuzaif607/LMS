'use client';

import { UploadDropzone } from '@/lib/uploadthing';
import { ourFileRouter, OurFileRouter } from '@/app/api/uploadthing/core';
import toast from 'react-hot-toast';

interface FileUploadProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
}

const File_upload = ({ onChange, endpoint }: FileUploadProps) => {
  return <UploadDropzone endpoint={endpoint} onClientUploadComplete={(res) => {
    onChange(res?.[0].url)
  }} 
  onUploadError={(err:Error) => {
    toast.error(err?.message)
  }}
  />
};

export default File_upload;
