import "./index.css";

import { useNavigate } from "react-router-dom";
import { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { notification, Input, Form, Button, Select } from "antd";
import { useSignupMutation } from "../../store/api";
import { showErrors } from "../../components/utils.component";
import { supportedLngs } from "../../i18n/config";
import logo from "../../../public/logo.svg";

/**
 * Страница регистрации
 *
 * @component pages
 */
function PageSignup() {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  const ref = useRef();

  const [signup, { isLoading, isError, data, error }] = useSignupMutation();
  const [email, setEmail] = useState();

  useEffect(() => {
    ref.current.focus();
  }, []);

  useEffect(() => {
    if (isError)
      showErrors({ message: error?.message ? error.message : "ERROR" });

    if (data?.success) {
      navigate("/otp", { state: { email, signup: true } });
      //        notification.success({
      //          description: t("pageSignup_Succeded"),
      //          duration: 10,
      //        });
    }
  }, [data, isError]);

  const onFinish = (values) => {
    setEmail(values.email);
    signup(values);
  };

  const onClickSignin = () => {
    navigate("/login");
  };

  return (
    <div className="pageSignup">
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

            <h1>{t("pageSignup_Signup")}</h1>
          </div>
        </div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
          initialValues={{}}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label={t("pageSignup_Email")}
            name="email"
            rules={[
              { required: true, message: t("pageSignup_rule_needEmail") },
            ]}
          >
            <Input disabled={isLoading} ref={ref} />
          </Form.Item>

          <Form.Item
            label={t("pageSignup_Password")}
            name="password"
            rules={[
              { required: true, message: t("pageSignup_rule_needPassword") },
            ]}
          >
            <Input.Password disabled={isLoading} />
          </Form.Item>

          <Form.Item
            label={t("pageSignup_Password_Repeat")}
            name="confirm_password"
            dependencies={["password"]}
            rules={[
              { required: true, message: t("pageSignup_rule_needPassword") },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(t("pageSignup_rule_PasswordMustMatch")),
                  );
                },
              }),
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
              {t("pageSignup_Signup")}
            </Button>
          </Form.Item>

          <Form.Item wrapperCol={{ sm: { offset: 8, span: 8 } }}>
            <div style={{ textAlign: "center" }}>
              <span style={{ color: "#999", fontSize: "14px" }}>
                {t("pageSignup_HaveAccount")}
              </span>{" "}
              <Button
                type="link"
                onClick={onClickSignin}
                style={{ padding: 0 }}
                disabled={isLoading}
              >
                {t("pageSignup_Submit")}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default PageSignup;