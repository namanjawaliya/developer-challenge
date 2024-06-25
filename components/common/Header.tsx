import React from "react";
import { ThemeToggle } from "@/components/common/ThemeToggle";

type Props = {};

const Header = (props: Props) => {
  return (
    <nav className="flex justify-between items-center px-4 py-2 border-b">
      <h1 className="text-lg font-semibold">Nothing to-do</h1>
      <span>
        <ThemeToggle />
      </span>
    </nav>
  );
};

export default Header;
