import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from 'react';

export const TOKEN_LINK = 'https://miniapps/app1234567#screen=profile&ref=99';

export type Tab = 'dev' | 'contract' | 'info';
export type DevState = 'initial' | 'tokenGenerated' | 'configuring' | 'configured';
export type ModalType = null | 'success' | 'options';

export interface State {
  tab: Tab;
  dev: DevState;
  contractPhone: string;
  contractSent: boolean;
  modal: ModalType;
  toast: boolean;
  config: { subdomain: string; phones: string[] };
}

const initialState: State = {
  tab: 'dev',
  dev: 'initial',
  contractPhone: '',
  contractSent: false,
  modal: null,
  toast: false,
  config: {
    subdomain: '',
    phones: [''],
  },
};

export type Action =
  | { type: 'SET_TAB'; tab: Tab }
  | { type: 'GENERATE_TOKEN' }
  | { type: 'HIDE_TOAST' }
  | { type: 'START_CONFIG' }
  | { type: 'BACK_FROM_CONFIG' }
  | { type: 'SET_SUBDOMAIN'; value: string }
  | { type: 'ADD_PHONE' }
  | { type: 'SET_PHONE'; index: number; value: string }
  | { type: 'CLEAR_PHONE'; index: number }
  | { type: 'REMOVE_PHONE'; index: number }
  | { type: 'LAUNCH' }
  | { type: 'CLOSE_SUCCESS' }
  | { type: 'EDIT_CONFIG' }
  | { type: 'OPEN_OPTIONS' }
  | { type: 'CLOSE_MODAL' }
  | { type: 'SET_CONTRACT_PHONE'; value: string }
  | { type: 'SUBMIT_CONTRACT' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_TAB':
      return { ...state, tab: action.tab };
    case 'GENERATE_TOKEN':
      return { ...state, dev: 'tokenGenerated', toast: true };
    case 'HIDE_TOAST':
      return { ...state, toast: false };
    case 'START_CONFIG':
      return { ...state, dev: 'configuring' };
    case 'BACK_FROM_CONFIG':
      return { ...state, dev: state.config.subdomain ? 'configured' : 'tokenGenerated' };
    case 'SET_SUBDOMAIN':
      return { ...state, config: { ...state.config, subdomain: action.value } };
    case 'ADD_PHONE':
      return {
        ...state,
        config: { ...state.config, phones: [...state.config.phones, ''] },
      };
    case 'SET_PHONE':
      return {
        ...state,
        config: {
          ...state.config,
          phones: state.config.phones.map((p, i) => (i === action.index ? action.value : p)),
        },
      };
    case 'CLEAR_PHONE':
      return {
        ...state,
        config: {
          ...state.config,
          phones: state.config.phones.map((p, i) => (i === action.index ? '' : p)),
        },
      };
    case 'REMOVE_PHONE':
      return {
        ...state,
        config: {
          ...state.config,
          phones:
            state.config.phones.length > 1
              ? state.config.phones.filter((_, i) => i !== action.index)
              : state.config.phones,
        },
      };
    case 'LAUNCH':
      return { ...state, modal: 'success' };
    case 'CLOSE_SUCCESS':
      return { ...state, modal: null, dev: 'configured' };
    case 'EDIT_CONFIG':
      return { ...state, dev: 'configuring' };
    case 'OPEN_OPTIONS':
      return { ...state, modal: 'options' };
    case 'CLOSE_MODAL':
      return { ...state, modal: null };
    case 'SET_CONTRACT_PHONE':
      return { ...state, contractPhone: action.value };
    case 'SUBMIT_CONTRACT':
      return { ...state, contractSent: true };
    default:
      return state;
  }
}

const DashboardContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
} | null>(null);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <DashboardContext.Provider value={{ state, dispatch }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error('useDashboard must be used within DashboardProvider');
  return ctx;
}
