import "./index.css";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [lang, setLang] = useState(() => {
    const savedLang = localStorage.getItem("app_lang");
    return savedLang || "ru";
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const t = {
    ru: {
      services: "Сервисы",
      documents: "Документы",
      business: "Бизнесу",
      faq: "FAQ",
      support: "Поддержка",
      signup: "Регистрация",
      signin: "Вход",
    },
    en: {
      services: "Services",
      documents: "Documents",
      business: "Business",
      faq: "FAQ",
      support: "Support",
      signup: "Sign up",
      signin: "Sign in",
    },
  };

  const isActiveLink = (path) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  const scrollToSection = (elementId, event) => {
    if (event) event.preventDefault();
    const element = document.getElementById(elementId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLang(newLang);
    localStorage.setItem("app_lang", newLang);
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  // Закрытие меню при изменении размера окна
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="heaer__logo">
            <a href="/">
              <img src="/landing/assets/images/logo.svg" alt="logo" />
            </a>
          </div>
          <div className="header__items">
            <a 
              href="/services" 
              className={isActiveLink("/services") ? "active-link" : ""}
            >
              {t[lang].services}
            </a>
            <a 
              href="/documents" 
              className={isActiveLink("/documents") ? "active-link" : ""}
            >
              {t[lang].documents}
            </a>
            <a 
              href="/business" 
              className={isActiveLink("/business") ? "active-link" : ""}
            >
              {t[lang].business}
            </a>
            <a
              href="/services#footer"
              // className={isActiveLink("/services") ? "active-link" : ""}
            >
              {t[lang].faq}
            </a>
            <a 
              href="#footer" 
              onClick={(e) => scrollToSection("footer", e)}
            >
              {t[lang].support}
            </a>
          </div>
          <div className="header__btns">
            <button className="signup__btn" onClick={() => navigate("/signup")}>
              {t[lang].signup}
            </button>
            <button className="signin__btn" onClick={() => navigate("/login")}>
              {t[lang].signin}
            </button>
          </div>
          <div className="header__language">
            <select
              className="language__select"
              value={lang}
              onChange={handleLanguageChange}
            >
              <option value="ru">RU</option>
              <option value="en">EN</option>
            </select>
          </div>
          <div
            className={`header__burger ${mobileMenuOpen ? "active" : ""}`}
            onClick={toggleMobileMenu}
          >
            <img
              src="/landing/assets/images/burger.svg"
              alt="Menu"
              className="burger__icon"
            />
          </div>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`mobile__menu__overlay ${mobileMenuOpen ? "active" : ""}`}
        onClick={closeMobileMenu}
      ></div>

      {/* MOBILE MENU */}
      <div className={`mobile__menu ${mobileMenuOpen ? "active" : ""}`}>
        <div className="mobile__menu__header">
          <button className="mobile__menu__close" onClick={closeMobileMenu}>
            ✕
          </button>
        </div>
        <div className="mobile__menu__items">
          <a 
            href="/services" 
            className={`mobile__menu__link ${isActiveLink("/services") ? "active-link" : ""}`}
          >
            {t[lang].services}
          </a>
          <a 
            href="/documents" 
            className={`mobile__menu__link ${isActiveLink("/documents") ? "active-link" : ""}`}
          >
            {t[lang].documents}
          </a>
          <a 
            href="/business" 
            className={`mobile__menu__link ${isActiveLink("/business") ? "active-link" : ""}`}
          >
            {t[lang].business}
          </a>
          <a
            href="/services#footer"
            className={`mobile__menu__link ${isActiveLink("/services") ? "active-link" : ""}`}
          >
            {t[lang].faq}
          </a>
          <a
            href="#footer"
            className="mobile__menu__link"
            onClick={(e) => {
              scrollToSection("footer", e);
              closeMobileMenu();
            }}
          >
            {t[lang].support}
          </a>
          <div className="mobile__menu__buttons">
            <button
              className="mobile__signup__btn"
              onClick={() => {
                closeMobileMenu();
                navigate("/signup");
              }}
            >
              {t[lang].signup}
            </button>
            <button
              className="mobile__signin__btn"
              onClick={() => {
                closeMobileMenu();
                navigate("/login");
              }}
            >
              {t[lang].signin}
            </button>
          </div>
          <div className="mobile__menu__language">
            <select
              className="language__select"
              value={lang}
              onChange={handleLanguageChange}
            >
              <option value="ru">RU</option>
              <option value="en">EN</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}