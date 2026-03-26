export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
};

export const testimonials: readonly Testimonial[] = [
  {
    id: "1",
    quote:
      "FourWayMedia took our scattered brief and turned it into a clear launch plan—video, social, and web all felt like one brand. Communication was steady and the work shipped on time.",
    name: "Amara Okafor",
    role: "Head of Marketing",
    company: "Brightline Retail",
  },
  {
    id: "2",
    quote:
      "We needed templates our team could reuse without a designer every week. The shop assets and guidelines they delivered cut our production time in half.",
    name: "James Mitchell",
    role: "Creative Lead",
    company: "Summit Studios",
  },
  {
    id: "3",
    quote:
      "From paid campaigns to landing pages, they connect creative to performance. Reporting was honest, and iterations were quick when we needed to pivot.",
    name: "Elena Vasquez",
    role: "Growth Manager",
    company: "Northwave Labs",
  },
];
