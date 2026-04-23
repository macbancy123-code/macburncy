import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-start overflow-hidden bg-black py-24 px-6 sm:px-12 lg:px-24">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero.jpg"
          alt="Luxury Perfume"
          fill
          className="object-cover"
          priority
        />
        {/* Adjusted gradient for left-aligned text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-2xl text-left">
        <h1 className="text-6xl font-bold tracking-tight text-white sm:text-7xl lg:text-8xl leading-[1.1] animate-in fade-in slide-in-from-left-5 duration-1000">
          Bold African <br />
          Luxury Scents
        </h1>
        <p className="mt-8 max-w-lg text-lg leading-relaxed text-zinc-300 animate-in fade-in slide-in-from-left-7 duration-1000 delay-200">
          A spray that speaks heritage, rich and unforgettable. Experience the essence of African luxury.
        </p>
        <div className="mt-12 flex flex-col gap-4 sm:flex-row animate-in fade-in slide-in-from-left-9 duration-1000 delay-400">
          <Link
            href="/shop"
            className="flex h-14 items-center justify-center rounded-lg bg-white px-10 text-base font-bold text-black transition-all hover:bg-zinc-200"
          >
            Shop Now
          </Link>
          <Link
            href="/discover"
            className="flex h-14 items-center justify-center rounded-lg border-2 border-white/40 bg-transparent px-10 text-base font-bold text-white transition-all hover:bg-white/10"
          >
            Discover Our Scent
          </Link>
        </div>
      </div>
    </section>
  );
}
