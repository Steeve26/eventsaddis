import { CgMenuLeftAlt } from "react-icons/cg";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "../ui/button";
import Image from "next/image";
import { Separator } from "@radix-ui/react-separator";
import NavItems from "./Navbar";


export default function MobileNav() {
  return (
    <nav className=" md:hidden cursor-pointer flex">
      <Sheet>
        <SheetTrigger><CgMenuLeftAlt size={28} color="#6e5cf4" /></SheetTrigger>
        <SheetContent className="bg-white/20 shadow-l bg-white" side={"top"}>
          <SheetHeader className=" mb-10">
            <Image src="/assets/images/logo.svg" alt="logo" width={128} height={38}></Image>
            EventsAddis
            <Separator className=" border border-gray-200"/>
            <Button className=" !mt-6 bg-grey-500">Welcome</Button>
          </SheetHeader>

          <NavItems />
        </SheetContent>
      </Sheet>
    </nav>
  )
}
