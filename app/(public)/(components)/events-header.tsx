"use client";

import { Badge } from "@/components/ui/badge";
import { PartyPopper } from "lucide-react";

export default function EventsHeader() {

    return (
        <div className="w-full h-14 flex_center justify-start">
            <Badge className="bg-white shadow shadow-emerald-600 hover:bg-transparent">
                <PartyPopper className="mr-2 w-5 h-5 text-black"></PartyPopper>
                <h1 className="text-base font-normal uppercase text-black">Upcoming Events</h1>
                
            </Badge>
        </div>
    )
}