export interface AboutPageData {
  founderImage: string | null;
  founderImageAlt: string;
  story: readonly string[];
  values: readonly { title: string; description: string }[];
}

export const ABOUT_PAGE_DATA: AboutPageData = {
  founderImage: null,
  founderImageAlt: "DoomSphere founder",
  story: [
    "I spent four years working as a developer, growing into senior roles and helping teams turn ideas into working digital products. Along the way, I saw how much clearer and more welcoming digital tools could make a business feel to its customers.",
    "That experience inspired me to start DoomSphere: to help new and growing businesses build a thoughtful digital presence, serve customers more smoothly, and make everyday work a little easier.",
    "I enjoy the challenge of building useful things, learning as technology changes, and working alongside people who care about what they do. The goal is simple: understand what would genuinely help your business, then make it clear, practical, and dependable.",
  ],
  values: [
    {
      title: "Listen before building",
      description:
        "Start with your customers, your team, and the challenge you want to solve.",
    },
    {
      title: "Keep learning",
      description:
        "Stay curious, improve our craft, and choose technology for a reason.",
    },
    {
      title: "Make it useful",
      description:
        "Deliver work people can understand, use, and build on with confidence.",
    },
  ],
};
