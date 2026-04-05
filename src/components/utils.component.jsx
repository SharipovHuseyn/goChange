import { useEffect, useState } from 'react'
import { notification } from 'antd';
import {
  IconRub,
  IconBtc,
  IconUsdtTrc,
  IconUsdtErc,
  IconUsdt,
  IconMonero,
  IconEth,
  IconBnb,
  IconTrx,
  IconBch,
  IconLtc
} from './IconCoins';


/*
 Показывает ошибки в виде notification
 (может быть несколько окон, если массив ошибок)

 @param err - {<errType>:[msg1, msg2]} of Array of this
 @param title - заголовок для notification (на всех один)
*/
function showErrors(err, title) {
  if (!(err instanceof Array)) err = [err];
  err.forEach((e) => {
    Object.keys(e).forEach(key => {
      let msgList = e[key]
      if (!(msgList instanceof Array)) msgList = [msgList];
      msgList.forEach(msg => {
        if (msg.length > 500) msg = msg.substring(0, 500) + '...';
        notification.error({
          message: title,
          description: (e.response?.status ? `[${e.response.status}] ` : '') + msg,
          duration: 10,
        });
      })
    })
  });
}

/*
 Задержка изменения значения

 @param value - значение
 @param delay - задержка

 @returns значение, которое после изменения value изменится через delay милисекунд
          (если значение изменится за это время еще раз, то отсчет начнется снова)
*/
function useDebounce(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}


/*
 Получение иконки коина по его имени
 Пример использования:
   const CoinIcon = getCoinIcon(selectedCoin);
   return <CoinIcon height={36} width={36}/>

 @param coin - имя коина (фиксированный список: BTC, USDT-TRC20, USDT-ERC20, USDT-BEP20, LTC, XMR, ETH, BNB, TRX, BCH)
                         (а так же RUB)
 @returns Класс иконки
*/
const getCoinIcon = coin => {
  switch (coin) {
    case 'RUB'        : return IconRub;
    case 'BTC'        : return IconBtc;
    case 'XMR'        : return IconMonero
    case 'LTC'        : return IconLtc
    case 'ETH'        : return IconEth
    case 'BNB'        : return IconBnb
    case 'TRX'        : return IconTrx
    case 'BCH'        : return IconBch
    case 'USDT-TRC20' : return IconUsdtTrc
    case 'USDT-ERC20' : return IconUsdtErc
    case 'USDT-BEP20' : return IconUsdt
  }
  return '';
}

/*
 Получение параметров коина по его имени

 @param coin - имя коина (фиксированный список: BTC, USDT-TRC20, USDT-ERC20, USDT-BEP20, LTC, XMR, ETH, BNB, TRX, BCH)
                         (а так же RUB)
 @param opt
 @param opt.style - стиль добавится в иконку

 @returns { name1, name2, shortname, icon }
*/
const coin2name = (coin, opt = {}) => {
  const size = opt.size ?? 22;

  if (coin === "RUB") {
    return { name1: 'Russian Ruble', name2: 'RUB', shortname: 'RUB', icon: <IconRub height={size} /> }
  } else if (coin === "BTC") {
    return { name1: 'Bitcoin', name2: 'BTC', shortname: 'BTC', icon: <IconBtc height={size} /> }
  } else if (coin === "USDT-TRC20") {
    return { name1: 'Tether TRC-20', name2: 'USDT TRC-20', shortname: 'USDT', icon: <IconUsdtTrc height={size} /> }
  } else if (coin === "USDT-ERC20") {
    return { name1: 'Tether ERC-20', name2: 'USDT ERC-20', shortname: 'USDT', icon: <IconUsdtErc height={size} /> }
  } else if (coin === "USDT-BEP20") {
    return { name1: 'Tether BEP-20', name2: 'USDT BEP-20', shortname: 'USDT', icon: <IconUsdt height={size} /> }
  } else if (coin === "LTC") {
    return { name1: 'Litecoin', name2: 'LTC', shortname: 'LTC', icon: <IconLtc height={size} width={size} /> }
  } else if (coin === "XMR") {
    return { name1: 'Monero', name2: 'XMR', shortname: 'XMR', icon: <IconMonero height={size} /> }
  } else if (coin === "ETH") {
    return { name1: 'Ethereum', name2: 'ETH', shortname: 'ETH', icon: <IconEth height={size} width={size} /> }
  } else if (coin === "BNB") {
    return { name1: 'Binance Coin', name2: 'BNB', shortname: 'BNB', icon: <IconBnb height={size} width={size} /> }
  } else if (coin === "TRX") {
    return { name1: 'TRON', name2: 'TRX', shortname: 'TRX', icon: <IconTrx height={size} width={size} /> }
  } else if (coin === "BCH") {
    return { name1: 'Bitcoin Cash', name2: 'BCH', shortname: 'BCH', icon: <IconBch height={size} width={size} /> }
  }

  return { name1: coin, name2: coin, shortname: coin, icon: '' }
}


export { 
  showErrors,
  useDebounce,
  getCoinIcon,
  coin2name,
};
