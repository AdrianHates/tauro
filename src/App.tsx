import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./app/navbar";
import AboutUs from "./app/about-us";
import Credits from "./app/credits";
import Calculator from "./app/calculator";
import Form from "./app/form";
import Footer from "./app/footer";
import useToggle from "./hooks/useToggle";
import Login from "./app/login";

function App() {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("language") || "es";
  });
  const { isOpen: login, onToggle: setLogin } = useToggle();
  const [dictionary, setDictionary] = useState<Dictionary | null>(null);

  useEffect(() => {
    const loadDictionary = async () => {
      try {
        const module = await import(`./locales/${language}.json`);
        setDictionary(module.default);
      } catch (error) {
        console.error(`Failed to load ${language} translations:`, error);
      }
    };

    loadDictionary();
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => {
      const newLanguage = prevLanguage === "es" ? "en" : "es";
      localStorage.setItem("language", newLanguage);
      return newLanguage;
    });
  };

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);
  console.log(language);
  return (
    <>
      {login ? (
        <Login
          onToggle={() => {
            setLogin();
          }}
        />
      ) : (
        <div className="bg-white font-poppins overflow-hidden relative">
          {dictionary && (
            <>
              <Navbar
                dictionary={dictionary?.navbar}
                setLogin={() => {
                  setLogin();
                }}
              />
              <AboutUs
                dictionary={dictionary?.["about-us"]}
                id={dictionary?.navbar?.options[0].name.toLowerCase()}
              />
              <Credits
                dictionary={dictionary?.credits}
                id={dictionary?.navbar?.options[1].name.toLowerCase()}
              />
              <Calculator
                dictionary={dictionary?.calculator}
                id={dictionary?.navbar?.options[2].name.toLowerCase()}
                target={dictionary?.navbar?.options[3].name.toLowerCase()}
              />
              <Form
                dictionary={dictionary?.form}
                id={dictionary?.navbar?.options[3].name.toLowerCase()}
              />
              <Footer dictionary={dictionary?.footer} />
              <button
                className="bg-primary border-[1px] flex hover:brightness-125 transition-all duration-300 border-white border-opacity-30 text-white font-extralight fixed z-[999999] bottom-1 left-1 rounded-full py-2 pr-2 pl-2 gap-2 text-sm"
                onClick={() => {
                  toggleLanguage();
                }}
              >
                <img src="/world.svg" className="w-5 h-5" />
                <p className="w-8 uppercase font-normal">
                  {language === "es" ? "en" : "es"}
                </p>
              </button>
            </>
          )}
        </div>
      )}
      <div id="portal" />
    </>
  );
}

export default App;
