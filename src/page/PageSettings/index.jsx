// import './index.css';

// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next';
// import { Button, Modal, Input, Form, message } from 'antd';
// import {
//   WarningOutlined,
// } from '@ant-design/icons';
// import MailIcon from '../../assets/icons/mail.svg';
// import LockIcon from '../../assets/icons/lock.svg';
// import WaitFor from '../../components/WaitFor';
// import Loader from '../../components/Loader';


// import {
//   useGetCurrentUserQuery,
//   useSessionsQuery,
//   useChangePasswordMutation,
//   useTerminateSessionMutation,
// } from '../../store/api';

// function PageSettings() {
//   const { t } = useTranslation();
//   const navigate = useNavigate();

//   const { data: user } = useGetCurrentUserQuery();

//   const sessionsProvider = useSessionsQuery();
//   const { data: sessions, refetch: refetchSessions, isFetching: sessionsIsFetching } = sessionsProvider;

//   const [changePassword, { isLoading:changePasswordLoading, isSuccess:changePasswordSuccess}] = useChangePasswordMutation();

//   const [terminateSession, { isLoading:terminateSessionLoading, isSuccess:terminateSessionSuccess}] = useTerminateSessionMutation();

//   const [open, setOpen] = useState(false);

//   const [form] = Form.useForm(); 
  

//   useEffect(() => {
//     if (changePasswordSuccess) {
//       message.success(t("pageSettings_PasswordChanged"));
//       setOpen(false);
//     }
//   }, [changePasswordSuccess])
  

//   useEffect(() => {
//     if (terminateSessionSuccess) {
//       refetchSessions();
//     }
//   }, [terminateSessionSuccess])


//   const onChangePasswordOpen = () => {
//     form.resetFields(); 
//     setOpen(true)
//   }

//   const onChangePasswordSave = async () => {
//     form
//       .validateFields()
//       .then(() => {
//         const {password, password_confirm} = form.getFieldsValue();
//         changePassword({
//           password,
//           password_confirm
//         });
//       })
//   };

//   const onTerminateSession = async (session) => {
//     try {
//       await terminateSession({ session_key: session.session_key }).unwrap();

//       if (session.is_current) {
//         navigate('/login');
//       }
//     } catch (e) {
//       console.error('Terminate session error', e);
//     }
//   }



//   return (
//     <div id="settings">

//       <div className="security-title-main">
//         {t('pageSettings_Security')}
//       </div>
//       <div className="security-divider" />

//       <div className="security-row">
//         <div className="security-icon">
//           <img src={MailIcon} alt="email" />
//         </div>

//         <div className="security-text">
//           <div className="security-title">
//             {t('pageSettings_Email')}
//           </div>
//           <div className="security-desc">
//             {t('pageSettings_EmailInfo1')}<br />
//             {t('pageSettings_EmailInfo2')}
//           </div>
//         </div>

//         <div className="security-controls">
//           <div className="security-value">
//             {user?.email}
//           </div>

//           <Button className="security-value-btn btn-muted">
//             {t('pageSettings_Change')}
//           </Button>
//         </div>
//       </div>

//       <div className="security-row">
//         <div className="security-icon">
//           <img src={LockIcon} alt="password" />
//         </div>

//         <div className="security-text">
//           <div className="security-title">
//             {t('pageSettings_Password')}
//           </div>
//           <div className="security-desc">
//             {t('pageSettings_PasswordInfo1')}<br />
//             {t('pageSettings_PasswordInfo2')}
//           </div>
//         </div>

//         <div className="security-controls">
//           <Button
//             className="security-value-btn btn-primary"
//             onClick={onChangePasswordOpen}
//           >
//             {t('pageSettings_Change')}
//           </Button>
//         </div>
//       </div>

//       {/* SESSIONS */}
//       <div className="sessions-block">
//         <div className="sessions-title">
//           {t('pageSettings_ActiveSessions')}
//         </div>

