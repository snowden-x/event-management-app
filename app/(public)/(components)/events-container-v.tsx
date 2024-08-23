"use client";
import { useState } from 'react';
import SpinnerIcon from "@/components/icons/spinner-icon";
import EventCard from "./event-card-v";
import { ArchiveX } from "lucide-react";
import { useGetPublicEvents } from "@/lib/query-hooks";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ExploreEventsFilterForm, { ExploreEventsFilter } from "@/components/forms/explore-events-filter";
export default function EevntsContainerV() {
    const [filter, setFilter] = useState<ExploreEventsFilter>({
        search: '',
        categories: [],
    });

    const { data: events, isLoading, isError } = useGetPublicEvents();

    const normalizeString = (str: string) => str.replace(/[\s-]/g, '').toLowerCase();

    const filteredEvents = events?.filter(event => {
        const normalizedSearch = filter.search ? normalizeString(filter.search) : '';

        const matchesSearch = !filter.search || (
            (event.name && normalizeString(event.name).includes(normalizedSearch)) ||
            (event.headline && normalizeString(event.headline).includes(normalizedSearch)) ||
            (event.about && normalizeString(event.about).includes(normalizedSearch)) ||
            (event.tags && event.tags.some(tag => normalizeString(tag).includes(normalizedSearch))) ||
            (event.location && normalizeString(event.location.school).includes(normalizedSearch)) ||
            (event.location && normalizeString(event.location.name).includes(normalizedSearch))
            


        );

        const matchesCategory = filter.categories.length === 0 || (
            event.tags && event.tags.some(tag =>
                filter.categories.some(category =>
                    normalizeString(tag).includes(normalizeString(category))
                )
            )
        );

        return matchesSearch && matchesCategory;
    });
    const handleFilterApply = (newFilter: ExploreEventsFilter) => {
        setFilter(newFilter);
    };

    if (isLoading) {
        return (
            <section className="sub_container flex_center w-full h-80">
                <SpinnerIcon className="size-10 text-secondary-foreground" />
            </section>
        )
    }

    return (
        <div className="w-full space-y-4">
            <ExploreEventsFilterForm onFilterApply={handleFilterApply} />
            <ScrollArea className="h-[calc(100vh-20px)] ">
                {filteredEvents && filteredEvents.length > 0 ? (
                    <div className="grid mx-7 grid-cols-1 lg:grid-cols-3 gap-4 md:grid-cols-2 lg:my-20 lg:mx-1">
                        {filteredEvents.map((event) => (
                            <EventCard capacity={0} created_at={''} event_status={''} event_type={''} is_published={false} organisation_id={''} organiser={''} tickets={[]} updated_at={''} agenda={null} faq={null} key={event.id} {...event} />
                        ))}
                    </div>
                ) : (
                    <section className="flex_center h-64 rounded-lg border border-dashed border-spacing-4 flex-col gap-3 text-sm font-medium text-secondary-foreground">
                        <ArchiveX className="text-secondary-foreground" />
                        {events && events.length === 0 ? "There are no events happening" : "No events match the current filters"}
                    </section>
                )}
                <ScrollBar orientation="vertical" />
            </ScrollArea>
        </div>
    )
}