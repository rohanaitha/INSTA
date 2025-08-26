import { useEffect, useState } from "react";
import Profile from "./Profile";
import Posts from "./Posts";
import { useParams } from "react-router-dom";
import React from "react";
import Navbar from "./Navbar";
import { Riple } from "react-loading-indicators";

const UserProfile = () => {
  const { username } = useParams();
  const [userProfile, setUserProfile] = useState(null);

  function users() {
    async function fetchprofiles() {
      const jwtToken = localStorage.getItem("jwt_token");
      let ProfileUrl = `https://apis.ccbp.in/insta-share/users/${username}`;
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      };

      try {
        const response = await fetch(ProfileUrl, options);
        console.log(response);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setUserProfile(data.user_details);
        } else {
          console.error("Failed to fetch stories:", response.status);
        }
      } catch (error) {
        console.error("Error fetching stories:", error);
      }
    }
    fetchprofiles();
  }
  useEffect(users, [username]);
  return userProfile !== null ? (
    <div>
      <Navbar />
      <div className="w-full max-w-6xl mx-auto px-4 py-6">
        {/* Profile Info */}
        <div className="flex items-center gap-12 ">
          {/* Profile Picture */}
          <div className="w-32 h-32  rounded-full">
            <img
              src={userProfile.profile_pic}
              alt="Profile"
              className="w-full h-full rounded-full"
            />
          </div>

          {/* Profile Details */}
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">{userProfile.user_name}</h2>
            <div className="flex gap-6 text-sm text-gray-700">
              <p>
                <span className="font-semibold">{userProfile.posts_count}</span>{" "}
                posts
              </p>
              <p>
                <span className="font-semibold">
                  {userProfile.followers_count}
                </span>{" "}
                followers
              </p>
              <p>
                <span className="font-semibold">
                  {userProfile.following_count}
                </span>{" "}
                following
              </p>
            </div>
            <div className="text-sm mt-2">
              <p className="font-medium">{userProfile.user_id}</p>
              <p className="text-gray-600">{userProfile.user_bio}</p>
            </div>
          </div>
        </div>

        {/* Stories */}
        <div className="mt-8 flex gap-4 overflow-x-auto pb-4 border-b">
          {userProfile.stories.map((story, index) => (
            <div
              key={index}
              className="w-20 h-20 rounded-full overflow-hidden border-gray-200"
            >
              <img
                src={story.image}
                alt={`Story ${index}`}
                className="w-full h-full "
              />
            </div>
          ))}
        </div>

        {/* Posts Section */}
        <div className="mt-8">
          <h2 className="flex items-center text-xl font-semibold mb-4 gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M19.3125 3H3.5625C3.2625 3 3 3.2625 3 3.5625V19.3125C3 19.6125 3.2625 19.875 3.5625 19.875H19.3125C19.6125 19.875 19.875 19.6125 19.875 19.3125V3.5625C19.875 3.2625 19.6125 3 19.3125 3ZM4.125 4.125H8.25V8.25H4.125V4.125ZM4.125 9.375H8.25V13.5H4.125V9.375ZM8.25 18.75H4.125V14.625H8.25V18.75ZM13.5 18.75H9.375V14.625H13.5V18.75ZM13.5 13.5H9.375V9.375H13.5V13.5ZM13.5 8.25H9.375V4.125H13.5V8.25ZM18.75 18.75H14.625V14.625H18.75V18.75ZM18.75 13.5H14.625V9.375H18.75V13.5ZM18.75 8.25H14.625V4.125H18.75V8.25Z"
                fill="#262626"
              />
            </svg>
            Posts
          </h2>

          <div className="grid grid-cols-3 gap-2 gap-4">
            {userProfile.posts.length !== 0 ? (
              userProfile.posts.map((post, index) => (
                <img
                  key={index}
                  src={post.image}
                  alt={`Post ${index}`}
                  className="w-full h-full  object-cover"
                />
              ))
            ) : (
              <div className="col-span-3 flex justify-center">
                <img
                  src="https://res.cloudinary.com/dez8wfcvn/image/upload/v1751709077/Group_7731_jksr9i.png"
                  alt="No Posts"
                  className="w-32 h-32 object-contain"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen">
      <Riple color="#00dfd6" size="medium" text="" textColor="" />
    </div>
  );
};
export default UserProfile;
