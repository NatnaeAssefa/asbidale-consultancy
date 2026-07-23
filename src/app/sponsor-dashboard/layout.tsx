import { SponsorLayout } from "@/components/portal/SponsorLayout";
import { RequireAuth } from "@/components/RequireAuth";

export default function SponsorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RequireAuth portal="sponsor">
      <SponsorLayout>{children}</SponsorLayout>
    </RequireAuth>
  );
}
