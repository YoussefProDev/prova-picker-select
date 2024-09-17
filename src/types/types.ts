// import type { TextStyle, ViewStyle } from 'react-native';
import type { ViewStyle } from 'react-native';
import { SelectTrigger, SelectModal } from '../index';
// // Tipi per gli stili degli item
// type ItemStyle = {
//   itemContainer?: ViewStyle;
//   flagWidth?: number;
//   currencyCodeStyle?: TextStyle;
//   currencyNameStyle?: TextStyle;
//   symbolStyle?: TextStyle;
//   symbolNativeStyle?: TextStyle;
//   container?: ViewStyle;
// };

// // Tipi per gli stili del modale
// type ModalStyle = {
//   itemStyle?: ItemStyle;
//   container?: ViewStyle;
//   searchStyle?: ViewStyle;
//   tileStyle?: TextStyle;
// };

// Riferimento al componente CurrencyPicker per il controllo programmatico
export type SelectPickerRef = {
  open: () => void;
  close: () => void;
};
export type ItemType = {
  key: string;
  label: string;
  value: string | Record<string, string>;
  data?: Record<string, string>;
};
// Props per il componente CurrencyPicker
export type SelectPickerProps = {
  onSelectItem?: (item: any) => void;
  items: ItemType[];
  children: [
    React.ReactElement<typeof SelectTrigger>,
    React.ReactElement<typeof SelectModal>,
  ];
  defaultSelect?: ItemType;
  darkMode?: boolean;
  SelectPickerRef?: (methods: SelectPickerRef) => void;
  multiSelect?: boolean;
  disable?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
};

// Props per il componente SelectTrigger
export type SelectTriggerProps = {
  style?: ViewStyle;
  renderItem?: (item: ItemType | undefined) => React.ReactNode;
};

// Props per il componente SelectModal
export type SelectModalProps = {
  style?: ViewStyle;
  renderItem?: (item: ItemType | undefined) => React.ReactNode;
  //   visible: boolean;
  //   setVisible: (visible: boolean) => void;
  //   showFlag?: boolean;
  //   showCurrencyName?: boolean;
  //   showSymbol?: boolean;
  //   showNativeSymbol?: boolean;
  //   darkMode?: boolean;
  //   renderChildren?: React.ReactNode;
  //   showCurrencyCode?: boolean;
  //   currencyPickerRef?: (methods: SelectPickerRef) => void;
  //   enable?: boolean;
  //   onOpen?: () => void;
  //   onClose?: () => void;
  //   containerStyle?: ItemStyle;
  //   modalStyle?: ModalStyle;
  //   title?: string;
  //   searchPlaceholder?: string;
  //   textEmpty?: string;
  //   showCloseButton?: boolean;
  //   showModalTitle?: boolean;
};
