import { InvestigatorLayout } from "@/components/portal/InvestigatorLayout";
import { RequireAuth } from "@/components/RequireAuth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth portal="investigator">
      <InvestigatorLayout>{children}</InvestigatorLayout>
    </RequireAuth>
  );
}
