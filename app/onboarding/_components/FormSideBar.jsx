import { Calendar, Home, Inbox, Circle, Settings, CircleArrowLeft, LoaderCircle } from "lucide-react"
import { FaRegCircle } from "react-icons/fa";
import { LuLoaderCircle } from "react-icons/lu";




import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator } from "@/components/ui/sidebar";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const items = [
    {
      title: "Course landing page",
      url: "#",
      icon: Circle,
    },
    {
      title: "Curriculum",
      url: "#",
      icon: Inbox,
    },
    {
      title: "Pricing",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ]

export default function FormSideBar() {

    return(
        <Sidebar className="fixed top-0 left-0 h-screen border-r w-72" >
            <SidebarContent className="p-8 bg-[#F4F5F7] ">
                <h1 className="text-4xl font-bold text-black">Codebite</h1>
                <Button variant="secondary" className="h-12 mt-4 font-bold bg-white border rounded-xl text-md"> Save Changes </Button>
                <Button variant="secondary" className="h-12 mb-4 font-bold bg-white border rounded-xl text-md"><CircleArrowLeft /> Back to Courses </Button>                
                <SidebarMenu>
                    {items.map((item) => (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton className="p-4 h-[50px] hover:bg-[#FFCDFF] rounded-lg text-black">
                                <Link href={item.url} className="flex items-center gap-4">
                                    <FaRegCircle className="text-[8px]"/>
                                    <span className="text-lg font-semibold">{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
                <SidebarSeparator className="my-3"/>
                <Button variant="secondary" className="h-12 mt-4 font-bold bg-[#C9CED6] border rounded-xl text-md"> DRAFT </Button>
                <Button variant="secondary" className="flex items-center gap-8 p-8 bg-white border rounded-xl text-md">
                <p className="text-5xl">&#9692;</p>		
                <div className="flex flex-col items-start">
                    <p className="font-bold">Finish your course</p>
                    <span >25% complete</span>
                  </div>
                </Button>
                <Button className="h-12 gap-2 mt-6 font-bold border rounded-xl text-md">&#9679; &nbsp; Submit for Review </Button>
            </SidebarContent> 
        </Sidebar>
    )
}