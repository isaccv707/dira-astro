import { useState } from "react";
import { Menu, X } from "lucide-react";
import { routes } from "../../routes/routes";

const NavBar = () => {
  return (
    <nav className="hidden md:flex items-center gap-8">
      {routes.map(({ path, text }) => (
        <a
          key={path}
          href={path}
          className={`text-gray-700 hover:text-primary transition-colors`}
        >
          {text}
        </a>
      ))}
    </nav>
  );
};

export default NavBar;
