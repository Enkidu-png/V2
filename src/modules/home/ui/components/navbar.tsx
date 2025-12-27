"use client";

import Link from "next/link";
import { useState } from "react";
import { MenuIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";

import { NavbarSidebar } from "./navbar-sidebar";

interface NavbarItemProps {
  href: string;
  children: React.ReactNode;
  isActive?: boolean;
};

const NavbarItem = ({
  href,
  children,
  isActive,
}: NavbarItemProps) => {
  return (
    <Button
      asChild
      variant="outline"
      className={cn(
        "bg-transparent hover:bg-transparent rounded-none hover:border-primary border-transparent px-3.5 text-lg",
        isActive && "bg-black text-white hover:bg-black hover:text-white",
      )}
    >
      <Link href={href}>
        {children}
      </Link>
    </Button>
  );
};

const navbarItems = [
  { href: "/", children: "HOME" },
  { href: "/about", children: "ABOUT" },
  { href: "/features", children: "FEATURES" },
  { href: "/pricing", children: "PRICING" },
  { href: "/contact", children: "CONTACT" },
];

export const Navbar = () => {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const trpc = useTRPC();
  const session = useQuery(trpc.auth.session.queryOptions());

  return (
    <nav className="h-20 flex border-b justify-between font-medium bg-white">
      <Link href="/" className="pl-6 flex items-center">
        <span className="text-5xl font-semibold">
          FERMENT
        </span>
      </Link>

      <NavbarSidebar
        items={navbarItems}
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      />

      <div className="items-center gap-4 hidden lg:flex">
        {navbarItems.map((item) => (
          <NavbarItem
            key={item.href}
            href={item.href}
            isActive={pathname === item.href}
          >
            {item.children}
          </NavbarItem>
        ))}
      </div>

      {session.data?.user ? (
        <div className="hidden lg:flex">
          <Button
            asChild
            className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-black text-white hover:bg-pink-400 hover:text-black transition-colors text-lg"
          >
            <Link href="/admin">
              DASHBOARD
            </Link>
          </Button>
        </div>
      ) : (
        <div className="hidden lg:flex">
          <Button
            asChild
            variant="secondary"
            className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-white hover:bg-pink-400 transition-colors text-lg"
          >
            <Link prefetch href="/sign-in">
              LOG IN
            </Link>
          </Button>
          <Button
            asChild
            className="border-l border-t-0 border-b-0 border-r-0 px-12 h-full rounded-none bg-black text-white hover:bg-pink-400 hover:text-black transition-colors text-lg"
          >
            <Link prefetch href="/sign-up">
              START SELLING
            </Link>
          </Button>
        </div>
      )}

      <div className="flex lg:hidden items-center justify-center">
        <Button
          variant="ghost"
          className="size-12 border-transparent bg-white"
          onClick={() => setIsSidebarOpen(true)}
        >
          <MenuIcon />
        </Button>
      </div>
    </nav>
  );
};
