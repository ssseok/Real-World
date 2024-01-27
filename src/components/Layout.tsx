import Banner from "./Banner";
import Footer from "./Footer";
import Navbar from "./Navbar";


interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layout">
      <Navbar />
      <Banner/>
      {children}
      <Footer/>
    </div>
  );
}
