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
      const printTicketUrl = `/print-ticket/${attendee.id}`;
      window.open(printTicketUrl, '_blank');
      router.push(`/events/`);
    }
  };

  return (
    <Button type="button" onClick={handleDownload} disabled={!attendee}>
      Download your ticket (PDF)
    </Button>
  );
}