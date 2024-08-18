"use client";
import { _dashboard, _events, _home, _login, _tickets } from "@/lib/routes";
import Logo from "@/components/common/logo";
import MobileNavigation from "@/components/common/mobile-navigation";
import Notifications from "@/components/common/notification-button";
import ProfileAvatar from "@/components/common/profile-avatar";
import { Button } from "@/components/ui/button";
import { useGetAuthProfile } from "@/lib/query-hooks";
import { createClient } from "@/lib/supabase/client";
import { NavigationProps } from "@/lib/types";
import { cn, parseNavigation } from "@/lib/utils";
import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
        <div className="lg:mx-11 lg:my-7 lg:rounded-xl shadow-sm top-0 sticky z-50">
            <header className="sticky bg-gray-50/50 backdrop-blur-xl main_container top-0 left-0 z-10 h-14 border rounded-xl border-border/50 flex_center justify-between pl-3 max-lg:pr-1.5 pr-3 shadow-lg">
                <div className="flex gap-1 items-center">
                    <Logo className="hidden" />
                    <Link href={_home} className="text-lg font-semibold text-black">CONNECT</Link>
                </div>
                <nav className="hidden md:flex items-center bg-gray-200 rounded-full p-1">
                    {content.map(({ name, link, active }, _i) => (
                        <Link
                            key={_i}
                            href={link}
                            className={cn(
                                "px-4 py-2 rounded-full font-medium text-sm capitalize transition-all duration-300 ease-in-out",
                                active ? "bg-gray-800 text-white dark:bg-gray-50 dark:text-black" : "hover:bg-gray-800 dark:hover:bg-gray-50 dark:text-black hover:mx-2 hover:text-white"
                            )}
                        >
                            {name}
                        </Link>
                    ))}
                </nav>
                <HeaderOptions />
            </header>
        </div>

    );
};

const HeaderOptions = () => {
    const supabase = createClient();
    const [user, setUser] = useState<User | null>(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const getUser = async () => {
            const { data: { user: authUser }, error } = await supabase.auth.getUser();

            if (error) setUser(null);
            else setUser(authUser);
        };

        getUser();
    }, []);

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
                    className={cn(
                        !isMobile && "rounded-lg",
                        variant === "default" ? "bg-black dark:bg-white dark:text-black text-white dark:hover:bg-black dark:hover:text-white " : "dark:bg-black bg-white dark:border-black dark:text-white text-black border"
                    )}
                    onClick={() => handleClick(link)}
                >
                    {name}
                </Button>
            ))}
        </>
    );
};

export default Header;
