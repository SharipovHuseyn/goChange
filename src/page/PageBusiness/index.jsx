import "./index.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import HeadBlock from "../../components/HeadBlock";

import cardBg from "../../assets/images/Group 2085664062.png";
import scheduleIcon from "../../assets/images/freepik__-3d-3-__4122 1 1.svg";
import icon from "../../assets/images/Vector.svg";
import emailIcon from "../../assets/images/Group.svg";
import phoneIcon from "../../assets/images/Vector-2.svg";
import tgIcon from "../../assets/images/Vector-1.svg";

import cardImg1 from "../../assets/images/freepik__ultraphotorealistic-futuristic-3d-icon-isolated-on__4130 1 1.svg";
import cardImg2 from "../../assets/images/freepik__ultraphotorealistic-futuristic-3d-icon-isolated-on__4125 1 1.svg";
import cardImg3 from "../../assets/images/freepik__an-ultrarealistic-futuristic-3d-icon-isolated-on-a__4128 1 1.svg";

export default function PageBusiness() {
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

  const handlePhoneClick = () => {
    window.location.href = "tel:+70000000000";
  };

  const handleTgClick = () => {
    window.open("https://t.me/gochange", "_blank");
  };

  const handleEmailClick = () => {
    window.location.href = "mailto:business@gochange.com";
  };

  return (
    <>
      <main className="main_business">
        <Header />
        <section>
          <div className="container page-top">
            <HeadBlock title="БИЗНЕСУ" icon={icon} />
          </div>
        </section>

        <section className="benefits">
          <div className="benefits__stats container">
            <div className="benefits__stats-left">
              <div className="stats-card stats-card--large">
                <h1 className="stats-card__title">{">50"}</h1>
                <p className="stats-card__text">
                  Операций под ВЭД сейчас проходят через криптовалюты
                </p>
              </div>
              <div className="benefits__stats-subgrid">
                <div className="stats-card stats-card--small">
                  <h1 className="stats-card__title">1000 <span>операций</span></h1>
                  <p className="stats-card__text">
                    совершается по всему миру через нашу платформу ежедневно
                  </p>
                </div>
                <div className="stats-card stats-card--small">
                  <h1 className="stats-card__title">5000+ <span>клиентов</span></h1>
                  <p className="stats-card__text">
                    Работают с экосистемой GoChange
                  </p>
                </div>
              </div>
            </div>

            <div className="stats-card--accent">
              <img src={cardBg} className="stats-card__bg" alt="cardBg" />
              <div className="stats-card__content">
                <h1 className="stats-card__title--accent">₽ 7 трл.</h1>
                <img
                  src={scheduleIcon}
                  className="stats-card__icon--accent"
                  alt="scheduleIcon"
                />
                <p className="stats-card__text--accent">
                  За 11 месяцев проведено через платформу
                </p>
              </div>
            </div>
          </div>

          <div className="benefits__services-grid container">
            <div className="service-card">
              <img
                src={cardImg1}
                className="service-card__img"
                alt="cardImg1"
              />
              <h2 className="service-card__title">
                ВЭД / Международные расчёты
              </h2>
              <p className="service-card__description">
                Доступ к ликвидности без лишних посредников. Проводите платежи
                по ВЭД быстрее, дешевле и гибче — с минимальными комиссиями и
                максимальной эффективностью.
              </p>
              <div className="service-card__contacts">
                <img
                  src={phoneIcon}
                  className="service-card__contact-icon phone__contact-icon"
                  alt="phoneIcon"
                  onClick={handlePhoneClick}
                />
                <img
                  src={tgIcon}
                  className="service-card__contact-icon __contact-icon"
                  alt="tgIcon"
                  onClick={handleTgClick}
                />
                <img
                  src={emailIcon}
                  className="service-card__contact-icon __contact-icon"
                  alt="emailIcon"
                  onClick={handleEmailClick}
                />
              </div>
            </div>

            <div className="service-card">
              <img
                src={cardImg2}
                className="service-card__img"
                alt="cardImg2"
              />
              <h2 className="service-card__title">Сотрудничество</h2>
              <p className="service-card__description">
                Мы открыты к сильным партнёрствам. Интеграции, совместные
                продукты, новые рынки — если у вас есть идея, у нас есть
                инфраструктура, чтобы масштабировать её.
              </p>
              <div className="service-card__contacts">
                <img
                  src={phoneIcon}
                  className="service-card__contact-icon phone__contact-icon"
                  alt="phoneIcon"
                  onClick={handlePhoneClick}
                />
                <img
                  src={tgIcon}
                  className="service-card__contact-icon __contact-icon"
                  alt="tgIcon"
                  onClick={handleTgClick}
                />
                <img
                  src={emailIcon}
                  className="service-card__contact-icon __contact-icon"
                  alt="emailIcon"
                  onClick={handleEmailClick}
                />
              </div>
            </div>

            <div className="service-card">
              <img
                src={cardImg3}
                className="service-card__img"
                alt="cardImg3"
              />
              <h2 className="service-card__title">Франшиза</h2>
              <p className="service-card__description">
                Запускайте свой криптосервис под собственным брендом. Наша
                технология, ликвидность и платёжная инфраструктура — ваш рост,
                ваша аудитория, ваша прибыль.
              </p>
              <div className="service-card__contacts">
                <img
                  src={phoneIcon}
                  className="service-card__contact-icon phone__contact-icon"
                  alt="phoneIcon"
                  onClick={handlePhoneClick}
                />
                <img
                  src={tgIcon}
                  className="service-card__contact-icon __contact-icon"
                  alt="tgIcon"
                  onClick={handleTgClick}
                />
                <img
                  src={emailIcon}
                  className="service-card__contact-icon __contact-icon"
                  alt="emailIcon"
                  onClick={handleEmailClick}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer bgColor="white"/>
    </>
  );
}