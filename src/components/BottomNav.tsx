import { Link, useLocation } from "@tanstack/react-router";
import {
  Home,
  User,
  FileText,
  Wallet,
  Zap,
} from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Home", icon: Home },
  { to: "/kyc", label: "KYC", icon: FileText },
  { to: "/dashboard", label: "Earnings", icon: Wallet },
  { to: "/profile", label: "Profile", icon: User },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-charcoal/90 backdrop-blur-lg border-t border-border">
      <div className="max-w-md mx-auto flex items-center justify-around py-2 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.to || (item.to !== "/dashboard" && location.pathname.startsWith(item.to));
          return (
            <Link
              key={item.to + item.label}
              to={item.to}
              className={`flex flex-col items-center gap-1 py-1 px-3 rounded-lg transition-colors ${
                isActive
                  ? "text-electric"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="size-5" strokeWidth={isActive ? 2.5 : 1.5} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
