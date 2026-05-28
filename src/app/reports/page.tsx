import Link from "next/link";
import { selfUrl } from "@/app/utils/self-url";
import { formatShortOrdinalDate } from "@/app/utils/date";
import { formatFileSizeKb } from "@/app/utils/format-file-size";

type ReportFile = {
  name: string;
  endpoint: string;
  last_updated: string | null;
  file_size_kb: number | null;
};

type Report = {
  report_name: string;
  available_files: ReportFile[];
};

function prettifyReportName(name: string) {
  return name
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/Non Domestic/g, "Non Domestic");
}

function splitFilename(filename: string) {
  return filename
    .replace(/([a-z])([A-Z])/g, "$1\u200B$2")
    .replace(/([A-Z][a-z])/g, "\u200B$1");
}

function reportFilename(reportName: string, format: "csv" | "xlsx") {
  return `${reportName}.${format}`;
}

function DownloadCell({
  file,
  reportName,
  format,
}: {
  file?: ReportFile;
  reportName: string;
  format: "csv" | "xlsx";
}) {
  if (!file) return <>—</>;

  return (
    <>
      <Link
        href={`/api/sg/reports/download/${reportName}?format=${format}`}
        className="ds_link"
      >
        {splitFilename(reportFilename(reportName, format))}
      </Link>

      <br />

      <span className="ds_hint-text">
        {formatFileSizeKb(file.file_size_kb)}
        {" · "}
        {formatShortOrdinalDate(file.last_updated)}
      </span>
    </>
  );
}

export default async function ReportsPage() {
  let reports: Report[] = [];
  let error: string | null = null;

  try {
    const apiUrl = selfUrl("/api/sg/reports/list");

    const res = await fetch(apiUrl, {
      cache: "no-store",
    });

    const text = await res.text();

    if (!res.ok) {
      error = "Unable to retrieve reports.";
    } else {
      reports = JSON.parse(text) as Report[];
    }
  } catch {
    error = "Unable to contact reporting service.";
  }

  return (
    <div className="ds_wrapper">
      <div className="ds_page-header">
        <h1>Reports</h1>
      </div>

      {/* <h2 className="ds_h3">Internal Reporting and Data Extracting Tool</h2> */}

      <p>Choose to download a report, as a CSV or XLSX file.</p>

      {/* <h2 className="ds_h4 ds_mt-5">Report List</h2> */}

      {error ? (
        <p className="ds_error-message">{error}</p>
      ) : reports.length === 0 ? (
        <div className="ds_inset-text">
          <p>No reports available.</p>
        </div>
      ) : (
        <table className="ds_table">
          <caption>List of reports available</caption>

          <thead>
            <tr>
              <th scope="col">Report name</th>
              <th scope="col">CSV</th>
              <th scope="col">XLSX</th>
            </tr>
          </thead>

          <tbody>
            {reports.map((report) => {
              const csv = report.available_files.find(
                (f) => f.name.toLowerCase() === "csv",
              );

              const xlsx = report.available_files.find(
                (f) => f.name.toLowerCase() === "xlsx",
              );

              return (
                <tr key={report.report_name}>
                  <td>{prettifyReportName(report.report_name)}</td>

                  <td>
                    <DownloadCell
                      file={csv}
                      reportName={report.report_name}
                      format="csv"
                    />
                  </td>

                  <td>
                    <DownloadCell
                      file={xlsx}
                      reportName={report.report_name}
                      format="xlsx"
                    />
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
