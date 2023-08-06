import React, { FC } from "react";
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface HeadingProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
}

const Heading: FC<HeadingProps> = ({
  title,
  description,
  Icon,
  iconColor = "text-violet-500",
  iconBgColor = "bg-violet-500/10",
}) => {
  return (
    <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
      <div className={cn("p-2 w-fit rounded-md", iconBgColor)}>
        <Icon className={cn("w-8 h-8", iconColor)} />
      </div>
      <div>
        <h2 className="text-3xl font-bold">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default Heading;
