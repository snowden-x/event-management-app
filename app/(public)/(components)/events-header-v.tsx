"use client";

import { PartyPopper, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function EventsHeaderV() {

    return (
        <div className="w-full h-14 flex_center flex justify-start">
            <Badge variant="default" className="bg-white shadow shadow-emerald-600 hover:bg-transparent">
                <h1 className="text-base font-normal uppercase text-black">Browse by Categories</h1>
                <ShoppingBag className="ml-2 w-5 h-5 text-black"></ShoppingBag>
            </Badge>
        </div>
    )
}