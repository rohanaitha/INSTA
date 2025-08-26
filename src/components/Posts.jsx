import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import UserProfile from "./UserProfile";
import { Navigate, useNavigate } from "react-router-dom";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  function instaPosts() {
    async function fetchPosts() {
      const jwtToken = localStorage.getItem("jwt_token");
      const postUrl = "https://apis.ccbp.in/insta-share/posts";

      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };

      try {
        const response = await fetch(postUrl, options);

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setPosts(data.posts);
        } else {
          console.error("Failed to fetch posts:", response.status);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false); //  Stop loader
      }
    }
    fetchPosts();
  }

  useEffect(instaPosts, []);

  // const navProfile = () => {
  //   navigate(`/user/${posts.user_name}`);
  // };

  // const navigateProfile = () => {
  //   navigate(`/user/${posts.user_name}`);
  // };

  return (
    <div className="py-10 w-[800px] mx-auto">
      {loading
        ? // 🌀 Loader skeletons for posts
          Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md mb-8 w-full border border-gray-200 flex flex-col p-4"
            >
              <div className="flex items-center mb-4">
                <Skeleton circle width={40} height={40} />
                <div className="ml-3 w-32">
                  <Skeleton height={12} />
                </div>
              </div>
              <Skeleton height={400} className="mb-4" />
              <Skeleton height={15} width={80} className="mb-1" />
              <Skeleton height={15} className="mb-1" />
              <Skeleton height={15} width={150} />
            </div>
          ))
        : posts.map((post) => (
            <div
              key={post.post_id}
              className="bg-white rounded-lg shadow-md mb-8 w-full border border-gray-200 flex flex-col"
            >
              {/* Profile section */}
              <div
                className="flex items-center p-4"
                onClick={() => navigate(`/user/${post.user_id}`)}
              >
                <img
                  src={post.profile_pic}
                  alt="profile"
                  className="w-10 h-10 rounded-full border-2 border-pink-500"
                />
                <p className="ml-3 font-semibold text-gray-800">
                  {post.user_name}
                </p>
              </div>

              {/* Post Image */}
              <img
                src={post.post_details.image_url}
                alt="post"
                className="w-full max-h-[500px] object-cover"
              />

              {/* Content */}
              <div className="p-4">
                <p className="text-sm font-semibold text-gray-800">
                  {post.likes_count} likes
                </p>
                <p className="text-sm text-gray-700 mt-1">
                  <span className="font-medium">{post.user_name}</span>#
                  {post.post_details.caption}
                </p>

                {/* First comment if exists */}
                {post.comments.length > 0 && (
                  <p className="text-sm text-gray-600 mt-2">
                    <span className="font-medium">
                      {post.comments[0].user_name}
                    </span>
                    {post.comments[0].comment}
                  </p>
                )}

                <p className="text-xs text-gray-400 mt-2">{post.created_at}</p>
              </div>
            </div>
          ))}
    </div>
  );
}

export default Posts;
