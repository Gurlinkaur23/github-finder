import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import defaultUserProfilePic from "../img/user-profile-pic.png";
import { motion } from "framer-motion";

function User() {
  // Getting the userName from URL by useParams hook
  const { userName } = useParams();
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    if (userName) {
      const getUserData = async () => {
        const token = process.env.REACT_APP_GITHUB_TOKEN;
        const options = { headers: { Authorization: `Bearer ${token}` } };

        try {
          const responseUserData = await axios.get(
            `https://api.github.com/users/${userName}`,
            options
          );

          const responseRepoData = await axios.get(
            `https://api.github.com/users/${userName}/repos`,
            options
          );

          setUser(responseUserData.data);
          setRepos(responseRepoData.data);
        } catch (error) {
          console.error("User not found", error);
        }
      };
      getUserData();
    }
  }, [userName]);

  if (!user) {
    return (
      <motion.div
        className="loading"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        Loading...
      </motion.div>
    );
  }

  return (
    <motion.div
      className="user-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img
        src={user.avatar_url || defaultUserProfilePic}
        alt="User Profile Picture"
        className="user-profile-pic"
      />
      <h2 className="user-name">{user.login}</h2>
      <div className="user-details">
        <div className="social">
          <p className="numeric">{user.public_repos}</p>
          <p className="text">Repositories</p>
        </div>
        <div className="social">
          <p className="numeric">{user.followers}</p>
          <p className="text">Followers</p>
        </div>
        <div className="social">
          <p className="numeric">{user.following}</p>
          <p className="text">Following</p>
        </div>
      </div>
      <a className="github-link" href={user.html_url} target="_blank">
        Go to GitHub
      </a>
      <div className="repos-container">
        <h2>My Repositories</h2>
        <ul>
          {repos.map((repo) => (
            <li key={repo.id}>
              <div className="repo-info">
                <a href={repo.html_url} target="_blank">
                  {repo.name}
                </a>
                <p>
                  Updated at {new Date(repo.updated_at).toLocaleDateString()}
                </p>
              </div>
              {repo.description && <p>{repo.description}</p>}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );

  //   return (
  //     <div className="user-container">
  //       <img
  //         src={defaultUserProfilePic}
  //         alt="User Profile Picture"
  //         className="user-profile-pic"
  //       />
  //       <h2 className="user-name">Gurlin Kaur</h2>
  //       <div className="user-details">
  //         <div className="social">
  //           <p className="numeric">{34}</p>
  //           <p className="text">Repositories</p>
  //         </div>
  //         <div className="social">
  //           <p className="numeric">{23}</p>
  //           <p className="text">Followers</p>
  //         </div>
  //         <div className="social">
  //           <p className="numeric">{45}</p>
  //           <p className="text">Following</p>
  //         </div>
  //       </div>
  //       <a
  //         className="github-link"
  //         href="https://github.com/Gurlinkaur23"
  //         target="_blank"
  //       >
  //         Go to GitHub
  //       </a>
  //       <div className="repos-container">
  //         <h2>My Repositories</h2>
  //         <ul>
  //           <li>
  //             <div className="repo-info">
  //               <a
  //                 href="https://github.com/Gurlinkaur23/rating-system"
  //                 target="_blank"
  //               >
  //                 rating-system
  //               </a>
  //               <p>Updated at Mar 18, 2024</p>
  //             </div>
  //             <p>Rating app using React</p>
  //           </li>
  //           <li>
  //             <div className="repo-info">
  //               <a
  //                 href="https://github.com/Gurlinkaur23/rating-system"
  //                 target="_blank"
  //               >
  //                 Rating System
  //               </a>
  //               <p>Updated at Mar 18, 2024</p>
  //             </div>
  //             <p>Rating app using React</p>
  //           </li>
  //         </ul>
  //       </div>
  //     </div>
  //   );
}

export default User;
