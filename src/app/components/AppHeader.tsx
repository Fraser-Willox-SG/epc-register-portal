"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import SiteHeader from "@scottish-government/designsystem-react/dist/components/SiteHeader/SiteHeader";
import SiteNavigation from "@scottish-government/designsystem-react/dist/components/SiteNavigation/SiteNavigation";

type NavItem = { href: string; label: string };
type NavItemWithCurrent = NavItem & { current: boolean };

/** Minimal shape to satisfy SiteHeader's required `navigationItems` prop */
type DSNavigationItem = {
  href: string;
  title: string;
  current?: boolean;
};

const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "Home" },
  {
    href: "/reports",
    label: "Reports",
  },
  { href: "/data-extracts", label: "Data Extracts" },
  {
    href: "/cip",
    label: "CIP",
  },
  { href: "/postcode-search", label: "Postcode Search" },
  { href: "/rrn-download", label: "RRN Download" },
];

export default function AppHeader() {
  const pathname = usePathname();

  const computed: NavItemWithCurrent[] = NAV_ITEMS.map((i) => ({
    ...i,
    current:
      i.href === "/"
        ? pathname === "/" ||
          pathname.startsWith("/domestic") ||
          pathname.startsWith("/non-domestic")
        : pathname === i.href || pathname.startsWith(`${i.href}/`),
  }));

  const navigationItemsForType: DSNavigationItem[] = computed.map(
    ({ href, label, current }) => ({
      href,
      title: label,
      current,
    }),
  );

  type ItemProps = React.ComponentProps<typeof SiteNavigation.Item>;
  type LinkAdapterType = NonNullable<ItemProps["linkComponent"]>;

  const NextLinkAdapter: LinkAdapterType = ({ href, children, ...rest }) => (
    <Link href={href ?? "#"} {...rest}>
      {children ?? null}
    </Link>
  );

  type BrandProps = React.ComponentProps<typeof SiteHeader.Brand>;
  type BrandLinkType = NonNullable<BrandProps["linkComponent"]>;

  const BrandLink: BrandLinkType = ({ href, children, ...rest }) => (
    <Link
      href={href ?? "/"}
      aria-label="Energy Certificates Home Page"
      {...rest}
    >
      {children ?? null}
    </Link>
  );

  return (
    <SiteHeader
      navigationItems={navigationItemsForType}
      siteTitle="EPC Internal Portal"
    >
      <SiteHeader.Brand
        homeUrl="/"
        siteTitle="EPC Internal Portal"
        linkComponent={BrandLink}
      >
        <img
          alt="The Scottish Government"
          src="/scottish-government.svg"
          width={300}
          height={58}
          loading="lazy"
        />
      </SiteHeader.Brand>

      <SiteHeader.Navigation>
        <SiteNavigation>
          {computed.map((item) => (
            <SiteNavigation.Item
              key={item.href}
              href={item.href}
              current={item.current}
              linkComponent={NextLinkAdapter}
            >
              {item.label}
            </SiteNavigation.Item>
          ))}
        </SiteNavigation>
      </SiteHeader.Navigation>
    </SiteHeader>
  );
}
