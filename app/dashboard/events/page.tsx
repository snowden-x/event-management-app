import { _dashboardEvent } from "@/lib/routes";
import { QueryProps } from "@/lib/types";
import NewEventHandler from "../(form-handlers)/new-event-handler";
import BodyHeader from "../(components)/body-header";
import EventsContainer from "../(components)/events-container";
import { ChevronRightIcon } from "lucide-react";

export default async function DashboardEvents({ searchParams }: QueryProps) {
  const isEventFormOpen = searchParams.new as unknown as boolean;

  return (
    <>
      <header className="sticky flex items-center bg-background main_container top-0 left-0 z-10 h-14 border-b flex_center justify-between pl-3 max-lg:pr-1.5 lg:pr-6 lg:pl-[280px] pr-3">
        <div className="flex items-center">
          <ChevronRightIcon className="hidden lg:flex text-muted-foreground text-lg" />
          <h2 className="text-lg ml-8 lg:ml-2 md:ml-2 font-medium capitalize">Events</h2>
        </div>
        <NewEventHandler isOpen={isEventFormOpen} />
      </header>
      <div className="mx-6">
        <EventsContainer />
      </div>

    </>
  );
}