//         <div style={{position:'relative'}}>
//         <WaitFor 
//           providers={[sessionsProvider]}
//           type="small"
//           errorMessage={<WarningOutlined style={{color:'red'}}/>}
//         >
//           {sessions?.map(s => (
//             <div key={s.session_key} className="session-row">
//               <div>
//                 <div className="session-device">
//                   {s.device || t('pageSettings_CurrentDevice')}
//                   {s.is_current && ` ${t('pageSettings_CurrentSession')}`}
//                 </div>
//                 <div className="session-meta">
//                   {s.ip_address} · {new Date(s.last_activity).toLocaleString()}
//                 </div>
//               </div>

//               <Button
//                 className="logout-btn"
//                 size="small"
//                 onClick={() => onTerminateSession(s)}
//               >
//                 {t('pageSettings_Terminate')}
//               </Button>
//             </div>
//           ))}
//           {(terminateSessionLoading || sessionsIsFetching) && <Loader/>}
//         </WaitFor>
//         </div>

//       </div>

//       <Modal
//         className="pageSettingsChangePasswordWnd"
//         title={t('pageSettings_ChangePasswordWnd_title')}
//         open={open}
//         onOk={onChangePasswordSave}
//         okButtonProps={{disabled:changePasswordLoading, loading:changePasswordLoading}}
//         onCancel={() => setOpen(false)}
//         cancelButtonProps={{disabled:changePasswordLoading, loading:changePasswordLoading}}
//         okText={t('pageSettings_ChangePasswordWnd_okText')}
//       >
//             <Form
//               form={form}
//               initialValues={{}}
//               autoComplete="off"
//             >
//               <Form.Item
//                 name="password"
//                 rules={[{ required: true, message: t("pageSettings_rule_needPassword") }]}
//               >
//                 <Input.Password 
//                   placeholder={t('pageSettings_ChangePasswordWnd_placeholder1')}
//                   disabled={changePasswordLoading}
//                 />
//               </Form.Item>

//               <Form.Item
//                 name="password_confirm"
//                 dependencies={['password']}
//                 rules={[
//                   { required: true, message: t("pageSettings_rule_needPassword") },
//                   ({ getFieldValue }) => ({
//                     validator(_, value) {
//                       if (!value || getFieldValue('password') === value) {
//                         return Promise.resolve();
//                       }
//                       return Promise.reject(new Error(t('pageSettings_rule_PasswordMustMatch')));
//                     },
//                   }),
//                 ]}
//               >
//                 <Input.Password 
//                   placeholder={t('pageSettings_ChangePasswordWnd_placeholder2')}
//                   disabled={changePasswordLoading}
//                 />
//               </Form.Item>
//             </Form>
//       </Modal>
      

//     </div>
//   );
// }

// export default PageSettings;
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
  useGetSessionsQuery,
  useResetPasswordMutation,
  useTerminateSessionMutation,
} from '../../store/api';

