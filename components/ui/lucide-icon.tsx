import { LucideProps } from "lucide-react";
import dynamic from "next/dynamic";
import dynamicIconImports from "lucide-react/dynamicIconImports";

interface LucideIconProps extends Omit<LucideProps, "ref"> {
  name: string;
}

/**
 * Dynamic Lucide Icon component
 *
 * Renders any Lucide icon by name/ID from lucide.dev
 *
 * @example
 * ```tsx
 * <LucideIcon name="home" size={24} />
 * <LucideIcon name="alert-circle" color="#ED5F5F" />
 * ```
 *
 * Find icon IDs at: https://lucide.dev/icons
 */
const LucideIcon = ({ name, ...props }: LucideIconProps) => {
  // Convert icon name to kebab-case if needed (e.g., "AlertCircle" -> "alert-circle")
  const iconName = name
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .toLowerCase() as keyof typeof dynamicIconImports;

  // Dynamically import the icon component
  const Icon = dynamic(dynamicIconImports[iconName] || dynamicIconImports.circle, {
    ssr: true,
  });

  return <Icon {...props} />;
};

export default LucideIcon;
