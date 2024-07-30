"use client";
import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    ChevronDown, Monitor, Moon, Sun, Menu, X,
    Home, Building, Calendar, Ticket, User, Settings, LogOut,
    ChevronLeftIcon
} from "lucide-react";
import {
    Accordion, AccordionContent, AccordionItem, AccordionTrigger
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetProfile } from "@/lib/query-hooks";
import { NavigationProps } from "@/lib/types";
import { cn, parseNavigation } from "@/lib/utils";
import Logo from "@/components/common/logo";
import SignOutButton from "@/components/auth/signout-button";
import SpinnerIcon from "@/components/icons/spinner-icon";
import Notifications from "@/components/common/notification-button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetOverlay,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import {
    _home, _dashboard, _dashboardEvents, _dashboardOrgs, _dashboardTickets,
    _dashboardProfile, _dashboardProfileEdit, _login, _dashboardNotifications
} from "@/lib/routes";

const navLinks = [
    { name: "Home", icon: Home, link: _home },
    {
        name: "Dashboard",
        icon: Building,
        items: [
            { name: "Organizations", link: _dashboardOrgs },
            { name: "Events", link: _dashboardEvents },
            { name: "Tickets", link: _dashboardTickets },
        ]
    },
    {
        name: "Profile",
        icon: User,
        items: [
            { name: "View Profile", link: _dashboardProfileEdit },
            { name: "Notifications", link: _dashboardNotifications },
        ]
    },
];

const userThemes = [
    { name: 'light', icon: Sun },
    { name: 'dark', icon: Moon },
    { name: 'system', icon: Monitor },
];

export default function Sidepanel() {
    const [isOpen, setIsOpen] = useState(false);
    const [openAccordions, setOpenAccordions] = useState<string[]>(navLinks.filter(item => item.items).map(item => item.name));

    const { data: profile, isLoading } = useGetProfile();
    const { theme, setTheme } = useTheme();
    const pathname = usePathname();
    const router = useRouter();
    const sidebarRef = useRef<HTMLDivElement>(null);

    const toggleSidepanel = () => setIsOpen(!isOpen);
    const closeSidepanel = () => setIsOpen(false);

    useEffect(() => {
        closeSidepanel();
    }, [pathname]);

    const firstName = profile?.username?.split(' ')[0] || 'User';

    const SidepanelContent = () => (
        <>
            <div className="flex items-center mb-5">
                <Logo className='hidden' />
                <span className="ml-2 text-xl text-center text-red-500 font-semibold">CONNECT</span>
            </div>

            <div className="mb-6">
                <h2 className="text-lg font-normal ml-3"> <span className='font-medium'>Hey,</span> <span className='font-roboto-mono text-muted-foreground'>{firstName}! </span></h2>
            </div>

            <ScrollArea className="h-[calc(100vh-180px)]">
                <nav className="space-y-2">
                    {navLinks.map((item, index) => (
                        item.items ? (
                            <Accordion 
                                type="multiple" 
                                value={openAccordions} 
                                onValueChange={setOpenAccordions}
                                key={index}
                            >
                                <AccordionItem value={item.name}>
                                    <AccordionTrigger className="py-2 px-3 rounded-lg hover:bg-secondary">
                                        <div className="flex items-center">
                                            <item.icon className="mr-2 h-4 w-4" />
                                            <span>{item.name}</span>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <div className="pl-6 space-y-1">
                                            {item.items.map((subItem, subIndex) => (
                                                <NavItem
                                                    icon={undefined} key={subIndex}
                                                    {...subItem}
                                                    active={pathname === subItem.link} />
                                            ))}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion>
                        ) : (
                            <NavItem
                                key={index}
                                {...item}
                                active={pathname === item.link}
                            />
                        )
                    ))}
                </nav>
            </ScrollArea>

            <div className="absolute bottom-0 left-0 right-0 p-4 border-r bg-background">
                <ProfileSection profile={profile} isLoading={isLoading} setOpenAccordions={setOpenAccordions} />
                <div className="mt-2 flex justify-between items-center">
                    <ThemeToggle />
                    <Notifications />
                </div>
            </div>
        </>
    );

    return (
        <>
            {/* Mobile Sheet */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="fixed top-2 left-0 z-50 hover:bg-transparent lg:hidden"
                    >
                        <ChevronLeftIcon />
                    </Button>
                </SheetTrigger>
                <SheetOverlay></SheetOverlay>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                    <SidepanelContent />
                </SheetContent>
            </Sheet>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:block fixed top-0 left-0 z-40 w-64 h-screen">
                <div className="h-full px-3 py-4 overflow-y-auto bg-background border-r">
                    <SidepanelContent />
                </div>
            </aside>
        </>
    );
}

const NavItem = ({ name, icon: Icon, link, active }: { name: string, icon?: React.ElementType, link: string, active: boolean }) => (
    <Link
        href={link}
        className={cn(
            "flex items-center py-2 px-3 rounded-lg transition-colors",
            active ? "bg-primary text-primary-foreground" : "hover:bg-secondary"
        )}
    >
        {Icon && <Icon className="mr-2 h-4 w-4" />}
        <span>{name}</span>
    </Link>
);

const ProfileSection = ({ profile, isLoading, setOpenAccordions }: { profile: any, isLoading: boolean, setOpenAccordions: React.Dispatch<React.SetStateAction<string[]>> }) => {
    if (isLoading) {
        return <SpinnerIcon className="h-8 w-8 text-secondary-foreground" />;
    }

    return (
        <div className='flex flex-col'>
            <div className="flex items-center space-x-3">
                <Image
                    src={profile?.avatar_url || "/default-avatar.png"}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                />
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate dark:text-white">
                        {profile?.full_name || "User"}
                    </p>
                    <p className="text-xs text-muted-foreground truncate dark:text-gray-400">
                        {profile?.email || "user@example.com"}
                    </p>
                </div>
            </div>
            <div className='flex items-center justify-center p-0'>
                <SignOutButton extraAction={() => setOpenAccordions([])} />
            </div>
        </div>
    );
};

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex space-x-1">
            {userThemes.map((item) => (
                <Button
                    key={item.name}
                    variant="ghost"
                    size="icon"
                    className={cn("h-8 w-8", theme === item.name && "bg-secondary")}
                    onClick={() => setTheme(item.name)}
                >
                    <item.icon className="h-4 w-4" />
                </Button>
            ))}
        </div>
    );
};