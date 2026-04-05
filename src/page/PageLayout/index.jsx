import './index.css';

import { useState, useEffect, useMemo } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Layout, Menu, Flex, Select, Button, Drawer } from 'antd';
import {
  MenuOutlined,
  SwapOutlined,
  HistoryOutlined,
  ControlOutlined,
  QuestionCircleOutlined,
  WalletOutlined,
} from '@ant-design/icons';
import { supportedCurrencies } from '../../i18n/currencies';
import { supportedLngs } from "../../i18n/config";
import {
  useGetCurrentUserQuery,
  useLogoutMutation,
  useUpdateCurrencyMutation,
} from '../../store/api';
import WaitFor from '../../components/WaitFor';
import IconUser from '../../components/IconUser';

const { Header, Sider, Content } = Layout;



/**
 * Лэйаут всех страниц (меню слева и сверху)
 * 
 * @component pages
 */
function PageLayout() {
  const location = useLocation().pathname
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [currentLocation, setCurrentLocation] = useState(location);

  const [updateCurrency] = useUpdateCurrencyMutation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 768px)').matches);

  const [redirectProvider, setRedirectProvider] = useState({ isLoading: false })

  const currentUserProvider = useGetCurrentUserQuery();
  const { data, isError, isLoading, isFetching } = currentUserProvider;

  const [logout] = useLogoutMutation();

  useEffect(() => {
    const l = (location === '/'
      ? '/app/dashboard'
      : location.startsWith('/app/history')
        ? '/app/history'
        : location)
    if (currentLocation !== l) setCurrentLocation(l)
  }, [location]);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)');
    const handler = () => setIsMobile(media.matches);

    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
  if (isError) {
    navigate('/login', { replace: true });
  }
}, [isError]);




  const onCurrencyChange = async (value) => {
    updateCurrency(value);
  };

  const gotoURL = useMemo(() => {
  return (url) => {
    if ((url || '').startsWith('http')) {
      setRedirectProvider({ isLoading: true });
      window.location.href = url;
    } else {
      setCurrentLocation(url);
      navigate(url);
    }
  };
}, [navigate]);

  const items = useMemo(() => {
  return [
    {
      key: '/dashboard',
      icon: <WalletOutlined />,
      label: t('pageLayout_Dashboard'),
      onClick: () => gotoURL('/app/dashboard'),
    },
    {
      key: '/exchange',
      icon: <SwapOutlined />,
      label: t('pageLayout_Exchange'),
      onClick: () => gotoURL('/app/exchange'),
    },
    {
      key: '/history',
      icon: <HistoryOutlined />,
      label: t('pageLayout_History'),
      onClick: () => gotoURL('/app/history'),
    },
    {
      key: '/settings',
      icon: <ControlOutlined />,
      label: t('pageLayout_Settings'),
      onClick: () => gotoURL('/app/settings'),
    },
    {
      key: 'support',
      icon: <QuestionCircleOutlined />,
      label: t('pageLayout_Support'),
      onClick: () => gotoURL('http://www.google.ru'),
    },
    {
      key: 'bottom-spacer',
      style: { marginTop: 'auto', display: 'none', background: 'transparent' },
    },
    {
      key: 'logout',
      icon: (
        <svg
          style={{ position: 'relative', top: 1 }}
          height="14"
          viewBox="0 0 15 18"
          fill="#f5222d"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M7.51333 0C7.2964 0.000282707 7.08775 0.0978791 6.93 0.272848C6.77226 0.447818 6.67734 0.686953 6.66462 0.941395C6.65191 1.19584 6.72237 1.44638 6.8616 1.64183C7.00084 1.83729 7.19834 1.9629 7.41375 1.993L7.51333 2H11.7689C11.9774 2.00003 12.1786 2.08996 12.3344 2.25272C12.4902 2.41547 12.5897 2.63975 12.6141 2.883L12.62 3V15C12.62 15.2449 12.5435 15.4813 12.4049 15.6644C12.2664 15.8474 12.0755 15.9643 11.8685 15.993L11.7689 16H7.93889C7.72196 16.0003 7.51331 16.0979 7.35556 16.2728C7.19782 16.4478 7.10289 16.687 7.09018 16.9414C7.07747 17.1958 7.14793 17.4464 7.28716 17.6418C7.4264 17.8373 7.6239 17.9629 7.83931 17.993L7.93889 18H11.7689C12.4202 18 13.0469 17.7077 13.5207 17.1827C13.9946 16.6578 14.2798 15.9399 14.318 15.176L14.3223 15V3C14.3223 2.23479 14.0735 1.49849 13.6267 0.941739C13.1799 0.384993 12.5689 0.0498925 11.9187 0.00500011L11.7689 0H7.51333ZM2.65601 5.464L0.249053 8.293C0.0894928 8.48053 -0.000144005 8.73484 -0.000144005 9C-0.000144005 9.26516 0.0894928 9.51947 0.249053 9.707L2.65601 12.536C2.81571 12.7235 3.03227 12.8288 3.25805 12.8287C3.48383 12.8286 3.70032 12.7231 3.85991 12.5355C4.01951 12.3479 4.10912 12.0934 4.10904 11.8281C4.10896 11.5629 4.01919 11.3085 3.85949 11.121L2.90539 10H7.51333C7.73906 10 7.95555 9.89464 8.11516 9.70711C8.27478 9.51957 8.36445 9.26522 8.36445 9C8.36445 8.73478 8.27478 8.48043 8.11516 8.29289C7.95555 8.10536 7.73906 8 7.51333 8H2.90539L3.85949 6.879C4.01919 6.69149 4.10896 6.43712 4.10904 6.17185C4.10912 5.90658 4.01951 5.65214 3.85991 5.4645C3.70032 5.27686 3.48383 5.17139 3.25805 5.1713C3.03227 5.1712 2.81571 5.27649 2.65601 5.464Z" />
        </svg>
      ),
      label: t('pageLayout_Logout'),
      style: { borderRadius: 20, color: '#f5222d' },
      onClick: async () => {
        try {
          await logout().unwrap();
        } catch (e) {
          console.error('Logout error', e);
        } finally {
          navigate('/login', { replace: true });
        }
      },
    },
  ];
}, [t, gotoURL, logout, navigate]);


  const currencyOptions = useMemo(() => {
    return Object.entries(supportedCurrencies).map(([code, c]) => ({
      value: code,
      label: `${c.label} ${c.symbol}`,
    }))
  })

  const langOptions = useMemo(() => {
    return Object.entries(supportedLngs).map(([code, o]) => ({
      value: code,
      label: <span>{o.icon} {o.name}</span>,
    }))
  })



  return (
    <WaitFor
      providers={[currentUserProvider, redirectProvider]}
      errorMessage=' '
    >
      {isMobile &&
        <>
          <Header id="layout-page-header-mobile">
            <Button
              type="text"
              icon={<MenuOutlined style={{ fontSize: 22 }} />}
              onClick={() => setMobileMenuOpen(true)}
            />

            <div style={{ fontWeight: 600 }}>
              {t('pageLayout_Title')}
            </div>
          </Header>

          <Drawer
            placement="left"
            width={260}
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
            bodyStyle={{ padding: 0 }}
            closable={{ placement: 'end' }}
          >
            <div style={{ padding: 16, fontSize: 20, fontWeight: 600, position: 'absolute' }}>
              {t('pageLayout_Title')}
            </div>

            <Menu
              mode="inline"
              selectedKeys={[currentLocation]}
              items={items}
              onClick={() => setMobileMenuOpen(false)}
              style={{ paddingTop: 55, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', height: '100%', paddingBottom: 5 }}
            />
          </Drawer>
        </>
      }


      <Layout style={{ minHeight: '100vh' }}>
        {!isMobile && (
          <Flex gap={8} style={{ position: 'absolute', top: 10, right: 10, zIndex: 100 }}>
            {/* Валюта */}
            <Select
              style={{ width: 90 }}
              value={data?.currency}
              onChange={onCurrencyChange}
              options={currencyOptions}
            />
            {/* Язык */}
            <Select
              style={{ width: 80 }}
              value={i18n.resolvedLanguage}
              onChange={(lng) => i18n.changeLanguage(lng)}
              options={langOptions}
            />
          </Flex>
        )}

        <Layout style={{ paddingLeft: isMobile ? 0 : 35 }}>

          {!isMobile && (
            <Sider width="260" id="sider" style={{ paddingTop: isMobile ? 0 : 25 }}>
              <div className="title">{t('pageLayout_Title')}</div>
              <div className="user-data">
                <div className="user-icon"><IconUser height={22} /></div>
                <div className="user-email">{data?.email}</div>
              </div>
              <Menu
                mode="inline"
                selectedKeys={[currentLocation]}
                items={items}
                style={{ paddingTop: 137, boxSizing: 'border-box', display: 'flex', flexDirection: 'column', height: '100%' }}
              />
            </Sider>
          )}
          <Layout style={{ paddingTop: isMobile ? 0 : 25 }}>
            <Content
              style={{
                paddingLeft: 0,
                paddingRight: isMobile ? 0 : 20,
                paddingTop: isMobile ? 12 : 0,
                minHeight: '100%',
              }}
            >
              <div style={{ position: 'relative', height: '100%' }}><Outlet /></div>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </WaitFor>
  )
}

export default PageLayout;