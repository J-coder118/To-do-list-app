import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';

const App = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskKey, setCurrentTaskKey] = useState(null);

  const handleAddTask = () => {
    if (task.length > 0) {
      if (isEditing) {
        setTasks(tasks.map(t => (t.key === currentTaskKey ? { key: t.key, value: task } : t)));
        setIsEditing(false);
        setCurrentTaskKey(null);
      } else {
        setTasks([...tasks, { key: Math.random().toString(), value: task }]);
      }
      setTask('');
    }
  };

  const handleEditTask = (taskKey: any, taskValue: any) => {
    setIsEditing(true);
    setCurrentTaskKey(taskKey);
    setTask(taskValue);
  };

  const handleDeleteTask = (taskKey: any) => {
    setTasks(tasks.filter(task => task.key !== taskKey));
    if (isEditing && taskKey === currentTaskKey) {
      setIsEditing(false);
      setTask('');
      setCurrentTaskKey(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>To-Do List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={task}
          onChangeText={text => setTask(text)}
        />
        <Button title={isEditing ? "Update" : "Add"} onPress={handleAddTask} />
      </View>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <TouchableOpacity style={styles.taskTextContainer} onPress={() => handleEditTask(item.key, item.value)}>
              <Text style={styles.taskItem}>{item.value}</Text>
            </TouchableOpacity>
            <Button title="Delete" onPress={() => handleDeleteTask(item.key)} />
          </View>
        )}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    flex: 1,
    marginRight: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  taskTextContainer: {
    flex: 1,
  },
  taskItem: {
    fontSize: 16,
  },
});

export default App;



