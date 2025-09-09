import { redirect } from "next/navigation";

export default function HomePage() {
  // Server-side redirect for the root route to the Dashboard V2
  redirect("/dashboard-v2");
}
