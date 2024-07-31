import { _dashboardOrg } from "@/lib/routes";
import { QueryProps } from "@/lib/types";
import NewOrganisationHandler from "../(form-handlers)/new-organisation-handler";
import BodyHeader from "../(components)/body-header";
import OrganisationsContainer from "../(components)/organisations-container";
import { ChevronRightIcon } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function DashboardOrganisations({ searchParams }: QueryProps) {
  const isOrgFormOpen = searchParams.new as unknown as boolean;

  return (
    <>
      <header className="sticky flex items-center bg-background main_container top-0 left-0 z-10 h-14 border-b flex_center justify-between pl-3 max-lg:pr-1.5 lg:pr-6 lg:pl-[280px] pr-3">
        <div className="flex items-center">
          <ChevronRightIcon className="hidden lg:flex text-muted-foreground text-lg" />
          <h2 className="text-lg ml-8 lg:ml-2 md:ml-2 font-medium capitalize">Organisations</h2>
        </div>
        <NewOrganisationHandler isOpen={isOrgFormOpen} />
      </header>
      <div className="mx-6">
        <OrganisationsContainer />
      </div>
    </>
  );
}