function PageSettings() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { data: user } = useGetCurrentUserQuery();

  // Используем правильные хуки из обновленного API
  const sessionsProvider = useGetSessionsQuery();
  const { data: sessions, refetch: refetchSessions, isFetching: sessionsIsFetching } = sessionsProvider;

  // Используем resetPassword вместо changePassword
  const [resetPassword, { isLoading: changePasswordLoading, isSuccess: changePasswordSuccess, error: changePasswordError }] = useResetPasswordMutation();

  const [terminateSession, { isLoading: terminateSessionLoading, isSuccess: terminateSessionSuccess, error: terminateSessionError }] = useTerminateSessionMutation();

  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();

  // Обработка успешной смены пароля
  useEffect(() => {
    if (changePasswordSuccess) {
      message.success(t("pageSettings_PasswordChanged"));
      setOpen(false);
      form.resetFields();
    }
  }, [changePasswordSuccess, t, form]);

  // Обработка ошибки смены пароля
  useEffect(() => {
    if (changePasswordError) {
      message.error(changePasswordError?.data?.detail || t("pageSettings_PasswordChangeError"));
    }
  }, [changePasswordError, t]);

  // Обработка успешного завершения сессии
  useEffect(() => {
    if (terminateSessionSuccess) {
      message.success(t("pageSettings_SessionTerminated"));
      refetchSessions();
    }
  }, [terminateSessionSuccess, refetchSessions, t]);

  // Обработка ошибки завершения сессии
  useEffect(() => {
    if (terminateSessionError) {
      message.error(terminateSessionError?.data?.detail || t("pageSettings_TerminateError"));
    }
  }, [terminateSessionError, t]);

  const onChangePasswordOpen = () => {
    form.resetFields();
    setOpen(true);
  };

  const onChangePasswordSave = async () => {
    try {
      await form.validateFields();
      const { password, password_confirm } = form.getFieldsValue();
      
      // Используем resetPassword с правильными полями
      await resetPassword({
        password: password,
        confirm_password: password_confirm
      }).unwrap();
    } catch (error) {
      // Ошибка уже обрабатывается в useEffect
      console.error('Password change error:', error);
    }
  };

  const onTerminateSession = async (session) => {
    try {
      await terminateSession({ session_key: session.session_key }).unwrap();

      if (session.is_current) {
        // Если завершаем текущую сессию, перенаправляем на логин
        navigate('/login', { replace: true });
      }
    } catch (error) {
      console.error('Terminate session error', error);
    }
  };

  // Форматирование даты
  const formatDate = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch {
      return dateString;
    }
  };

  return (
    <div id="settings">
      <div className="security-title-main">
        {t('pageSettings_Security')}
      </div>
      <div className="security-divider" />

      {/* EMAIL SECTION */}
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
            {user?.email || '-'}
          </div>

          <Button 
            className="security-value-btn btn-muted"
            disabled={true} // Функция смены email пока не реализована в API
          >
            {t('pageSettings_Change')}
          </Button>
        </div>
      </div>

      {/* PASSWORD SECTION */}
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

      {/* SESSIONS SECTION */}
      <div className="sessions-block">
        <div className="sessions-title">
          {t('pageSettings_ActiveSessions')}
        </div>

        <div style={{ position: 'relative' }}>
          <WaitFor 
            providers={[sessionsProvider]}
            type="small"
            errorMessage={<WarningOutlined style={{ color: 'red' }} />}
          >
            {sessions && sessions.length > 0 ? (
              sessions.map(session => (
                <div key={session.session_key} className="session-row">
                  <div>
                    <div className="session-device">
                      {session.device || t('pageSettings_UnknownDevice')}
                      {session.is_current && ` (${t('pageSettings_CurrentSession')})`}
                    </div>
                    <div className="session-meta">
                      {session.ip_address || 'IP: —'} · {formatDate(session.last_activity)}
                    </div>
                  </div>

                  <Button
                    className="logout-btn"
                    size="small"
                    onClick={() => onTerminateSession(session)}
                    loading={terminateSessionLoading}
                    disabled={terminateSessionLoading}
                  >
                    {t('pageSettings_Terminate')}
                  </Button>
                </div>
              ))
            ) : (
              <div className="no-sessions">
                {t('pageSettings_NoActiveSessions')}
              </div>
            )}
            {(terminateSessionLoading || sessionsIsFetching) && <Loader />}
          </WaitFor>
        </div>
      </div>

      {/* CHANGE PASSWORD MODAL */}
      <Modal
        className="pageSettingsChangePasswordWnd"
        title={t('pageSettings_ChangePasswordWnd_title')}
        open={open}
        onOk={onChangePasswordSave}
        okButtonProps={{
          disabled: changePasswordLoading,
          loading: changePasswordLoading
        }}
        onCancel={() => setOpen(false)}
        cancelButtonProps={{
          disabled: changePasswordLoading,
          loading: changePasswordLoading
        }}
        okText={t('pageSettings_ChangePasswordWnd_okText')}
        cancelText={t('pageSettings_ChangePasswordWnd_cancelText')}
      >
        <Form
          form={form}
          initialValues={{}}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            name="password"
            label={t('pageSettings_NewPassword')}
            rules={[
              { required: true, message: t("pageSettings_rule_needPassword") },
              { min: 6, message: t("pageSettings_rule_PasswordMinLength") }
            ]}
          >
            <Input.Password 
              placeholder={t('pageSettings_ChangePasswordWnd_placeholder1')}
              disabled={changePasswordLoading}
              autoComplete="new-password"
            />
          </Form.Item>

          <Form.Item
            name="password_confirm"
            label={t('pageSettings_ConfirmPassword')}
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
              autoComplete="new-password"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default PageSettings;