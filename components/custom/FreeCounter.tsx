"use client";
import useMounted from "@/hooks/useMounted";
import { FC } from "react";
import { Zap } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { MAX_FREE_COUNTS } from "@/constants";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

import { useProModal } from "@/hooks/use-pro-modal";

interface FreeCounterProps {
  apiLimitCount: number;
}
const FreeCounter: FC<FreeCounterProps> = ({ apiLimitCount }) => {
  const proModla = useProModal();
  const isMounted = useMounted();

  if (!isMounted) return null;
  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p className="">
              {apiLimitCount}/{MAX_FREE_COUNTS} Free generations
            </p>
            <Progress
              value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
              className="h-3 w-full"
            />
          </div>
          <Button
            onClick={proModla.onOpen}
            variant="premium"
            className="w-full"
          >
            Upgrade <Zap className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeCounter;
