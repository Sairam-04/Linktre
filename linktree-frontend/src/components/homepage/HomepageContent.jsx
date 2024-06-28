import React from "react";
import socialtree from "../../assets/socialtree.jpeg"

const HomepageContent = () => {
  return (
    <div className="w-4/5 mx-auto flex items-center justify-between h-[90vh]">
      <div className="w-1/2 flex flex-col gap-4 justify-center">
        <div className="text-4xl font-bold">
          Connectverse: Your Social Universe, All in One Place
        </div>
        <div className="text-xl font-semibold">
          Connectverse is your gateway to a seamless social media experience.
          List all your platforms under one link, making it effortless for
          friends, fans, and followers to find and engage with your content.
        </div>
        <div>
          <button className="bg-green-400 px-4 py-2 text-xl hover:scale-105 border-none my-3 rounded-md">Get Started</button>
        </div>
      </div>
      <div className="w-[40%]">
        <img src={socialtree} alt="Heroimg" />
      </div>
    </div>
  );
};

export default HomepageContent;
