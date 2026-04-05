import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

export const supportedLngs = {
  ru: {
    name: "RU",
    icon: (
      <svg
        style={{ paddingTop: 2 }}
        width="15"
        height="15"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_87_38665)">
          <mask
            id="mask0_87_38665"
            style={{ maskType: "luminance" }}
            maskUnits="userSpaceOnUse"
            x="0"
            y="0"
            width="20"
            height="20"
          >
            <path
              d="M10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z"
              fill="white"
            />
          </mask>
          <g mask="url(#mask0_87_38665)">
            <path
              d="M20 6.64062V13.3594L10 14.6094L0 13.3594V6.64062L10 5.39062L20 6.64062Z"
              fill="#0052B4"
            />
            <path d="M20 0V6.64062H0V0H20Z" fill="#EEEEEE" />
            <path d="M20 13.3594V20H0V13.3594H20Z" fill="#D80027" />
          </g>
        </g>
        <defs>
          <clipPath id="clip0_87_38665">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
  },
  en: {
    name: "EN",
    icon: (
      <img
        style={{ height: 14, width: 14, borderRadius: 7 }}
        src="data:image/jpg;base64, /9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAQEBAQEBAQEBAQGBgUGBggHBwcHCAwJCQkJCQwTDA4MDA4MExEUEA8QFBEeFxUVFx4iHRsdIiolJSo0MjRERFz/2wBDAQQEBAQEBAQEBAQGBgUGBggHBwcHCAwJCQkJCQwTDA4MDA4MExEUEA8QFBEeFxUVFx4iHRsdIiolJSo0MjRERFz/wAARCAAqAEADASIAAhEBAxEB/8QAGwAAAgIDAQAAAAAAAAAAAAAAAAcDBgEEBQj/xAA1EAABAgIHBwIFAwUAAAAAAAABAgQAAwUGBxESFlYTFBVRk6HTMVciI5GS0hdBYiElRVKC/8QAGgEAAgMBAQAAAAAAAAAAAAAAAAYBBQcDBP/EADERAAAEAwMKBQUAAAAAAAAAAAABAgMEBRESIZETFBUWUVRWkpPSBjIzZoExQVNk0f/aAAwDAQACEQMRAD8AoRouTPo5m9mKnNJ0yS7nrcOydi8VLWAJbYpQSV88X7x0zV9nxZcnc6RwCcuVwr/KACRtNqRgw4L+0RtEhtQzadMG6hwwfoTOegOJLoiYkYGyMB2MwemOO0W39wNF7k62ofTF8Mxp4okbpftN6wXGX++CNHU4ojWRKOlFl8VFeK23oNotqsrcmbj3A7/JxFoz3kkLQ6vReFD+MWWqNDUPx+r8mlHDpk0cSX22fkjd5+xKwhTclIOH+lxjUbqQuXIfCdLmIbIohK3siQENGhxH4XkjB89Q/wBo6lW10QxrDVt/TlFOXFGzUUkpSpaxu7n4lpC20v5eySk+qY8UzWapfHktRWci5W15fTreLCUm4U0lxtG7lM5as5EiNytovJauqHXlazfWk76p/CDK1m+tJ31T+EGYbK9KPPtHlgzDZXpR59o8sZRRjZCYrG1VnXuTkhAZWs31pO+qfwjKas2cJIUmuk4KBvBBSCCP+IxmGyvSjz7R5YMw2V6UefaPLBRj9TFYKzo7j1k5IQI9FS6/MWqGrGpdJSXCpLhs8nYDOTPlzFAgJSQQjliTG2aqVzLhUn9P6T4Nty4Sw+PGJhlbPFt8OP8AlHpHglrOp2HbwwcEtZ1Ow7eGHHWmIP6y06/P9GZaswnEkr6jnYPNMuq9ooSifOqdSUykWwaJYuRKwiQlqSQlSAnDNv5qixVQoGu9DViomnBUN4HTdDsuVzQrZz1uMVygj0Rdf6CHpwS1nU7Dt4YOCWs6nYdvDHJ/xJEPsvM6PUjKINFpJXlUqbR2h/DsEw+y8ufyp1KFpUaFuu2VU+x0QIs0V90IjprgzRX3QiOmuJeCWs6nYdvDBwS1nU7Dt4YW6vbYrlQGazKPbvXihFmivuhEdNcGaK+6ER01xLwS1nU7Dt4YOCWs6nYdvDBV7bFcqAWZR7d68UK1lep3uIrrIgyvU73EV1kQqXqEIeukIQAkTZgAAuAuMa1w5RW5w3uyMVB/TI5goiPWOLvL8THYG/lep3uIrrIgyvU73EV1kQoLhyguHKDOW92RioToGYcRxfSY7A38r1O9xFdZEGV6ne4iusiFBcOUFw5QZy3uyMVA0DMOI4vpMdgb+V6ne4iusiDK9TvcRXWRCguHKNlkhC3rVC0ApM2WCCLwbzBnDe7IxUIVI5glJnrHF3FX0mOwf//Z"
      />
    ),
  },
};

