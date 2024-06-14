import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Search() {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const updateInput = (event) => {
    setUserName(event.target.value);
    setError("");
  };

  useEffect(() => {
    // Resetting the userName state and error state when the Search component mounts
    setUserName("");
    setError("");
  }, []);

  const submitForm = async (event) => {
    event.preventDefault();

    try {
      const token = process.env.REACT_APP_GITHUB_TOKEN;
      const options = { headers: { Authorization: `Bearer ${token}` } };

      const response = await axios.get(
        `https://api.github.com/users/${userName}`,
        options
      );
      const userData = response.data;

      if (userData) {
        navigate(`/user/${userName}`);
      } else {
        setError("User not found. Try again!");
      }
    } catch (error) {
      console.error("User not found", error);
      setError("User not found. Try again!");
    }
  };

  return (
    <motion.div
      className="search-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="github-logo"></div>
      <form onSubmit={submitForm}>
        <div className="animated-border">
          <input
            type="text"
            value={userName}
            placeholder="User name"
            onChange={updateInput}
          />
        </div>
      </form>
      <h1>
        {error ? "User not found. Try again!" : "Welcome to GitHub Finder"}
      </h1>
    </motion.div>
  );
}

export default Search;
