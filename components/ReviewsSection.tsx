import { Star } from "lucide-react";

const REVIEWS = [
  {
    id: 1,
    name: "Solomon",
    location: "USA",
    text: "A scent that truly captures African elegance, I love it!",
    rating: 5,
  },
  {
    id: 2,
    name: "Gloria",
    location: "Nigeria",
    text: "Long-lasting and unique, it gets me compliments all day.",
    rating: 5,
  },
  {
    id: 3,
    name: "Florence",
    location: "Ghana",
    text: "Feels luxurious and proudly made, my new favorite!",
    rating: 5,
  },
];

export default function ReviewsSection() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center gap-3 text-center mb-10">
          <h2 className="text-2xl font-bold tracking-tight text-black sm:text-3xl">
            Latest Reviews
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-8 lg:grid-cols-3 lg:gap-x-12">
          {REVIEWS.map((review) => (
            <div key={review.id} className="flex flex-col items-start gap-3">
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={14} 
                    className={i < review.rating ? "fill-black text-black" : "text-zinc-300"} 
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-base leading-relaxed text-zinc-900 font-medium italic ">
                "{review.text}"
              </p>

              {/* Reviewer Info */}
              <div className="mt-2 text-sm font-bold tracking-wide uppercase text-zinc-600">
                {review.name} — {review.location}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
