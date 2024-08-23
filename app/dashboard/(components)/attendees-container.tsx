"use client";

import { DataTable } from "@/components/common/data-table";
import BodyContent from "./body-content";
import { columns } from "../events/[event_id]/attendees/columns";
import { useGetEventAttendees } from "@/lib/query-hooks";
import SpinnerIcon from "@/components/icons/spinner-icon";

export default function AttendeesContainer({eventID}:{eventID: string}) {
    const { data: attendees, isLoading } = useGetEventAttendees(eventID);

    if(isLoading) {
        return (
            <BodyContent className="flex_center">
                <SpinnerIcon className="size-10 text-secondary-foreground" />
            </BodyContent>
        )
    }

    return (
        <BodyContent>
            <p className="mb-5 border-b border-dashed"><span className="font-medium text-lg">Event ID: </span>{eventID}</p>
            <DataTable columns={columns} data={attendees ?? []} />
        </BodyContent>
    )
}