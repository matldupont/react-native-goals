import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { StyleSheet, Text, View, FlatList, Button } from "react-native";
import { GoalInput } from "./components/GoalInput";
import { GoalItem } from "./components/GoalItem";
import { Goal } from "./types";

export default function App() {
  const [showModal, setShowModal] = React.useState(false);
  const [goals, setGoals] = React.useState<Goal[]>([]);

  const handleAddGoal = (goal: Goal) => {
    setGoals((goals) => [...goals, goal]);
    endAddGoal();
  };

  const handleDeleteGoal = (id: string) => {
    setGoals((goals) => goals.filter((goal) => goal.id !== id));
  };

  const startAddGoal = () => {
    setShowModal(true);
  };

  const endAddGoal = () => {
    setShowModal(false);
  };

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button title="Add New Goal" color="#a065ec" onPress={startAddGoal} />
        <GoalInput
          onAddGoal={handleAddGoal}
          onCancel={endAddGoal}
          visible={showModal}
        />

        <FlatList
          data={goals}
          renderItem={(goal) => (
            <GoalItem
              goal={{ id: goal.item.id, text: goal.item.text }}
              onDeleteItem={handleDeleteGoal}
            />
          )}
          keyExtractor={(item, index) => `${index}-${item.text}`}
          style={styles.goalsContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Text>List of goals...</Text>
        </FlatList>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  goalsContainer: {
    flex: 1,
  },
});
