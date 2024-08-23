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
        );
    }

    if (events && events.length === 0) {
        return (
            <section className="sub_container flex_center h-64 flex-col gap-3 text-sm font-medium text-secondary-foreground">
                <ArchiveX className="text-secondary-foreground" />
                There are no events happening
            </section>
        );
    }

    const sortedEvents = events?.slice().sort((a, b) => {
        const dateA = new Date(`${a.event_date}T${a.start_at}`);
        const dateB = new Date(`${b.event_date}T${b.start_at}`);
        return dateA.getTime() - dateB.getTime();
    });
    
    const limitedEvents = sortedEvents?.slice(0, 5);

    return (
        <div className="w-full rounded-lg">
            <ScrollArea className="lg:max-w-[calc(100vw-30rem)] max-w-[calc(100vw-2rem)]">
                <div className="w-full flex gap-x-1.5 gap-y-3 mx-3 my-4 rounded-sm">
                    {limitedEvents?.map((event, _id) => (
                        <EventCard

                            capacity={0}
                            created_at={""}
                            event_status={""}
                            event_type={""}
                            is_published={false}
                            organisation_id={""}
                            organiser={""}
                            tickets={[]}
                            updated_at={""}
                            agenda={null}
                            faq={null}
                            key={_id}
                            {...event}
                        />
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </div>
    );
}
