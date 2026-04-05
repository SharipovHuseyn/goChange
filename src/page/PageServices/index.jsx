import "./index.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import icon from "../../assets/images/Group 2085664138.svg";
import cardBackground from "../../assets/images/card.png";
import HeadBlock from "../../components/HeadBlock";

import icon01 from "../../assets/images/Group copy.svg";
import icon02 from "../../assets/images/Vector (3) copy.svg";
import icon03 from "../../assets/images/Vector (4).svg";
import icon04 from "../../assets/images/Vector (5).svg";
import faq from "../../assets/images/Vector (3).svg";
import openIcon from "../../assets/images/Group 2085664140.svg";
import closeIcon from "../../assets/images/Group 2085664140 (1).svg";

export default function PageServices() {
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

  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqData = [
    {
      question: "Как мне создать ЛК на сайте?",
      answer: <>Нажмите <a className="faq__link" href="/signup">зарегистрироваться</a> в верхнем меню и пройдите через форму валидации.</>
    },
    {
      question: "Вы работаете только с RUB?",
      answer: <>На данный момент мы поддерживаем операции с RUB, но планируем расширение списка валют.</>
    },
    {
      question: "Как мне написать в поддержку?",
      answer: <>Вы можете написать нам в онлайн-чат или на электронную почту, указанную в разделе контакты.</>
    }
  ];

  return (
    <>
      <main className="main_services">
        <Header />
        <section>
          <div className="container page-top">
            <HeadBlock title="Сервисы" icon={icon} />
          </div>
        </section>

        <section className="feature">
          <div className="container block-services">
            <div className="feature-card">
              <div className="feature-card__content">
                <img className="feature-card__icon" src={icon01} alt="icon01" />
                <h3 className="feature-card__title">Покупка криптовалюты</h3>
                <p className="feature-card__description">
                  Быстро и удобно покупайте криптовалюту за RUB. Поддержка
                  популярных способов оплаты, мгновенные операции и прозрачные
                  комиссии.
                </p>
                <button className="feature-card__button">попробовать</button>
              </div>
              <div className="feature-card__visual">
                <img
                  className="feature-card__bg-image"
                  src={cardBackground}
                  alt="cardBackground"
                />
                <p className="feature-card__number">01</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-card__content">
                <img className="feature-card__icon" src={icon02} alt="icon02" />
                <h3 className="feature-card__title">Продажа криптовалюты</h3>
                <p className="feature-card__description">
                  Обменивайте криптовалюту на рубли с выводом на банковские
                  карты или другие удобные методы. Высокая скорость обработки и
                  выгодные курсы.
                </p>
                <button className="feature-card__button">попробовать</button>
              </div>
              <div className="feature-card__visual">
                <img
                  className="feature-card__bg-image"
                  src={cardBackground}
                  alt="cardBackground"
                />
                <p className="feature-card__number">02</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-card__content">
                <img className="feature-card__icon" src={icon03} alt="icon03" />
                <h3 className="feature-card__title">Крипто-конвертация</h3>
                <p className="feature-card__description">
                  Меняйте одну криптовалюту на другую за считанные секунды. Без
                  сложных ордеров — просто, быстро и по актуальному курсу.
                </p>
                <button className="feature-card__button">попробовать</button>
              </div>
              <div className="feature-card__visual">
                <img
                  className="feature-card__bg-image"
                  src={cardBackground}
                  alt="cardBackground"
                />
                <p className="feature-card__number">03</p>
              </div>
            </div>

            <div className="feature-card">
              <div className="feature-card__content">
                <img className="feature-card__icon" src={icon04} alt="icon04" />
                <h3 className="feature-card__title">Хранение криптовалюты</h3>
                <p className="feature-card__description">
                  Надёжное хранение ваших цифровых активов в безопасном
                  кошельке. Контроль средств, высокий уровень защиты и удобный
                  интерфейс управления.
                </p>
                <button className="feature-card__button">попробовать</button>
              </div>
              <div className="feature-card__visual">
                <img
                  className="feature-card__bg-image"
                  src={cardBackground}
                  alt="cardBackground"
                />
                <p className="feature-card__number">04</p>
              </div>
            </div>
          </div>
        </section>

       <section className="faq-section">
          <div className="container">
            <HeadBlock title="FAQ" icon={faq} />
          </div>

          <div className="container faq">
            {faqData.map((item, index) => (
              <div 
                key={index} 
                className={`faq__item ${activeFaq === index ? "faq__item--active" : ""}`}
              >
                <div className="faq__header" onClick={() => toggleFaq(index)} style={{ cursor: 'pointer' }}>
                  <h3 className="faq__question">{item.question}</h3>
                  <div className="faq__icons">
                    <img
                      className="faq__icon"
                      src={activeFaq === index ? closeIcon : openIcon}
                      alt="toggleIcon"
                    />
                  </div>
                </div>
                
                {activeFaq === index && (
                  <div className="faq__content">
                    <p className="faq__answer">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
