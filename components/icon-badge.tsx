import { LucideIcon } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const backgroundvariants = cva(
  'rounded-full flex items-center justify-between',
  {
    variants: {
      variant: {
        default: 'bg-sky-100',
        success: 'bg-emerald-100',
      },
      size: {
        default: 'p-2',
        small: 'p-1',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const iconVariants = cva('', {
  variants: {
    variant: {
      default: 'text-sky-700',
      success: 'text-emerald-700',
    },
    size: {
      default: 'h-8 w-8',
      small: 'h-4 w-4',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

type backgroundVariantsProps = VariantProps<typeof backgroundvariants>;
type iconVariantProps = VariantProps<typeof iconVariants>;

interface IconBadeProps extends backgroundVariantsProps, iconVariantProps {
  icon: LucideIcon;
}

export const IconBadge = ({ icon: Icon, variant, size }: IconBadeProps) => {
  return (
    <div className={cn(backgroundvariants({ variant, size }))}>
      <Icon className={cn(iconVariants({ variant, size }))}></Icon>
    </div>
  );
};
