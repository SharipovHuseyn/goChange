import "./index.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRubleSign } from "react-icons/fa";
import { IoLogoEuro } from "react-icons/io5";
import { IoLogoUsd } from "react-icons/io";
import { SiTether } from "react-icons/si";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import HeadBlock from "../../components/HeadBlock";

import icon from "../../assets/images/Vector-3.svg";
import iconFile from "../../assets/images/Group 2085664148.svg";
import iconDownload from "../../assets/images/Group 2085664149.svg";
import backFile from "../../assets/images/freepik__ultraphotorealistic-futuristic-3d-icon-of-a-docume__4131 1 1.svg";

export default function Landing() {
  const navigate = useNavigate();
  const [lang, setLang] = useState(() => {
    const savedLang = localStorage.getItem("app_lang");
    return savedLang || "ru";
  });

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

  return (
    <>
      <main className="main_documents">
        <Header />
        <section>
          <div className="container page-top">
            <HeadBlock title="Документы" icon={icon} />
          </div>
        </section>

        <section className="compliance">
          <div className="container compliance__grid">
            <div className="compliance__item">
              <h2 className="compliance__number">#1</h2>
              <p className="compliance__text">
                Мы строим инфраструктуру в соответствии с актуальными
                требованиями цифрового регулирования и стандартами, формируемыми
                при участии Минцифры РФ. Наша платформа учитывает принципы
                доверенного ПО, защиты данных и устойчивой ИТ-архитектуры, что
                обеспечивает высокий уровень надёжности и безопасности
                пользовательских операций. Мы заранее адаптируемся к
                формирующейся нормативной базе рынка цифровых активов и
                требованиям к лицензированию криптосервисов, которые внедряются
                государством
              </p>
            </div>
            <div className="compliance__item">
              <h2 className="compliance__number">#2</h2>
              <p className="compliance__text">
                Инфраструктура платформы выстроена в соответствии с действующими
                ГОСТ в области информационных технологий и информационной
                безопасности. Мы применяем стандарты защиты данных,
                криптографические механизмы и архитектурные подходы,
                используемые в высоконагруженных и финансовых системах. Контроль
                доступа, защита транзакций и устойчивость к внешним угрозам —
                заложены на уровне ядра платформы.{" "}
              </p>
            </div>
          </div>

          <div className="documents-list container">
            <div className="document-card">
              <div className="document-card__header">
                <img
                  className="document-card__icon"
                  src={iconFile}
                  alt="iconFile"
                />
                <h2 className="document-card__title">Юридические документы</h2>
              </div>

              <div className="document-card__actions">
                <button className="document-card__btn document-card__btn--download">
                  <img src={iconDownload} alt="iconDownload" />
                  Скачать
                </button>
                <button className="document-card__btn document-card__btn--read">
                  Читать
                </button>
              </div>
            </div>
            <div className="document-card">
              <div className="document-card__header">
                <img
                  className="document-card__icon"
                  src={iconFile}
                  alt="iconFile"
                />
                <h2 className="document-card__title">
                  Политика конфиденциальности
                </h2>
              </div>

              <div className="document-card__actions">
                <button className="document-card__btn document-card__btn--download">
                  <img src={iconDownload} alt="iconDownload" />
                  Скачать
                </button>
                <button className="document-card__btn document-card__btn--read">
                  Читать
                </button>
              </div>
            </div>
            <div className="document-card">
              <div className="document-card__header">
                <img
                  className="document-card__icon"
                  src={iconFile}
                  alt="iconFile"
                />
                <h2 className="document-card__title">
                  Политика использования Cookie
                </h2>
              </div>

              <div className="document-card__actions">
                <button className="document-card__btn document-card__btn--download">
                  <img src={iconDownload} alt="iconDownload" />
                  Скачать
                </button>
                <button className="document-card__btn document-card__btn--read">
                  Читать
                </button>
              </div>
            </div>
            <div className="document-card">
              <div className="document-card__header">
                <img
                  className="document-card__icon"
                  src={iconFile}
                  alt="iconFile"
                />
                <h2 className="document-card__title">Правила и комиссии</h2>
              </div>

              <div className="document-card__actions">
                <button className="document-card__btn document-card__btn--download">
                  <img src={iconDownload} alt="iconDownload" />
                  Скачать
                </button>
                <button className="document-card__btn document-card__btn--read">
                  Читать
                </button>
              </div>
            </div>
            <div className="document-card">
              <div className="document-card__header">
                <img
                  className="document-card__icon"
                  src={iconFile}
                  alt="iconFile"
                />
                <h2 className="document-card__title">
                  Пользовательское соглашение
                </h2>
              </div>

              <div className="document-card__actions">
                <button className="document-card__btn document-card__btn--download">
                  <img src={iconDownload} alt="iconDownload" />
                  Скачать
                </button>
                <button className="document-card__btn document-card__btn--read">
                  Читать
                </button>
              </div>
            </div>
          </div>
            <div className="horizontal_indentation"></div>
          <div className="container">
            <div className="backFile ">
              <img src={backFile} alt="backFile" />
            </div>
          </div>
        </section>
      </main>
      <Footer bgColor="white"/>
    </>
  );
}
