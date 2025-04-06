import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-16">
      <div className="text-center">
        <div className="relative mx-auto h-60 w-60 md:h-80 md:w-80">
          <Image
            src="/images/404.svg"
            alt="404 Error"
            fill
            className="object-contain"
            priority
          />
        </div>
        <h1 className="mt-8 text-3xl font-bold text-gray-900 md:text-4xl">
          Page Not Found
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Sorry, the page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-lg bg-primary px-8 py-3 text-center text-sm font-semibold text-white outline-none hover:bg-opacity-90"
        >
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}