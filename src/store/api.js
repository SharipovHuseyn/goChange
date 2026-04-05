// import { createApi } from '@reduxjs/toolkit/query/react';
// import { showErrors } from "../component/utils.component";

// const baseUrl = import.meta.env.VITE_BASE_URL
//   ? import.meta.env.VITE_BASE_URL.trim()
//   : '';

// console.log(
//   'baseUrl ->',
//   baseUrl,
//   import.meta.env.VITE_BASE_URL ? '[env]' : '[default]'
// );

// const getCsrfToken = () =>
//   document.cookie
//     .split('; ')
//     .find(row => row.startsWith('csrftoken='))
//     ?.split('=')[1];

// const csrfFetch = async (url, options = {}) => {
//   const method = (options.method || 'GET').toUpperCase();
//   const headers = { ...(options.headers || {}) };

//   if (!['GET', 'HEAD', 'OPTIONS'].includes(method)) {
//     const csrfToken = getCsrfToken();
//     if (csrfToken) {
//       headers['X-CSRFToken'] = csrfToken;
//     }
//   }

//   return fetch(url, {
//     credentials: 'include',
//     ...options,
//     headers,
//   });
// };

// const req =
//   async (url, opt = {}) => {
//     let res
//     let data
//     let err
//     try {
//       res = await csrfFetch(baseUrl + url, {
//         method: opt.method || 'GET',
//         headers: { 'Content-Type': 'application/json' },
//         ...(opt.body ? { body: JSON.stringify(opt.body) } : {}),
//       });

//       try {
//         data = await res.json();
//       } catch (ee) {
//       }
//       if (res.ok) {
//         return { data };
//       } else {
//         err = (data ? data : { details: `ERROR ${res.status}` })
//       }
//     } catch (e) {
//       if (res.ok) {
//         err = { details: `ERROR ${e.message}` }
//       } else {
//         err = { details: `ERROR ${res.status}` }
//       }
//     }

//     if (
//       ('/auth/info/' !== url)  // не надо показывать ошибку, так как используется
//       // для первичной проверки на залогиненного пользователя, 
//       // и если показывать ошибку, то при самом первом входе,
//       // после перекидывания на логин, будет показывать ошибку 
//       // (хотя пользователь еще даже и не сделал ничего)
//       && (url.indexOf('/wallet/api/exchange/pairs/') === -1) // ошибка будет показана на странице
//       && (url.indexOf('/wallet/api/exchange/validate/') === -1) // ошибка будет показана на странице
//       && (url.indexOf('/wallet/api/exchange/max-amount/') === -1) // ошибка будет показана на странице
//     ) {
//       showErrors(err)
//     }
//     return Promise.reject(JSON.stringify(err));
//   }




// export const api = createApi({
//   reducerPath: 'auth',
//   tagTypes: ['CurrentUser', 'Wallets', 'session'],
//   endpoints: (builder) => ({

//     /* ---------- AUTH ---------- */

//     getCurrentUser: builder.query({
//       queryFn: async (payload, api) => req('/auth/info/', {}, api),
//       providesTags: ['CurrentUser'],
//     }),

//     login: builder.mutation({
//       queryFn: async (payload, api) => req('/auth/signin/', { method: "POST", body: payload }, api),
//       invalidatesTags: ['CurrentUser'],
//     }),

//     loginConfirm: builder.mutation({
//       queryFn: async (payload, api) => req('/auth/signin/confirm/', { method: "POST", body: payload }, api),
//       invalidatesTags: ['CurrentUser'],
//     }),

//     loginResendCode: builder.mutation({
//       queryFn: async (payload, api) => req('/auth/signin/resend-code/', { method: "POST", body: payload }, api),
//       invalidatesTags: ['CurrentUser'],
//     }),

//     logout: builder.mutation({
//       queryFn: async (payload, api) => req('/auth/logout/', { method: "POST", body: payload }, api),
//       invalidatesTags: ['session', 'Wallets', 'CurrentUser'],
//     }),

//     signup: builder.mutation({
//       queryFn: async (payload, api) => req('/auth/signup/', { method: "POST", body: payload }, api),
//       invalidatesTags: ['CurrentUser'],
//     }),

//     signupConfirm: builder.mutation({
//       queryFn: async (payload, api) => req('/auth/signup/confirm/', { method: "POST", body: payload }, api),
//       invalidatesTags: ['CurrentUser'],
//     }),

