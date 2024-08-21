import React from 'react';
import { FetchedAttendeeProps } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

type DownloadButtonProps = {
  attendee: FetchedAttendeeProps | null;
};

export default function DownloadButton({ attendee }: DownloadButtonProps) {
  const router = useRouter();

  const handleDownload = () => {
    if (attendee) {
      router.push(`/print-ticket/${attendee.id}`);
    }
  };

  return (
    <Button type="button" onClick={handleDownload} disabled={!attendee}>
      Download your ticket (PDF)
    </Button>
  );
}