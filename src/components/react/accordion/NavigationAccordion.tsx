import type { Routes } from "../../../routes/routes";
import NavLinkButton from "../navigation/NavLinkButton";

interface NavigationAccordionProps {
  routes: Routes[];
}
const NavigationAccordion = ({ routes }: NavigationAccordionProps) => {
  return (
    <ul className="">
      {routes?.map(({ path, text }, index) => (
        <li key={index} className="py-2">
          <NavLinkButton
            path={path}
            text={text}
            variant={"normal"}
            align={"left"}
          />
        </li>
      ))}
    </ul>
  );
};

export default NavigationAccordion;
