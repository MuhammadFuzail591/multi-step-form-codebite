"use client"
import { File, GraduationCap, Volume2, Mail, CircleArrowRight } from "lucide-react"
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator } from "@/components/ui/sidebar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const items = [
    {
      title: "Landing page",
      url: "/onboarding/landingandintended/courselandingpage",
      icon: File,
    },
    {
      title: "Intended Learners",
      url: "/onboarding/landingandintended/intendedlearners",
      icon: GraduationCap,
    },
    {
      title: "Promotions",
      url: "#",
      icon: Volume2,
    },
    {
      title: "Course Messages",
      url: "#",
      icon: Mail,
    },
  ]

export default function LandingFormSideBar() {

    const pathName = usePathname();

    return(
        <Sidebar className="h-screen w-72 left-72" >
            <SidebarContent className="p-8 bg-white">
                <SidebarMenu className="mt-16">
                    {items.map((item) => {
                        
                        const isActive = pathName === item.url;
                        
                        return(
                            <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton className={`${isActive? "bg-[#FFF2FB]":""} h-[50px] hover:bg-[#FFF2FB] rounded-lg text-black`}>
                                <Link href={item.url} className="flex items-center gap-2">
                                    <div className="bg-[#FFCDFF] p-2 rounded-md">
                                    <item.icon className="text-[12px] "/>
                                    </div>
                                    <span className="font-semibold text-md">{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        )
                    })}
                </SidebarMenu>
                <SidebarSeparator className="my-3"/>
                <div className="flex flex-col text-black items-center gap-2 p-4 border bg-[#FAF8FF] rounded-xl text-md">
                    <p className="font-bold ">How to create content</p>
                    <Button variant="outline" className="w-full bg-white">Tips <CircleArrowRight/></Button>
                </div>
            </SidebarContent> 
        </Sidebar>
    )
}