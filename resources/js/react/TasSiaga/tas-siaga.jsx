import { createRoot } from "react-dom/client";
import TasSiaga from "./TasSiaga";

const el = document.getElementById("tas-siaga-root");
if (el) createRoot(el).render(<TasSiaga />);
