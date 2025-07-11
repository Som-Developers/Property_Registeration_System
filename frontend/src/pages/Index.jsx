import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/AppSidebar"

function Index({children}) {
  return (
    <SidebarProvider>
    <AppSidebar />
    <main>
      <SidebarTrigger />
      {children}
    </main>
  </SidebarProvider>
  )
}

export default Index

