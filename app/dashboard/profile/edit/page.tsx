import BodyHeader from "@/app/dashboard/(components)/body-header";
import BodyContent from "@/app/dashboard/(components)/body-content";
import HandleProfileForm from "@/components/forms/handle-profile";
import { ChevronRightIcon } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function ProfileEdit() {

  return (
    <>
      <>
        <header className="sticky flex items-center bg-background main_container top-0 left-0 z-10 h-14 border-b flex_center justify-between pl-3 max-lg:pr-1.5 lg:pr-6 lg:pl-[280px] pr-3">
          <div className="flex items-center">
            <ChevronRightIcon className="hidden lg:flex text-muted-foreground text-lg" />
            <h2 className="text-lg ml-8 lg:ml-2 md:ml-2 font-medium capitalize">Tickets</h2>
          </div>
        </header>
        <BodyContent className="space-y-4">
          <HandleProfileForm />
        </BodyContent>

      </>
    </>
  );
}