/** Re-mounts on navigation, giving every storefront page a short fade-in. */
export default function StorefrontTemplate({ children }: { children: React.ReactNode }) {
  return <div className="animate-in fade-in slide-in-from-bottom-1 duration-300">{children}</div>;
}
