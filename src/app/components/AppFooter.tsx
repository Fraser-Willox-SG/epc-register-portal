"use client";

import React from "react";
import Link from "next/link";

import SiteFooter from "@scottish-government/designsystem-react/dist/components/SiteFooter/SiteFooter";

export default function AppFooter() {
  type FooterLinkProps = React.ComponentProps<typeof SiteFooter.Link>;
  type LinkAdapterType = NonNullable<FooterLinkProps["linkComponent"]>;

  const ExternalLinkAdapter: LinkAdapterType = ({
    href,
    children,
    ...rest
  }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
    </a>
  );

  return (
    <SiteFooter>
      <SiteFooter.Links>
        <SiteFooter.Link
          href="https://www.gov.scot/accessibility/"
          linkComponent={ExternalLinkAdapter}
        >
          Accessibility
        </SiteFooter.Link>

        <SiteFooter.Link
          href="https://www.gov.scot/privacy/"
          linkComponent={ExternalLinkAdapter}
        >
          Privacy
        </SiteFooter.Link>

        <SiteFooter.Link
          href="https://www.gov.scot/cookies/"
          linkComponent={ExternalLinkAdapter}
        >
          Cookies
        </SiteFooter.Link>
      </SiteFooter.Links>

      <SiteFooter.License>
        <img
          alt="Open Government Licence"
          src="/ogl.svg"
          width={41}
          height={17}
        />
        <p>
          All content is available under the{" "}
          <a href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/">
            Open Government Licence v3.0
          </a>
          , except for graphic assets and where otherwise stated
        </p>
        <p>© Crown Copyright</p>
      </SiteFooter.License>

      <SiteFooter.Org
        href="https://www.gov.scot/"
        title="The Scottish Government"
      >
        <img
          alt="gov.scot"
          src="/scottish-government--min.svg"
          width={300}
          height={55}
          loading="lazy"
        />
      </SiteFooter.Org>
    </SiteFooter>
  );
}
