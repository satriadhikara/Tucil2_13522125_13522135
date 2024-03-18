const Navbar = () => {
  return (
    <>
      <nav className="flex items-center justify-between p-6">
        <div className="text-black text-2xl">Tucil 2 Stima</div>
        <div className="flex space-x-4">
          <a
            className="hover:underline"
            href="https://github.com/satriadhikara"
            target="_blank"
          >
            13522125
          </a>
          <a
            className="hover:underline"
            href="https://github.com/ChrisCS50X"
            target="_blank"
          >
            13522135
          </a>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
