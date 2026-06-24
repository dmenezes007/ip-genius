import React from 'react';
import {
  Trophy,
  Shield,
  Zap,
  User,
  Award,
  CheckCircle2,
  ChevronRight,
  Lock,
  Gift,
  Bell,
  Calendar,
  Compass,
  Flame,
  Medal,
  ArrowRight,
  Play,
  Check,
  TrendingUp,
  Sparkles,
  X,
  Share2,
  AlertCircle,
  Coins,
  BrainCircuit,
  Gamepad2,
  Heart,
  Target
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<any>> = {
  trophy: Trophy,
  shield: Shield,
  zap: Zap,
  user: User,
  award: Award,
  checkCircle: CheckCircle2,
  chevronRight: ChevronRight,
  lock: Lock,
  gift: Gift,
  bell: Bell,
  calendar: Calendar,
  compass: Compass,
  flame: Flame,
  medal: Medal,
  arrowRight: ArrowRight,
  play: Play,
  check: Check,
  trendingUp: TrendingUp,
  sparkles: Sparkles,
  x: X,
  share: Share2,
  alert: AlertCircle,
  coins: Coins,
  brain: BrainCircuit,
  game: Gamepad2,
  heart: Heart,
  target: Target
};

interface AuraIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function AuraIcon({ name, className = '', size = 20 }: AuraIconProps) {
  const IconComponent = iconMap[name] || HelpCircleFallback;
  return <IconComponent className={className} size={size} />;
}

function HelpCircleFallback({ className, size }: { className?: string; size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}
