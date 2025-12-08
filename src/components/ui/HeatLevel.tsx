import { Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeatLevelProps {
  level: 1 | 2 | 3 | 4 | 5;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const heatLabels = {
  1: 'Mild',
  2: 'Medium',
  3: 'Hot',
  4: 'Extra Hot',
  5: 'Extreme',
};

const heatColors = {
  1: 'text-green-500',
  2: 'text-yellow-500',
  3: 'text-orange-500',
  4: 'text-red-500',
  5: 'text-red-700',
};

const sizes = {
  sm: 'h-3 w-3',
  md: 'h-4 w-4',
  lg: 'h-5 w-5',
};

export function HeatLevel({ level, showLabel = false, size = 'md' }: HeatLevelProps) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Flame
            key={i}
            className={cn(
              sizes[size],
              'transition-all duration-200',
              i <= level ? heatColors[level] : 'text-muted/30'
            )}
            fill={i <= level ? 'currentColor' : 'none'}
          />
        ))}
      </div>
      {showLabel && (
        <span className={cn('font-heading text-xs uppercase tracking-wide', heatColors[level])}>
          {heatLabels[level]}
        </span>
      )}
    </div>
  );
}
