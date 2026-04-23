import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="bg-white overflow-hidden w-full">
      <div className="flex flex-col lg:flex-row items-center w-full">
        {/* Left Column: Hits the left wall */}
        <div className="w-full lg:w-1/2">
          {/* Reduced height for better visibility without scrolling */}
          <div className="relative aspect-[16/11] w-full bg-zinc-100 overflow-hidden lg:max-h-[80vh]">
            <Image
              src="/about.jpg"
              alt="Mac Bancy Brand Story"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* Right Column: Story text */}
        <div className="w-full lg:w-1/2 px-6 py-12 lg:py-0 md:px-12 lg:pl-20 lg:pr-12">
          <div className="flex flex-col gap-8 lg:max-w-xl">
            {/* About Us */}
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
                About Us
              </h2>
              <div className="flex flex-col gap-3 text-base lg:text-lg leading-relaxed text-zinc-600">
                <p>
                  Macbancy Perfumes, founded in Ghana, celebrates Africa's heritage through captivating scents.
                </p>
                <p>
                  Each fragrance tells a unique story using rare herbs, spices, and botanicals. We honor the continent's legacy by blending tradition with the art of perfumery.
                </p>
              </div>
            </div>

            {/* Our Mission */}
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-bold tracking-tight text-black sm:text-4xl">
                Our Mission
              </h2>
              <div className="flex flex-col gap-3 text-base lg:text-lg leading-relaxed text-zinc-600">
                <p>
                  Macbancy Perfumes is building Africa's fragrance hub by supporting local brands and celebrating authentic ingredients.
                </p>
                <p>
                  We aim to inspire a new generation through scent, storytelling, and cultural pride.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
