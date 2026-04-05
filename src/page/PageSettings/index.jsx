import './index.css';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Modal, Input, Form, message } from 'antd';
import {
  WarningOutlined,
} from '@ant-design/icons';
import MailIcon from '../../assets/icons/mail.svg';
import LockIcon from '../../assets/icons/lock.svg';
import WaitFor from '../../components/WaitFor';
import Loader from '../../components/Loader';


import {
  useGetCurrentUserQuery,
  useSessionsQuery,
  useChangePasswordMutation,
  useTerminateSessionMutation,
} from '../../store/api';

function PageSettings() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: user } = useGetCurrentUserQuery();

  const sessionsProvider = useSessionsQuery();
  const { data: sessions, refetch: refetchSessions, isFetching: sessionsIsFetching } = sessionsProvider;

  const [changePassword, { isLoading:changePasswordLoading, isSuccess:changePasswordSuccess}] = useChangePasswordMutation();

  const [terminateSession, { isLoading:terminateSessionLoading, isSuccess:terminateSessionSuccess}] = useTerminateSessionMutation();

  const [open, setOpen] = useState(false);

  const [form] = Form.useForm(); 
  

  useEffect(() => {
    if (changePasswordSuccess) {
      message.success(t("pageSettings_PasswordChanged"));
      setOpen(false);
    }
  }, [changePasswordSuccess])
  

  useEffect(() => {
    if (terminateSessionSuccess) {
      refetchSessions();
    }
  }, [terminateSessionSuccess])


  const onChangePasswordOpen = () => {
    form.resetFields(); 
    setOpen(true)
  }

  const onChangePasswordSave = async () => {
    form
      .validateFields()
      .then(() => {
        const {password, password_confirm} = form.getFieldsValue();
        changePassword({
          password,
          password_confirm
        });
      })
  };

  const onTerminateSession = async (session) => {
    try {
      await terminateSession({ session_key: session.session_key }).unwrap();

      if (session.is_current) {
        navigate('/login');
      }
    } catch (e) {
      console.error('Terminate session error', e);
    }
  }



  return (
    <div id="settings">

      <div className="security-title-main">
        {t('pageSettings_Security')}
      </div>
      <div className="security-divider" />

      <div className="security-row">
        <div className="security-icon">
          <img src={MailIcon} alt="email" />
        </div>

        <div className="security-text">
          <div className="security-title">
            {t('pageSettings_Email')}
          </div>
          <div className="security-desc">
            {t('pageSettings_EmailInfo1')}<br />
            {t('pageSettings_EmailInfo2')}
          </div>
        </div>

        <div className="security-controls">
          <div className="security-value">
            {user?.email}
          </div>

          <Button className="security-value-btn btn-muted">
            {t('pageSettings_Change')}
          </Button>
        </div>
      </div>

      <div className="security-row">
        <div className="security-icon">
          <img src={LockIcon} alt="password" />
        </div>

        <div className="security-text">
          <div className="security-title">
            {t('pageSettings_Password')}
          </div>
          <div className="security-desc">
            {t('pageSettings_PasswordInfo1')}<br />
            {t('pageSettings_PasswordInfo2')}
          </div>
        </div>

        <div className="security-controls">
          <Button
            className="security-value-btn btn-primary"
            onClick={onChangePasswordOpen}
          >
            {t('pageSettings_Change')}
          </Button>
        </div>
      </div>

      {/* SESSIONS */}
      <div className="sessions-block">
        <div className="sessions-title">
          {t('pageSettings_ActiveSessions')}
        </div>

        <div style={{position:'relative'}}>
        <WaitFor 
          providers={[sessionsProvider]}
          type="small"
          errorMessage={<WarningOutlined style={{color:'red'}}/>}
        >
          {sessions?.map(s => (
            <div key={s.session_key} className="session-row">
              <div>
                <div className="session-device">
                  {s.device || t('pageSettings_CurrentDevice')}
                  {s.is_current && ` ${t('pageSettings_CurrentSession')}`}
                </div>
                <div className="session-meta">
                  {s.ip_address} · {new Date(s.last_activity).toLocaleString()}
                </div>
              </div>

              <Button
                className="logout-btn"
                size="small"
                onClick={() => onTerminateSession(s)}
              >
                {t('pageSettings_Terminate')}
              </Button>
            </div>
          ))}
          {(terminateSessionLoading || sessionsIsFetching) && <Loader/>}
        </WaitFor>
        </div>

      </div>

      <Modal
        className="pageSettingsChangePasswordWnd"
        title={t('pageSettings_ChangePasswordWnd_title')}
        open={open}
        onOk={onChangePasswordSave}
        okButtonProps={{disabled:changePasswordLoading, loading:changePasswordLoading}}
        onCancel={() => setOpen(false)}
        cancelButtonProps={{disabled:changePasswordLoading, loading:changePasswordLoading}}
        okText={t('pageSettings_ChangePasswordWnd_okText')}
      >
            <Form
              form={form}
              initialValues={{}}
              autoComplete="off"
            >
              <Form.Item
                name="password"
                rules={[{ required: true, message: t("pageSettings_rule_needPassword") }]}
              >
                <Input.Password 
                  placeholder={t('pageSettings_ChangePasswordWnd_placeholder1')}
                  disabled={changePasswordLoading}
                />
              </Form.Item>

              <Form.Item
                name="password_confirm"
                dependencies={['password']}
                rules={[
                  { required: true, message: t("pageSettings_rule_needPassword") },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error(t('pageSettings_rule_PasswordMustMatch')));
                    },
                  }),
                ]}
              >
                <Input.Password 
                  placeholder={t('pageSettings_ChangePasswordWnd_placeholder2')}
                  disabled={changePasswordLoading}
                />
              </Form.Item>
            </Form>
      </Modal>
      

    </div>
  );
}

export default PageSettings;
