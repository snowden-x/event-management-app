"use client";

import Logo from "@/components/common/logo";
import { _dashboard, _dashboardTickets, _events, _tickets, _about, _terms, _cookies } from "@/lib/routes";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetDescription, SheetClose, SheetFooter, SheetTitle } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Cookie } from "lucide-react";

const footerLinks = [
    {
        title: "explore",
        links: [
            { name: "find events", link: _events },
            { name: "start an event", link: _dashboard },
            { name: "all your tickets", link: _dashboardTickets },
            { name: "find my ticket", link: _tickets },
        ]
    },
    {
        title: "company",
        links: [
            { name: "about", link: _about },
            { name: "team", link: `${_about}#team-section` },
            { name: "pricing", link: "/pricing" },
            { name: "faq", link: `${_about}#faq-section` },
        ]
    },
    {
        title: "legal",
        links: [
            { name: "privacy policy", link: _terms },
            { name: "terms", link: _terms },
            { name: "cookies", link: _cookies },
        ]
    },
]

const Footer = () => {
    const [open, setOpen] = useState(false)

    return (
        <footer className="main_container py-20 px-4 border-t border-border">
            <section className="sub_container mx-auto flex items-start md:flex-row flex-col-reverse gap-8">
                <div className="w-full max-w-sm">
                    <div className="flex items-center gap-1 mb-2.5">
                        <Logo className="hidden" />
                        <p className="text-xl text-primary font-bold">CONNECT</p>
                    </div>
                    <p className="text-muted-foreground font-light text-sm font-roboto-mono"><span className="text-sm">&copy; 2024</span> ConnectTeam</p>
                    <p className="text-muted-foreground font-light text-sm font-roboto-mono">All Rights Reserved by ConnectTeam</p>
                </div>
                <div className="max-lg:w-full flex-1 grid grid-cols-3 md:grid-cols-3 gap-7 md:gap-4">
                    {footerLinks.map(({ title, links }, _id) => (
                        <div key={_id}>
                            <h5 className="text-sm font-medium text-accent-foreground capitalize tracking-wide mb-1.5">{title}</h5>
                            <ul className="flex flex-col gap-1">
                                {links.map(({ name, link }, _i) => (
                                    <li key={_i}>
                                        {name === "cookies" ? (
                                            <Button
                                                variant="link"
                                                onClick={() => setOpen(true)}
                                                className="p-0 text-muted-foreground capitalize text-xs font-normal hover:underline underline-offset-2"
                                            >
                                                {name}
                                            </Button>
                                        ) : (
                                            <Link
                                                href={link}
                                                className="capitalize text-xs text-muted-foreground font-normal hover:underline underline-offset-2"
                                            >
                                                {name}
                                            </Link>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>
            <CookiesSheet open={open} setOpen={setOpen} />
        </footer>
    )
}

const CookiesSheet = ({ open, setOpen }: any) => (
    <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="bottom" className="h-[250px] bg-background">
            <SheetHeader>
                <div className="flex justify-between items-center">
                    <Cookie className="size-8 text-primary" />
                    <SheetClose asChild>
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="text-lg text-foreground"
                        >
                            &#x2715;
                        </button>
                    </SheetClose>
                </div>
                <SheetDescription className="text-center mt-11 text-foreground">
                    We Use Third Party Cookies in order to personalize your site experience.
                </SheetDescription>
            </SheetHeader>
            <SheetFooter>
            </SheetFooter>
        </SheetContent>
    </Sheet>
);

export default Footer;
