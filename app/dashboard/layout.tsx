import { DashboardNavigation } from "@/components/dashboard/navigation/DashboardNavigation";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = async ({ children }: Props) => {
  return (
    <div className="flex h-full w-full flex-1">
      <DashboardNavigation />
      <div className="w-full">{children}</div>
    </div>
  );
};

export default DashboardLayout;
