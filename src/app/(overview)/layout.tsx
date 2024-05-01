import Navbar from "./_components/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-y-10">
      <Navbar />
      {children}
    </div>
  );
};
export default Layout;
