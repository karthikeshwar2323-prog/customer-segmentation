import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SegmentBadgeProps {
  name: string;
  color: string;
  className?: string;
}

export default function SegmentBadge({ name, color, className }: SegmentBadgeProps) {
  return (
    <Badge 
      className={cn('font-medium', className)}
      style={{ 
        backgroundColor: color,
        color: 'white'
      }}
    >
      {name}
    </Badge>
  );
}
