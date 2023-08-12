"use client";
import React, { FC } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "@/components/custom/Sidebar";
import useMounted from "@/hooks/useMounted";

interface MobileSidebarProps {
  apiLimitCount: number;
}
const MobileSidebar: FC<MobileSidebarProps> = ({ apiLimitCount }) => {
  const isMounted = useMounted();

  if (!isMounted) return null;

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0">
        <Sidebar apiLimitCount={apiLimitCount} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
