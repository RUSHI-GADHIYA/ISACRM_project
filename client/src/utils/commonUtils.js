// HELPER FUNCTION TO GREET USER BASED ON TIME.
const getUserGreetingBasedOnTime = () => {
  const hour = new Date().getHours();
  return hour < 12
    ? "Good Morning!"
    : hour < 18
    ? "Good Afternoon!"
    : "Good Evening!";
};

export { getUserGreetingBasedOnTime };
