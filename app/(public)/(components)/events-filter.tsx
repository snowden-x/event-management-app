"use client"
import { useState } from 'react';
import ExploreEventsFilterForm, { ExploreEventsFilter } from "@/components/forms/explore-events-filter"

export default function EventsFilter({ onFilterChange }: { onFilterChange: (filter: ExploreEventsFilter) => void }) {
    const handleFilterApply = (filter: ExploreEventsFilter) => {
        onFilterChange(filter);
    };

    return (
        <div className="hidden isolate w-72 p-4 border  flex-col bg-background">
            <div className="mb-4">
                <h4 className="text-sm font-normal text-secondary-foreground uppercase">Filters & Sort</h4>
            </div>
            <ExploreEventsFilterForm className="flex-1" onFilterApply={handleFilterApply} />
        </div>
    )
}