i18n
  .use(LanguageDetector)
  // Add React bindings as a plugin.
  .use(initReactI18next)
  // Initialize the i18next instance.
  .init({
    // Config options

    // Fallback locale used when a translation is
    // missing in the active locale. Again, use your
    // preferred locale here.
    fallbackLng: "en",

    supportedLngs: Object.keys(supportedLngs),

    // Enables useful output in the browser’s
    // dev console.
    debug: true,

    // Normally, we want `escapeValue: true` as it
    // ensures that i18next escapes any code in
    // translation messages, safeguarding against
    // XSS (cross-site scripting) attacks. However,
    // React does this escaping itself, so we turn
    // it off in i18next.
    interpolation: {
      escapeValue: false,
    },

    resources: {
      en: {
        translation: {
          pageLogin_Wellcome: "Welcome",
          pageLogin_LoginToContinue: "Log in to continue",
          pageLogin_Login: "Login",
          pageLogin_Password: "Password",
          pageLogin_Submit: "Signin",
          pageLogin_Signup: "Signup",
          pageLogin_rule_needLogin: "Login needed",
          pageLogin_rule_needPassword: "Password needed",

          pageSignup_Email: "Email",
          pageSignup_Password: "Password",
          pageSignup_Password_Repeat: "Repeat Password",
          pageSignup_Signup: "Signup",
          pageSignup_Submit: "Signin",
          pageSignup_rule_needEmail: "Email needed",
          pageSignup_rule_needPassword: "Password needed",
          pageSignup_rule_PasswordMustMatch: "Passwords must match",
          pageSignup_Succeded: "Registration was successful",

          pageOTP_ConfirmationTitle: "Email confirmation",
          pageOTP_SubmitCode: "Submit code that you recieved at {{email}}",
          pageOTP_Submit: "Submit",
          pageOTP_DidntRecieveCode: "Didn't receive the code?",
          pageOTP_RequestAgain: "Request the code again",
          pageOTP_CodeWasSentAgain: "The code was sent again",

          pageLayout_Title: "Personal Account",
          pageLayout_Dashboard: "Dashboard",
          pageLayout_Exchange: "Exchange",
          pageLayout_History: "History",
          pageLayout_Settings: "Settings",
          pageLayout_Partnership: "Partnership",
          pageLayout_Support: "Support",
          pageLayout_Logout: "Logout",

          pageDashboard_table_col_Сurrency: "Сurrency",
          pageDashboard_table_col_Avaliable: "Avaliable",
          pageDashboard_table_col_Frozen: "Frozen",
          pageDashboard_table_col_Rate: "Rate",
          pageDashboard_Wallet: "Wallet",
          pageDashboard_TotalBalance: "Total balance",
          pageDashboard_Send: "Send",
          pageDashboard_Recieve: "Recieve",
          pageDashboard_Exchange: "Exchange",

          pageExchange_Exchange: "Exchange",
          pageExchange_YoureSpending: "You're spending",
          pageExchange_YouWillReceive: "You will receive",
          pageExchange_button_Exchange: "Exchange",
          pageExchange_You_can_exchange_a_maximum_of:
            "You can exchange a maximum of",
          pageExchange_Set_Max_Amount: "Set max",

          pageExchange_comment1:
            "Pairs of the same coin allow you to send transactions privately, hiding your balance and history from the recipient.",
          pageExchange_comment2: "Note:",
          pageExchange_comment3:
            "such transactions may still be subject to AML/KYC checks",
          pageExchange_PairsNotFound: "Pairs not found",
          pageExchange_Impossible:
            "The exchange cannot be made, there are no exchange pairs",

          pageHistory_Title: "History",
          pageHistory_Balance: "Balance",
          pageHistory_Send: "Send",
          pageHistory_Recieve: "Recieve",
          pageHistory_Exchange: "Exchange",
          pageHistory_TransactioHistory: "Transaction history",
          pageHistory_filter_Category: "Category",
          pageHistory_filter_Category_opt_all: "All",
          pageHistory_filter_Category_opt_conv: "Conversion",
          pageHistory_filter_Category_opt_in: "Deposit",
          pageHistory_filter_Category_opt_out: "Withdraw",
          pageHistory_filter_Status: "Status",
          pageHistory_filter_Status_opt_all: "All",
          pageHistory_filter_Status_opt_wait: "Pending",
          pageHistory_filter_Status_opt_done: "Done",
          pageHistory_filter_Status_opt_frozen: "Frozen",
          pageHistory_filter_Status_opt_refunded: "Refund",
          pageHistory_filter_Search: "Search",
          pageHistory_filter_Search_placholder: "id, hash, address, or label",
          pageHistory_table_col_Date: "Creation Date",
          pageHistory_table_col_Category: "Category",
          pageHistory_table_col_Status: "Status",
          pageHistory_table_col_Sum: "Amount",
          pageHistory_table_col_Comission: "Fee",
          pageHistory_table_col_Address: "Address",

          pageWalletModal_ReplenishTitle: "Deposit",
          pageWalletModal_WithdrawTitle: "Withdraw",
          pageWalletModal_Withdraw: "Withdraw",
          pageWalletModal_Confirm: "Confirm",
          pageWalletModal_WalletAddress: "Wallet address",
          pageWalletModal_Amount: "Amount",
          pageWalletModal_SelectCurrent: "Select current",
          pageWalletModal_ConfirmationCode: "Confirmation code",
          pageWalletModal_MinimumDepositAmount: "Minimum deposit amount",
          pageWalletModal_AddressCopied: "The Address has been copied",
          pageWalletModal_WithdrawalConfirmed:
            "The withdrawal has been confirmed",

          pageSettings_Security: "Security",
          pageSettings_Change: "Change",
          pageSettings_ActiveSessions: "Active sessions",
          pageSettings_Terminate: "Terminate",
          pageSettings_CurrentSession: "(current)",
          pageSettings_CurrentDevice: "Current device",
          pageSettings_Password: "Password",
          pageSettings_PasswordInfo1: "Used for authorization.",
          pageSettings_PasswordInfo2: "We recommend using a strong password.",
          pageSettings_Email: "Email",
          pageSettings_EmailInfo1: "Used to log in to the system.",
          pageSettings_EmailInfo2: "Can be connected only once.",
          pageSettings_ChangePasswordWnd_title: "Change password",
          pageSettings_ChangePasswordWnd_okText: "Save",
          pageSettings_ChangePasswordWnd_placeholder1: "New password",
          pageSettings_ChangePasswordWnd_placeholder2: "Repeat new password",
          pageSettings_rule_needPassword: "Password needed",
          pageSettings_rule_PasswordMustMatch: "Passwords must match",
          pageSettings_PasswordChanged: "Password was changed successfully",
          pageSignup_ToHome: "⬅ Go to Home",
          pageLogin_NoAccount: "Don't have an account yet?",
          pageSignup_HaveAccount: "Already have an account?",
        },
      },
      ru: {
        translation: {
          pageLogin_Wellcome: "Добро пожаловать",
          pageLogin_LoginToContinue: "Войдите в аккаунт, чтобы продолжить",
          pageLogin_Login: "Логин",
          pageLogin_Password: "Пароль",
          pageLogin_Submit: "Войти",
          pageLogin_Signup: "Регистрация",
          pageLogin_rule_needLogin: "Необходимо ввести логин",
          pageLogin_rule_needPassword: "Необходимо ввести пароль",

          pageSignup_Email: "Почта",
          pageSignup_Password: "Пароль",
          pageSignup_Password_Repeat: "Повторите пароль",
          pageSignup_Signup: "Регистрация",
          pageSignup_Submit: "Войти",
          pageSignup_rule_needEmail: "Необходимо ввести емейл",
          pageSignup_rule_needPassword: "Необходимо ввести пароль",
          pageSignup_rule_PasswordMustMatch: "Пароли должны совпадать",
          pageSignup_Succeded: "Регистрация прошла успешно",

          pageOTP_ConfirmationTitle: "Подтверждение входа",
          pageOTP_SubmitCode: "Введите код, отправленный на почту {{email}}",
          pageOTP_Submit: "Войти",
          pageOTP_DidntRecieveCode: "Не пришел код?",
          pageOTP_RequestAgain: "Запросить код повторно",
          pageOTP_CodeWasSentAgain: "Код был выслан повторно",

          pageLayout_Title: "Личный кабинет",
          pageLayout_Dashboard: "Кошелек",
          pageLayout_Exchange: "Обмен",
          pageLayout_History: "История",
          pageLayout_Settings: "Настройки",
          pageLayout_Partnership: "Партнерство",
          pageLayout_Support: "Поддержка",
          pageLayout_Logout: "Выход",

          pageDashboard_table_col_Сurrency: "Валюта",
          pageDashboard_table_col_Avaliable: "Доступно",
          pageDashboard_table_col_Frozen: "Заморожено",
          pageDashboard_table_col_Rate: "Курс",
          pageDashboard_Wallet: "Кошелек",
          pageDashboard_TotalBalance: "Общий баланс",
          pageDashboard_Send: "Отправить",
          pageDashboard_Recieve: "Получить",
          pageDashboard_Exchange: "Конвертация",

          pageExchange_Exchange: "Обмен",
          pageExchange_YoureSpending: "Вы тратите",
          pageExchange_YouWillReceive: "Вы получите",
          pageExchange_button_Exchange: "Обменять",
          pageExchange_You_can_exchange_a_maximum_of:
            "Вы можете обменять максимум",
          pageExchange_Set_Max_Amount: "Поставить",
          pageExchange_comment1:
            "Пары одной и то же монеты позволяют приватно отправлять транзакции, скрывая ваш баланс и историю от получателя.",
          pageExchange_comment2: "Примечание:",
          pageExchange_comment3:
            "такие транзакции все еще могут подлежать AML/KYC проверкам",
          pageExchange_PairsNotFound: "Пары для обмена не найдены",
          pageExchange_Impossible:
            "Обмен не может быть произведен, отсутствуют пары обмена",

          pageHistory_Title: "История",
          pageHistory_Balance: "Баланс",
          pageHistory_Send: "Отправить",
          pageHistory_Recieve: "Получить",
          pageHistory_Exchange: "Конвертация",
          pageHistory_TransactioHistory: "История транзакций",
          pageHistory_filter_Category: "Категория",
          pageHistory_filter_Category_opt_all: "Все",
          pageHistory_filter_Category_opt_conv: "Конвертация",
          pageHistory_filter_Category_opt_in: "Депозит",
          pageHistory_filter_Category_opt_out: "Вывод",
          pageHistory_filter_Status: "Статус",
          pageHistory_filter_Status_opt_all: "Все",
          pageHistory_filter_Status_opt_wait: "В процессе",
          pageHistory_filter_Status_opt_done: "Выполнено",
          pageHistory_filter_Status_opt_frozen: "Заморожено",
          pageHistory_filter_Status_opt_refunded: "Возврат",
          pageHistory_filter_Search: "Поиск",
          pageHistory_filter_Search_placholder: "id, хэш, адрес или метка",
          pageHistory_table_col_Date: "Дата создания",
          pageHistory_table_col_Category: "Категория",
          pageHistory_table_col_Status: "Статус",
          pageHistory_table_col_Sum: "Сумма",
          pageHistory_table_col_Comission: "Комиссия",
          pageHistory_table_col_Address: "Адрес",

          pageWalletModal_ReplenishTitle: "Пополнить",
          pageWalletModal_WithdrawTitle: "Вывод",
          pageWalletModal_Withdraw: "Вывести",
          pageWalletModal_Confirm: "Подтвердить",
          pageWalletModal_WalletAddress: "Адрес кошелька",
          pageWalletModal_Amount: "Сумма",
          pageWalletModal_SelectCurrent: "Выберите валюту",
          pageWalletModal_ConfirmationCode: "Код подтверждения",
          pageWalletModal_MinimumDepositAmount: "Минимальная сумма депозита",
          pageWalletModal_AddressCopied: "Адрес скопирован",
          pageWalletModal_WithdrawalConfirmed: "Вывод подтверждён",

          pageSettings_Security: "Безопасность",
          pageSettings_Change: "Изменить",
          pageSettings_ActiveSessions: "Активные сессии",
          pageSettings_Terminate: "Завершить",
          pageSettings_CurrentSession: "(текущая)",
          pageSettings_CurrentDevice: "Текущее устройство",
          pageSettings_Password: "Пароль",
          pageSettings_PasswordInfo1: "Используется для авторизации.",
          pageSettings_PasswordInfo2:
            "Рекомендуем использовать надежный пароль.",
          pageSettings_Email: "Email",
          pageSettings_EmailInfo1: "Используется для входа в систему.",
          pageSettings_EmailInfo2: "Может быть подключен только один раз.",
          pageSettings_ChangePasswordWnd_title: "Смена пароля",
          pageSettings_ChangePasswordWnd_okText: "Сохранить",
          pageSettings_ChangePasswordWnd_placeholder1: "Новый пароль",
          pageSettings_ChangePasswordWnd_placeholder2: "Повторите пароль",
          pageSettings_rule_needPassword: "Необходимо ввести пароль",
          pageSettings_rule_PasswordMustMatch: "Пароли должны совпадать",
          pageSettings_PasswordChanged: "Пароль был успешно изменен",
          pageSignup_ToHome: "⬅ Перейти на главную",
          pageLogin_NoAccount: "Еще нет аккаунта?",
          pageSignup_HaveAccount: "Уже есть аккаунт?",
        },
      },
    },
  });

export default i18n;
