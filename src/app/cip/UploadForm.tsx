"use client";

import { UploadCard } from "./UploadCard";

const regions = [
  { id: "8", name: "North-Western" },
  { id: "9", name: "Borders" },
  { id: "13", name: "West Scotland" },
  { id: "14", name: "East Scotland" },
  { id: "15", name: "North East Scotland" },
  { id: "18", name: "North West Scotland" },
];

export default function CipUploadForm() {
  return (
    <form
      action="/api/sg/cip/upload"
      method="post"
      encType="multipart/form-data"
      className="ds_form"
    >
      <fieldset>
        <legend className="ds_label ds_label--medium">CSV file uploads</legend>

        <div className="cip-upload-grid">
          {regions.map((region) => (
            <UploadCard key={region.id} region={region} />
          ))}
        </div>
      </fieldset>

      <button className="ds_button" type="submit">
        Upload files
      </button>
    </form>
  );
}
