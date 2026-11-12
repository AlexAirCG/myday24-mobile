import { useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export default function Index() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');

  const addTodo = () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      title: trimmedTitle,
      completed: false,
    };

    setTodos([newTodo, ...todos]);
    setTitle('');
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Новая задача"
          value={title}
          onChangeText={setTitle}
          onSubmitEditing={addTodo}
        />
        <Pressable style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addButtonText}>+</Text>
        </Pressable>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(todo) => todo.id}
        renderItem={({ item }) => (
          <View style={styles.todoRow}>
            <Pressable
              style={styles.todoTitleBox}
              onPress={() => toggleTodo(item.id)}
            >
              <Text
                style={[
                  styles.todoTitle,
                  item.completed && styles.todoCompleted,
                ]}
              >
                {item.completed ? '✅ ' : '⬜ '}
                {item.title}
              </Text>
            </Pressable>

            <Pressable onPress={() => deleteTodo(item.id)}>
              <Text style={styles.deleteText}>🗑</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Задач пока нет</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#bae6fd',
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#0284c7',
    borderRadius: 8,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 24,
  },
  todoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  todoTitleBox: {
    flex: 1,
  },
  todoTitle: {
    fontSize: 16,
  },
  todoCompleted: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  deleteText: {
    fontSize: 20,
  },
  empty: {
    textAlign: 'center',
    color: 'gray',
    marginTop: 32,
  },
});
