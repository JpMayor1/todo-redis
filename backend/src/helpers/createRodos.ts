import Todo from "@/models/todo.model"; // Import your Todo model

// Function to generate 110 test todos
const createTestTodos = async () => {
  try {
    const todos = [];

    // Create 110 todos with dummy text
    for (let i = 1; i <= 1100; i++) {
      todos.push({
        text: `Test Todo ${i}`, // Generating test todo with unique text
        completed: false, // Default value for completed
      });
    }

    // Insert all todos into MongoDB
    await Todo.insertMany(todos);
    console.log("Successfully added 110 test todos!");
  } catch (error) {
    console.error("Error inserting test todos:", error);
  }
};

export default createTestTodos;
