import { Ionicons } from '@expo/vector-icons';
import { useSQLiteContext } from 'expo-sqlite';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as budgetDb from '../../db/budget';
import { useKeyboardHeight } from '../../hooks/useKeyboardHeight';
import { colors, shadows } from '../../theme';

type BudgetItem = {
  id: number;
  title: string;
  percent: string;
};

function toNumber(text: string): number {
  const value = parseFloat(text.replace(',', '.'));
  return Number.isFinite(value) ? value : 0;
}

function formatNumber(value: number): string {
  return value.toLocaleString('ru-RU', { maximumFractionDigits: 0 });
}

export default function BudgetScreen() {
  const db = useSQLiteContext();

  const [totalBudget, setTotalBudget] = useState('');
  const [items, setItems] = useState<BudgetItem[]>([]);
  const [newTitle, setNewTitle] = useState('');
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const scrollRef = useRef<React.ComponentRef<typeof ScrollView>>(null);

  const keyboardHeight = useKeyboardHeight();
  const insets = useSafeAreaInsets();
  const bottomSpace =
    keyboardHeight > 0 ? keyboardHeight + insets.bottom : insets.bottom;

  useEffect(() => {
    budgetDb.loadBudget(db).then((budget) => {
      setTotalBudget(budget.totalBudget ? String(budget.totalBudget) : '');
      setItems(
        budget.items.map((row) => ({
          id: row.id,
          title: row.title,
          percent: row.percent ? String(row.percent) : '',
        })),
      );
    });
  }, [db]);

  useEffect(() => {
    if (isTitleFocused && keyboardHeight > 0) {
      scrollRef.current?.scrollToEnd({ animated: true });
    }
  }, [isTitleFocused, keyboardHeight]);

  const handleTotalBudgetChange = (text: string) => {
    const digits = text.replace(/\D/g, '');
    setTotalBudget(digits);
    budgetDb.setTotalBudget(db, Number(digits) || 0);
  };

  const addItem = async () => {
    const title = newTitle.trim();
    if (!title) {
      Alert.alert('Введите название статьи');
      return;
    }

    setNewTitle('');
    const row = await budgetDb.addBudgetItem(db, title);
    setItems((prev) => [
      ...prev,
      { id: row.id, title: row.title, percent: '' },
    ]);
  };

  const updateItemPercent = (id: number, text: string) => {
    const percent = toNumber(text) > 100 ? '100' : text;
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, percent } : item)),
    );
    budgetDb.updateBudgetItemPercent(db, id, toNumber(percent));
  };

  const deleteItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    budgetDb.deleteBudgetItem(db, id);
  };

  const totalUsedPercent = items.reduce(
    (sum, item) => sum + toNumber(item.percent),
    0,
  );
  const percentRemaining = Number((100 - totalUsedPercent).toFixed(2));

  return (
    <View style={[styles.screen, { paddingBottom: bottomSpace }]}>
      <ScrollView
        ref={scrollRef}
        style={styles.flex1}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        onContentSizeChange={() => {
          if (isTitleFocused) {
            scrollRef.current?.scrollToEnd({ animated: true });
          }
        }}
      >
        <Text style={styles.label}>Сумма бюджета</Text>
        <TextInput
          style={styles.input}
          value={totalBudget ? formatNumber(Number(totalBudget)) : ''}
          onChangeText={handleTotalBudgetChange}
          keyboardType="number-pad"
          placeholder="0"
          placeholderTextColor="#7aa7c7"
        />

        <View style={styles.remaining}>
          <Text style={styles.label}>Осталось %</Text>
          <Text
            style={[
              styles.remainingValue,
              percentRemaining < 0 && styles.remainingNegative,
            ]}
          >
            {percentRemaining}
          </Text>
        </View>

        {items.map((item) => {
          const itemSum =
            (toNumber(totalBudget) * toNumber(item.percent)) / 100;

          return (
            <View key={item.id} style={styles.itemCard}>
              <Text style={styles.itemTitle} numberOfLines={1}>
                {item.title}
              </Text>

              <TextInput
                style={[styles.input, styles.percentInput]}
                value={item.percent}
                onChangeText={(text) => updateItemPercent(item.id, text)}
                keyboardType="decimal-pad"
                placeholder="%"
                placeholderTextColor="#7aa7c7"
              />
              <Text style={styles.percentSign}>%</Text>

              <Text style={styles.itemSum}>{formatNumber(itemSum)}</Text>

              <Pressable
                onPress={() => deleteItem(item.id)}
                style={({ pressed }) => [
                  styles.deleteButton,
                  { boxShadow: pressed ? shadows.pressed : shadows.raised },
                ]}
              >
                <Ionicons
                  name="trash-outline"
                  size={20}
                  color={colors.danger}
                />
              </Pressable>
            </View>
          );
        })}

        <Text style={styles.label}>Добавить статью бюджета</Text>
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.flex1]}
            value={newTitle}
            onChangeText={setNewTitle}
            onSubmitEditing={addItem}
            onFocus={() => setIsTitleFocused(true)}
            onBlur={() => setIsTitleFocused(false)}
            submitBehavior="submit"
            placeholder="Название статьи"
            placeholderTextColor="#7aa7c7"
          />
          <Pressable
            onPress={addItem}
            style={({ pressed }) => [
              styles.button,
              { boxShadow: pressed ? shadows.pressed : shadows.raised },
            ]}
          >
            <Text style={styles.buttonText}>Добавить</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 16,
    gap: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: colors.text,
    boxShadow: shadows.pressed,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  flex1: {
    flex: 1,
  },
  button: {
    backgroundColor: colors.background,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.accent,
  },
  remaining: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    boxShadow: shadows.raised,
  },
  remainingValue: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  remainingNegative: {
    color: colors.danger,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 10,
    boxShadow: shadows.raised,
  },
  itemTitle: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
  },
  percentInput: {
    width: 60,
    paddingHorizontal: 6,
    paddingVertical: 6,
    textAlign: 'center',
  },
  percentSign: {
    color: colors.text,
  },
  itemSum: {
    minWidth: 70,
    textAlign: 'right',
    fontWeight: '600',
    color: colors.text,
  },
  deleteButton: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 6,
  },
});
