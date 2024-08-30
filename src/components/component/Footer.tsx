import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-muted p-6 md:py-12 w-full">
      <div className="container max-w-7xl flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
        <p className="text-xs text-muted-foreground">&copy; 2024 Smart-Reader. All rights reserved.</p>
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Privacy Policy
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Terms of Service
          </Link>
          <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Cookie Policy
          </Link>
        </nav>
      </div>
    </footer>
  )
}