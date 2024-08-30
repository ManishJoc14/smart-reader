import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
export default function Header() {
  return (
    <>
      <header className="bg-background border-b px-4 md:px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <BookIcon className="h-6 w-6" />
          <span className="text-lg font-semibold">Smart Reader</span>
        </Link>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="md:hidden">
            {/* navbar for mobile starts*/}
            <nav className="grid gap- py-6">
              <Link
                href="/"
                className="text-xl font-medium hover:underline underline-offset-4"
                prefetch={false}
              >
                Features
              </Link>
              <Link
                href="/"
                className="text-xl font-medium hover:underline underline-offset-4"
                prefetch={false}
              >
                Pricing
              </Link>
              <Link
                href="/"
                className="text-xl font-medium hover:underline underline-offset-4"
                prefetch={false}
              >
                About
              </Link>
              <Link
                href="/"
                className="text-xl font-medium hover:underline underline-offset-4"
                prefetch={false}
              >
                Contact
              </Link>
            </nav>
            {/* navbar for mobile ends */}
          </SheetContent>
        </Sheet>
        {/* navbar for large screen starts*/}
        <nav className="hidden md:flex gap-4">
          <Link
            href="/"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Features
          </Link>
          <Link
            href="/"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Pricing
          </Link>
          <Link
            href="/"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            About
          </Link>
          <Link
            href="/"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Contact
          </Link>
        </nav>
        {/* navbar for large screen ends*/}
        <Button className="hidden md:inline-flex">Get Started</Button>
      </header>
    </>
  );
}

function BookIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

function MenuIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
