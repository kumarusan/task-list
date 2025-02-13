import SingleTask from '@/components/SingleTask';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';

function TaskInput() {
  const [task, setTask] = useState('');  // State to hold the inputted task
  const [tasks, setTasks] = useState<string[]>([]); // Array to hold tasks

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('localTasks');
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error('Error loading tasks from AsyncStorage:', error);
      }
    };

    loadTasks();
  }, []);

  useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem('localTasks', JSON.stringify(tasks));
      } catch (error) {
        console.error('Error saving tasks to AsyncStorage:', error);
      }
    };

    saveTasks();
  }, [tasks]);

  // Function to handle task submission
  const handleAddTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task.trim()]);  // Add the task to the list
      setTask('');  // Clear the input field
    }
  };

  // Function to handle task clearing
  const handleClearInput = () => {
    setTask(''); // Clears the TextInput
  };

  const deleteAll = () => {

  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header and Input Section */}
      <View style={styles.inputSection}>
        <Text style={styles.header}>Daily Tasks</Text>

        <View style={styles.inputWrapper}>
        <TextInput
          value={task}
          onChangeText={setTask}
          placeholder="Enter your task"
          style={styles.textInput}
        />

        {/* Cross button to clear the input */}
      {task.length > 0 && (
        <TouchableOpacity onPress={handleClearInput} style={styles.clearButton}>
          <MaterialIcons name="cancel" size={24} color="gray" />
        </TouchableOpacity>
      )}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={deleteAll} style={styles.deleteAllButton}>
            <Text style={styles.buttonText}>Delete All</Text>
          </TouchableOpacity>

          <Button color={'#66ff66'} title="Add Task" onPress={handleAddTask} />
        </View>
      </View>

      {/* Scrollable Task List */}
      <ScrollView style={styles.taskList}>
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <SingleTask key={index} task={task} style={styles.taskText} />
          ))
        ) : (
          <Text style={styles.taskText}>No tasks yet!</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor:'#1A1A1A'
  },
  inputSection: {
    marginBottom: 20,  // Add some space between the input section and the task list
    color:'white'
  },
  header: {
    fontSize: 50,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color:'white'
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
  textInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color:'white'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop:5,
  },
  clearButton: {
    padding: 5,
  },
  deleteAllButton:{
    backgroundColor: '#ff6666',
    padding: 10,
    borderRadius: 5,

  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  taskList: {
    flex: 1,
    marginTop: 20,
    marginBottom:60,
  },
  taskText: {
    fontSize: 18,
    marginBottom: 5,
    color:'white'
  },
});

export default TaskInput;
