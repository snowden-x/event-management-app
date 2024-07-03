"use client";

import Logo from "@/components/common/logo";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Sheet, SheetClose, SheetContent, SheetOverlay, SheetPortal, SheetTrigger } from "@/components/ui/sheet";
import { signOut } from "@/lib/actions";
import { _dashboardEvents, _dashboardOrgs, _dashboardProfile, _dashboardTickets, _login } from "@/lib/routes";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { User, UserMetadata } from "@supabase/supabase-js";
import { Bell, ChevronDown, MenuIcon, Settings, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const supabase = createClient();

const navLinks = [
    { name: "organisations",link: _dashboardOrgs },
    { name: "events", link: _dashboardEvents },
    { name: "tickets", link: _dashboardTickets }
]

export default function Header () {

    return (
        <header className="relative w-full h-14 border-b flex_center justify-between">
            <div className="flex gap-1 h-full items-center px-3 border-r">
                <Logo />
                <p className="text-sm font-semibold hidden lg:block">CampusEvents</p>
            </div>
            <div className="h-full hidden md:flex_center flex-1 gap-4 px-3 border-r">
                {navLinks.map(({name, link}, _i) => (
                    <Link key={_i} href={link} className="font-medium text-sm capitalize">{name}</Link>
                ))}
            </div>
            <HeaderOptions />
        </header>
    )
}

const HeaderOptions = () => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { data, error } = await supabase.auth.getUser();
            if (error) {
                console.error('Error fetching user:', error.message);
                toast("Error fetching user");
                return;
            }
            setUser(data.user);
        };
        
        fetchUser();
    },[]); 

    return (
        <div className="h-full flex gap-1.5">
            <div className="h-full flex items-center gap-2 px-3 max-lg:border-r">
                <Setting />
                <Notification />
                <ProfileAvatar user={user} setUser={setUser} />
            </div>
            <MobileNav />
        </div>
    )
}

const MobileNav = () => {

    return (
        <div className="md:hidden px-3 flex_center">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant={'ghost'} size='sm' className="p-1.5">
                        <MenuIcon size={20} />
                    </Button>
                </SheetTrigger>
                <SheetPortal>
                    <SheetOverlay />
                    <SheetContent className="w-80 py-20">
                        <SheetClose className="absolute left-0 -translate-x-1/2 p-2 top-6 rounded-full bg-background focus:outline-none shadow-md">
                            <X className="h-5 w-5" />
                            <span className="sr-only">Close</span>
                        </SheetClose>
                        <div className="flex flex-col gap-2">
                            {navLinks.map(({name, link}, _i) => (
                                <Link key={_i} href={link} className="w-full rounded-sm p-2.5 hover:bg-secondary capitalize">{name}</Link>
                            ))}
                        </div>
                    </SheetContent>
                </SheetPortal>
            </Sheet>
        </div>
    )
};

const ProfileAvatar = ({ user, setUser }:{ user:User | null, setUser: React.Dispatch<React.SetStateAction<User | null>>}) => {
    const userData:UserMetadata|null = user?.user_metadata ?? null;

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size='sm' className="flex items-center gap-2 rounded-full p-1.5">
                    {userData && 
                        <Image 
                            src={userData["avatar_url"]} 
                            height={40} 
                            width={40} 
                            alt="avatar" 
                            className="w-7 h-7 rounded-full" 
                        />
                    }
                    <ChevronDown size={16} />
                </Button>
            </PopoverTrigger>
            <PopoverContent sideOffset={14} className="w-64 flex flex-col mr-4">
                <Link href={_dashboardProfile} className="w-full rounded-sm p-2.5 text-sm hover:bg-secondary">My Profile</Link>
                <Link href={_dashboardProfile} className="w-full rounded-sm p-2.5 text-sm hover:bg-secondary">Edit Profile</Link>
                <form>
                    <Button 
                        type="submit"  
                        className="mt-4 w-full" 
                        formAction={async()=> {
                            await signOut();
                            setUser(null);
                        }}>
                        SignOut
                    </Button>
                </form>
            </PopoverContent>
        </Popover>
    )
}

const Notification = () => (
    <Button variant='outline' size='sm' className="aspect-square p-1.5 rounded-full">
        <Bell size={20} />
    </Button>
)

const Setting = () => (
    <Button variant='outline' size='sm' className="aspect-square p-1.5 rounded-full">
        <Settings size={20} />
    </Button>
)