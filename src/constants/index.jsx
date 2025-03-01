export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];

export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Documentation" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "API Reference" },
  { href: "#", text: "Community Forums" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Supported Devices" },
  { href: "#", text: "System Requirements" },
  { href: "#", text: "Downloads" },
  { href: "#", text: "Release Notes" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Meetups" },
  { href: "#", text: "Conferences" },
  { href: "#", text: "Hackathons" },
  { href: "#", text: "Jobs" },
];

// Checks if current device has touch input or not
const isTouchDevice =
  "ontouchstart" in window ||
  navigator.maxTouchPoints > 0 ||
  window.matchMedia("(hover: none)").matches;

{
  /*css*/
}
export const borderColor = " border-neutral-700/80 ";
export const dangerBorderColor = " border-red-500 ";
export const safeBorderColor = " border-green-500 ";
export const promptBorderColor = " border-blue-500 ";
export const interactablePadding = " px-4 py-2.5 ";
export const hoverOrDisabledInteractableBG = " bg-neutral-900 ";
export const idleInteractableBG = `bg-neutral-800 transition-colors duration-200 ${
  isTouchDevice ? "active:bg-neutral-900" : "hover:bg-neutral-900"
}`;
export const leftInteractableEdgeStyle = " rounded-l-lg border ";
export const middleInteractableEdgeStyle = " border border-l-0 ";
export const rightInteractableEdgeStyle = " rounded-r-lg border border-l-0 ";
export const circularInteractableEdgeStyle = " rounded-full border ";
export const roundedInteractableEdgeStyle = " rounded-lg border ";

export const leftFadingAbsoluteLabel =
  " absolute top-2 text-neutral-400 w-full left-8 ";
export const centerFadingAbsoluteLabel =
  " absolute top-2 text-neutral-400 w-full flex justify-center ";
export const fadingAbsoluteLabelSpan =
  " absolute flex justify-center items-center transition-opacity duration-500 ease-in-out truncate ";
export const labelSpanIconStyle = " flex-shrink-0 mr-1 ";
export const preHoverOpacityTransition =
  " opacity-100 group-hover:opacity-0 group-focus-within:opacity-0 ";
export const postHoverOpacityTransition =
  " opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 ";

export const searchOptionStyle =
  " relative group flex justify-center px-8 pb-8 pt-10 ";

export const idleTextSize = " text-sm ";
export const idleActiveText = " text-neutral-300 bg-neutral-800 ";
export const idleDisabledText = " text-neutral-400 bg-neutral-900 ";
{
  /*css end*/
}

{
  /* css enums  */
}
export const EBorderColorByStatus = Object.freeze({
  PASS: safeBorderColor,
  FAIL: dangerBorderColor,
  PROMPT: promptBorderColor,
});
