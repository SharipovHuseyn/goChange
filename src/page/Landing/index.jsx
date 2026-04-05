import "./index.css";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRubleSign } from "react-icons/fa";
import { IoLogoEuro } from "react-icons/io5";
import { IoLogoUsd } from "react-icons/io";
import { SiTether } from "react-icons/si";
import Marquee from "react-fast-marquee"; // Добавляем импорт
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

export default function Landing() {
  const navigate = useNavigate();
  const [lang, setLang] = useState(() => {
    const savedLang = localStorage.getItem("app_lang");
    return savedLang || "ru";
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("buy");

  // Состояния для кастомных селектов
  const [spendSelectOpen, setSpendSelectOpen] = useState(false);
  const [receiveSelectOpen, setReceiveSelectOpen] = useState(false);

  // Состояния для валют
  const [selectedSpendCurrency, setSelectedSpendCurrency] = useState({
    code: "BTC",
    name: "Bitcoin",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 16 16"
        width="20"
        height="20"
      >
        <path
          fill="#f7931a"
          d="M8 16c4.4183 0 8 -3.5817 8 -8 0 -4.41828 -3.5817 -8 -8 -8C3.58172 0 0 3.58172 0 8c0 4.4183 3.58172 8 8 8Z"
        />
        <path
          fill="#ffffff"
          d="M11.5945 7.01c0.157 -1.048 -0.6415 -1.6115 -1.7325 -1.9875l0.354 -1.42 -0.864 -0.215 -0.345 1.3825c-0.227 -0.057 -0.46 -0.11 -0.6925 -0.163l0.3475 -1.3915L7.798 3l-0.354 1.4195c-0.188 -0.043 -0.373 -0.085 -0.552 -0.13l0.001 -0.0045 -1.192 -0.2975 -0.23 0.923s0.6415 0.147 0.628 0.156c0.35 0.0875 0.413 0.319 0.4025 0.503l-0.403 1.6175c0.024 0.006 0.055 0.015 0.09 0.0285l-0.0915 -0.0225 -0.565 2.266c-0.043 0.106 -0.1515 0.2655 -0.3965 0.205 0.009 0.0125 -0.62801 -0.1565 -0.62801 -0.1565l-0.429 0.989 1.12501 0.2805c0.209 0.0525 0.414 0.1075 0.6155 0.159l-0.3575 1.436 0.8635 0.215 0.354 -1.42c0.236 0.0635 0.465 0.1225 0.689 0.1785l-0.353 1.414 0.864 0.215 0.3575 -1.433c1.474 0.279 2.582 0.1665 3.0485 -1.1665 0.376 -1.073 -0.0185 -1.6925 -0.794 -2.096 0.565 -0.13 0.99 -0.5015 1.1035 -1.269Zm-1.975 2.769c-0.2665 1.0735 -2.074 0.493 -2.66 0.3475l0.475 -1.9025c0.586 0.1465 2.4645 0.436 2.185 1.555Zm0.2675 -2.7845c-0.2435 0.9765 -1.7475 0.48 -2.235 0.3585l0.43 -1.725c0.4875 0.1215 2.059 0.348 1.805 1.3665Z"
        />
      </svg>
    ),
  });

  const [selectedReceiveCurrency, setSelectedReceiveCurrency] = useState({
    code: "RUB",
    name: "Ruble",
    icon: <FaRubleSign />,
  });

  // Состояния для значений инпутов
  const [spendAmount, setSpendAmount] = useState("");
  const [receiveAmount, setReceiveAmount] = useState("");

  // Данные для криптовалютной ленты
  const cryptoData = [
    {
      name: "LTC",
      change: "-5.59%",
      changeType: "red",
      icon: "/landing/assets/images/ltc.svg",
    },
    {
      name: "XMR",
      change: "+11.5%",
      changeType: "green",
      icon: "/landing/assets/images/xmr.svg",
    },
    {
      name: "ETH",
      change: "+8.34%",
      changeType: "green",
      icon: "/landing/assets/images/eth.svg",
    },
    {
      name: "BTC",
      change: "+3.2%",
      changeType: "green",
      icon: "/landing/assets/images/btc.svg",
    },
    {
      name: "LTC",
      change: "-5.59%",
      changeType: "red",
      icon: "/landing/assets/images/ltc.svg",
    },
    {
      name: "XMR",
      change: "+11.5%",
      changeType: "green",
      icon: "/landing/assets/images/xmr.svg",
    },
    {
      name: "ETH",
      change: "+8.34%",
      changeType: "green",
      icon: "/landing/assets/images/eth.svg",
    },
    {
      name: "BTC",
      change: "+3.2%",
      changeType: "green",
      icon: "/landing/assets/images/btc.svg",
    },
    {
      name: "LTC",
      change: "-5.59%",
      changeType: "red",
      icon: "/landing/assets/images/ltc.svg",
    },
  ];

  // Курсы валют
  const exchangeRates = {
    BTC: { RUB: 4500000, USD: 50000, EUR: 46000, USDT: 50000 },
    USDT: { RUB: 90, USD: 1, EUR: 0.92, BTC: 0.00002 },
    RUB: { BTC: 0.00000022, USD: 0.011, EUR: 0.01, USDT: 0.011 },
    USD: { BTC: 0.00002, RUB: 90, EUR: 0.92, USDT: 1 },
    EUR: { BTC: 0.0000217, RUB: 97, USD: 1.09, USDT: 1.09 },
  };

  const currencies = [
    {
      code: "BTC",
      name: "Bitcoin",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 16 16"
          width="20"
          height="20"
        >
          <path
            fill="#f7931a"
            d="M8 16c4.4183 0 8 -3.5817 8 -8 0 -4.41828 -3.5817 -8 -8 -8C3.58172 0 0 3.58172 0 8c0 4.4183 3.58172 8 8 8Z"
          />
          <path
            fill="#ffffff"
            d="M11.5945 7.01c0.157 -1.048 -0.6415 -1.6115 -1.7325 -1.9875l0.354 -1.42 -0.864 -0.215 -0.345 1.3825c-0.227 -0.057 -0.46 -0.11 -0.6925 -0.163l0.3475 -1.3915L7.798 3l-0.354 1.4195c-0.188 -0.043 -0.373 -0.085 -0.552 -0.13l0.001 -0.0045 -1.192 -0.2975 -0.23 0.923s0.6415 0.147 0.628 0.156c0.35 0.0875 0.413 0.319 0.4025 0.503l-0.403 1.6175c0.024 0.006 0.055 0.015 0.09 0.0285l-0.0915 -0.0225 -0.565 2.266c-0.043 0.106 -0.1515 0.2655 -0.3965 0.205 0.009 0.0125 -0.62801 -0.1565 -0.62801 -0.1565l-0.429 0.989 1.12501 0.2805c0.209 0.0525 0.414 0.1075 0.6155 0.159l-0.3575 1.436 0.8635 0.215 0.354 -1.42c0.236 0.0635 0.465 0.1225 0.689 0.1785l-0.353 1.414 0.864 0.215 0.3575 -1.433c1.474 0.279 2.582 0.1665 3.0485 -1.1665 0.376 -1.073 -0.0185 -1.6925 -0.794 -2.096 0.565 -0.13 0.99 -0.5015 1.1035 -1.269Zm-1.975 2.769c-0.2665 1.0735 -2.074 0.493 -2.66 0.3475l0.475 -1.9025c0.586 0.1465 2.4645 0.436 2.185 1.555Zm0.2675 -2.7845c-0.2435 0.9765 -1.7475 0.48 -2.235 0.3585l0.43 -1.725c0.4875 0.1215 2.059 0.348 1.805 1.3665Z"
          />
        </svg>
      ),
    },
    { code: "USDT", name: "Tether", icon: <SiTether color="#22a095" /> },
    { code: "RUB", name: "Ruble", icon: <FaRubleSign /> },
    { code: "USD", name: "Dollar", icon: <IoLogoUsd /> },
    { code: "EUR", name: "Euro", icon: <IoLogoEuro /> },
  ];

  // Функция для расчета суммы
  const calculateReceiveAmount = (spend, fromCurrency, toCurrency) => {
    if (!spend || spend <= 0) return "";
    if (fromCurrency === toCurrency) return spend;
    const rate = exchangeRates[fromCurrency]?.[toCurrency];
    if (!rate) return "";
    return (parseFloat(spend) * rate).toFixed(2);
  };

  const calculateSpendAmount = (receive, fromCurrency, toCurrency) => {
    if (!receive || receive <= 0) return "";
    if (fromCurrency === toCurrency) return receive;
    const rate = exchangeRates[fromCurrency]?.[toCurrency];
    if (!rate) return "";
    return (parseFloat(receive) / rate).toFixed(8);
  };

  // Обработчики изменений
  const handleSpendChange = (e) => {
    const value = e.target.value;
    setSpendAmount(value);
    if (value && !isNaN(value)) {
      const calculated = calculateReceiveAmount(
        value,
        selectedSpendCurrency.code,
        selectedReceiveCurrency.code,
      );
      setReceiveAmount(calculated);
    } else {
      setReceiveAmount("");
    }
  };

  const handleReceiveChange = (e) => {
    const value = e.target.value;
    setReceiveAmount(value);
    if (value && !isNaN(value)) {
      const calculated = calculateSpendAmount(
        value,
        selectedSpendCurrency.code,
        selectedReceiveCurrency.code,
      );
      setSpendAmount(calculated);
    } else {
      setSpendAmount("");
    }
  };

  // Обработчики смены валют
  const handleSpendCurrencyChange = (currency) => {
    setSelectedSpendCurrency(currency);
    setSpendSelectOpen(false);
    if (spendAmount && !isNaN(spendAmount)) {
      const calculated = calculateReceiveAmount(
        spendAmount,
        currency.code,
        selectedReceiveCurrency.code,
      );
      setReceiveAmount(calculated);
    } else if (receiveAmount && !isNaN(receiveAmount)) {
      const calculated = calculateSpendAmount(
        receiveAmount,
        currency.code,
        selectedReceiveCurrency.code,
      );
      setSpendAmount(calculated);
    }
  };

  const handleReceiveCurrencyChange = (currency) => {
    setSelectedReceiveCurrency(currency);
    setReceiveSelectOpen(false);
    if (spendAmount && !isNaN(spendAmount)) {
      const calculated = calculateReceiveAmount(
        spendAmount,
        selectedSpendCurrency.code,
        currency.code,
      );
      setReceiveAmount(calculated);
    } else if (receiveAmount && !isNaN(receiveAmount)) {
      const calculated = calculateSpendAmount(
        receiveAmount,
        selectedSpendCurrency.code,
        currency.code,
      );
      setSpendAmount(calculated);
    }
  };

  // Обработчик кнопки рестарта
  const handleRestart = () => {
    setSpendAmount("");
    setReceiveAmount("");
  };

  // Обработчик смены таба
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "buy") {
      setSelectedSpendCurrency({
        code: "RUB",
        name: "Ruble",
        icon: <FaRubleSign />,
      });
      setSelectedReceiveCurrency({
        code: "BTC",
        name: "Bitcoin",
        icon: currencies.find((c) => c.code === "BTC")?.icon,
      });
    } else {
      setSelectedSpendCurrency({
        code: "BTC",
        name: "Bitcoin",
        icon: currencies.find((c) => c.code === "BTC")?.icon,
      });
      setSelectedReceiveCurrency({
        code: "RUB",
        name: "Ruble",
        icon: <FaRubleSign />,
      });
    }
    setSpendAmount("");
    setReceiveAmount("");
  };

  // Обработчик кнопки обмена
  const handleExchange = () => {
    if (!spendAmount || !receiveAmount) {
      alert("Пожалуйста, введите сумму для обмена");
      return;
    }
    alert(
      `Обмен ${spendAmount} ${selectedSpendCurrency.code} на ${receiveAmount} ${selectedReceiveCurrency.code}`,
    );
  };

  // Закрытие селектов при клике вне
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (spendSelectOpen && !event.target.closest(".custom-select-spend")) {
        setSpendSelectOpen(false);
      }
      if (
        receiveSelectOpen &&
        !event.target.closest(".custom-select-receive")
      ) {
        setReceiveSelectOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [spendSelectOpen, receiveSelectOpen]);

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

  const scrollToHowItWork = (e) => {
    e.preventDefault();
    scrollToSection("howItWork");
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLang(newLang);
    localStorage.setItem("app_lang", newLang);
  };

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const t = {
    ru: {
      services: "Сервисы",
      documents: "Документы",
      business: "Бизнесу",
      faq: "FAQ",
      support: "Поддержка",
      signup: "Регистрация",
      signin: "Вход",
      heroTitle: "Криптообмен",
      heroTitleSub: "нового уровня",
      heroSubtitle:
        "Точный курс. Молниеносные переводы. Полная конфиденциальность. Выберите сервис, которому",
      heroSubtitleBold: "доверяют профессионалы.",
      startNow: "Начать сейчас",
      checkRate: "Проверить курс",
      trusted: "Нам доверяют",
      users: "Пользователей",
      howWork: "Как работает",
      howWorkSub: "наш сервис",
      advantages: "Все преимущества нашего сервиса",
      simple: "Просто",
      legal: "Легально",
      crypto: "Крипто",
      products: "Продукты",
      company: "Компания",
      contacts: "Контакты",
      resources: "Прочие ресурсы",
      exchange: "Криптообменник",
      rates: "Курсы валют",
      about: "О нас",
      contactUs: "Связаться с нами",
      privacy: "Политика конфиденциальности",
      agreement: "Пользовательское соглашение",
      buy: "Купить",
      sell: "Продать",
      youSpend: "Вы тратите",
      youReceive: "Вы получите",
      exchangeBtn: "Обменять",
      trackRates: "Отслеживайте актуальные и точные курсы",
      trackRatesSub: "криптовалют на нашем сайте",
      howSubtitle: "Обмен криптовалют стал проще, чем когда-либо.",
      howSubtitleSub: "Следуйте этим простым шагам и начните",
      howSubtitleSubSub: "работу с нами уже сегодня.",
      createAccount: "Создайте аккаунт",
      verification: "Верификация",
      chooseCurrency: "Выбор валюты",
      registerText: "Зарегистрируйтесь, используя email или телефон",
      verificationText: "Проверка, чтобы обезопасить вас от мошенников",
      chooseCurrencyText: "Укажите необходимые валюты для обмена",
      simpleText: "Максимально простая",
      simpleTextSub: "и понятная торговая криптоплатформа",
      simpleTextSubSub: "с круглосуточной обратной связью",
      legalText:
        "Резидент Парка высоких технологий Республики Беларусь, соответствует Декрету №8 Президента Республики Беларусь",
      cryptoText:
        "Высокие стандарты защиты персональной информации клиентов, соблюдение политики KYS и AML",
      advantagesSubtitle:
        "Все инструменты, необходимые для криптоинвестиций и трейдинга, на одной платформе",
    },
    en: {
      services: "Services",
      documents: "Documents",
      business: "Business",
      faq: "FAQ",
      support: "Support",
      signup: "Sign up",
      signin: "Sign in",
      heroTitle: "Next-level",
      heroTitleSub: "crypto exchange",
      heroSubtitle:
        "Accurate rates. Instant transfers. Full privacy. Choose a service trusted",
      heroSubtitleBold: "by professionals.",
      startNow: "Start now",
      checkRate: "Check rate",
      trusted: "Trusted by",
      users: "Users",
      howWork: "How our service works",
      advantages: "All advantages of our service",
      simple: "Simple",
      legal: "Legal",
      crypto: "Crypto",
      products: "Products",
      company: "Company",
      contacts: "Contacts",
      resources: "Resources",
      exchange: "Crypto exchange",
      rates: "Exchange rates",
      about: "About us",
      contactUs: "Contact us",
      privacy: "Privacy policy",
      agreement: "User agreement",
      buy: "Buy",
      sell: "Sell",
      youSpend: "You spend",
      youReceive: "You receive",
      exchangeBtn: "Exchange",
      trackRates: "Track accurate and real-time",
      trackRatesSub: "crypto rates on our website",
      howSubtitle: "Crypto exchange has never been easier.",
      howSubtitleSub: "Follow these simple steps ",
      howSubtitleSubSub: "and start today.",
      createAccount: "Create an account",
      verification: "Verification",
      chooseCurrency: "Choose currency",
      registerText: "Register using email or phone",
      verificationText: "Verification to protect you from fraud",
      chooseCurrencyText: "Specify the currencies you want to exchange",
      simpleText: "A simple crypto trading",
      simpleTextSub: "and intuitive ",
      simpleTextSubSub: "platform with 24/7 support",
      legalText:
        "Resident of the High-Tech Park of the Republic of Belarus, complies with Decree No. 8 of the President of the Republic of Belarus",
      cryptoText:
        "High standards of personal data protection, KYS and AML compliance",
      advantagesSubtitle:
        "All tools for crypto investing and trading on one platform",
    },
  };

  return (
    <>
      <Header/>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="container">
          <div className="hero__content">
            <h1 className="hero__title">
              {t[lang].heroTitle} <br /> {t[lang].heroTitleSub}
            </h1>
            <div className="hero__subtitle">
              {t[lang].heroSubtitle}{" "}
              <span style={{ fontWeight: 500 }}>
                {t[lang].heroSubtitleBold}
              </span>
            </div>
            <div className="hero__btns">
              <button
                className="hero__strartnow__btn"
                onClick={() => navigate("/signup")}
              >
                {t[lang].startNow}
              </button>
              <button className="hero__check__btn">{t[lang].checkRate}</button>
            </div>
            <div className="hero__trust">
              <div className="hero__trust__title">{t[lang].trusted}</div>
              <div className="hero__trust__content">
                <div className="hero__trust__pfotos">
                  <img src="/landing/assets/images/truster.png" alt="" />
                  <img
                    src="/landing/assets/images/Truster2.png"
                    className="trust__imgfrst"
                    alt=""
                  />
                  <img
                    src="/landing/assets/images/truster3.png"
                    className="trust__imgfrst"
                    alt=""
                  />
                </div>
                <div className="trust__amount">
                  <div className="trust__amount__title">15k+</div>
                  <div className="trust__amount__users">{t[lang].users}</div>
                </div>
              </div>
              <img
                src="/landing/assets/images/hands.png"
                alt=""
                className="hands"
              />
            </div>
          </div>

          {/* FORM */}
          <div className="hero__formpart">
            <div className="fero__form__block">
              <div className="form__wrapper">
                <div className="crypto__form">
                  <div className="form__header">
                    <button
                      type="button"
                      className={`form__tab ${activeTab === "buy" ? "active" : ""}`}
                      onClick={() => handleTabChange("buy")}
                    >
                      <span className="form__tab__text">{t[lang].buy}</span>
                      <div className="form__tab__line"></div>
                    </button>
                    <button
                      type="button"
                      className={`form__tab ${activeTab === "sell" ? "active" : ""}`}
                      onClick={() => handleTabChange("sell")}
                    >
                      <span className="form__tab__text">{t[lang].sell}</span>
                      <div className="form__tab__line"></div>
                    </button>
                    <button
                      type="button"
                      className="form__restart"
                      onClick={handleRestart}
                    >
                      <img
                        src="/landing/assets/images/restart.svg"
                        alt=""
                        className="restart__icon"
                      />
                    </button>
                  </div>

                  {/* Инпут "Вы тратите" */}
                  <div className="form__input__group" style={{ zIndex: 1204 }}>
                    <label className="form__label">{t[lang].youSpend}</label>
                    <div
                      className="form__input__wrapper"
                      style={{ position: "relative" }}
                    >
                      <input
                        type="number"
                        className="form__input"
                        placeholder="0.00"
                        value={spendAmount}
                        onChange={handleSpendChange}
                        style={{ paddingRight: "120px" }}
                      />
                      <div
                        className="custom-select-spend"
                        style={{
                          position: "absolute",
                          right: "4px",
                          top: "50%",
                          transform: "translateY(-50%)",
                        }}
                      >
                        <div
                          className="custom-select-trigger"
                          onClick={() => setSpendSelectOpen(!spendSelectOpen)}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "6px 12px",
                            backgroundColor: "#fff",
                            borderRadius: "8px",
                            cursor: "pointer",
                            minWidth: "90px",
                            justifyContent: "space-between",
                            height: "32px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "16px",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              {selectedSpendCurrency.icon}
                            </span>
                            <span style={{ fontWeight: 500, fontSize: "14px" }}>
                              {selectedSpendCurrency.code}
                            </span>
                          </div>
                          <svg
                            width="10"
                            height="6"
                            viewBox="0 0 12 8"
                            fill="none"
                            style={{
                              transform: spendSelectOpen
                                ? "rotate(180deg)"
                                : "rotate(0)",
                              transition: "transform 0.3s",
                            }}
                          >
                            <path
                              d="M1 1.5L6 6.5L11 1.5"
                              stroke="#666"
                              strokeWidth="1.5"
                              fill="none"
                            />
                          </svg>
                        </div>
                        {spendSelectOpen && (
                          <div
                            className="custom-select-dropdown"
                            style={{
                              position: "absolute",
                              top: "100%",
                              right: 0,
                              marginTop: "5px",
                              backgroundColor: "#fff",
                              borderRadius: "8px",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                              zIndex: 1000,
                              minWidth: "140px",
                            }}
                          >
                            {currencies.map((currency) => (
                              <div
                                key={currency.code}
                                className="custom-select-option"
                                onClick={() =>
                                  handleSpendCurrencyChange(currency)
                                }
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "10px",
                                  padding: "10px 12px",
                                  cursor: "pointer",
                                  transition: "background-color 0.2s",
                                  borderBottom: "1px solid #f0f0f0",
                                }}
                                onMouseEnter={(e) =>
                                  (e.currentTarget.style.backgroundColor =
                                    "#fff")
                                }
                                onMouseLeave={(e) =>
                                  (e.currentTarget.style.backgroundColor =
                                    "#fff")
                                }
                              >
                                <span style={{ fontSize: "18px" }}>
                                  {currency.icon}
                                </span>
                                <span style={{ fontWeight: 500 }}>
                                  {currency.code}
                                </span>
                                <span
                                  style={{ fontSize: "12px", color: "#666" }}
                                >
                                  {currency.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Инпут "Вы получите" */}
                  <div className="form__input__group">
                    <label className="form__label">{t[lang].youReceive}</label>
                    <div
                      className="form__input__wrapper"
                      style={{ position: "relative" }}
                    >
                      <input
                        type="number"
                        className="form__input"
                        placeholder="0.00"
                        value={receiveAmount}
                        onChange={handleReceiveChange}
                        style={{ paddingRight: "120px" }}
                      />
                      <div
                        className="custom-select-receive"
                        style={{
                          position: "absolute",
                          right: "4px",
                          top: "50%",
                          transform: "translateY(-50%)",
                        }}
                      >
                        <div
                          className="custom-select-trigger"
                          onClick={() =>
                            setReceiveSelectOpen(!receiveSelectOpen)
                          }
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            padding: "6px 12px",
                            backgroundColor: "#fff",
                            borderRadius: "8px",
                            cursor: "pointer",
                            minWidth: "90px",
                            justifyContent: "space-between",
                            height: "32px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "16px",
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              {selectedReceiveCurrency.icon}
                            </span>
                            <span style={{ fontWeight: 500, fontSize: "14px" }}>
                              {selectedReceiveCurrency.code}
                            </span>
                          </div>
                          <svg
                            width="10"
                            height="6"
                            viewBox="0 0 12 8"
                            fill="none"
                            style={{
                              transform: receiveSelectOpen
                                ? "rotate(180deg)"
                                : "rotate(0)",
                              transition: "transform 0.3s",
                            }}
                          >
                            <path
                              d="M1 1.5L6 6.5L11 1.5"
                              stroke="#666"
                              strokeWidth="1.5"
                              fill="none"
                            />
                          </svg>
                        </div>
                        {receiveSelectOpen && (
                          <div
                            className="custom-select-dropdown"
                            style={{
                              position: "absolute",
                              top: "100%",
                              right: 0,
                              marginTop: "5px",
                              backgroundColor: "#fff",
                              borderRadius: "8px",
                              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                              zIndex: 1000,
                              minWidth: "140px",
                            }}
                          >
                            {currencies.map((currency) => (
                              <div
                                key={currency.code}
                                className="custom-select-option"
                                onClick={() =>
                                  handleReceiveCurrencyChange(currency)
                                }
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "10px",
                                  padding: "10px 12px",
                                  cursor: "pointer",
                                  transition: "background-color 0.2s",
                                  borderBottom: "1px solid #f0f0f0",
                                }}
                                onMouseEnter={(e) =>
                                  (e.currentTarget.style.backgroundColor =
                                    "#fff")
                                }
                                onMouseLeave={(e) =>
                                  (e.currentTarget.style.backgroundColor =
                                    "#fff")
                                }
                              >
                                <span style={{ fontSize: "18px" }}>
                                  {currency.icon}
                                </span>
                                <span style={{ fontWeight: 500 }}>
                                  {currency.code}
                                </span>
                                <span
                                  style={{ fontSize: "12px", color: "#666" }}
                                >
                                  {currency.name}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="form__submit__btn"
                    onClick={handleExchange}
                  >
                    {t[lang].exchangeBtn}
                  </button>

                  <div className="form__powered">
                    <span className="form__powered__text">Powered By</span>
                    <div className="form__logos">
                      <img
                        src="/landing/assets/formlogo/sbp.svg"
                        alt=""
                        className="form__logo sbp"
                      />
                      <img
                        src="/landing/assets/formlogo/nspk.svg"
                        alt=""
                        className="form__logo nspk"
                      />
                      <img
                        src="/landing/assets/formlogo/id.svg"
                        alt=""
                        className="form__logo id"
                      />
                      <img
                        src="/landing/assets/formlogo/tid.svg"
                        alt=""
                        className="form__logo tid"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="hero__tracker">
              <div className="hero__tracker__content">
                {t[lang].trackRates} <br />
                <span>{t[lang].trackRatesSub}</span>
              </div>
              <div className="hero__tracker__btn" onClick={scrollToHowItWork}>
                <img src="/landing/assets/images/hero__arrow.svg" alt="" />
              </div>
            </div>
          </div>
        </div>
        <img
          src="/landing/assets/images/Hero Banner.png"
          alt=""
          className="hero__back"
        />
        <div className="mob__back__hero">
          <img
            src="/landing/assets/images/heromob.png"
            alt=""
            className="hero__back__mob"
          />
        </div>
      </section>

      <section className="crypto-marquee-section relative overflow-hidden py-8 bg-[#f8f9fa]">
        <div className="container mx-auto">
          <Marquee
            speed={50}
            gradient={false}
            pauseOnHover={true}
            delay={0}
            loop={0}
          >
            {cryptoData.map((crypto, index) => (
              <div
                key={`crypto-${index}`}
                className="crypto__list__item inline-flex items-center gap-3 px-6 py-3 mx-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                style={{ minWidth: "120px" }}
              >
                <img
                  src={crypto.icon}
                  alt={crypto.name}
                  className="crypto__icon w-8 h-8"
                />
                <div className="crypto__list__title font-semibold">
                  {crypto.name}{" "}
                  <span
                    className={`crypto__span__${crypto.changeType} ${crypto.changeType === "red" ? "text-red-500" : "text-green-500"}`}
                  >
                    {crypto.change}
                  </span>
                </div>
              </div>
            ))}
          </Marquee>
        </div>
      </section>

      {/* HOW IT WORK SECTION */}
      <section id="howItWork" className="howitwork__section">
        <div className="container">
          <div className="howitwork__content">
            <div className="hoitwork__titles">
              <div className="hoitwork__title">
                {t[lang].howWork} <br />
                {t[lang].howWorkSub}
              </div>
              <div className="hoitwork__subtitle">
                {t[lang].howSubtitle}
                <br />
                {t[lang].howSubtitleSub} <br />
                {t[lang].howSubtitleSubSub}
              </div>
            </div>

            <div className="howitwork__items">
              <div className="startnow__item btn__item">
                <div
                  className="start__now__btn"
                  onClick={() => navigate("/signup")}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "translateY(-2px)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "translateY(0)")
                  }
                  onMouseDown={(e) =>
                    (e.currentTarget.style.transform = "translateY(1px)")
                  }
                  onMouseUp={(e) =>
                    (e.currentTarget.style.transform = "translateY(-2px)")
                  }
                >
                  <div>{t[lang].startNow}</div>
                  <img
                    src="/landing/assets/images/arrow.svg"
                    alt=""
                    className="start__now__arrow"
                  />
                </div>
                <img
                  src="/landing/assets/images/coins.png"
                  alt=""
                  className="start__now__coins"
                />
              </div>

              <div className="howitwork__item hwsrdt">
                <div className="hw__item__numb">01</div>
                <img
                  src="/landing/assets/images/phone1.png"
                  className="howitwor__item__back phn__frst"
                  alt=""
                />
                <div className="howitwork__item__content">
                  <div className="hw__content__title">
                    {t[lang].createAccount}
                  </div>
                  <div className="hw__content__text">
                    {t[lang].registerText}
                  </div>
                </div>
              </div>

              <div className="howitwork__item">
                <div className="hw__item__numb">02</div>
                <img
                  src="/landing/assets/images/phone2.png"
                  className="howitwor__item__back phn__scnd"
                  alt=""
                />
                <div className="howitwork__item__content">
                  <div className="hw__content__title">
                    {t[lang].verification}
                  </div>
                  <div className="hw__content__text">
                    {t[lang].verificationText}
                  </div>
                </div>
              </div>

              <div className="howitwork__item">
                <div className="hw__item__numb">03</div>
                <img
                  src="/landing/assets/images/phone3.png"
                  className="howitwor__item__back"
                  alt=""
                />
                <div className="howitwork__item__content">
                  <div className="hw__content__title">
                    {t[lang].chooseCurrency}
                  </div>
                  <div className="hw__content__text">
                    {t[lang].chooseCurrencyText}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ADVANTAGES SECTION */}
      <div id="adv" className="advantages__section">
        <div className="container">
          <div className="advantages__title">{t[lang].advantages}</div>
          <div className="advantages__subtitle">
            {t[lang].advantagesSubtitle}
          </div>

          <div className="advantages__items">
            <div
              className="advantages__item"
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-5px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
              style={{
                transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <div className="advantages__imgs">
                <div className="advantages__item__logo heaer__logo">
                  <img src="/landing/assets/images/logo.svg" alt="" />
                </div>
                <img
                  src="/landing/assets/images/comp.png"
                  alt=""
                  className="advantages__item__img"
                />
              </div>
              <div className="advantages__item__content">
                <div className="advantages__item__title">{t[lang].simple}</div>
                <div className="advantages__item__text">
                  {t[lang].simpleText} <br />
                  {t[lang].simpleTextSub} <br />
                  {t[lang].simpleTextSubSub} <br />
                </div>
              </div>
            </div>

            <div
              className="advantages__item"
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-5px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
              style={{
                transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <div className="advantages__imgs">
                <div className="advantages__item__logo heaer__logo">
                  <img src="/landing/assets/images/logo.svg" alt="" />
                </div>
                <img
                  src="/landing/assets/images/advanture.png"
                  alt=""
                  className="advantages__item__img2"
                />
              </div>
              <div className="advantages__item__content">
                <div className="advantages__item__title">{t[lang].legal}</div>
                <div className="advantages__item__text">
                  {t[lang].legalText}
                </div>
              </div>
            </div>

            <div
              className="advantages__item"
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-5px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
              style={{
                transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <div className="advantages__imgs">
                <div className="advantages__item__logo heaer__logo">
                  <img src="/landing/assets/images/logo.svg" alt="" />
                </div>
                <img
                  src="/landing/assets/images/advcoins.png"
                  alt=""
                  className="advantages__item__img3"
                />
              </div>
              <div className="advantages__item__content">
                <div className="advantages__item__title">{t[lang].crypto}</div>
                <div className="advantages__item__text">
                  {t[lang].cryptoText}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

     <Footer/>
    </>
  );
}
