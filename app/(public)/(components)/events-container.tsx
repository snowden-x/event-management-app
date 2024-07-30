"use client";

import SpinnerIcon from "@/components/icons/spinner-icon";
import EventCard from "./event-card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ArchiveX } from "lucide-react";
import { useGetPublicEvents } from "@/lib/query-hooks";

export default function EventsContainer() {
    const { data: events, isLoading, isError } = useGetPublicEvents();

    if (isLoading) {
        return (
            <section className="sub_container flex_center w-full h-80">
                <SpinnerIcon className="size-10 text-secondary-foreground" />
            </section>
        )
    }

    if (events && events.length === 0) {
        return (
            <section className="sub_container flex_center h-64 flex-col gap-3 text-sm font-medium text-secondary-foreground">
                <ArchiveX className="text-secondary-foreground" />
                There are no events happening
            </section>
        )
    }

    // Sort events by event_date in ascending order
    const sortedEvents = events?.slice().sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime());

    return (
        <div className="w-full mr-3">
            <ScrollArea className="lg:max-w-[calc(100vw-40rem)] max-w-[calc(100vw-2rem)]">
                <div className="w-full flex gap-x-1.5 gap-y-3">
                    {sortedEvents?.map((event, _id) => (
                        <EventCard capacity={0} created_at={""} event_status={""} event_type={""} is_published={false} organisation_id={""} organiser={""} tickets={[]} updated_at={""} agenda={null} faq={null} key={_id} {...event} />
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    )
}