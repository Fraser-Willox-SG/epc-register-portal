import Link from "next/link";
import { selfUrl } from "@/app/utils/self-url";

type ReportFile = {
  name: string;
  endpoint: string;
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

      <h2 className="ds_h3">Internal Reporting and Data Extracting Tool</h2>

      <p>Choose to download a report by CSV or XLSX.</p>

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
              <th scope="col">Download CSV</th>
              <th scope="col">Download XLSX</th>
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
                    {csv ? (
                      <Link
                        href={`/api/sg/reports/download/${report.report_name}?format=csv`}
                        className="ds_link"
                      >
                        CSV
                      </Link>
                    ) : (
                      "—"
                    )}
                  </td>

                  <td>
                    {xlsx ? (
                      <Link
                        href={`/api/sg/reports/download/${report.report_name}?format=xlsx`}
                        className="ds_link"
                      >
                        XLSX
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