//     signupResendCode: builder.mutation({
//       queryFn: async (payload, api) => req('/auth/signup/resend-code/', { method: "POST", body: payload }, api),
//       invalidatesTags: ['CurrentUser'],
//     }),

//     changePassword: builder.mutation({
//       queryFn: async (payload, api) => req('/auth/reset-password/', { method: "POST", body: payload }, api),
//     }),

//     /* ---------- WALLET ---------- */

//     wallets: builder.query({
//       queryFn: async (payload, api) => req('/wallets/', {}, api),
//       providesTags: ['Wallets'],
//       keepUnusedDataFor: 30,
//     }),

//     transactions: builder.query({
//       queryFn: async (params = {}, api) => {
//         const search = new URLSearchParams(params).toString();
//         return req(`/wallets/transactions/?${search}`, {}, api)
//       },
//       providesTags: ['Wallets'],
//       keepUnusedDataFor: 30,
//     }),

//     sessions: builder.query({
//       queryFn: async (payload, api) => req('/auth/settings/sessions/', {}, api),
//       providesTags: ['session'],
//       keepUnusedDataFor: 30,
//     }),

//     terminateSession: builder.mutation({
//       queryFn: async ({ session_key }, api) => req(`/auth/settings/sessions/${session_key}/`, { method: "DELETE" }, api),
//     }),

//     updateCurrency: builder.mutation({
//       queryFn: async (currency, api) => req('/auth/currency/', { method: "PATCH", body: { currency } }, api),
//       invalidatesTags: ['CurrentUser', 'Wallets'],
//     }),

//     createDeposit: builder.mutation({
//       queryFn: async (coin, api) => req('/wallets/deposit/', { method: "POST", body: { coin } }, api),
//       invalidatesTags: ['Wallets'],
//     }),

//     withdraw: builder.mutation({
//       queryFn: async ({ coin, amount, address }, api) => req('/wallets/withdraw/', { method: "POST", body: { coin, amount, address } }, api),
//       invalidatesTags: ['Wallets'],
//     }),

//     withdrawConfirm: builder.mutation({
//       queryFn: async ({ code }, api) => req('/wallets/withdraw/confirm', { method: "POST", body: { code } }, api),
//       invalidatesTags: ['Wallets'],
//     }),

//     exchangePairs: builder.query({
//       queryFn: async (params = {}, api) => {
//         const qs = new URLSearchParams(params).toString();
//         return req(`/exchange/directions/?${qs}`, {}, api)
//       },
//       providesTags: ['Wallets'],
//       keepUnusedDataFor: 60,
//     }),

//     exchangeMaxAmount: builder.query({
//       queryFn: async (params = {}, api) => {
//         const qs = new URLSearchParams(params).toString();
//         return req(`/exchange/max-amount/?${qs}`, {}, api)
//       },
//       providesTags: ['Wallets'],
//       keepUnusedDataFor: 1 * 60, //1 min
//     }),

//     exchangeValidate: builder.mutation({
//       queryFn: async (params = {}, api) => {
//         const qs = new URLSearchParams(params).toString();
//         return req(`/exchange/validate/?${qs}`, {}, api)
//       },
//     }),

//     exchange: builder.mutation({
//       queryFn: async ({ exchange_pair, amount }, api) => {
//         return req('/exchange/create/', {
//           method: "POST",
//           body: { exchange_pair, amount, calc_action: "send" }
//         }, api)
//       },
//       invalidatesTags: ['Wallets'],
//     }),
//     exchangeHistory: builder.query({
//       queryFn: async (params = {}, api) => {
//         const qs = new URLSearchParams(params).toString();
//         return req(`/exchange/history/?${qs}`, {}, api);
//       },
//       providesTags: ['Wallets'],
//       keepUnusedDataFor: 30,
//     }),

//   }),
// });

// export const {
//   useLazyGetCurrentUserQuery,
//   useGetCurrentUserQuery,
//   useLoginMutation,
//   useLoginConfirmMutation,
//   useLoginResendCodeMutation,
//   useLogoutMutation,
//   useSignupMutation,
//   useSignupConfirmMutation,
//   useSignupResendCodeMutation,
//   useChangePasswordMutation,
//   useWalletsQuery,
//   useTransactionsQuery,
//   useSessionsQuery,
//   useTerminateSessionMutation,
//   useUpdateCurrencyMutation,
//   useCreateDepositMutation,
//   useWithdrawMutation,
//   useWithdrawConfirmMutation,
//   useExchangePairsQuery,
//   useExchangeMaxAmountQuery,
//   useExchangeValidateMutation,
//   useExchangeMutation,
//   useExchangeHistoryQuery,
// } = api;

