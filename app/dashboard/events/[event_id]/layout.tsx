import { _dashboardEventAttendees, _dashboardEventEdit, _dashboardEventTickets } from "@/lib/routes";
import { NavigationProps } from "@/lib/types";
import BodyNavigation from "../../(components)/body-navigation";
import { ChevronRightIcon } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode,
  params: { [key: string]: string }
}

export default function Layout({ children, params }: LayoutProps) {
  const eventID = params.event_id;

  const navigationList: NavigationProps[] = [
    { name: "tickets", link: _dashboardEventTickets(eventID), active: false },
    { name: "attendees", link: _dashboardEventAttendees(eventID), active: false },
    { name: "edit", link: _dashboardEventEdit(eventID), active: true },
  ]

  return (
    <>
      <header className="sticky flex items-center bg-background main_container top-0 left-0 z-10 h-14 border-b flex_center justify-between pl-3 max-lg:pr-1.5 lg:pr-6 lg:pl-[280px] pr-3">
        <div className="flex items-center">
          <ChevronRightIcon className="hidden lg:flex text-muted-foreground text-lg" />
          <h2 className="text-lg ml-8 lg:ml-2 md:ml-2 font-medium capitalize">Events</h2>
        </div>

      </header>
      <BodyNavigation navigationList={navigationList} />
      <div className="lg:ml-11 ml-2">
        {children}
      </div>

    </>
  );
}