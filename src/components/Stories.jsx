
import React, { useEffect, useState } from "react"

const Stories = () => {
  const [stories, setStories] = useState([])

  function instaStories(){
     async function  fetchStories() {
      const jwtToken = localStorage.getItem("jwt_token")
      const apiUrl = "https://apis.ccbp.in/insta-share/stories"

      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }

      try {
        const response = await fetch(apiUrl, options)

        if (response.ok) {
          const data = await response.json()
          console.log(data)
          setStories(data.users_stories)
        } else {
          console.error("Failed to fetch stories:", response.status)
        }
      } catch (error) {
        console.error("Error fetching stories:", error)
      }
    }
    fetchStories();
  }
    

    
  
  useEffect(instaStories, [])

  return (
   <div className="flex gap-6 overflow-x-auto p-4 rounded-lg">
  {stories.map((story) => (
    <div key={story.user_id} className="flex flex-col items-center w-[70px]">
      <img
        src={story.story_url}
        alt={story.user_name}
        className="w-16 h-16 rounded-full border-2 border-pink-500"
      />
      <p className="text-sm mt-1 truncate w-full text-center">
        {story.user_name}
      </p>
    </div>
  ))}
</div>

  )
}

export default Stories
