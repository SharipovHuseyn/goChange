import './index.css';

import { useRef, useState, useEffect, useMemo } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useTranslation } from "react-i18next";
import { Input, Form, Button, Select, message } from 'antd';
import {
  useLoginConfirmMutation,
  useLoginResendCodeMutation,
  useSignupConfirmMutation,
  useSignupResendCodeMutation,
  useLazyGetCurrentUserQuery,
} from '../../store/api';
import { supportedLngs } from "../../i18n/config";



function f(n) {
  return (n<10?'0':'') + n
}


function PageOTP() {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;
  const isSignup = location.state?.signup;



  const useLoginConfirmMutationProvider = useLoginConfirmMutation();
  const useSignupConfirmMutationProvider = useSignupConfirmMutation();
  const confirm   = isSignup ? useSignupConfirmMutationProvider[0]           : useLoginConfirmMutationProvider[0]
  const isLoading = isSignup ? useSignupConfirmMutationProvider[1].isLoading : useLoginConfirmMutationProvider[1].isLoading
  const isError   = isSignup ? useSignupConfirmMutationProvider[1].isError   : useLoginConfirmMutationProvider[1].isError
  const data      = isSignup ? useSignupConfirmMutationProvider[1].data      : useLoginConfirmMutationProvider[1].data
  const error     = isSignup ? useSignupConfirmMutationProvider[1].error     : useLoginConfirmMutationProvider[1].error

  const useLoginResendCodeMutationProvider = useLoginResendCodeMutation();
  const useSignupResendCodeMutationProvider = useSignupResendCodeMutation();
  const resendCode           = isSignup ? useSignupResendCodeMutationProvider[0]           : useLoginResendCodeMutationProvider[0]
  const resendCode_isLoading = isSignup ? useSignupResendCodeMutationProvider[1].isLoading : useLoginResendCodeMutationProvider[1].isLoading  
  const resendCode_data      = isSignup ? useSignupResendCodeMutationProvider[1].data      : useLoginResendCodeMutationProvider[1].data
  const resendCode_isError   = isSignup ? useSignupResendCodeMutationProvider[1].isError   : useLoginResendCodeMutationProvider[1].isError
  const resendCode_error     = isSignup ? useSignupResendCodeMutationProvider[1].error     : useLoginResendCodeMutationProvider[1].error
  
/*
  const confirm   = ()=>{}
  const resendCode = ()=>{}
  let isLoading, isError, data, error, resendCode_isError, resendCode_error;
*/

  const [count, setCount] = useState(0);
  const [lastEventCount, setLastEventCount] = useState(undefined);
  const ref = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()]
  const [val, setVal] = useState(['', '', '', '', '', '']);


  useEffect(() => {
    if (!email) {
      navigate('/login')
    } else {
      ref[0].current.focus();
      const intervalId = setInterval(() => {
        setCount(c => c + 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, []);


  useEffect(() => {
  if (data?.success) {
    navigate('/app');
  }

  if (isError) {
    setVal(["", "", "", "", "", ""]);
    ref[0].current.focus();
  }

}, [data, isError]);



    // if (data?.success) {
      // refetchCurrentUser(); // блин а почему не срабатывает invalidatesTags в loginConfirm/signupConfirm
                            // (если без этого, то приходится два раза логиниться - после логина опять 
                            // перекидывает на логин, потому что использются закэшированные данные от 
                            // первичного неудачного GetCurrentUser, хотя invalidatesTags должен очистить кэш)
      // navigate('/')
    // }
  //}, [data, isError])


  useEffect( () => {
    if (resendCode_data?.success) {
      message.success(t("pageOTP_CodeWasSentAgain"));
    }
  }, [resendCode_data, resendCode_isLoading])

 
  const handleInputPaste = useMemo(()=>{
    return (e, index) => {
      let value = (e.clipboardData?.getData('text') || '').replace(/\D/g, "");
      let currentIndex = -1;
      for (let i=0; i<value.length && i+index<6; i++) {
        currentIndex=i+index;
        val[currentIndex] = value[i]
      }
      if (currentIndex >=0) {
        setVal([...val]);
        ref[currentIndex].current.focus();
      }
      e.preventDefault();
    }
  }, [val, setVal, ref])


  const handleInputKeyDown = useMemo(() => {
    return (e, index) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'v') {
        return;
      }

      const { value } = e.target;

      if (e.key === 'Enter') {
        onFinish();
        return;
      }

      if (e.key === 'ArrowRight' && index < 5) {
        ref[index + 1].current.focus();
        return;
      }

      if (e.key === 'ArrowLeft' && index > 0) {
        ref[index - 1].current.focus();
        return;
      }

      if (e.key === 'Tab') {
        if (e.shiftKey && index > 0) ref[index - 1].current.focus();
        if (!e.shiftKey && index < 5) ref[index + 1].current.focus();
        return;
      }

      if (e.key >= '0' && e.key <= '9') {
        val[index] = e.key;
        setVal([...val]);
        if (index < 5) ref[index + 1].current.focus();
        e.preventDefault();
        return;
      }

      if (e.key === 'Backspace') {
        if (value.length === 0 && index > 0) {
          val[index - 1] = '';
          setVal([...val]);
          ref[index - 1].current.focus();
        } else {
          val[index] = '';
          setVal([...val]);
        }
        e.preventDefault();
        return;
      }

      e.preventDefault();
    }
  }, [val, setVal, ref])


  const handleInputKeyChange = useMemo(()=>{
    return (e, index) => {
        let key = e.target.value
        if (key >= '0' && key <= '9') {
          val[index]=key
          setVal([...val]);
          if (index<5) ref[index+1].current.focus();
        } else if (key.length === 0) {
          if (key === 'Backspace' && index>0) {
            val[index-1]=''
            setVal([...val]);
            ref[index-1].current.focus();
          }
        } else {
          if (key === 'Backspace') {
            val[index]=''
            setVal([...val]);
          }
        }
    }
  }, [val, setVal, ref])


  const handleOnceAgainButtonClick = () => {
    resendCode();
    setLastEventCount(count);
  }


  const onFinish = () => {
    confirm({code:val.join('')});
  }


  let showOnceAgainButton = (count > 5)
  const COUNT_MAX = 30;
  let enableOnceAgainButton = ( (!lastEventCount && count>COUNT_MAX) || (lastEventCount && (count - lastEventCount > COUNT_MAX)))
  let secondsOnceAgainButton = (lastEventCount == null ? (COUNT_MAX - count) : COUNT_MAX - (count - lastEventCount))


  return (
    <>
    {email &&
    <div id="pageOTP">
      <Select
        style={{position:'absolute', top:10, right:10, width:80}}
        value={i18n.resolvedLanguage}
        onChange={(e) => i18n.changeLanguage(e)}
        options={Object.entries(supportedLngs).map(([code, o]) => {
          return {value:code, label:<span>{(o.icon?o.icon:'')}&nbsp;{o.name}</span>}
        })}
      />

        <div className="vertical-center">

            <Form
              name="basic"
              labelCol={{span:8}}
              wrapperCol={{ span: 8 }}
              initialValues={{}}
              onFinish={onFinish}
              autoComplete="off"
            >
              <Form.Item wrapperCol={{ sm:{offset: 8, span: 8 }}}>
                <div style={{ width: '100%', textAlign:'center', fontSize:24 }}>{t('pageOTP_ConfirmationTitle')}</div>
                <div style={{ width: '100%', textAlign:'center' }}>{t('pageOTP_SubmitCode', {email})}</div>
              </Form.Item>

              <Form.Item wrapperCol={{ sm:{offset: 8, span: 8 }}}>
                <div style={{ width: '100%', textAlign:'center'}}>
                <div style={{ display: 'inline-grid', gap: 2, gridTemplateColumns: 'repeat(6, 32px)' }}>
<Input inputmode="numeric" maxLength={1} ref={ref[0]} value={val[0]} disabled={isLoading} onKeyDown={(e) => handleInputKeyDown(e, 0)} onPaste={(e) => handleInputPaste(e, 0)} onChange={(e) => handleInputKeyChange(e, 0)} />
<Input inputmode="numeric" maxLength={1} ref={ref[1]} value={val[1]} disabled={isLoading} onKeyDown={(e) => handleInputKeyDown(e, 1)} onPaste={(e) => handleInputPaste(e, 1)} onChange={(e) => handleInputKeyChange(e, 1)} />
<Input inputmode="numeric" maxLength={1} ref={ref[2]} value={val[2]} disabled={isLoading} onKeyDown={(e) => handleInputKeyDown(e, 2)} onPaste={(e) => handleInputPaste(e, 2)} onChange={(e) => handleInputKeyChange(e, 2)} />
<Input inputmode="numeric" maxLength={1} ref={ref[3]} value={val[3]} disabled={isLoading} onKeyDown={(e) => handleInputKeyDown(e, 3)} onPaste={(e) => handleInputPaste(e, 3)} onChange={(e) => handleInputKeyChange(e, 3)} />
<Input inputmode="numeric" maxLength={1} ref={ref[4]} value={val[4]} disabled={isLoading} onKeyDown={(e) => handleInputKeyDown(e, 4)} onPaste={(e) => handleInputPaste(e, 4)} onChange={(e) => handleInputKeyChange(e, 4)} />
<Input inputmode="numeric" maxLength={1} ref={ref[5]} value={val[5]} disabled={isLoading} onKeyDown={(e) => handleInputKeyDown(e, 5)} onPaste={(e) => handleInputPaste(e, 5)} onChange={(e) => handleInputKeyChange(e, 5)} />
                </div>
                </div>
              </Form.Item>

              <Form.Item wrapperCol={{ sm:{offset: 8, span: 8 }}}>
                <Button loading={isLoading} disabled={isLoading} type="primary" htmlType="submit" style={{ width: '100%' }}>
                  {t('pageOTP_Submit')}
                </Button>
              </Form.Item>

              <Form.Item wrapperCol={{ sm:{offset: 8, span: 8 }}}>
                <div style={{visibility:(showOnceAgainButton?'visible':'hidden')}}>
                  <div style={{ width: '100%', textAlign:'center' }}>{t('pageOTP_DidntRecieveCode')}</div> 
                  <Button 
                    onClick={handleOnceAgainButtonClick} 
                    disabled={!enableOnceAgainButton||resendCode_isLoading}
                    loading={resendCode_isLoading}
                    style={{ width: '100%' }}
                  >
                    {t('pageOTP_RequestAgain')} {secondsOnceAgainButton>=0?'00:'+f(secondsOnceAgainButton) : ''}
                  </Button>
                </div>
              </Form.Item>

            </Form>
        </div>
    </div>
    }
    </>
  )
}

export default PageOTP;