type CipStatus = "complete" | "pending" | "failed";

export function StatusTag({ status }: { status: CipStatus }) {
  const config = {
    complete: {
      colour: "green",
      label: "Complete",
    },
    pending: {
      colour: "yellow",
      label: "Pending",
    },
    failed: {
      colour: "red",
      label: "Failed",
    },
  }[status];

  return (
    <span className={`ds_tag ds_tag--${config.colour}`}>{config.label}</span>
  );
}
