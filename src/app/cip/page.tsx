import { selfUrl } from "@/app/utils/self-url";
import CipUploadForm from "./UploadForm";
import { HistoryTable, type CipHistoryItem } from "./HistoryTable";

export default async function CipPage() {
  let history: CipHistoryItem[] = [];
  let error: string | null = null;

  try {
    const res = await fetch(selfUrl("/api/sg/cip/list-history?n_last=6"), {
      cache: "no-store",
    });

    if (!res.ok) {
      error = "Unable to retrieve CIP history.";
    } else {
      history = (await res.json()) as CipHistoryItem[];
    }
  } catch {
    error = "Unable to contact CIP service.";
  }

  return (
    <div className="ds_wrapper">
      <div className="ds_page-header">
        <h1>CIP File Creation</h1>
      </div>

      <p>
        Upload the six regional MET files required to generate a CIP output
        file. History is stored, please come back for latest updates.
      </p>

      <CipUploadForm />
      <HistoryTable history={history} error={error} />
    </div>
  );
}
