import { Outlet } from "react-router-dom";

function AppLayout() {
  return (
    <div className="p-6 bg-purple-100">
      <Outlet />
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className=" mt-8 text-sm text-slate-700">
      &copy; 👨‍💻&nbsp;
      <span className=" text-blue-500 hover:text-slate-700">
        <a
          href="https://abedevjs.github.io/"
          target="_blank"
          rel="noreferrer"
          className=" cursor-pointer"
        >
          Abé
        </a>
      </span>
      ✌️
    </footer>
  );
}

export default AppLayout;
