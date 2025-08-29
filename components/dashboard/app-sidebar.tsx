"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconEdit,
  IconHome,
  IconInnerShadowTop,
  IconListDetails,
  IconSearch,
  IconSettings,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/dashboard/nav-documents"
import { NavMain } from "@/components/dashboard/nav-main"
import { NavSecondary } from "@/components/dashboard/nav-secondary"
import { NavUser } from "@/components/dashboard/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useSession } from "@/lib/auth-client"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession()
  const pathname = usePathname()

  const data = {
    user: {
      name: session?.user?.name || "Utilisateur",
      email: session?.user?.email || "email@example.com",
      avatar: "/avatars/shadcn.jpg",
    },
    navMain: [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: IconDashboard,
        isActive: pathname === "/dashboard",
      },
      {
        title: "Blog Builder",
        url: "/dashboard/blog-builder",
        icon: IconEdit,
        isActive: pathname.startsWith("/dashboard/blog-builder"),
      },
      {
        title: "Create Listing",
        url: "/dashboard/create-listing",
        icon: IconListDetails,
        isActive: pathname.startsWith("/dashboard/create-listing"),
      },
      {
        title: "Analytics",
        url: "/dashboard/analytics",
        icon: IconChartBar,
        isActive: pathname.startsWith("/dashboard/analytics"),
      },
    ],
    navSecondary: [
      {
        title: "Search",
        url: "/dashboard/search",
        icon: IconSearch,
        isActive: pathname.startsWith("/dashboard/search"),
      },
      {
        title: "Settings",
        url: "/dashboard/settings",
        icon: IconSettings,
        isActive: pathname.startsWith("/dashboard/settings"),
      },
    ],
    documents: [
      {
        name: "Introduction to the Platform",
        url: "#",
        icon: IconFileDescription,
        isActive: false,
      },
      {
        name: "Getting Started Guide",
        url: "#",
        icon: IconFileAi,
        isActive: false,
      },
    ],
  }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/">
                <IconHome className="!size-5" />
                <span className="text-base font-semibold">WelkomHOME</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
