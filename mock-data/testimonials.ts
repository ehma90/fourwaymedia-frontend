export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role?: string;
  company?: string;
};

export const testimonials: readonly Testimonial[] = [
  {
    id: "1",
    quote:
      "From strategy to execution, everything was intentional. The quality of work, communication, and attention to detail made the entire experience seamless.",
    name: "Chelsea Azubike",
    role: "Founder",
    company: "Atela",
  },
  {
    id: "2",
    quote:
      "Working with Fourlabs Studio felt like having an extension of our internal team. Professional, creative, responsive, and deeply invested in our success.",
    name: "Etim Essang",
    role: "Founder",
    company: "SwiftShopper",
  },
  {
    id: "3",
    quote:
      "I have consulted Fourlabs Studio to design a motion ads and users direction for our Pathzing platform. Fourlabs Studio has carried out the project with good commitment and produced a great result. I strongly recommend Fourlabs Studio for your Motion Design Project.",
    name: "Kayode Adio Oladosu",
    role: "Founder",
    company: "Pathzing",
  },
];
