import './index.css';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { Button, Table } from 'antd';
import { useTranslation } from "react-i18next";
import { useMemo } from 'react';
import {
  WarningOutlined,
  DoubleRightOutlined,
} from '@ant-design/icons';
import {
  useGetCurrentUserQuery,
  useWalletsQuery,
} from '../../store/api';
import WalletModal from '../../widget/WalletModal';
import { coin2name } from '../../components/utils.component';
import WaitFor from '../../components/WaitFor';



function PageDashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [modal, setModal] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState('BTC');

  const [isMobile, setIsMobile] = useState(
    window.matchMedia('(max-width: 768px)').matches
  );

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)');
    const listener = () => setIsMobile(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  const walletsProvider = useWalletsQuery();
  const { data, isError, isLoading } = walletsProvider;

  const { data: currentUser } = useGetCurrentUserQuery();

  const onExchangeClick = () => {
    navigate('/app/exchange')
  }

  const onCoinClick = (coin) => {
    navigate(`/app/history/${coin}`)
  }

  const formatRub = (number) => {
    return number.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }

  const fmtN = (number, minFracDigits, maxFracDigits) => {
    try {
      number = (+number).toLocaleString('ru-RU', {
        minimumFractionDigits: minFracDigits,
        maximumFractionDigits: maxFracDigits
      })
    } catch (e) { }
    return number;
  }
  


  //console.log('data', data);

  const dataSource = useMemo(() => {
    let ret = []
    if (!isError && !isLoading) {
      ret = (data || []).map((w, idx) => {
        return {
          key: "" + idx,
          coin_code: w.coin,
          name: coin2name(w.coin?.toUpperCase()),
          avaliable: w.available_balance?.original || 0,
          avaliable_converted: w.available_balance?.converted ?? 0,
          frozen: w.frozen_balance?.original ?? '0',
          frozen_converted: w.frozen_balance?.converted ?? '0',
          rate: w.rate,
        }
      })
    }
    return ret;
  }, [data, isError, isLoading])

  const totalBalance = useMemo(() => {
  if (!Array.isArray(data)) return 0;

  return data.reduce((sum, w) => {
    console.log(
      w.coin,
      "available:", w.available_balance?.converted,
      "frozen:", w.frozen_balance?.converted
    );

    const available = Number(w.available_balance?.converted);
    const frozen = Number(w.frozen_balance?.converted);

    return sum + (available || 0) + (frozen || 0);
  }, 0);
}, [data]);

  console.log("wallets data:", data);
console.log("totalBalance:", totalBalance);


  const columns = useMemo(() => [
  {
    title: t("pageDashboard_table_col_Сurrency"),
    dataIndex: 'name',
    key: 'name',
    render: (value) => (
      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute',
          top: 2,
          width: 26,
          height: 26,
          lineHeight: 0
        }}>
          {value?.icon}
        </div>
        <div style={{ paddingLeft: 35, fontSize: 10, fontWeight: 600 }}>
          {value?.name1}
        </div>
        <div style={{ paddingLeft: 35, fontSize: 10, color: 'grey' }}>
          {value?.name2}
        </div>
      </div>
    )
  },
  {
    title: t("pageDashboard_table_col_Avaliable"),
    dataIndex: 'avaliable',
    key: 'avaliable',
    render: (value, record) => {
      const maxFracDigits =
        record.coin_code === 'BTC'
          ? 8
          : ['ETH', 'BNB', 'XMR', 'BCH'].includes(record.coin_code)
          ? 4
          : 2

      const amount =
        record.avaliable_converted != null
          ? fmtN(record.avaliable_converted, 0, maxFracDigits)
          : '0'

      return (
        <>
          <div style={{ fontSize: 10, fontWeight: 500 }}>
            {value} {record.name.shortname}
          </div>
          {record.avaliable_converted != null && (
            <div style={{ fontSize: 10, color: 'grey' }}>
              &#8776; {amount} {currentUser?.currency}
            </div>
          )}
        </>
      )
    }
  },
  {
    title: t("pageDashboard_table_col_Frozen"),
    dataIndex: 'frozen',
    key: 'frozen',
    render: (value, record) => {
      const maxFracDigits =
        record.coin_code === 'BTC'
          ? 8
          : ['ETH', 'BNB', 'XMR', 'BCH'].includes(record.coin_code)
          ? 4
          : 2

      const amount =
        record.frozen_converted != null
          ? fmtN(record.frozen_converted, 0, maxFracDigits)
          : '0'

      return (
        <>
          <div style={{ fontSize: 10, fontWeight: 500 }}>
            {value} {record.name.shortname}
          </div>
          {record.frozen_converted != null && (
            <div style={{ fontSize: 10, color: 'grey' }}>
              &#8776; {amount} {currentUser?.currency}
            </div>
          )}
        </>
      )
    }
  },
  {
    title: t("pageDashboard_table_col_Rate"),
    dataIndex: 'rate',
    key: 'rate',
    render: (value, record) => {
      const maxFracDigits =
        ['USDT-TRC20', 'USDT-ERC20', 'USDT-BEP20', 'TRX'].includes(record.coin_code)
          ? 4
          : 2

      const amount = fmtN(value, 0, maxFracDigits)

      return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 30px' }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 500 }}>
              1 {record.name.shortname}
            </div>
            {value != null && (
              <div style={{ fontSize: 10, color: 'grey' }}>
                &#8776; {amount} {currentUser?.currency}
              </div>
            )}
          </div>
          <Button
            shape="circle"
            icon={<DoubleRightOutlined />}
            onClick={() => onCoinClick(record.coin_code)}
          />
        </div>
      )
    }
  }
], [t, currentUser])



  return (
    <div style={{ paddingLeft: 12 }} id="wallet">

      <div style={{ paddingLeft: 0, fontSize: 22, fontWeight: 400, borderBottom: '1px solid rgba(173, 173, 173, 0.3)', paddingBottom: 7 }}>{t("pageDashboard_Wallet")}</div>

      <WaitFor
        providers={[walletsProvider]}
        errorMessage={<WarningOutlined className='failed' />}
      >
        <div style={{ position: "relative", marginTop: 16, height: 125, borderRadius: 5, backgroundColor: "#5A55FF", boxShadow: "0px 4px 61.1px 0px #00000000", overflow: 'hidden' }}>

          <svg width="757" height="125" viewBox="0 0 757 167" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: -120 }}>
            <g filter="url(#filter0_f_87_38619)"><path d="M634.387 -13.8095C763.941 -37.5914 802.645 -162.692 805.803 -222.27C760.775 -226.256 667.974 -222.331 656.997 -174.742C643.276 -115.256 550.203 -15.2456 423.74 -54.9862C297.278 -94.7268 191.754 50.2775 165.239 123.36C138.724 196.444 -195.719 261.644 -140.665 260.086C-85.6116 258.529 174.629 272.189 271.188 123.57C367.747 -25.0492 472.445 15.918 634.387 -13.8095Z" fill="#3632FD" /></g>
            <defs>
              <filter id="filter0_f_87_38619" x="-178.774" y="-255.445" width="1016.58" height="547.559" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="16" result="effect1_foregroundBlur_87_38619" />
              </filter>
            </defs>
          </svg>

          <svg width="757" height="125" viewBox="0 0 757 167" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", left: -90 }}>
            <g filter="url(#filter0_f_87_38618)"><path d="M147.751 111.807C24.3706 156.031 8.7952 285.514 16.4301 344.727C61.5229 341.429 152.267 322.67 154.499 274.015C157.29 213.196 230.97 99.713 362.763 118.579C494.556 137.445 572.389 -22.3726 585.335 -98.6419C598.281 -174.911 916.101 -292.826 862.129 -282.457C808.156 -272.088 549.235 -243.788 480.889 -81.8467C412.542 80.0944 301.977 56.5272 147.751 111.807Z" fill="#3632FD" /></g>
            <defs>
              <filter id="filter0_f_87_38618" x="-17.1855" y="-315.097" width="917.479" height="691.824" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                <feGaussianBlur stdDeviation="16" result="effect1_foregroundBlur_87_38618" />
              </filter>
            </defs>
          </svg>

          <div style={{ position: "absolute", top: 13, left: 17, color: "#fff" }}>{t("pageDashboard_TotalBalance")}</div>
          <div style={{ position: "absolute", top: 43, left: 17, color: "#fff", fontSize: 28 }}>{formatRub(totalBalance)} {currentUser?.currency || "???"}</div>
          <div
            style={{
              position: isMobile ? 'static' : 'absolute',
              right: isMobile ? 'auto' : 12,
              top: isMobile ? 'auto' : 12,

              paddingTop: 12,
              paddingRight: 12,

              display: 'flex',
              flexDirection: 'column',
              gap: 8,
            }}
          >


            <div className="wallet-actions">
              <div className="wallet-actions-row">
                <Button
                  className="blackButton"
                  onClick={() => {
                    setSelectedCoin('BTC');
                    setModal('withdraw');
                  }}
                  icon={
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M1 15H19V19H1V15ZM1 8H19V12H1V8Z"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13 4L10 1L7 4M10 1V8"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                >
                  {t('pageDashboard_Send')}
                </Button>

                <Button
                  className="blackButton"
                  onClick={() => {
                    setSelectedCoin('BTC');
                    setModal('deposit');
                  }}
                  icon={
                    <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M1 5H19V1H1V5ZM1 12H19V8H1V12Z"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13 16L10 19L7 16M10 19V12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  }
                >
                  {t('pageDashboard_Recieve')}
                </Button>
              </div>

              <Button
                className="blueButton wallet-exchange-btn"
                onClick={onExchangeClick}
                icon={
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect
                      x="1"
                      y="1"
                      width="18"
                      height="18"
                      rx="3"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M6 8H14L11 5M14 12H6L9 15"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                }
              >
                {t('pageDashboard_Exchange')}
              </Button>
            </div>

          </div>
        </div>

        <div style={{ paddingTop: 4 }}>
          <Table dataSource={dataSource} columns={columns} pagination={false} />
        </div>

        <WalletModal
          open={!!modal}
          onClose={() => setModal(null)}
          type={modal}
          coin={selectedCoin}
          lockCoin={false}
          wallets={data}
        />

      </WaitFor>
    </div>
  )
}

export default PageDashboard;
