import { Button } from "@/components/ui/button";
import { QueryProps } from "@/lib/types";
import { ArchiveX } from "lucide-react";

export default async function EventModerators({ params }: QueryProps) {
  const eventID = params.event_id;

  return (
    <>
      <section className="section_body">
        <h2 className="font-semibold text-2xl">Event Moderators</h2>
      </section>
      <section className="section_body">
        filter
      </section>
      <section className="section_body">
        <div className="w-full h-64 rounded-lg border border-dashed border-spacing-4 flex_center flex-col gap-3 text-sm font-medium text-secondary-foreground">
          <ArchiveX />
          No Moderators Yet
          <Button size='xs'>Add a moderator</Button>
        </div>
      </section>
    </>
  );
}