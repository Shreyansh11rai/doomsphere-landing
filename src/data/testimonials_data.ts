export interface HomeTestimonialData {
  id: string;
  quote: string;
  name: string;
  role: string;
  business: string;
  photo?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  problem?: string;
  result?: string;
  projectType?: string;
  sourceUrl?: string;
  date: string;
  approved?: boolean;
  featured: boolean;
}

export const HOME_TESTIMONIALS: readonly HomeTestimonialData[] = [
  {
    id: "zaytro",
    name: "Vishal Singh",
    role: "Founder",
    business: "Zaytro Masala",
    photo: "/testimonials/vishal.jpeg",
    quote:
      "Customers can explore our masala range and current offers without messaging us first. The website also helps people feel more confident about our brand.",
    rating: 5,
    result:
      "Customers can browse the product lineup and offers independently, while the website presents the brand more clearly and builds consumer trust.",
    projectType: "static_website",
    sourceUrl: "https://zaytromasala.com",
    date: "2026-10-29",
    featured: true,
  },
  {
    id: "gopesh-singh",
    name: "Gopesh Singh",
    role: "Car dealer",
    business: "Car listings and bookings",
    rating: 4,
    quote:
      "Car listings and request a booking features helped me get bookings without visiting client or waiting for me to be available.",
    result:
      "Customers can explore available cars and request bookings online without an in-person visit or the dealer being present.",
    photo: "/testimonials/gopesh-singh-test-image.png",
    projectType: "static_website",
    date: "2026-10-29",
    featured: true,
  },
] as const;
