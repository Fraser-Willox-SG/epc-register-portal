import Link from "next/link";

type HubLink = {
  href: string;
  title: string;
  description: string;
};

const hubLinks: HubLink[] = [
  {
    href: "/reports",
    title: "Reports",
    description: "Download Reports.",
  },
  {
    href: "/data-extracts",
    title: "Data Extracts",
    description: "Open data about domestic and non-domestic EPCs.",
  },
  {
    href: "/cip",
    title: "CIP",
    description: "Create new CIP file, and view historic CIP files",
  },
  {
    href: "/postcode-search",
    title: "Postcode Search",
    description:
      "Download EPC and Green Deal certificates using postcode search.",
  },
  {
    href: "/rrn-download",
    title: "RRN Download",
    description: "Download EPC and Green Deal certificates using RRN Download.",
  },
];

export default function HomePage() {
  return (
    <main className="ds_wrapper">
      <header className="ds_page-header">
        <h1>Scottish EPC Internal Portal</h1>
      </header>

      <p>You can use this Scottish EPC Portal website to find the following:</p>

      <section aria-labelledby="services-heading">
        <ul className="ds_no-bullets">
          {hubLinks.map(({ href, title, description }) => (
            <li key={href} className="ds_!_margin-bottom--2">
              <h3 className="ds_h4 ds_!_margin-bottom--0">
                <Link href={href} className="ds_link">
                  {title}
                </Link>
              </h3>
              <p className="ds_!_margin-bottom--0">{description}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
