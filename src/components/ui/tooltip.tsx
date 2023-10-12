import { TooltipProvider, Tooltip as ShadCnTooltip, TooltipTrigger, TooltipContent } from './shadcn-tooltip';
import React, { ReactNode } from 'react';

export const Tooltip = ({ children, tooltip }: { children: ReactNode; tooltip: string }) => {
  return (
    <TooltipProvider>
      <ShadCnTooltip>
        <TooltipTrigger>{children}</TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </ShadCnTooltip>
    </TooltipProvider>
  );
};
