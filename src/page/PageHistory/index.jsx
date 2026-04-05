import './index.css';

import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { Button, Select, Input, Table } from 'antd';
import {
  SearchOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { 
  useGetTransactionsQuery,
  useGetWalletsQuery,
  useGetCurrentUserQuery 
} from '../../store/api';
import { supportedCurrencies } from '../../i18n/currencies';
import WalletModal from '../../widget/WalletModal';
import { getCoinIcon } from '../../components/utils.component';

function PageHistory() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(
    window.matchMedia('(max-width: 768px)').matches
  );

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)');
    const listener = () => setIsMobile(media.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');

  const { t } = useTranslation();
  const { coin } = useParams();
  const selectedCoin = coin || 'BTC';

  // Используем правильные хуки из обновленного API
  const { data: wallets, isLoading: walletsLoading } = useGetWalletsQuery();
  const wallet = wallets?.find(
    (w) => w.coin === selectedCoin
  );

  const {
    data,
    isLoading,
    isError,
    isFetching,
    refetch,
  } = useGetTransactionsQuery({
    coin: selectedCoin,
    page_size: 20,
    ...(categoryFilter !== 'all' && { category: categoryFilter }),
    ...(statusFilter !== 'all' && { status: statusFilter }),
  });

  const [modal, setModal] = useState(null);

  const dataSource = (data?.results || []).map((tx) => ({
    key: tx.id,
    datetime: tx.created_at,
    category: tx.category,
    coin: tx.coin,
    amount: tx.amount,
    commission: tx.commission,
    address: tx.address,
    status: tx.status,
  }));

  const filteredDataSource = useMemo(() => {
    if (!search) return dataSource;
    return dataSource.filter((tx) =>
      tx.address?.toLowerCase().includes(search.toLowerCase())
    );
  }, [dataSource, search]);

  const balanceOriginal = wallet?.available_balance?.original ?? '0';
  const balanceConverted = wallet?.available_balance?.converted ?? '0';
  const frozenOriginal = wallet?.frozen_balance?.original ?? '0';

  const CoinIcon = getCoinIcon(selectedCoin);

  const { data: currentUser } = useGetCurrentUserQuery();
  const userCurrency = currentUser?.currency || 'USD';
  const currencySymbol = supportedCurrencies[userCurrency]?.symbol || userCurrency;

  const columns = [{
    title: t("pageHistory_table_col_Date"),
    dataIndex: 'datetime',
    key: 'datetime',
    width: 110,
    render: (value) => {
      const d = new Date(value);
      return (
        <>
          <div style={{ fontWeight: 600, fontSize: 12 }}>
            {d.toLocaleDateString()}
          </div>
          <div style={{ fontSize: 12, opacity: 0.8 }}>
            {d.toLocaleTimeString()}
          </div>
        </>
      );
    },
  }, {
    title: t("pageHistory_table_col_Category"),
    dataIndex: 'category',
    key: 'category',
    width: 90,
    render: (value) => (
      <div style={{ fontSize: 10, color: "#4c47fc", fontWeight: 500, textTransform: 'capitalize' }}>
        {value === 'deposit'
          ? t("pageHistory_filter_Category_opt_in")
          : value === 'withdraw'
          ? t("pageHistory_filter_Category_opt_out")
          : value}
      </div>
    ),
  }, {
    title: t("pageHistory_table_col_Status"),
    dataIndex: 'status',
    key: 'status',
    width: 90,
    render: (value) => {
      const colors = {
        pending: '#faad14',
        confirmed: '#00c26f',
        frozen: '#ff4d4f',
        refunded: '#8c8c8c',
        completed: '#00c26f',
        cancelled: '#ff4d4f',
        waiting_payin: '#faad14',
        waiting_payout: '#faad14',
        payout_error: '#ff4d4f',
      };

      return (
        <div
          style={{
            fontSize: 10,
            borderRadius: 5,
            padding: '4px 6px',
            backgroundColor: colors[value] || '#999',
            color: '#fff',
            display: 'inline-block',
            textTransform: 'capitalize',
          }}
        >
          {value?.replace('_', ' ') || value}
        </div>
      );
    },
  }, {
    title: t("pageHistory_table_col_Sum"),
    dataIndex: 'amount',
    key: 'amount',
    width: 110,
    render: (value, record) => (
      <div style={{ fontSize: 10, fontWeight: 500 }}>
        {value} {record.coin}
      </div>
    ),
  },
  ...(!isMobile 
      ? [{
          title: t("pageHistory_table_col_Comission"),
          dataIndex: 'commission',
          key: 'commission',
          width: 110,
          render: (value, record) => <div style={{ fontSize: 10 }}>{value || '0'} {record.coin}</div>
        }] 
      : [])
  ,{
    title: t("pageHistory_table_col_Address"),
    dataIndex: 'address',
    key: 'address',
    width: 170,
    render: (value) => {
      if (!value) return '-';

      const short =
        value.length > 15
          ? value.slice(0, 6) + '...' + value.slice(-6)
          : value;

      return (
        <div style={{ fontSize: 10, fontFamily: 'monospace' }}>
          {short}
        </div>
      );
    },
  }];

  return (
    <div style={{ paddingLeft: 12, minWidth: 350 }} id="history">
      <div style={{ paddingLeft: 0, fontSize: 22, fontWeight: 400, borderBottom: '1px solid rgba(173, 173, 173, 0.3)', paddingBottom: 7 }}>
        {t("pageHistory_Title")}
      </div>

      <div
        style={{
          position: "relative",
          marginTop: 16,
          height: isMobile ? 'auto' : 125,
          paddingBottom: isMobile ? 12 : 0,
          borderRadius: 5,
          backgroundColor: "#5A55FF",
          overflow: 'hidden',
        }}
      >
        <svg width="757" height="125" viewBox="0 0 757 167" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: -120 }}>
          <g filter="url(#filter0_f_87_38619)">
            <path d="M634.387 -13.8095C763.941 -37.5914 802.645 -162.692 805.803 -222.27C760.775 -226.256 667.974 -222.331 656.997 -174.742C643.276 -115.256 550.203 -15.2456 423.74 -54.9862C297.278 -94.7268 191.754 50.2775 165.239 123.36C138.724 196.444 -195.719 261.644 -140.665 260.086C-85.6116 258.529 174.629 272.189 271.188 123.57C367.747 -25.0492 472.445 15.918 634.387 -13.8095Z" fill="#3632FD" />
          </g>
          <defs>
            <filter id="filter0_f_87_38619" x="-178.774" y="-255.445" width="1016.58" height="547.559" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="16" result="effect1_foregroundBlur_87_38619" />
            </filter>
          </defs>
        </svg>

        <svg width="757" height="125" viewBox="0 0 757 167" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", left: -90 }}>
          <g filter="url(#filter0_f_87_38618)">
            <path d="M147.751 111.807C24.3706 156.031 8.7952 285.514 16.4301 344.727C61.5229 341.429 152.267 322.67 154.499 274.015C157.29 213.196 230.97 99.713 362.763 118.579C494.556 137.445 572.389 -22.3726 585.335 -98.6419C598.281 -174.911 916.101 -292.826 862.129 -282.457C808.156 -272.088 549.235 -243.788 480.889 -81.8467C412.542 80.0944 301.977 56.5272 147.751 111.807Z" fill="#3632FD" />
          </g>
          <defs>
            <filter id="filter0_f_87_38618" x="-17.1855" y="-315.097" width="917.479" height="691.824" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="16" result="effect1_foregroundBlur_87_38618" />
            </filter>
          </defs>
        </svg>

        <div style={{ position: "absolute", top: 13, left: 17, color: "#fff" }}>
          {t("pageHistory_Balance")}:
        </div>
        <div style={{ position: "absolute", top: 35, left: 17, color: "#fff", fontSize: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {CoinIcon && <CoinIcon height={36} width={36} />}
            <span style={{ marginLeft: 6 }}>
              {balanceOriginal} {selectedCoin}
            </span>
          </div>
        </div>

        <div style={{ position: "absolute", top: 83, left: 17, color: "#fff", fontSize: 12 }}>
          ≈ {balanceConverted} {currencySymbol}
        </div>

        <div
          style={{
            position: isMobile ? 'static' : 'absolute',
            top: isMobile ? 'auto' : 12,
            right: isMobile ? 'auto' : 12,
            width: isMobile ? '100%' : 'auto',
            paddingTop: isMobile ? 12 : 0,
            paddingRight: isMobile ? 12 : 0,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <div className="wallet-actions">
            <div className="wallet-actions-row">
              <Button
                className="blackButton"
                onClick={() => setModal('withdraw')}
                icon={
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                    <path d="M1 15H19V19H1V15ZM1 8H19V12H1V8Z" fill="currentColor" />
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
                {t("pageHistory_Send")}
              </Button>

              <Button
                className="blackButton"
                onClick={() => setModal('deposit')}
                icon={
                  <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                    <path d="M1 5H19V1H1V5ZM1 12H19V8H1V12Z" fill="currentColor" />
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
                {t("pageHistory_Recieve")}
              </Button>
            </div>

            <Button
              className="blueButton wallet-exchange-btn"
              onClick={() => navigate('/app/exchange')}
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
              {t("pageHistory_Exchange")}
            </Button>
          </div>
        </div>
      </div>

      <div style={{ position: "relative", marginTop: 6, borderRadius: 5, backgroundColor: "#fff", overflow: 'hidden', paddingLeft: 15, paddingRight: 15 }}>
        <div style={{ fontWeight: 600, marginTop: 12, fontSize: 16, marginBottom: 12 }}>
          {t("pageHistory_TransactioHistory")}
        </div>
        
        <div className="history-filters">
          <div>
            <div style={{ paddingBottom: 10, fontSize: 12 }}>{t("pageHistory_filter_Category")}</div>
            <Select
              disabled={isLoading || isFetching}
              style={{ width: 130 }}
              value={categoryFilter}
              onChange={setCategoryFilter}
              options={[
                { value: "all", label: t("pageHistory_filter_Category_opt_all") },
                { value: "deposit", label: t("pageHistory_filter_Category_opt_in") },
                { value: "withdraw", label: t("pageHistory_filter_Category_opt_out") },
              ]}
            />
          </div>

          <div>
            <div style={{ paddingBottom: 10, fontSize: 12 }}>{t("pageHistory_filter_Status")}</div>
            <Select
              disabled={isLoading || isFetching}
              style={{ width: 130 }}
              value={statusFilter}
              onChange={setStatusFilter}
              options={[
                { value: "all", label: t("pageHistory_filter_Status_opt_all") },
                { value: "pending", label: t("pageHistory_filter_Status_opt_wait") },
                { value: "confirmed", label: t("pageHistory_filter_Status_opt_done") },
                { value: "frozen", label: t("pageHistory_filter_Status_opt_frozen") },
                { value: "refunded", label: t("pageHistory_filter_Status_opt_refunded") },
              ]}
            />
          </div>

          <div>
            <div style={{ paddingBottom: 10, fontSize: 12 }}>{t("pageHistory_filter_Search")}</div>
            <Input
              disabled={isLoading || isFetching}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("pageHistory_filter_Search_placholder")}
              prefix={<SearchOutlined style={{ color: "#adadad" }} />}
            />
          </div>
        </div>

        <Table
          dataSource={filteredDataSource}
          columns={columns}
          pagination={false}
          loading={isLoading || isFetching}
          scroll={{ x: 650 }}
        />
        
        {isError && <WarningOutlined className='tabledDataFailed' />}
      </div>
      
      <WalletModal
        open={!!modal}
        onClose={() => setModal(null)}
        type={modal}
        coin={selectedCoin}
        wallets={wallets || []}
      />
    </div>
  )
}

export default PageHistory;