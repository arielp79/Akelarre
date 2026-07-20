import Navbar from './Navbar';
import Footer from './Footer';
import PageCorners from './PageCorners';

export default function Layout({ children }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <PageCorners />
      <Navbar />
      <main className="relative z-[1] flex-1">{children}</main>
      <Footer />
    </div>
  );
}
