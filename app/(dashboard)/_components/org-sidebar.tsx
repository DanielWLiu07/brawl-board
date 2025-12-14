"use client";

import Link from "next/link";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Star, SquarePen, PenTool } from "lucide-react";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
})

export const OrgSidebar = () => {
    const favorites = null;
    
    return(
        <div className="hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5 bg-white">
            <Link href = "/" className="hover:opacity-80 transition-opacity group">
                <div className="flex items-center gap-x-2 cursor-pointer">
                    <div className="relative">
                        <div className="bg-blue-600 rounded-lg p-2 shadow-md group-hover:shadow-lg transition-shadow">
                            <div className="relative">
                                <SquarePen className="w-6 h-6 text-white" />
                                <PenTool className="w-4 h-4 text-yellow-400 absolute -top-1 -right-1 rotate-12" />
                            </div>
                        </div>
                    </div>
                    <span className={cn("font-semibold text-2xl cursor-pointer handwriting-font", font.className)}>
                        BRAWL BOARD
                    </span>
                </div>
            </Link>
                <OrganizationSwitcher
            hidePersonal={false}
            appearance={{
              elements:{
                rootBox:{
                    display:"flex",
                    justifyContent:"center",
                    alignItems:"center",
                    width:"100%",
                },
                organizationSwitcherTrigger:{
                    padding:"6px",
                    width:"100%",
                    borderRadius:"8px",
                    border:"1px solid #E5E7EB",
                    justifyContent:"space-between",
                    backgroundColor:"white",
                }
              }  
            }}/>
            <div className="space-y-1 w-full">
                <Button
                variant = {favorites ? "ghost" : "secondary"}
                asChild
                size="lg"
                className="font=normal justify-start px-2 w-full">
                    <Link href="/">
                    <LayoutDashboard className="h-4 w-4 mr-2"/>
                    Teamboards
                        
                    </Link>
                </Button>
                <Button
                variant = {favorites ? "secondary" : "ghost"}
                asChild
                size="lg"
                className="font=normal justify-start px-2 w-full">
                    <Link href={{
                        pathname:'/',
                        query: {favorites: true}
                    }}>
                    <Star className="h-4 w-4 mr-2"/>
                    Fav boards
                        
                    </Link>
                </Button>

            </div>

            </div>
            
    )



}