import {
  FiCode,
  FiServer,
  FiUsers,
  FiAward,
  FiCloud,
  FiDatabase,
  FiBriefcase,
  FiTool,
  FiZap,
} from "react-icons/fi";
import type { IconBaseProps } from "react-icons";

const ICON_MAP = {
  FiCode,
  FiServer,
  FiUsers,
  FiAward,
  FiCloud,
  FiDatabase,
  FiBriefcase,
  FiTool,
  FiZap,
} as const;

export type IconName = keyof typeof ICON_MAP;

type IconProps = IconBaseProps & {
  name: string;
};

const Icon = ({ name, ...props }: IconProps) => {
  const IconComponent = ICON_MAP[name as IconName];
  if (!IconComponent) return null;
  return <IconComponent {...props} />;
};

export default Icon;
