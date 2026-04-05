import { useEffect, useState } from 'react';
import { Modal, Input, Select, Button, message } from 'antd';
import { IoIosWarning } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";

import {
  useCreateDepositMutation,
  useInitiateWithdrawMutation,
  useConfirmWithdrawMutation,
} from '../../store/api';

import './index.css';
import { QRCodeSVG } from 'qrcode.react';
import { t } from 'i18next';
import Loader from '../../components/Loader';




export default function WalletModal({
  open,
  onClose,
  type,
  coin,
  wallets,
  lockCoin = true,
}) {
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [step, setStep] = useState('form');
  const [otp, setOtp] = useState('');
  const [copyClicked, setCopyClicked] = useState(false);

  const [createDeposit, {data: deposit, isLoading: depositLoading, isError:depositError}] = useCreateDepositMutation();
  const [withdraw, {data: withdrawData, isLoading: withdrawLoading}] = useWithdrawMutation();
  const [withdrawConfirm, {data: withdrawConfirmData, isLoading: withdrawConfirmLoading}] = useWithdrawConfirmMutation();


  useEffect(() => {
    if (open && type === 'deposit' && selectedCoin) {
      createDeposit(selectedCoin);
    }
  }, [open, type, selectedCoin]);

  useEffect(() => {
    if (copyClicked) {
      setTimeout(()=>setCopyClicked(false), 5000)
    }
  }, [copyClicked]);

  useEffect(() => {
    if (!open) {
      setStep('form');
      setOtp('');
      setAmount('');
      setAddress('');
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      setSelectedCoin(coin || 'BTC');
    }
  }, [open, coin]);

  useEffect(() => {
    if (withdrawData?.success) {
      setStep('otp');
    }
  }, [withdrawData, withdrawLoading]);

  useEffect(() => {
    if (withdrawConfirmData?.success) {
      message.success(t('pageWalletModal_WithdrawalConfirmed'));
      onClose();
    }
  }, [withdrawConfirmData, withdrawConfirmLoading]);



  const submitWithdraw = () => {
    withdraw({
      coin: selectedCoin,
      amount,
      address,
    });
  };

  const submitWithdrawOtp = async () => {
    withdrawConfirm({ code: otp });
  }

  const onChangeAddressHandler = e => setAddress(e.target.value)

  const onChangeAmountHandler = e => setAmount(e.target.value)

  const onChangeOtpHandler = e => setOtp(e.target.value)

  const onCopyClickHandler = () => {
     navigator.clipboard.writeText(deposit.deposit_address);
     if (!copyClicked) setCopyClicked(true);
     message.success(t('pageWalletModal_AddressCopied'));
  }



  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      destroyOnClose
      className="wallet-modal"
    >
      {/* TITLE */}
      <div className="wallet-modal-title">
        {type === 'withdraw' ? t('pageWalletModal_WithdrawTitle') : t('pageWalletModal_ReplenishTitle')} {selectedCoin}
      </div>

      {/* COIN SELECT */}
      <Select
        value={selectedCoin}
        onChange={setSelectedCoin}
        placeholder={t("pageWalletModal_SelectCurrent")}
        className="wallet-select"
        disabled={lockCoin}
        options={(wallets || []).map(w => ({
          value: w.coin,
          label: w.coin,
        }))}
      />

      {/* ===== DEPOSIT ===== */}
      {type === 'deposit' && depositLoading && 
         <div style={{position:"relative", height:320}}><Loader/></div>
      }
      {type === 'deposit' && depositError && 
         <div style={{position:"relative", height:320}}><IoIosWarning className='failed'/></div>
      }
      {type === 'deposit' && deposit && (
        <>
          <div className="wallet-qr-wrapper">
            <div className="wallet-qr-wrapper">
              <QRCodeSVG value={deposit.deposit_address} size={180} />
            </div>
          </div>

          <div className="wallet-address">
            {deposit.deposit_address}

            <Button
              className="wallet-copy-btn"
              onClick={onCopyClickHandler}
              title="Скопировать"
            >
              {!copyClicked && 
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              }
              {copyClicked && <FaCircleCheck style={{color:'green'}}/>}
            </Button>
          </div>

          <div className="wallet-info-row">
            <span>{t('pageWalletModal_MinimumDepositAmount')}</span>
            <span>{deposit.min_deposit} {selectedCoin}</span>
          </div>
        </>
      )}

      {/* ===== WITHDRAW ===== */}
      {type === 'withdraw' && step === 'form' && (
      <>
        <Input
          placeholder={t("pageWalletModal_WalletAddress")}
          value={address}
          onChange={onChangeAddressHandler}
          disabled={withdrawLoading}
          className="wallet-input"
        />

        <Input
          placeholder={t("pageWalletModal_Amount")}
          value={amount}
          onChange={onChangeAmountHandler}
          disabled={withdrawLoading}
          className="wallet-input"
        />

        <Button
          className="btn-primary wallet-submit"
          onClick={submitWithdraw}
          disabled={!selectedCoin || !amount || !address || withdrawLoading}
          loading={withdrawLoading}
        >
          {t('pageWalletModal_Withdraw')}
        </Button>
      </>
      )}

      {type === 'withdraw' && step === 'otp' && (
      <>
        <Input
          placeholder={t("pageWalletModal_ConfirmationCode")}
          value={otp}
          onChange={onChangeOtpHandler}
          disabled={withdrawConfirmLoading}
          className="wallet-input"
        />

        <Button
          className="btn-primary wallet-submit"
          onClick={submitWithdrawOtp}
          disabled={!otp || withdrawConfirmLoading}
          loading={withdrawConfirmLoading}
        >
          {t('pageWalletModal_Confirm')}
        </Button>
      </>
    )}

    </Modal>
  );
}
