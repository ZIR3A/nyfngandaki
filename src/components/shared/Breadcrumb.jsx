import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export function Breadcrumb({ items, locale, className = "" }) {
  return (
    <nav className={`flex items-center space-x-2 text-sm font-medium text-muted-foreground ${className}`}>
      <Link href={`/${locale}`} className="hover:text-foreground transition-colors flex items-center">
        <Home className="w-4 h-4 mr-1" />
      </Link>
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-2">
          <ChevronRight className="w-4 h-4" />
          {item.href ? (
            <Link href={item.href} className="hover:text-foreground transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground">{item.label}</span>
          )}
        </div>
      ))}
    </nav>
  );
}
