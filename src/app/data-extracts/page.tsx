import Link from "next/link";
import { selfUrl } from "@/app/utils/self-url";
import { formatShortOrdinalDate } from "../utils/date";
import { formatFileSizeKb } from "../utils/format-file-size";

type ExtractFile = {
  name: string;
  endpoint: string;
  last_updated: string;
  file_size_kb: number;
};

type DataExtract = {
  data_extract_name: string;
  available_files: ExtractFile[];
};

const dataExtractDescriptions: Record<string, string> = {
  main_full_domestic: "Complete domestic data extract.",
  main_full_non_domestic: "Complete non-domestic data extract.",
  quarterly_domestic: "Latest quarterly domestic data extract.",
  quarterly_non_domestic: "Latest quarterly non-domestic data extract.",
  historic_quarterly_domestic: "Historic quarterly domestic data extract.",
  historic_quarterly_non_domestic:
    "Historic quarterly non-domestic data extract.",
};

function prettifyExtractName(name: string) {
  return name
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace("Non Domestic", "Non-domestic");
}

function buildFilename(extractName: string) {
  return `${extractName}.7z`;
}

export default async function DataExtractsPage() {
  let extracts: DataExtract[] = [];
  let error: string | null = null;

  try {
    const res = await fetch(selfUrl("/api/sg/data-extracts/list"), {
      cache: "no-store",
    });

    const text = await res.text();

    if (!res.ok) {
      error = "Unable to retrieve data extracts.";
    } else {
      extracts = JSON.parse(text) as DataExtract[];
    }
  } catch {
    error = "Unable to contact data extracts service.";
  }

  return (
    <div className="ds_wrapper">
      <div className="ds_page-header">
        <h1>Data Extracts</h1>
      </div>

      <p>Choose to download a data extract, as a 7Zip compressed file.</p>

      {error ? (
        <p className="ds_error-message">{error}</p>
      ) : extracts.length === 0 ? (
        <div className="ds_inset-text">
          <p>No data extracts available.</p>
        </div>
      ) : (
        <table className="ds_table">
          <caption>List of data extracts available</caption>

          <thead>
            <tr>
              <th scope="col">Extract name</th>
              <th scope="col">Description</th>
              <th scope="col">File size</th>
              <th scope="col">Last updated</th>
              <th scope="col">Download</th>
            </tr>
          </thead>

          <tbody>
            {extracts.map((extract) => {
              const sevenZip = extract.available_files.find(
                (file) => file.name.toLowerCase() === "7z",
              );

              return (
                <tr key={extract.data_extract_name}>
                  <td>{prettifyExtractName(extract.data_extract_name)}</td>

                  <td>
                    {dataExtractDescriptions[extract.data_extract_name] ??
                      "Data extract available for download."}
                  </td>

                  <td>
                    {sevenZip ? formatFileSizeKb(sevenZip?.file_size_kb) : "—"}
                  </td>

                  <td>
                    {sevenZip
                      ? formatShortOrdinalDate(sevenZip?.last_updated)
                      : "—"}
                  </td>

                  <td>
                    {sevenZip ? (
                      <Link
                        href={`/api/sg/data-extracts/download/${extract.data_extract_name}?format=7z`}
                        className="ds_link"
                      >
                        {buildFilename(extract.data_extract_name)}
                      </Link>
                    ) : (
                      "—"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
