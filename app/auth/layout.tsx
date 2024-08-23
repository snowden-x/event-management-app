import Logo from "@/components/common/logo";
import { _home } from "@/lib/routes";
import Link from "next/link";

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      <header className="fixed top-0 left-0 w-full py-5 flex_center">
       <Link href={_home}className="font-medium text-xl">CONNECT</Link>
      </header>
      <main className="w-full min-h-screen flex_center">
        { children }
      </main>
      <footer className="fixed bottom-0 left-0 w-full h-16 flex_center">
        <p className="text-sm font-medium">Connect &copy; 2024</p>
      </footer>
    </>
  );
}