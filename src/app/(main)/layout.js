import Header from "@/layout/header";


export default function MainLayout({ children }) {
  return (
    <div>
      <main>
        <Header />
        {children}
      </main>
    </div>
  );
}
