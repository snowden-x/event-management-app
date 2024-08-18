"use client";

import { Button } from '@/components/ui/button';
import { _ticket } from '@/lib/routes';
import { FetchedMyTickets } from '@/lib/types';
import { Ticket } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react'

const TicketCard = (props: FetchedMyTickets) => {
  const { ticket_code, full_name, email, id, status, payment_status } = props;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={_ticket(id)}>
      <div
        className={`relative w-full shadow-md bg-background border h-72 rounded-lg p-5 flex flex-col justify-start items-center overflow-hidden transition-transform duration-300 ${isHovered ? ' scale-105' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`w-24 h-24 rounded-full bg-secondary mb-5 flex_center transition-transform duration-300 ${isHovered ? 'scale-105' : ''}`}>
          <Ticket className="rotate-90 size-10 text-secondary-foreground" />
        </div>
        <div className="w-full border-t border-dashed shadow-inner border-gray-500 mb-5"></div>
        <h4 className="text-sm font-semibold mb-2">#{ticket_code}</h4>
        <h6 className="text-sm text-secondary-foreground capitalize font-roboto-mono">{full_name}</h6>
        <p className="text-muted-foreground text-sm text-center w-full overflow-hidden whitespace-nowrap overflow-ellipsis mb-5 font-roboto-mono">{email}</p>
        <p className="px-2.5 py-1 rounded-sm text-xs bg-green-100 text-emerald-700 capitalize font-roboto-mono">{payment_status}</p>

        <div
          className={`absolute bottom-0 left-0 right-0 bg-black/60 dark:bg-white/60 backdrop-blur-sm p-3 transition-transform duration-300 ease-in-out ${isHovered ? 'translate-y-0' : 'translate-y-full'
            }`}
        >
          <Button className="w-full px-4 py-2 bg-white/10 backdrop-blur-md text-white dark:text-black dark:bg-white rounded-full  border-opacity-40  transition-all duration-200">
            View Details
          </Button>
        </div>
      </div>
    </Link>
  );
}

export default TicketCard;