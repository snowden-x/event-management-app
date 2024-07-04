import { Button } from "@/components/ui/button";
import { events, EventType } from "@/lib/constants";
import { QueryProps } from "@/lib/types";
import { findItem } from "@/lib/utils";
import { ArchiveX } from "lucide-react";
import { toast } from "sonner";

export default async function OrganisationEdit({ params }: QueryProps) {
  const eventID = params.event_id;
  const data = findItem(eventID, events) as EventType;

  return (
    <>
      <section className="section_body">
        <h2 className="font-semibold text-2xl">Edit Event</h2>
      </section>
      <DemoContainer header="General" />
      <DemoContainer header="About" />
      <DemoContainer header="Banner" />
      <DemoContainer header="Time & Location" />
      <DemoContainer header="FAQ" />
      <DemoContainer header="Agenda" />
      <DemoContainer header="Others" />
      <DemoContainer header="Danger" hasSave={false} />
    </>
  );
}

const DemoContainer = ({header, hasSave = true}: {header: string, hasSave?: boolean}) => (
    <section className="section_body">
        <div className="w-full h-64 rounded-lg border flex flex-col justify-between">
            <div className="w-full flex_center justify-start h-12 p-3 border-b">
                <h4 className="font-semibold text-lg">{header}</h4>
            </div>
            {hasSave && 
                (<div className="w-full flex_center justify-end h-12 p-3 border-t">
                    <Button size='xs'>Save</Button>
                </div>)
            }
        </div>
    </section>
)