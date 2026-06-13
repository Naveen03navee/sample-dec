import { Link, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Car, Leaf, Wallet, User } from "lucide-react";

const tabs = [
  { to: "/", label: "Rides", icon: Car },
  { to: "/impact", label: "Impact", icon: Leaf },
  { to: "/wallet", label: "Wallet", icon: Wallet },
  { to: "/account", label: "Account", icon: User },
] as const;

export function MobileFrame({ children, hideTabs = false }: { children: ReactNode; hideTabs?: boolean }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="min-h-screen bg-zinc-200 flex items-start sm:items-center justify-center sm:p-4 font-sans">
      <div className="w-full sm:w-[390px] sm:h-[844px] h-screen bg-surface relative overflow-hidden flex flex-col text-ink sm:shadow-2xl sm:rounded-[32px] ring-1 ring-black/5">
        <StatusBar />
        <div className="flex-1 relative overflow-hidden">{children}</div>
        {!hideTabs && (
          <div className="h-20 bg-white border-t border-zinc-100 px-8 flex items-center justify-between shrink-0 z-20">
            {tabs.map((t) => {
              const active = pathname === t.to || (t.to !== "/" && pathname.startsWith(t.to));
              const Icon = t.icon;
              return (
                <Link
                  key={t.to}
                  to={t.to}
                  className="flex flex-col items-center gap-1 transition-opacity"
                  style={{ opacity: active ? 1 : 0.4 }}
                >
                  <Icon className="size-5" style={{ color: active ? "var(--leaf)" : "#52525b" }} />
                  <span className="text-[10px] font-medium" style={{ color: active ? "var(--leaf)" : "#09090b" }}>
                    {t.label}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="h-12 px-8 flex items-center justify-between shrink-0 z-20 bg-surface">
      <span className="text-sm font-medium">9:41</span>
      <div className="flex items-center gap-1.5">
        <div className="size-1.5 bg-ink/60 rounded-full" />
        <div className="size-1.5 bg-ink/60 rounded-full" />
        <div className="size-1.5 bg-ink/60 rounded-full" />
        <div className="ml-2 w-6 h-3 border border-ink/30 rounded-sm relative">
          <div className="absolute left-0.5 top-0.5 bottom-0.5 right-1 bg-leaf rounded-[1px]" />
        </div>
      </div>
    </div>
  );
}