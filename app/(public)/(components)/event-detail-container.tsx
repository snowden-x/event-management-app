"use client";

import SpinnerIcon from "@/components/icons/spinner-icon";
import { Button } from "@/components/ui/button";
import { useGetPublicEvent } from "@/lib/query-hooks";
import { _attendEvent } from "@/lib/routes";
import { convertTo12HourFormat, dateAvatar } from "@/lib/utils";
import { Image } from "lucide-react";
import NextImage from "next/image";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function EventDetailContainer({ eventID }: { eventID: string }) {
    const { data: event, isLoading } = useGetPublicEvent(eventID);
    const date = dateAvatar(event?.event_date || "");

    if (isLoading) {
        return (
            <section className="sub_container flex_center w-full h-80">
                <SpinnerIcon className="size-10 text-secondary-foreground" />
            </section>
        )
    }

    return (
        <main className="main_container flex-1">
            <section className="main_container">
                <div className="sub_container flex flex-col md:flex-row justify-between gap-4 py-10">
                    <div className="flex-1 flex gap-7 p">
                        <div className="size-20 md:size-24 rounded-lg border bg-background flex_center flex-col">
                            <p className="text-xl md:text-2xl font-bold">{date.day}</p>
                            <p className="text-lg md:text-xl font-bold text-muted-foreground">{date.month}</p>
                        </div>
                        <div className="flex-1 space-y-1">
                            <h2 className="text-lg sm:text-2xl font-semibold">{event?.name}</h2>
                            <p className="text-base sm:text-lg font-normal text-secondary-foreground">{event?.headline}</p>
                            <p className="text-base font-normal text-muted-foreground">{convertTo12HourFormat(event?.start_at ?? "")} to {convertTo12HourFormat(event?.end_at ?? "")}</p>
                        </div>
                    </div>
                    <div className="h-full flex_center justify-start md:justify-center">
                        <Link href={_attendEvent(eventID)} className="px-5 h-12 flex_center rounded-2xl text-sm text-primary-foreground font-medium bg-primary hover:bg-primary/80">
                            Attend Event
                        </Link>
                    </div>
                </div>
            </section>
            <Tabs defaultValue="overview" className="main_container">
                <TabsList className="w-full h-auto py-4 bg-background border-b">
                    <div className="sub_container flex items-start justify-start">
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                    </div>
                </TabsList>
                <TabsContent value="overview">
                    <div className="sub_container space-y-7 py-7">
                        <div className="overflow-hidden relative z-0 w-full max-w-screen-md aspect-video bg-muted rounded-lg">
                            {event && event.banner ?
                                (<NextImage src={event.banner} alt={event.name} fill className='object-cover' />) :
                                (<Image className='size-7 text-muted-foreground' />)
                            }
                        </div>
                        <div className="flex flex-col border rounded-lg p-7 bg-gray-100 dark:bg-zinc-900 space-y-2">
                            <div className="flex items-center">
                                <span className="font-roboto-mono font-bold text-base">Location:</span>
                            </div>
                            <div className="space-y-1">
                                {event?.location?.school && (
                                    <p className="text-base font-roboto-mono font-normal tracking-tight text-secondary-foreground/80 capitalize">{event.location.school}</p>
                                )}
                                {event?.location?.name && (
                                    <p className="text-base font-roboto-mono font-normal tracking-tight text-secondary-foreground/80 capitalize">{event.location.name}</p>
                                )}
                                {event?.location?.description && (
                                    <p className="text-base font-roboto-mono font-normal tracking-tight text-secondary-foreground/80 capitalize">{event.location.description}</p>
                                )}
                            </div>
                        </div>

                        <div className="w-full border p-7 rounded-lg bg-gray-100 dark:bg-zinc-900">
                            <div className="flex items-center">
                                <span className="font-roboto-mono font-bold text-base mb-4">Event Description:</span>
                            </div>
                            <p className="text-muted-foreground text-base whitespace-pre-wrap font-roboto-mono">{event?.about}</p>

                        </div>
                    </div>
                </TabsContent>
                {/* <TabsContent value="agenda">
                    <div className="sub_container space-y-7 py-7">
                        <div className="w-full h-80 border rounded-lg border-dashed flex_center">
                            No Agenda
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="faqs">
                    <div className="sub_container space-y-7 py-7">
                        <div className="w-full h-80 border rounded-lg border-dashed flex_center">
                            No Faqs
                        </div>
                    </div>
                </TabsContent> */}
            </Tabs>
        </main>
    )
};