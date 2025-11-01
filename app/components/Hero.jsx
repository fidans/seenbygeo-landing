import Image from "next/image";

export default function Hero() {
  return (
    <section className="flex flex-col items-center py-16">
      <Image src="/logo.svg" alt="Seenby GEO" width={120} height={120} />
      <h1 className="text-4xl font-bold mt-4 tracking-tight">Seenby</h1>
      <span className="text-xl text-gray-600 -mt-1">GEO</span>
    </section>
  );
}
