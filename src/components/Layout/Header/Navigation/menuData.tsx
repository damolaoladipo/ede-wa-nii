import { HeaderItem } from "@/types/menu";

export const headerData: HeaderItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Programs",
    href: "#",
    submenu: [
      { label: "Program A", href: "/cause" },
      { label: "Program details", href: "/cause/cause-1" },
    ],
  },
  {
    label: "Events",
    href: "#",
    submenu: [
      { label: "Events list", href: "/events" },
      { label: "Events details", href: "/events/event-1" },
    ],
  },
  {
    label: "Blog",
    href: "#",
    submenu: [
      { label: "Blog list", href: "/blog" },
      { label: "Blog details", href: "/blog/blog_1" },
    ],
  },
  { label: "Contact", href: "/contact" },
  // { label: "Documentation", href: "/documentation#version" },
];
