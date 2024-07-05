import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Navbar from "./Navbar";
import MobileNav from "./MobileNav";

export default function Header() {
  return (
    <header className="relative z-10 shadow-md">
      <div className="wrapper !py-2 flex items-cetner justify-between">
        <Link href="/" className="w-28">
          <Image src="/assets/images/logo.svg" 
          width={128} height={38} alt="AddisEvents Logo"/>
          Events Addis
        </Link>

        <SignedIn>
          <nav className="md:flex-between hidden w-full max-w-xs">
            <Navbar />
          </nav>
        </SignedIn>

        <div className="flex items-center justify-end gap-3">
          <div className="h-max flex gap-5">
            <SignedIn>
              <UserButton/>
              <MobileNav />
            </SignedIn>
          </div>

          <SignedOut>
            <SignInButton>
              <Link href="/sign-in">
                <Button className="py-0 h-8">Login</Button>
              </Link>
            </SignInButton>
            <SignUpButton>
              <Link href="/sign-up">
                <Button className="py-0 h-8">Sign Up</Button>
              </Link>
            </SignUpButton>
          </SignedOut>
        </div> 
      </div>
    </header>
  );
}
