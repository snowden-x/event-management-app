"use client";

import { cn, convertTo12HourFormat, formatDate } from '@/lib/utils';
import NextImage from 'next/image';
import { Calendar, Clock3, ArrowRight, Image, Tag, MapPin, TicketPlus } from 'lucide-react';
import Link from 'next/link';
import { _attendEvent, _event } from "@/lib/routes";

import React from 'react';
import { FetchedPublicEventProps } from '@/lib/types';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Utility function to generate random colors
const getRandomColor = () => {
    const colors = [
        'border-orange-300',
        'border-red-500',
        'border-blue-500',
        'border-green-500',
        'border-gray-500',
        'border-yellow-500',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};

const EventCard = ({ id, name, headline, banner, event_date, start_at, location, tags }: FetchedPublicEventProps) => {

    const formattedDay = new Date(event_date).toLocaleDateString('en-US', { day: 'numeric' });
    const formattedMonth = new Date(event_date).toLocaleDateString('en-US', { month: 'short' });

    return (
        <div className="group border w-[320px] rounded-xl shadow-lg overflow-hidden flex-shrink-4 bg-background transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex flex-col">
            <div className="relative w-full aspect-video overflow-hidden">
                <Link href={_event(id)} className="block w-full h-full">
                    {banner ? (
                        <NextImage
                            src={banner}
                            alt={name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                            <Image className="size-16 text-white animate-pulse" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
                <div className="font-roboto-mono absolute top-2 left-2 bg-white/30 text-white backdrop-blur-md px-2 py-1 rounded-md text-sm font-normal">
                    {formattedDay} {formattedMonth}
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white bg-black/60 transform translate-y-full group-hover:translate-y-0 transition-all duration-300">
                    <p className="text-sm font-medium mb-1 flex items-center">
                        <Tag className="size-4 mr-2" />
                        <span className="capitalize font-roboto-mono">{headline}</span>
                    </p>
                </div>
            </div>
            <div className="px-6 py-4 bg-background flex-grow">
                <h4 className="text-xl font-bold text-foreground mb-3 w-full">
                    <Link
                        href={_event(id)}
                        className="capitalize hover:text-primary transition-colors duration-300 block w-full overflow-hidden whitespace-nowrap text-ellipsis leading-normal tracking-tight text-left"
                    >
                        {name}
                    </Link>
                </h4>
                <div className="flex flex-col items-start justify-between text-gray-700 dark:text-gray-50/90 mt-4">
                    <div className="flex items-center gap-2">
                        <MapPin className="size-4 text-emerald-500" />
                        <p className="text-sm font-medium capitalize">{location?.name}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-4">
                        <Clock3 className="size-4 text-emerald-500" />
                        <p className="text-sm font-medium">{convertTo12HourFormat(start_at)}</p>
                    </div>
                </div>
                <div className="mt-5 text-ellipsis">
                    {tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className={`mr-2 text-xs font-roboto-mono ${getRandomColor()}`}>
                            {tag}
                        </Badge>
                    ))}
                </div>
            </div>
            <div className="px-6 py-3 bg-muted flex justify-between items-center border-t border-border">
                <p className="text-sm font-medium text-muted-foreground font-roboto-mono">Book Ticket</p>
                <Link href={_attendEvent(id)}>
                    <Button variant="secondary" size="sm" className="rounded-lg bg-emerald-500 hover:bg-emerald-400 font-normal text-primary-foreground">
                        <TicketPlus className="size-5 mr-2" />
                        Book Now
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default EventCard;