import { createApi } from '@reduxjs/toolkit/query/react';
import { showErrors } from "../components/utils.component";

const baseUrl = 'https://api.gochange.tech';

console.log('baseUrl ->', baseUrl, '[production]');

const getCsrfToken = () =>
  document.cookie
    .split('; ')
    .find(row => row.startsWith('csrftoken='))
    ?.split('=')[1];

const csrfFetch = async (url, options = {}) => {
  const method = (options.method || 'GET').toUpperCase();
  const headers = { ...(options.headers || {}) };

  if (!['GET', 'HEAD', 'OPTIONS'].includes(method)) {
    const csrfToken = getCsrfToken();
    if (csrfToken) {
      headers['X-CSRFToken'] = csrfToken;
    }
  }

  return fetch(url, {
    credentials: 'include',
    ...options,
    headers,
  });
};

const req = async (url, opt = {}) => {
  let res;
  let data;
  let err;
  
  try {
    res = await csrfFetch(baseUrl + url, {
      method: opt.method || 'GET',
      headers: { 'Content-Type': 'application/json' },
      ...(opt.body ? { body: JSON.stringify(opt.body) } : {}),
    });

    try {
      data = await res.json();
    } catch (ee) {
      // Не парсится JSON
    }
    
    if (res.ok) {
      return { data };
    } else {
      err = (data ? data : { details: `ERROR ${res.status}` });
    }
  } catch (e) {
    err = { details: `ERROR ${e.message}` };
  }

  // Список URL, для которых не нужно показывать ошибки
  const skipErrorUrls = [
    '/auth/info/',
    '/exchange/directions/',
    '/exchange/validate/',
    '/exchange/max-amount/'
  ];
  
  const shouldShowError = !skipErrorUrls.some(skipUrl => url.includes(skipUrl));
  
  if (shouldShowError && err) {
    showErrors(err);
  }
  
  return Promise.reject(JSON.stringify(err));
};

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['CurrentUser', 'Wallets', 'Session', 'KYC', 'Settings', 'Exchange', 'Transactions'],
  endpoints: (builder) => ({

    /* ---------- AUTH ---------- */
    
    // GET /auth/info/ - User info
    getCurrentUser: builder.query({
      queryFn: async () => req('/auth/info/'),
      providesTags: ['CurrentUser'],
    }),

    // POST /auth/signin/ - Sign in
    login: builder.mutation({
      queryFn: async (payload) => req('/auth/signin/', { method: "POST", body: payload }),
      invalidatesTags: ['CurrentUser'],
    }),

    // POST /auth/signin/confirm/ - Signin confirm
    loginConfirm: builder.mutation({
      queryFn: async (payload) => req('/auth/signin/confirm/', { method: "POST", body: payload }),
      invalidatesTags: ['CurrentUser'],
    }),

    // POST /auth/signin/resend-code/ - Signin resend code
    loginResendCode: builder.mutation({
      queryFn: async () => req('/auth/signin/resend-code/', { method: "POST" }),
      invalidatesTags: ['CurrentUser'],
    }),

    // POST /auth/logout/ - Logout
    logout: builder.mutation({
      queryFn: async () => req('/auth/logout/', { method: "POST" }),
      invalidatesTags: ['Session', 'Wallets', 'CurrentUser'],
    }),

    // POST /auth/signup/ - Sign up
    signup: builder.mutation({
      queryFn: async (payload) => req('/auth/signup/', { method: "POST", body: payload }),
      invalidatesTags: ['CurrentUser'],
    }),

    // POST /auth/signup/confirm/ - Signup confirm
    signupConfirm: builder.mutation({
      queryFn: async (payload) => req('/auth/signup/confirm/', { method: "POST", body: payload }),
      invalidatesTags: ['CurrentUser'],
    }),

    // POST /auth/signup/resend-code/ - Signup resend code
    signupResendCode: builder.mutation({
      queryFn: async () => req('/auth/signup/resend-code/', { method: "POST" }),
      invalidatesTags: ['CurrentUser'],
    }),

    // PATCH /auth/currency/ - Update user currency
    updateCurrency: builder.mutation({
      queryFn: async (currency) => req('/auth/currency/', { method: "PATCH", body: { currency } }),
      invalidatesTags: ['CurrentUser', 'Wallets'],
    }),

    // PATCH /auth/language/ - Update user language
    updateLanguage: builder.mutation({
      queryFn: async (language) => req('/auth/language/', { method: "PATCH", body: { language } }),
      invalidatesTags: ['CurrentUser'],
    }),

    // POST /auth/reset-password/ - Reset password
    resetPassword: builder.mutation({
      queryFn: async (payload) => req('/auth/reset-password/', { method: "POST", body: payload }),
    }),

    // POST /auth/reset-password/confirm/ - Reset password confirm
    resetPasswordConfirm: builder.mutation({
      queryFn: async (payload) => req('/auth/reset-password/confirm/', { method: "POST", body: payload }),
    }),

    // GET /auth/reset-password/confirm/ - Check reset token
    checkResetToken: builder.query({
      queryFn: async (token) => req(`/auth/reset-password/confirm/?token=${token}`),
    }),

    /* ---------- SETTINGS ---------- */

    // GET /auth/settings/ - User settings
    getUserSettings: builder.query({
      queryFn: async () => req('/auth/settings/'),
      providesTags: ['Settings'],
    }),

    // GET /auth/settings/sessions/ - User sessions
    getSessions: builder.query({
      queryFn: async () => req('/auth/settings/sessions/'),
      providesTags: ['Session'],
      keepUnusedDataFor: 30,
    }),

    // DELETE /auth/settings/sessions/{session_key}/ - Delete user session
    terminateSession: builder.mutation({
      queryFn: async ({ session_key }) => req(`/auth/settings/sessions/${session_key}/`, { method: "DELETE" }),
      invalidatesTags: ['Session'],
    }),

    /* ---------- WALLETS ---------- */

    // GET /wallets/ - Wallet list
    getWallets: builder.query({
      queryFn: async () => req('/wallets/'),
      providesTags: ['Wallets'],
      keepUnusedDataFor: 30,
    }),

    // GET /wallets/{coin}/ - Coin wallet
    getCoinWallet: builder.query({
      queryFn: async (coin) => req(`/wallets/${coin}/`),
      providesTags: (result, error, coin) => [{ type: 'Wallets', id: coin }],
      keepUnusedDataFor: 30,
    }),

    // POST /wallets/deposit/ - Create deposit address
    createDeposit: builder.mutation({
      queryFn: async (coin) => req('/wallets/deposit/', { method: "POST", body: { coin } }),
      invalidatesTags: ['Wallets'],
    }),

    // POST /wallets/withdraw/ - Initiate withdrawal
    initiateWithdraw: builder.mutation({
      queryFn: async ({ coin, amount, address }) => req('/wallets/withdraw/', { method: "POST", body: { coin, amount, address } }),
      invalidatesTags: ['Wallets'],
    }),

    // POST /wallets/withdraw/confirm/ - Confirm withdrawal
    confirmWithdraw: builder.mutation({
      queryFn: async ({ code }) => req('/wallets/withdraw/confirm/', { method: "POST", body: { code } }),
      invalidatesTags: ['Wallets', 'Transactions'],
    }),

    // GET /wallets/transactions/ - List transactions
    getTransactions: builder.query({
      queryFn: async (params = {}) => {
        const search = new URLSearchParams(params).toString();
        return req(`/wallets/transactions/?${search}`);
      },
      providesTags: (result) => 
        result?.results 
          ? [...result.results.map(({ id }) => ({ type: 'Transactions', id })), { type: 'Transactions', id: 'LIST' }]
          : [{ type: 'Transactions', id: 'LIST' }],
      keepUnusedDataFor: 30,
    }),

    // POST /wallets/refund/ - Initiate refund
    initiateRefund: builder.mutation({
      queryFn: async ({ transaction_id, address }) => req('/wallets/refund/', { method: "POST", body: { transaction_id, address } }),
      invalidatesTags: ['Wallets', 'Transactions'],
    }),

    // POST /wallets/refund/confirm/ - Confirm refund
    confirmRefund: builder.mutation({
      queryFn: async ({ code }) => req('/wallets/refund/confirm/', { method: "POST", body: { code } }),
      invalidatesTags: ['Wallets', 'Transactions'],
    }),

    /* ---------- EXCHANGE ---------- */

    // GET /exchange/directions/ - List exchange directions
    getExchangeDirections: builder.query({
      queryFn: async (params = {}) => {
        const qs = new URLSearchParams(params).toString();
        return req(`/exchange/directions/?${qs}`);
      },
      providesTags: ['Exchange'],
      keepUnusedDataFor: 60,
    }),

    // GET /exchange/max-amount/ - Max exchange amount
    getExchangeMaxAmount: builder.query({
      queryFn: async (params = {}) => {
        const qs = new URLSearchParams(params).toString();
        return req(`/exchange/max-amount/?${qs}`);
      },
      providesTags: ['Exchange'],
      keepUnusedDataFor: 60,
    }),

    // GET /exchange/validate/ - Validate exchange
    validateExchange: builder.query({
      queryFn: async (params = {}) => {
        const qs = new URLSearchParams(params).toString();
        return req(`/exchange/validate/?${qs}`);
      },
      providesTags: ['Exchange'],
    }),

    // POST /exchange/create/ - Create exchange
    createExchange: builder.mutation({
      queryFn: async ({ exchange_pair, amount, calc_action = "send" }) => {
        return req('/exchange/create/', {
          method: "POST",
          body: { exchange_pair, amount, calc_action }
        });
      },
      invalidatesTags: ['Wallets', 'Exchange', 'Transactions'],
    }),

    // GET /exchange/history/ - List exchanges (history)
    getExchangeHistory: builder.query({
      queryFn: async (params = {}) => {
        const qs = new URLSearchParams(params).toString();
        return req(`/exchange/history/?${qs}`);
      },
      providesTags: (result) => 
        result?.results 
          ? [...result.results.map(({ id }) => ({ type: 'Exchange', id })), { type: 'Exchange', id: 'HISTORY' }]
          : [{ type: 'Exchange', id: 'HISTORY' }],
      keepUnusedDataFor: 30,
    }),

    /* ---------- KYC ---------- */

    // GET /kyc/info/ - Get KYC status
    getKYCStatus: builder.query({
      queryFn: async () => req('/kyc/info/'),
      providesTags: ['KYC'],
    }),

    // POST /kyc/submit/ - Submit KYC
    submitKYC: builder.mutation({
      queryFn: async (formData) => {
        // Для multipart/form-data используем специальную обработку
        const res = await csrfFetch(baseUrl + '/kyc/submit/', {
          method: "POST",
          body: formData,
        });
        
        let data;
        try {
          data = await res.json();
        } catch (ee) {
          data = {};
        }
        
        if (res.ok) {
          return { data };
        } else {
          const err = data || { details: `ERROR ${res.status}` };
          showErrors(err);
          return Promise.reject(JSON.stringify(err));
        }
      },
      invalidatesTags: ['KYC', 'Settings'],
    }),

  }),
});

