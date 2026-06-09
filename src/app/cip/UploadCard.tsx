"use client";

import SvgCheckCircle from "@scottish-government/designsystem-react/dist/images/icons/check_circle";
import SvgDescription from "@scottish-government/designsystem-react/dist/images/icons/description";
import { useState } from "react";

type Region = {
  id: string;
  name: string;
};

export function UploadCard({ region }: { region: Region }) {
  const [filename, setFilename] = useState("");

  const hasFile = filename.length > 0;

  return (
    <div
      className={`ds_card cip-upload-card ${
        hasFile ? "cip-upload-card--complete" : ""
      }`}
    >
      <div className="ds_card__content">
        <div className="ds_card__content-header">
          <div className="cip-card-header">
            <h2 className="ds_card__title">{region.name}</h2>

            {hasFile ? (
              <SvgCheckCircle width={"1.75rem"} fill="#006b2d" />
            ) : (
              <SvgDescription width={"1.75rem"} fill="#0065bd" />
            )}
          </div>
        </div>

        <div className="ds_card__content-main">
          <div className="cip-upload-meta">
            <p className="mb-0">
              <strong>Description:</strong> Upload Region {region.id} CSV file.
            </p>

            <p>
              <strong>File name:</strong>{" "}
              <span
                className={hasFile ? "cip-upload-filename" : "ds_hint-text"}
              >
                {hasFile ? filename : "No CSV file selected"}
              </span>
            </p>
          </div>
          <div className="cip-upload-control">
            <input
              id={`region_${region.id}`}
              name={`region_${region.id}`}
              type="file"
              accept=".csv,text/csv"
              required
              className="cip-upload-input visually-hidden"
              onChange={(e) => setFilename(e.target.files?.[0]?.name ?? "")}
            />

            <label
              htmlFor={`region_${region.id}`}
              className="ds_button ds_button--secondary"
            >
              {hasFile ? "Change CSV file" : "Choose CSV file"}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
