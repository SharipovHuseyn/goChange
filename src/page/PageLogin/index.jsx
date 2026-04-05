// import "./index.css";

// import { useNavigate } from "react-router-dom";
// import { useRef, useEffect, useState } from "react";
// import { useTranslation } from "react-i18next";
// import { Input, Form, Button, Select } from "antd";
// import { useLoginMutation } from "../../store/api";
// import { supportedLngs } from "../../i18n/config";
// import logo from "../../../public/logo.svg";

// /**
//  * Страница логина
//  *
//  * @component pages
//  */
// function PageLogin() {
//   const navigate = useNavigate();
//   const { i18n, t } = useTranslation();
//   const ref_login = useRef();
//   const [form] = Form.useForm();
//   const [email, setEmail] = useState();

//   const useLoginMutationProvider = useLoginMutation();
//   const [login, { isLoading, data }] = useLoginMutationProvider;

//   useEffect(() => {
//     form.resetFields();
//     ref_login.current.focus();
//   }, []);

//   useEffect(() => {
//     if (data?.success) {
//       navigate("/otp", { state: { email } });
//     }
//   }, [data]);

//   const onFinish = (values) => {
//     setEmail(values.email);
//     login(values);
//   };

//   const onClickSignup = () => {
//     navigate("/signup");
//   };

//   return (
//     <div className="pageLogin">
//       <div className="header-signup">
//         <a href="/">{t("pageSignup_ToHome")}</a>
//       </div>

//       <Select
//         style={{ position: "absolute", top: 10, right: 10, width: 80 }}
//         value={i18n.resolvedLanguage}
//         onChange={(e) => i18n.changeLanguage(e)}
//         options={Object.entries(supportedLngs).map(([code, o]) => {
//           return {
//             value: code,
//             label: (
//               <span>
//                 {o.icon ? o.icon : ""}&nbsp;{o.name}
//               </span>
//             ),
//           };
//         })}
//       />
//       <div className="vertical-center">
//         <div className="login-header">
//           <div className="reg-header">
//             <div className="logo-block">
//               <a href="/">
//                 <img src={logo} alt="logo" />
//               </a>
//             </div>

//             <h1>{t("pageLogin_Wellcome")}</h1>
//           </div>
//           <p>{t("pageLogin_LoginToContinue")}</p>
//         </div>
//         <Form
//           form={form}
//           name="basic"
//           labelCol={{ span: 8 }}
//           wrapperCol={{ span: 8 }}
//           initialValues={{}}
//           onFinish={onFinish}
//           autoComplete="off"
//         >
//           <Form.Item
//             label={t("pageLogin_Login")}
//             name="email"
//             rules={[{ required: true, message: t("pageLogin_rule_needLogin") }]}
//           >
//             <Input disabled={isLoading} ref={ref_login} />
//           </Form.Item>

//           <Form.Item
//             label={t("pageLogin_Password")}
//             name="password"
//             rules={[
//               { required: true, message: t("pageLogin_rule_needPassword") },
//             ]}
//           >
//             <Input.Password disabled={isLoading} />
//           </Form.Item>

//           <Form.Item wrapperCol={{ sm: { offset: 8, span: 8 } }}>
//             <div
//               style={{
//                 display: "grid",
//                 gridTemplateColumns: "1fr 1fr",
//                 gridColumnGap: 10,
//               }}
//             >
//               <Button
//                 disabled={isLoading}
//                 loading={isLoading}
//                 type="primary"
//                 htmlType="submit"
//               >
//                 {t("pageLogin_Submit")}
//               </Button>
//               <Button
//                 disabled={isLoading}
//                 loading={isLoading}
//                 onClick={onClickSignup}
//               >
//                 {t("pageLogin_Signup")}
//               </Button>
//             </div>
//           </Form.Item>
//         </Form>
//       </div>
//     </div>
//   );
// }

// export default PageLogin;
import "./index.css";

import { useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Input, Form, Button, Select } from "antd";
import { useLoginMutation } from "../../store/api";
import { supportedLngs } from "../../i18n/config";
import logo from "../../../public/logo.svg";

/**
 * Страница логина
 *
 * @component pages
 */
function PageLogin() {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const ref_login = useRef();
  const [form] = Form.useForm();
  const [email, setEmail] = useState();

  const useLoginMutationProvider = useLoginMutation();
  const [login, { isLoading, data }] = useLoginMutationProvider;

  useEffect(() => {
    form.resetFields();
    ref_login.current.focus();
  }, []);

  useEffect(() => {
    if (data?.success) {
      navigate("/otp", { state: { email } });
    }
  }, [data]);

  const onFinish = (values) => {
    setEmail(values.email);
    login(values);
  };

  const onClickSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="pageLogin">
      <div className="header-signup">
        <a href="/">{t("pageSignup_ToHome")}</a>
      </div>

      <Select
        style={{ position: "absolute", top: 10, right: 10, width: 80 }}
        value={i18n.resolvedLanguage}
        onChange={(e) => i18n.changeLanguage(e)}
        options={Object.entries(supportedLngs).map(([code, o]) => {
          return {
            value: code,
            label: (
              <span>
                {o.icon ? o.icon : ""}&nbsp;{o.name}
              </span>
            ),
          };
        })}
      />
      <div className="vertical-center">
        <div className="login-header">
          <div className="reg-header">
            <div className="logo-block">
              <a href="/">
                <img src={logo} alt="logo" />
              </a>
            </div>

            <h1>{t("pageLogin_Wellcome")}</h1>
          </div>
          <p>{t("pageLogin_LoginToContinue")}</p>
        </div>
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
          initialValues={{}}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label={t("pageLogin_Login")}
            name="email"
            rules={[{ required: true, message: t("pageLogin_rule_needLogin") }]}
          >
            <Input disabled={isLoading} ref={ref_login} />
          </Form.Item>

          <Form.Item
            label={t("pageLogin_Password")}
            name="password"
            rules={[
              { required: true, message: t("pageLogin_rule_needPassword") },
            ]}
          >
            <Input.Password disabled={isLoading} />
          </Form.Item>

          <Form.Item wrapperCol={{ sm: { offset: 8, span: 8 } }}>
            <Button
              disabled={isLoading}
              loading={isLoading}
              type="primary"
              htmlType="submit"
              block
            >
              {t("pageLogin_Submit")}
            </Button>
          </Form.Item>

          <Form.Item wrapperCol={{ sm: { offset: 8, span: 8 } }}>
            <div style={{ textAlign: "center" }}>
              <span style={{ color: "#999", fontSize: "14px" }}>
                {t("pageLogin_NoAccount")}
              </span>{" "}
              <Button
                type="link"
                onClick={onClickSignup}
                style={{ padding: 0 }}
                disabled={isLoading}
              >
                {t("pageLogin_Signup")}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default PageLogin;
