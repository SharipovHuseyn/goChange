import { useState, useEffect } from "react";

export default function Footer({ bgColor = "#efeef3" }) {
  const [lang, setLang] = useState(() => {
    const savedLang = localStorage.getItem("app_lang");
    return savedLang || "ru";
  });

  const t = {
    ru: {
      products: "Продукты",
      exchange: "Криптообменник",
      rates: "Курсы валют",
      company: "Компания",
      about: "О нас",
      faq: "FAQ",
      contacts: "Контакты",
      contactUs: "Связаться с нами",
      resources: "Прочие ресурсы",
      privacy: "Политика конфиденциальности",
      agreement: "Пользовательское соглашение",
    },
    en: {
      products: "Products",
      exchange: "Crypto exchange",
      rates: "Exchange rates",
      company: "Company",
      about: "About us",
      faq: "FAQ",
      contacts: "Contacts",
      contactUs: "Contact us",
      resources: "Resources",
      privacy: "Privacy policy",
      agreement: "User agreement",
    },
  };

  // Следим за изменением языка в localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const newLang = localStorage.getItem("app_lang");
      if (newLang && newLang !== lang) {
        setLang(newLang);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [lang]);

  // Также следим за изменениями языка в том же окне
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const newLang = localStorage.getItem("app_lang");
      if (newLang && newLang !== lang) {
        setLang(newLang);
      }
    });

    observer.observe(document.body, { attributes: true, childList: true, subtree: true });
    return () => observer.disconnect();
  }, [lang]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="footer" style={{ backgroundColor: bgColor }}>
        <div className="container">
          <div className="footer__logo">
            <img src="/landing/assets/images/logo.svg" alt="" />
          </div>

          <div className="footer__items">
            <div className="footer__item">
              <div className="footer__item__title">{t[lang].products}</div>
              <div className="footer__item__list">
                <a
                  href="#"
                  className="footer__link"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#4B46FC")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(100, 100, 101, 1)")
                  }
                >
                  Криптообменник
                </a>
                <a
                  href="#"
                  className="footer__link"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#4B46FC")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(100, 100, 101, 1)")
                  }
                >
                  Курсы валют
                </a>
              </div>
            </div>

            <div className="footer__item">
              <div className="footer__item__title">{t[lang].company}</div>
              <div className="footer__item__list">
                <a
                  href="#"
                  className="footer__link"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#4B46FC")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(100, 100, 101, 1)")
                  }
                >
                  {t[lang].about}
                </a>
                <a
                  href="#"
                  className="footer__link"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#4B46FC")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(100, 100, 101, 1)")
                  }
                >
                  FAQ
                </a>
              </div>
            </div>

            <div className="footer__item">
              <div className="footer__item__title">{t[lang].contacts}</div>
              <div className="footer__item__list">
                <a
                  href="#"
                  className="footer__link"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#4B46FC")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(100, 100, 101, 1)")
                  }
                >
                  logo@service.com
                </a>
                <a
                  href="#"
                  className="footer__link"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#4B46FC")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(100, 100, 101, 1)")
                  }
                >
                  {t[lang].contactUs}
                </a>
              </div>
            </div>

            <div className="footer__item">
              <div className="footer__item__title">{t[lang].resources}</div>
              <div className="footer__item__list">
                <a
                  href="#"
                  className="footer__link"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#4B46FC")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(100, 100, 101, 1)")
                  }
                >
                  {t[lang].privacy}
                </a>
                <a
                  href="#"
                  className="footer__link"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#4B46FC")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "rgba(100, 100, 101, 1)")
                  }
                >
                  {t[lang].agreement}
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
  );
}