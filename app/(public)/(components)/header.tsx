"use client";
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn, parseNavigation } from "@/lib/utils";
import { useGetAuthProfile } from "@/lib/query-hooks";
import { NavigationProps } from "@/lib/types";
import { _dashboard, _events, _home, _login, _tickets } from "@/lib/routes";
import Logo from "@/components/common/logo";
import MobileNavigation from "@/components/common/mobile-navigation";
import Notifications from "@/components/common/notification-button";
import ProfileAvatar from "@/components/common/profile-avatar";
import { Button } from "@/components/ui/button";

const navLinks = [
    { name: "events", link: _events, active: false },
    { name: "find ticket", link: _tickets, active: false }
];

const actionLinks = [
    { name: "Login", link: _login, variant: "outline" },
    { name: "Dashboard", link: `${_dashboard}`, variant: "default" },
];

const Header = () => {
    const [content, setContent] = useState<NavigationProps[]>(navLinks);
    const pathname = usePathname();

    useEffect(() => {
        setContent(parseNavigation(pathname, navLinks, true));
    }, [pathname]);

    return (
        <header className="sticky bg-background main_container top-0 left-0 z-10 h-14 border-b flex_center justify-between pl-3 max-lg:pr-1.5 pr-3">
            <div className="flex gap-1 items-center">
                <Logo className="hidden" />
                <Link href={_home} className="text-lg font-semibold text-red-500">CONNECT</Link>
            </div>
            <nav className="hidden md:flex items-center bg-gray-100 rounded-full p-1">
                {content.map(({ name, link, active }, _i) => (
                    <Link
                        key={_i}
                        href={link}
                        className={cn(
                            "px-4 py-2 rounded-full font-medium text-sm capitalize transition-all duration-300 ease-in-out",
                            active ? "bg-red-500 text-white" : "hover:bg-gray-200"
                        )}
                    >
                        {name}
                    </Link>
                ))}
            </nav>
            <HeaderOptions />
        </header>
    );
};

const HeaderOptions = () => {
    const { data: user } = useGetAuthProfile();
    const [open, setOpen] = useState(false);

    return (
        <div className="flex gap-1.5 items-center">
            {user ? (
                <div className="flex gap-2">
                    <Notifications />
                    <ProfileAvatar />
                </div>
            ) : (
                <div className="hidden md:flex gap-2">
                    <ActionButtons />
                </div>
            )}
            <MobileNavigation navLinks={navLinks} open={open} setOpen={setOpen}>
                <div className={cn(user ? "hidden" : "absolute w-full bottom-4 left-0 flex flex-col gap-2 px-4")}>
                    <ActionButtons isMobile onClick={() => setOpen(false)} />
                </div>
            </MobileNavigation>
        </div>
    );
};

const ActionButtons = ({ isMobile = false, onClick = () => null }: { isMobile?: boolean, onClick?: () => void }) => {
    const router = useRouter();

    const handleClick = (link: string) => {
        router.push(link);
        onClick();
    };

    return (
        <>
            {actionLinks.map(({ name, variant, link }, _id) => (
                <Button
                    key={_id}
                    variant={variant as "outline" | "default"}
                    size='sm'
                    className={cn(!isMobile && "rounded-lg")}
                    onClick={() => handleClick(link)}
                >
                    {name}
                </Button>
            ))}
        </>
    );
};

export default Header;