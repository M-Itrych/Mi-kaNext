const MainPageFooter = () => {
  const time = new Date().getFullYear();

  return (
    <div className="flex flex-col items-center justify-center w-full bg-white text-black py-8">
      <div className="grid grid-cols-4 gap-20 w-full max-w-7xl px-4">
        <div className="flex flex-col">
          <h3 className="font-bold mb-2">
            Należymy do Grupy Polskie Hurtownie Instalacyjne, która zrzesza
            PONAD 40 przedsiębiorstw z branży instalacyjnej, grzewczej i
            sanitarnej.
          </h3>
          <img
            src="/images/logo.png"
            alt="Grupa Polskie Hurtownie Instalacyjne"
            className="w-1/2 h-auto"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold mb-2">MI-KA SP. Z.O.O</h3>
          <p className="mb-2 font-bold">
            Hurtownia Hydrauliczna, Biuro Projektowe, Serwis
          </p>
          <p className="mb-2">ul. Kopernika 23</p>
          <p className="mb-2">84-241 Gościcino</p>
          <p className="mb-2">tel. 58 74 44 500</p>
          <p className="mb-2 font-bold">Oddział Hurtowni w Pucku</p>
          <p className="mb-2">ul. Topolowa 11</p>
          <p className="mb-2">84-100 Puck</p>
        </div>
        <div className="flex flex-col">
          <h3 className="font-bold mb-2">Centrala:</h3>
          <p className="mb-2">tel. +48 605 255 552</p>
          <p className="mb-2">E-Mail: administracja@mi-ka.pl</p>
        </div>
        <div className="flex flex-col">
          <div>Mapa poog</div>
        </div>
      </div>
      <div className="mt-8 text-center flex">
        <a className="mr-4 cursor-pointer font-bold">Polityka prywatności</a>
        <div>© {time} Mi-Ka sp.z.o.o. Wszelkie prawa zastrzeżone.</div>
      </div>
    </div>
  );
};

export default MainPageFooter;
