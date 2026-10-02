import { Outlet } from "react-router";
import { SidebarProvider } from "../../components/ui/sidebar";
import { NavbarMenu } from "../../components/navbar-menu/NavbarMenu";

export const MainLayout = () => {


  return (
    <SidebarProvider>
      <div className="w-full">
        <NavbarMenu />

        <Outlet />
      </div>
    </SidebarProvider>
  );
};
