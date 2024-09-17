import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type {
  ItemType,
  SelectModalProps,
  SelectPickerProps,
  SelectPickerRef,
  SelectTriggerProps,
} from './types';
import { Text, TouchableOpacity, View } from 'react-native';
import { Styles, getStyles, type defaultStyle } from './styles';
import { FlashList } from '@shopify/flash-list';
import BottomSheet from '@gorhom/bottom-sheet';

type SelectPickerContext = {
  disable: boolean;
  items: ItemType[];
  multiSelect: boolean;
  defaultStyle: defaultStyle;
  defaultSelect?: ItemType;
  onOpen?: () => void;
  onClose?: () => void;
  SelectPickerRef?: (methods: SelectPickerRef) => void;
  visible: boolean;
  setVisible: (visible: boolean) => void;
  selectItem?: ItemType;
  setSelectItem: (item: ItemType) => void;
  selectsItem?: ItemType[];
  setSelectsItem: (
    item: ItemType[] | ((item: ItemType[]) => ItemType[])
  ) => void;
} | null;

const SelectPickerContext = createContext<SelectPickerContext>(null);

const useSelectContext = () =>
  useContext<SelectPickerContext>(SelectPickerContext);

const SelectTrigger = ({ renderItem, style }: SelectTriggerProps) => {
  const context = useSelectContext();
  if (!context)
    throw new Error('SelectTrigger must be used within a SelectPicker');
  const {
    setVisible,
    defaultStyle,
    disable,
    onOpen,
    onClose,
    SelectPickerRef,
    defaultSelect,
    selectItem,
    multiSelect,
  } = context;

  const selectedItem = multiSelect
    ? { key: 'EmptyKey', label: 'Select An Element', value: 'empty' }
    : (selectItem ?? defaultSelect);

  const selectRef = useMemo(
    () => ({
      open: () => {
        setVisible(true);
        onOpen?.();
      },
      close: () => {
        setVisible(false);
        onClose?.();
      },
    }),
    [onClose, onOpen, setVisible]
  );

  useEffect(() => {
    SelectPickerRef?.(selectRef);
  }, [SelectPickerRef, selectRef]);

  return (
    <View>
      <TouchableOpacity
        disabled={disable}
        onPress={() => {
          console.log('onPress');

          setVisible(true);
          onOpen?.();
        }}
        style={[Styles.justifyContent, style]}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          {renderItem ? (
            renderItem?.(selectedItem)
          ) : (
            <Text style={defaultStyle.currencyName}>{selectedItem?.label}</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const SelectModal = ({ renderItem, style }: SelectModalProps) => {
  const context = useSelectContext();
  if (!context)
    throw new Error('SelectModal must be used within a SelectPicker');

  const {
    setVisible,
    items,
    setSelectItem,
    defaultStyle,
    selectsItem,
    multiSelect,
    setSelectsItem,
  } = context;
  // const onSelect = (item: ItemType) => {
  //   onSelectCurrency?.(data);
  //   setCurrencyName(data.name);
  //   setCode(data.code);
  //   setSymbol(data.symbol);
  //   setSymbolNative(data.symbol_native);
  // };
  const [ownSelectsItem] = useState({
    selectsItems: selectsItem?.map((item) => item),
  });

  return (
    <BottomSheet>
      <View style={[defaultStyle.item, style]}>
        <FlashList
          keyboardShouldPersistTaps={'handled'}
          // ref={(ref) => (_flashListRef.current = ref)}
          data={items}
          renderItem={({ item, index }) => {
            const isLastItem = items.length - 1 === index;
            let wasSelected = ownSelectsItem.selectsItems?.includes(item);
            return (
              <TouchableOpacity
                disabled={wasSelected}
                key={item.key}
                onPress={() => {
                  if (multiSelect) {
                    setSelectsItem((prev: ItemType[]) => [...prev, item]);
                    ownSelectsItem.selectsItems?.push(item);

                    console.log(selectsItem);
                    if (wasSelected) wasSelected = !wasSelected;
                    // onSelect(item);
                  } else {
                    setVisible(false);
                    setSelectItem(item);
                  }
                }}
                style={{
                  marginBottom: isLastItem ? 80 : 0,
                  backgroundColor: wasSelected ? '#f0f0f0' : 'inherit',
                }}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {renderItem ? renderItem?.(item) : <Text>{item.label}</Text>}
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.key}
          ListEmptyComponent={() => (
            <View style={defaultStyle.listNullContainer}>
              <Text style={defaultStyle.txtEmpty}> empty</Text>
            </View>
          )}
          estimatedItemSize={items.length}
        />
      </View>
    </BottomSheet>
  );
};
const SelectPicker = ({
  children,
  items,
  multiSelect = false,
  darkMode,
  disable = false,
  onOpen,
  onClose,
  SelectPickerRef,
  defaultSelect,
}: SelectPickerProps) => {
  const [visible, setVisible] = useState(false);
  const emptyItem: ItemType = { key: '0', label: 'Empty', value: 'empty' };
  if (!items[0]) {
    items[0] = emptyItem;
  }
  // throw new Error('SelectPicker must have at least one item');
  const [selectItem, setSelectItem] = useState<ItemType>(items[0]);
  const [selectsItem, setSelectsItem] = useState<ItemType[]>([]);
  const defaultStyle = getStyles((darkMode || false) as boolean);
  return (
    <SelectPickerContext.Provider
      value={{
        items,
        defaultStyle,
        disable,
        onOpen,
        onClose,
        SelectPickerRef,
        defaultSelect,
        visible,
        setVisible,
        selectItem,
        setSelectItem,
        multiSelect,
        selectsItem: multiSelect ? selectsItem : undefined,
        setSelectsItem,
      }}
    >
      {children}
    </SelectPickerContext.Provider>
  );
};
// const styles = StyleSheet.create({
//   txtCountryName: {
//     ...Styles.fontDefault,
//     marginLeft: 10,
//   },
//   txtCurrencyCode: {
//     ...Styles.fontDefault,
//     marginLeft: 10,
//     fontWeight: '600',
//   },
// });

export { SelectPicker, SelectTrigger, SelectModal };
