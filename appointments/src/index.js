import React from "react";
import { createRoot } from "react-dom/client";
import { AppointmentsDayView } from "./AppointmentsDayView";
import { sampleAppointments } from "./sampleData";
import { CustomerForm } from "./CustomerForm";

const root = createRoot(document.getElementById("root"));
// root.render(<AppointmentsDayView appointments={sampleAppointments} />);
root.render(<CustomerForm />);
