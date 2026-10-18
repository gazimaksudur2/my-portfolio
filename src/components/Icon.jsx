/**
 * Tiny icon lookup used by the About section highlight cards.
 * Specific named imports keep the Feather bundle small.
 */
import { FiCode, FiServer, FiUsers, FiAward, FiCloud, FiDatabase } from 'react-icons/fi';

const ICON_MAP = { FiCode, FiServer, FiUsers, FiAward, FiCloud, FiDatabase };

const Icon = ({ name, ...props }) => {
  const IconComponent = ICON_MAP[name];
  if (!IconComponent) return null;
  return <IconComponent {...props} />;
};

export default Icon;
