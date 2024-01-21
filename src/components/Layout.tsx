import Footer from "./Footer";
import Navbar from "./Navbar";


interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <Navbar />
      {children}
      <Footer/>
    </div>
  );
}
