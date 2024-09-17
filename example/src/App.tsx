import { StyleSheet, View, Button } from 'react-native';
import { SelectModal, SelectPicker, SelectTrigger } from 'prova-picker';
import type { ItemType, SelectPickerRef } from '../../src/types';
import { useRef } from 'react';

export default function App() {
  const items: ItemType[] = [
    {
      key: 'item1',
      label: 'Item 1',
      value: 'item1',
    },
    {
      key: 'item2',
      label: 'Item 2',
      value: 'item2',
    },
  ];
  const select = useRef<SelectPickerRef>();

  return (
    <View style={styles.container}>
      <SelectPicker
        onSelectItem={(item) => console.log(item)}
        SelectPickerRef={(ref) => (select.current = ref)}
        items={items}
        multiSelect
      >
        <SelectTrigger style={{ backgroundColor: 'red' }} />
        <SelectModal />
      </SelectPicker>
      <Button title="apri" onPress={() => select.current?.open()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
