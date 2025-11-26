import Link from "next/link";
import { ChevronRight } from "lucide-react";

type BreadcrumbItem = {
  label: string;
  href?: string;
  isCurrent?: boolean;
};

const Breadcrumb = ({ items }: { items: BreadcrumbItem[] }) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 flex items-center gap-2 text-sm text-primary">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        const content = item.href && !item.isCurrent ? (
          <Link href={item.href} className="hover:underline">
            {item.label}
          </Link>
        ) : (
          <span className={item.isCurrent ? "text-accent" : undefined}>{item.label}</span>
        );

        return (
          <span key={`${item.label}-${index}`} className="flex items-center gap-2">
            {content}
            {!isLast && <ChevronRight className="h-4 w-4 text-muted-foreground" />}
          </span>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
