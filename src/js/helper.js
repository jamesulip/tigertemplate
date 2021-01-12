export function statusColor(Status) {
  switch (Status) {
    case "Working on it":
      return "text-aqua info";
    case "Done":
      return "text-green success";
    case "Paused":
      return "text-orange warning";
    case "REVISED":
      return "text-orange warning";
    default:
      return "";
  }
}

export function statusVariant(Status) {
  switch (Status) {
    case "Working on it":
      return "primary";
    case "Done":
      return "success";
    case "Paused":
      return "warning";
    case "REVISED":
      return "danger";
    default:
      return "";
  }
}
