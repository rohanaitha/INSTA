// SearchResults.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SearchResults() {
  const { searchTerm } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
          const filteredPosts = data.posts.filter((post) =>
            post.post_details.caption
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          );
          setPosts(filteredPosts);
        } else {
          console.error("Failed to fetch posts:", response.status);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [searchTerm]);

  return (
    <>
      <Navbar />
      <div className="max-w-[1100px] mx-auto px-4 mt-6">
        <h2 className="text-xl font-semibold mb-4">
          Search results for:{" "}
          <span className="text-[#4094EF]">{searchTerm}</span>
        </h2>

        {loading
          ? Array.from({ length: 4 }).map((_, index) => (
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
          : posts.length > 0
          ? posts.map((post) => (
              <div
                key={post.post_id}
                className="bg-white rounded-lg shadow-md mb-8 w-full border border-gray-200 flex flex-col"
              >
                {/* Profile */}
                <div className="flex items-center p-4">
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
                    <span className="font-medium">{post.user_name}</span> #
                    {post.post_details.caption}
                  </p>

                  {post.comments.length > 0 && (
                    <p className="text-sm text-gray-600 mt-2">
                      <span className="font-medium">
                        {post.comments[0].user_name}
                      </span>{" "}
                      {post.comments[0].comment}
                    </p>
                  )}

                  <p className="text-xs text-gray-400 mt-2">
                    {post.created_at}
                  </p>
                </div>
              </div>
            ))
          : !loading && <p>No results found.</p>}
      </div>
    </>
  );
}
