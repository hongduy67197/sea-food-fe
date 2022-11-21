import { CircularProgress } from "@mui/material";
import * as React from "react";

import "./loading.css";

export default function Loading() {
  return (
    <div className="loading-shading-mui">
      <CircularProgress className="loading-icon-mui" />
    </div>
  );
}