export const {
  // Auth
  useLazyGetCurrentUserQuery,
  useGetCurrentUserQuery,
  useLoginMutation,
  useLoginConfirmMutation,
  useLoginResendCodeMutation,
  useLogoutMutation,
  useSignupMutation,
  useSignupConfirmMutation,
  useSignupResendCodeMutation,
  useUpdateCurrencyMutation,
  useUpdateLanguageMutation,
  useResetPasswordMutation,
  useResetPasswordConfirmMutation,
  useCheckResetTokenQuery,
  useLazyCheckResetTokenQuery,
  
  // Settings
  useGetUserSettingsQuery,
  useGetSessionsQuery,
  useTerminateSessionMutation,
  
  // Wallets
  useGetWalletsQuery,
  useGetCoinWalletQuery,
  useCreateDepositMutation,
  useInitiateWithdrawMutation,
  useConfirmWithdrawMutation,
  useGetTransactionsQuery,
  useInitiateRefundMutation,
  useConfirmRefundMutation,
  
  // Exchange
  useGetExchangeDirectionsQuery,
  useGetExchangeMaxAmountQuery,
  useValidateExchangeQuery,
  useLazyValidateExchangeQuery,
  useCreateExchangeMutation,
  useGetExchangeHistoryQuery,
  
  // KYC
  useGetKYCStatusQuery,
  useSubmitKYCMutation,
} = api;