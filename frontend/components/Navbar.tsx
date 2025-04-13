import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-[#0a0a0a] text-gray-300 border-b border-white/10">
      <div className="flex justify-between items-center p-4 h-16">
        <div className="flex items-center gap-4">
          <h1 className="text-xl text-white font-bold">WordlyWise</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href={"/"} className="hover:text-white">Home</Link>
          <Link href={"/create"} className="hover:text-white">Create</Link>
          <Link href={"/userpost"} className="hover:text-white">Your post</Link>
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <SignedOut>
            <SignInButton />
            <SignUpButton />
          </SignedOut>

          <SignedIn>
            {user && (
              <span className="text-sm text-white/80 mr-2">
                Welcome,{" "}
                <span className="font-semibold">
                  {user.username || user.firstName}
                </span>
              </span>
            )}
            <UserButton />
          </SignedIn>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden flex flex-col gap-4 px-4 pb-4">
          <Link href={"/"} onClick={() => setIsOpen(false)}>Home</Link>
          <Link href={"/create"} onClick={() => setIsOpen(false)}>Create</Link>
          <Link href={"/userpost"} onClick={() => setIsOpen(false)}>Your post</Link>

          <SignedOut>
            <div className="flex flex-col gap-2 mt-2">
              <SignInButton />
              <SignUpButton />
            </div>
          </SignedOut>

          <SignedIn>
            {user && (
              <span className="text-sm text-white/80">
                Welcome,{" "}
                <span className="font-semibold">
                  {user.username || user.firstName}
                </span>
              </span>
            )}
            <UserButton />
          </SignedIn>
        </div>
      )}
    </header>
  );
}
