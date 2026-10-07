import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import logo from "../../assets/logos/logo-color-stacked.svg";
import useUser from "../../stores/useUserStore";

export const NavbarMenu = () => {
  const { user, logoutUser } = useUser();

  return (
    <NavigationMenu className={"p-3 flex min-w-full"}>
      <div className="flex gap-2">
        <a href="/">
          <img src={logo} alt="Logo do GameHub" />
        </a>
      </div>
      <NavigationMenuList className={"justify-start"}>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Jogos</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink>Flip 7</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink>Quem somos</NavigationMenuLink>
        </NavigationMenuItem>

        {!user ? (
          <NavigationMenuList className={"justify-end"}>
            <NavigationMenuItem>
              <NavigationMenuLink href="/register">
                Se inscrever
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="/login">Entrar</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        ) : (
          <NavigationMenuList className={"justify-end"}>
            <NavigationMenuItem>
              <NavigationMenuLink onClick={logoutUser}>Sair</NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
