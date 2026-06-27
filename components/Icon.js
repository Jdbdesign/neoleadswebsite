// Maps the original `data-lucide="name"` icons to lucide-react components.
// The original markup used <i data-lucide="search"></i> rendered by the Lucide
// UMD script; here each becomes <Icon name="search" /> with no runtime CDN.
import { icons } from 'lucide-react';

const toPascalCase = (name) =>
  name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

export default function Icon({ name, ...props }) {
  const LucideIcon = icons[toPascalCase(name)];
  if (!LucideIcon) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn(`[Icon] Unknown lucide icon: "${name}"`);
    }
    return null;
  }
  // lucide-react adds the base `lucide` + `lucide-<name>` classes itself,
  // so the original CSS rule `.lucide { width:20px; height:20px }` still applies.
  return <LucideIcon {...props} />;
}
