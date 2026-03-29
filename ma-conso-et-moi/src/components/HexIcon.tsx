import {
  Zap, Settings, Snowflake, Lightbulb, BookOpen, Sunrise,
  Plug, Leaf, Home, BarChart2, User, ShoppingBag, Gift,
  CheckCircle, Clock, Star, Flame, Thermometer, Droplets,
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  zap: Zap,
  settings: Settings,
  snowflake: Snowflake,
  lightbulb: Lightbulb,
  'book-open': BookOpen,
  sunrise: Sunrise,
  plug: Plug,
  leaf: Leaf,
  home: Home,
  'bar-chart': BarChart2,
  user: User,
  shopping: ShoppingBag,
  gift: Gift,
  check: CheckCircle,
  clock: Clock,
  star: Star,
  flame: Flame,
  thermometer: Thermometer,
  droplets: Droplets,
};

interface HexIconProps {
  icon: string;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export function HexIcon({ icon, size = 'md', color = '#1A3A6B' }: HexIconProps) {
  const IconComp = ICON_MAP[icon] ?? Zap;

  const dims = { sm: 32, md: 44, lg: 56 };
  const iconSizes = { sm: 16, md: 22, lg: 28 };
  const d = dims[size];
  const iSize = iconSizes[size];

  return (
    <div
      style={{
        width: d,
        height: d,
        background: color,
        clipPath: 'polygon(50% 0%, 95% 25%, 95% 75%, 50% 100%, 5% 75%, 5% 25%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <IconComp size={iSize} color="#fff" />
    </div>
  );
}
