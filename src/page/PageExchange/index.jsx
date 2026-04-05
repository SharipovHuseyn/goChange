import './index.css';

import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Space, Button, Input, Select, notification, Table } from 'antd';
import { useTranslation } from "react-i18next";
import {
  WarningOutlined,
} from '@ant-design/icons';
import {
  useWalletsQuery,
  useExchangePairsQuery,
  useExchangeValidateMutation,
  useExchangeMaxAmountQuery,
  useExchangeHistoryQuery,
  useExchangeMutation,
} from '../../store/api';
import WalletModal from '../../widget/WalletModal';
import WaitFor from '../../components/WaitFor';
import Loader from '../../components/Loader';
import { coin2name, useDebounce } from '../../components/utils.component';


const precision = 8;

function PageExchange() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const [modal, setModal] = useState(null);
  const [selectedCoin, setSelectedCoin] = useState('BTC');

  const [fromCoin, setFromCoin] = useState("BTC");
  const [toCoin, setToCoin] = useState(undefined);
  const [amount, setAmount] = useState("0");
  const debouncedAmount = useDebounce(amount);

  const [exchangeValidate, { data: exchangeValidateData, isLoading: exchangeValidateLoading }] = useExchangeValidateMutation();
  const recieveAmount = useMemo(() => {
    return (exchangeValidateData?.receive_amount ? exchangeValidateData.receive_amount : " ")
  }, [exchangeValidateData]);

  const [exchange, { data: exchangeData, isLoading: exchangeLoading }] = useExchangeMutation();

  const exchangePairsProvider = useExchangePairsQuery(
    { from_coin: fromCoin },
    { skip: !fromCoin }
  );
  const {
    data: exchangePairsOriginalData,
    isError: exchangePairsError,
    isLoading: exchangePairsLoading,
    isFetching: exchangePairsFetching,
    refetch: exchangePairsRefetch,
  } = exchangePairsProvider;
  const exchangePairsData = useMemo(() => {
    return (exchangePairsProvider.data || []).filter(e => e.available)
  }, [exchangePairsOriginalData])
  const exchangePairId = useMemo(() => {
    return (exchangePairsOriginalData || [])
      .filter(e => e.available && e.to_coin_code === toCoin)[0]?.id;
  }, [exchangePairsOriginalData, toCoin]);

  const {
    data: exchangeMaxAmountData,
    isError: exchangeMaxAmountIsError,
    isLoading: exchangeMaxAmountIsLoading,
    isFetching: exchangeMaxAmountIsFetching,
  } = useExchangeMaxAmountQuery(
    { exchange_pair: exchangePairId },
    { skip: !exchangePairId }
  );
  const maxAmount = exchangeMaxAmountData?.max_send_amount;
  const canShowSetMaxAmountButton =
    exchangePairId &&
    exchangeMaxAmountData &&
    !exchangeMaxAmountIsError &&
    !exchangeMaxAmountIsLoading &&
    !exchangeMaxAmountIsFetching;

  const walletsProvider = useWalletsQuery();
  const { data: walletsData } = walletsProvider;

  const fromCoinListOptions = useMemo(() => {
    return [{ coin: "RUB" }].concat(walletsData || []).map(w => {
      const n = coin2name(w.coin, { style: { height: 22, position: "relative", top: 5, marginRight: 5 } })
      return {
        value: w.coin,
        label: (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            {n.icon}
            <span style={{ fontWeight: 600 }}>{w.coin}</span>
          </div>
        ),
      }
    })
  }, [walletsData])

  const toCoinListOptions = useMemo(() => {
    return (exchangePairsLoading || exchangePairsFetching)
      ? [{ label: <Loader type="small" />, disabled: true }]
      : exchangePairsError
        ? [{ label: <WarningOutlined style={{ color: 'red' }} />, disabled: true }]
        : exchangePairsData.map(w => {
          const n = coin2name(w.to_coin_code, {
            style: { height: 22, position: "relative", top: 5, marginRight: 5 }
          })

          return {
            value: w.to_coin_code,
            label: (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                {n.icon}
                <span style={{ fontWeight: 600 }}>{w.to_coin_code}</span>
              </div>
            ),
          }
        })
  }, [exchangePairsOriginalData, exchangePairsError, exchangePairsLoading, exchangePairsFetching])

  const {
    data: exchangeHistoryData,
    isLoading: exchangeHistoryLoading,
    isError: exchangeHistoryError,
    isFetching: exchangeHistoryFetching,
  } = useExchangeHistoryQuery({
    page_size: 20,
  });
  const exchangeDataSource = (exchangeHistoryData?.results || []).map((ex) => ({
    key: ex.id,
    datetime: ex.created_at,
    send_amount: ex.send_amount,
    send_currency: ex.send_currency,
    receive_amount: ex.receive_amount,
    receive_currency: ex.receive_currency,
    status: ex.status,
  }));
  const exchangeColumns = [
    {
      title: 'Date',
      dataIndex: 'datetime',
      key: 'datetime',
      width: 140,
      render: (value) => {
        const d = new Date(value);
        return (
          <>
            <div style={{ fontWeight: 600, fontSize: 12 }}>
              {d.toLocaleDateString()}
            </div>
            <div style={{ fontSize: 11, opacity: 0.6 }}>
              {d.toLocaleTimeString()}
            </div>
          </>
        );
      },
    },
    {
      title: 'Exchange',
      key: 'exchange',
      width: 260,
      render: (_, record) => {
        const from = coin2name(record.send_currency);
        const to = coin2name(record.receive_currency);

        return (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              {from?.icon}
              <b>{record.send_amount}</b> {record.send_currency}
            </span>

            <span style={{ fontSize: 14, color: '#4c47fc' }}>→</span>

            <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              {to?.icon}
              <b>{record.receive_amount}</b> {record.receive_currency}
            </span>
          </div>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 130,
      render: (value) => {
        const colors = {
          waiting_payin: '#faad14',
          waiting_payout: '#faad14',
          completed: '#00c26f',
          cancelled: '#ff4d4f',
          expired: '#8c8c8c',
          payout_error: '#ff4d4f',
        };

        return (
          <div
            style={{
              background: colors[value] || '#999',
              color: '#fff',
              padding: '4px 8px',
              borderRadius: 6,
              fontSize: 11,
              display: 'inline-block',
              textTransform: 'capitalize',
            }}
          >
            {value}
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    if (!exchangePairId || !amount || Number(amount) <= 0) return;

    exchangeValidate({
      exchange_pair: exchangePairId,
      amount,
      calc_action: "send"
    });

  }, [exchangePairId, debouncedAmount])

  useEffect(() => {
    if (!toCoin && toCoinListOptions.length > 0) setToCoin(toCoinListOptions[0].value)
  }, [toCoinListOptions])


  useEffect(() => {
    if (exchangeData) {
      setAmount("");
      const btn = (
        <Space style={{ paddingTop: 15 }}>
          <Button type="link" size="small" onClick={() => api.destroy()} style={{ color: '#4c47fc' }}>
            Закрыть окно
          </Button>
          <Button type="primary" size="small" onClick={() => navigate('/app/dashboard')} style={{ backgroundColor: '#4c47fc' }}>
            Перейти в кошелек
          </Button>
        </Space>
      );
      api.success({
        message: 'Обмен',
        description: "Обмен активов произведен успешно, текущий статус " + exchangeData?.status,
        btn,
        duration: 0
      });
    }
  }, [exchangeData])

  const onChangeFromCoinHandler = value => {
    setFromCoin(value)
    setToCoin(undefined)
    exchangePairsRefetch();
  }

  const onChangeToCoinHandler = value => {
    setToCoin(value)
  }

  const onSwapFromCoinAndToCoinHandler = () => {
    setFromCoin(toCoin);
    setToCoin(fromCoin);
    exchangePairsRefetch();
  }

  const onChangeAmountHandler = e => {
    const v = e.target.value.replace(",", ".").replace(/[^0-9.]/g, "");
    const parts = v.split(".");
    const val = parts[1]?.length > precision
      ? `${parts[0]}.${parts[1].slice(0, precision)}`
      : v;

    setAmount(val)
  }

  const onClickSetMaximumAmount = () => {
    setAmount(maxAmount)
  }

  const onClickExchangeHandler = () => {
    exchange({
      exchange_pair: exchangePairId,
      amount,
      calc_action: "send"
    });
  }


  return (
    <div style={{ paddingLeft: 12, minWidth: 350 }} id="exchange">
      <div style={{ paddingLeft: 0, fontSize: 22, fontWeight: 400, borderBottom: '1px solid rgba(173, 173, 173, 0.3)', paddingBottom: 7 }}>{t("pageExchange_Exchange")}</div>
      <WaitFor
        providers={[walletsProvider]}
        errorMessage={<WarningOutlined className="failed" />}
      >
        <div style={{ position: "relative", marginTop: 16, borderRadius: 5, backgroundColor: "#fff", overflow: 'hidden', paddingLeft: 20, paddingRight: 20 }}>
          <div className="swapContainer">
            <div>
          <div style={{ marginTop: 35 }}>{t("pageExchange_YoureSpending")}</div>
          <div className='inputWithCoin'>
            <Input id="in" className='inputWithCoin-input' value={amount} onChange={onChangeAmountHandler} />
            <Select
              className='inputWithCoin-select'
              value={fromCoin}
              onChange={onChangeFromCoinHandler}
              options={fromCoinListOptions}
            />
          </div>
          </div>

          <div style={{ position: "relative", height: 70 }}>
            {canShowSetMaxAmountButton &&
              <div className="fromCoin-message-change">{t('pageExchange_You_can_exchange_a_maximum_of')} <span style={{ color: "#4c47fc", fontWeight: 800 }}>{maxAmount}</span>&nbsp;{fromCoin} &nbsp;
                <Button size="small" style={{ fontSize: 10 }} onClick={onClickSetMaximumAmount}>{t('pageExchange_Set_Max_Amount')}</Button>
              </div>
            }
            {/*<svg style={{position:"absolute", left:10, top:-1}} width="16" height="45" viewBox="0 0 16 50" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.5 0V44H11.5" stroke="#E6E6E6"/><circle cx="12" cy="44" r="4" fill="#E6E6E6"/></svg>
        <div className="fromCoin-message-first">
          <span style={{color:"#4c47fc"}}>Все комиссии включены</span>
        </div>
        <svg style={{position:"absolute", left:10, top:24}} width="16" height="45" viewBox="0 0 16 50" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.5 0V44H11.5" stroke="#E6E6E6"/><circle cx="12" cy="44" r="4" fill="#E6E6E6"/></svg>
        <div className="fromCoin-message-second">
          <span style={{color:"#4c47fc"}}>Расчетный курс:</span>&nbsp;
          123
        </div>*/}
          </div>

          <Button
            className="swapButton"
            onClick={onSwapFromCoinAndToCoinHandler}
          >
            <svg height="16" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.774414 7.74588L4.64749 3.8728L8.52057 7.74588" stroke="#00C26F" stroke-width="1.54923" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M9.29515 20.9143H6.19669C5.78581 20.9143 5.39176 20.7511 5.10122 20.4606C4.81068 20.17 4.64746 19.776 4.64746 19.3651V3.8728M20.9144 13.9428L17.0413 17.8159L13.1682 13.9428" stroke="#00C26F" stroke-width="1.54923" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M12.3936 0.774658H15.492C15.9029 0.774658 16.297 0.93788 16.5875 1.22842C16.878 1.51895 17.0412 1.91301 17.0412 2.32389V17.8162" stroke="#00C26F" stroke-width="1.54923" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </Button>
              <div>
          <div style={{ marginTop: 20 }}>{t("pageExchange_YouWillReceive")}</div>
          <div className='inputWithCoin'>
            <Input id="out" className="inputWithCoin-input" value={recieveAmount} disabled />
            {exchangeValidateLoading && <Loader type="small" className="amountLoader" />}

            <Select
              value={toCoin}
              onChange={onChangeToCoinHandler}
              className="inputWithCoin-select"
              options={toCoinListOptions}
              disabled={toCoinListOptions.length === 0}
            />
            {(exchangePairsLoading || exchangePairsFetching) &&
              <Loader type="small" centered={false} style={{ position: "absolute", bottom: 15, right: 75, zIndex: 1 }} />
            }
          </div>
          </div>
          <div style={{ position: "relative", height: 45, zIndex: 0 }}>
            {(toCoinListOptions.length === 0) &&
              <>
                <svg style={{ position: "absolute", left: 10, top: -20 }} width="16" height="45" viewBox="0 0 16 50" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.5 0V44H11.5" stroke="#E6E6E6" /><circle cx="12" cy="44" r="4" fill="#E6E6E6" /></svg>
                <div style={{ fontSize: 10, position: "absolute", top: 12, left: 32 }}>
                  <span style={{ color: "red" }}>{t('pageExchange_Impossible')}</span>
                </div>
              </>
            }
          </div>
          </div>


          <div>
            <Button
              className="blueButton"
              style={{ width: '100%', borderRadius: 20 }}
              disabled={(!exchangePairId) || exchangeLoading}
              loading={exchangeLoading}
              onClick={onClickExchangeHandler}
            >
              {t("pageExchange_button_Exchange")}
            </Button>
          </div>

          <div style={{ marginTop: 20, fontSize: 10 }}>{t("pageExchange_comment1")}</div>
          <div style={{ marginBottom: 20, fontSize: 10 }}><b>{t("pageExchange_comment2")}</b> {t("pageExchange_comment3")}</div>

        </div>

      </WaitFor>
      <div style={{
        marginTop: 30,
        borderRadius: 5,
        backgroundColor: "#fff",
        padding: 20
      }}>
        <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 15 }}>
          История обменов
        </div>

        <Table
          dataSource={exchangeDataSource}
          columns={exchangeColumns}
          pagination={false}
          loading={exchangeHistoryLoading || exchangeHistoryFetching}
          scroll={{ x: 500 }}
        />

        {exchangeHistoryError && <WarningOutlined />}
      </div>

      <WalletModal
        open={!!modal}
        onClose={() => setModal(null)}
        type={modal}
        coin={selectedCoin}
        lockCoin={false}
        wallets={walletsData}
      />
      {contextHolder}

    </div>
  )
}

export default PageExchange;
