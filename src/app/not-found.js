import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";


export default function NotFound() {
  return (
    <main className='warning'>
      <Image
        width={160}
        height={160}
        src="/images/logo.png"
        alt="Logo"
        priority
      />
      <h2>Page Not Found</h2>
      <Link href="/">Return Home</Link>
    </main>
  );
}
