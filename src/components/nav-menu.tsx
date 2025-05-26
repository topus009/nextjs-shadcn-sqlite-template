import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "components/components/ui/navigation-menu";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import Link from "next/link";

const items = [
  {
    label: 'Bugs',
    value: 'bugs',
  },
]

export const NavMenu = (props: NavigationMenuProps) => {
  const renderItems = () => {
    return items.map((item) => {
      return (
        <NavigationMenuItem key={item.value}>
          <NavigationMenuLink asChild>
            <Link href={`/${item.value}`}>{item.label}</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      );
    });
  }
  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
        {renderItems()}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
