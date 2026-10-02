import { Sidebar, SidebarHeader, SidebarRail, SidebarTrigger } from "../ui/sidebar"

const AppSidebar = () => {

    return (
        <Sidebar>
            <SidebarHeader>
                Minha sidebar 
            </SidebarHeader>
            <SidebarTrigger />
            <SidebarRail />
        </Sidebar>
    )
}

export default AppSidebar;