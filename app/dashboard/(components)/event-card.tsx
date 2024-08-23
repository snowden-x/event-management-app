"use client";
import { _dashboardEventAttendees, _dashboardEventTickets } from '@/lib/routes';
import { cn, convertTo12HourFormat, formatDate } from '@/lib/utils';
import NextImage from 'next/image';
import { Calendar, Clock3, ArrowRight, Image, Tag, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { FetchedEventProps } from '@/lib/types';

const EventCard = ({ id, name, headline, banner, event_date, start_at, about }: FetchedEventProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="group w-full border rounded-xl shadow-lg overflow-hidden bg-background transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col">
      <div className="relative w-full aspect-video overflow-hidden">
        <Link href={_dashboardEventAttendees(id)} className="block w-full h-full">
          {banner ? (
            <NextImage
              src={banner}
              alt={name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center">
              <Image className="size-16 text-white animate-pulse" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-overlay-dark to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:block hidden" />
        </Link>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-overlay-dark bg-black/60 md:transform md:translate-y-full md:group-hover:translate-y-0 transition-all duration-300">
          <p className="text-sm font-medium mb-1 flex items-center">
            <Tag className="size-4 mr-2 text-white" />
            <span className="capitalize font-roboto-mono">{headline}</span>
          </p>
        </div>
      </div>
      <div className="px-6 py-4 bg-background flex-grow flex flex-col">
        <h4 className="text-xl font-bold text-foreground mb-3 w-full">
          <Link
            href={_dashboardEventAttendees(id)}
            className="capitalize hover:text-muted-foreground transition-colors duration-300 block w-full overflow-hidden whitespace-nowrap text-ellipsis leading-normal tracking-tight text-left"
          >
            {name}
          </Link>
        </h4>
        {about && (
          <>
            <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-40' : 'max-h-12'}`}>
              <p className="text-sm text-muted-foreground leading-relaxed tracking-wide font-roboto-mono">{about}</p>
            </div>
            <button
              onClick={toggleExpand}
              className="text-emerald-500 text-sm font-normal mt-2 flex items-center focus:outline-none "
            >
              {isExpanded ? (
                <>
                  Read less <ChevronUp className="ml-1 size-4" />
                </>
              ) : (
                <>
                  Read more <ChevronDown className="ml-1 size-4" />
                </>
              )}
            </button>
          </>
        )}
        <div className="mt-auto">
          <div className="flex items-center justify-between text-muted-foreground mt-4">
            <div className="flex items-center gap-2">
              <Calendar className="size-4 text-primary" />
              <p className="text-sm font-medium">{formatDate(event_date)}</p>
            </div>
            <div className="flex items-center gap-2">
              <Clock3 className="size-4 text-primary" />
              <p className="text-sm font-medium">{convertTo12HourFormat(start_at)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 py-3 bg-background-secondary flex justify-between items-center border-t">
        <p className="text-sm font-medium text-muted-foreground font-roboto-mono">View Details</p>
        <Link href={_dashboardEventAttendees(id)}>
          <div className="flex items-center justify-center w-10 h-10 bg-emerald-500 rounded-full cursor-pointer transition-all duration-300 hover:bg-primary-dark active:bg-primary-darker hover:shadow-lg group">
            <ArrowRight className="size-5 text-white transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default EventCard;
