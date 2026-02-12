import TopNavbar from "./TopNavbar";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="h-screen grid">
      <TopNavbar />

      <div className="grid grid-cols-[260px_1fr_260px] overflow-hidden">
        <LeftSidebar />

        <main className="overflow-y-auto bg-main-bg">{children}</main>

        <RightSidebar />
      </div>
    </div>
  );
};

export default MainLayout;
