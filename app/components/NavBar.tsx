import { ReactNode } from "react";
import IconNone from "@/app/components/IconNone";

type NavBarProps = { title: string; left?: ReactNode; right?: ReactNode; className?: string };

export default function NavBar({ title, left, right, className = "" }: NavBarProps) {
  return <header className={`ds-nav-bar ${className}`.trim()}>{left ?? <IconNone />}<h1 className="type-heading-md">{title}</h1>{right ?? <IconNone />}</header>;
}
