export type FaqBlock =
  | { type: "text"; text: string }
  | { type: "list"; ordered?: boolean; items: string[] };

export type FaqItem = {
  question: string;
  blocks: FaqBlock[];
};

export const faqItems: FaqItem[] = [
  {
    question: "What does Fourway Media do?",
    blocks: [
      {
        type: "text",
        text: "Fourway Media helps startups, businesses, creators, organizations, and individuals bring ideas to life through creative and digital solutions.",
      },
      { type: "text", text: "Our services span four core areas:" },
      {
        type: "list",
        items: [
          "Imagery (branding, graphic design, photography, visual identity)",
          "Motion (animation, video production, motion graphics)",
          "Sound (voiceovers, podcasts, audio production, sound design)",
          "Digital Solutions (websites, applications, digital products, and digital systems)",
        ],
      },
      {
        type: "text",
        text: "Whether you're building a brand, launching a product, telling a story, or growing an audience, we help transform ideas into experiences people can connect with.",
      },
    ],
  },
  {
    question: "Who do you work with?",
    blocks: [
      {
        type: "text",
        text: "We work with startups, entrepreneurs, small businesses, growing brands, creators, nonprofits, organizations, and established companies.",
      },
      {
        type: "text",
        text: "If you have a vision, story, product, service, event, or idea you want to bring to life, we'd love to help.",
      },
    ],
  },
  {
    question: "Do I need everything figured out before contacting you?",
    blocks: [
      { type: "text", text: "Not at all." },
      {
        type: "text",
        text: "Many of our clients come to us with nothing more than an idea. Our job is to help you clarify your vision, identify opportunities, and determine the best creative solution for your goals.",
      },
    ],
  },
  {
    question: "How does your process work?",
    blocks: [
      { type: "text", text: "Every project follows a structured process:" },
      {
        type: "list",
        ordered: true,
        items: [
          "Discovery: We learn about your goals, audience, and vision.",
          "Research & Strategy: We develop a creative direction based on your objectives.",
          "Creation: We bring the idea to life through design, motion, sound, or digital solutions.",
          "Delivery: We provide polished, professional work ready for real-world use.",
          "Revision: We refine and improve based on your feedback.",
          "Growth: We help position your project for continued success beyond delivery.",
        ],
      },
    ],
  },
  {
    question: "How much do your services cost?",
    blocks: [
      {
        type: "text",
        text: "Every project is different, so pricing depends on the scope, complexity, timeline, and requirements of the work.",
      },
      {
        type: "text",
        text: "After learning about your needs, we'll provide a clear proposal tailored to your project.",
      },
    ],
  },
  {
    question: "Can you work within my budget?",
    blocks: [
      { type: "text", text: "In many cases, yes." },
      {
        type: "text",
        text: "We understand that every client has different resources and priorities. During our discovery process, we'll discuss your goals and recommend solutions that provide the most value within your available budget.",
      },
    ],
  },
  {
    question: "What if I'm not sure exactly what I need?",
    blocks: [
      { type: "text", text: "That's completely okay." },
      {
        type: "text",
        text: "Many people know what they want to achieve but aren't sure which services will help them get there. We'll guide you through the options and help identify the best approach for your goals.",
      },
    ],
  },
  {
    question: "Can you help me choose the right service for my project?",
    blocks: [
      { type: "text", text: "Absolutely." },
      {
        type: "text",
        text: "Our role is not just to create, but to advise. After understanding your vision, we'll recommend the services, tools, and strategy that best fit your project and objectives.",
      },
    ],
  },
  {
    question: "How long does a project take?",
    blocks: [
      {
        type: "text",
        text: "Project timelines vary depending on the scope of work.",
      },
      {
        type: "text",
        text: "Smaller projects may take a few days, while larger branding, website, video, or digital projects may require several weeks. We'll provide a timeline before work begins so you know what to expect.",
      },
    ],
  },
  {
    question: "Can I request revisions?",
    blocks: [
      { type: "text", text: "Yes." },
      {
        type: "text",
        text: "We believe great work is collaborative. Revision opportunities are included to ensure the final outcome aligns with your vision and goals.",
      },
    ],
  },
  {
    question: "Do you work remotely?",
    blocks: [
      { type: "text", text: "Yes." },
      {
        type: "text",
        text: "We work with clients locally and internationally and use modern communication tools to make collaboration simple, regardless of location.",
      },
    ],
  },
  {
    question: "How do I get started?",
    blocks: [
      { type: "text", text: "Getting started is easy." },
      {
        type: "text",
        text: "Reach out through our contact form, email, or preferred communication channel and tell us about your project. We'll schedule a conversation, learn about your goals, and guide you through the next steps.",
      },
      {
        type: "text",
        text: "We're excited to hear your story and help bring your vision to life.",
      },
    ],
  },
];
