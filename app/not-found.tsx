import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-muted">
      <div className="text-center">
        <p className="text-sm font-semibold text-primary">404 · Page not found</p>
        <h1 className="mt-4 text-4xl font-bold text-foreground">Nothing to learn here (yet)!</h1>
        <p className="mt-2 text-muted-foreground">The page you&apos;re looking for doesn&apos;t exist or was moved.</p>
        <Link href="/" className="mt-6 inline-block text-primary underline-offset-2 hover:underline">
          Return to Home
        </Link>
      </div>
    </div>
  );
}

