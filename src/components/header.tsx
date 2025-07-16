import logo from "@/assets/logo.svg";
import { Home } from "lucide-react";
import { NavLink } from "./nav-link";
import { ToggleButton } from "./theme/mode-toggle";
import { Separator } from "./ui/separator";

export function Header() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center gap-6 px-6">
        <img className="h-6 " src={logo} alt="" />
        <Separator orientation="vertical" className="h-6" />
        <nav className="flex items-center space-x-4 lg:space-x-6">
          <NavLink to="/">
            <Home className="h-4 w-4" />
            Início
          </NavLink>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ToggleButton />
        </div>
      </div>
    </div>
  );
}
