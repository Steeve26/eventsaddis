'use client'

import { headerLinks } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SheetClose } from "../ui/sheet";

export default function Navbar() {
  const pathname = usePathname()

  return (
    <ul className="flex flex-col md:flex-row flex-between w-full gap-5">
      {headerLinks.map((link) => {
        const isActive = pathname === link.route
        return <li key={link.label} className={`${isActive && 'text-primary-500'} flex-center p-medium-16 whitespace-nowrap`}>
          <Link href={link.route}>{link.label}</Link></li>;
      })}
    </ul>
  )
}
