import React from 'react';

const MyWorkContent = () => {
  return (
    <div className="p-6 text-sm md:text-base space-y-4 text-card-foreground">
      <h2 className="text-lg font-bold mb-2">My Work Experience</h2>
      <p>
        Throughout my career, I've gained valuable experience in various domains, with a focus on moderation and management.
      </p>
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>Content Moderation:</strong> Ensuring online communities are safe and adhere to guidelines by reviewing user-generated content.
        </li>
        <li>
          <strong>Team Management:</strong> Leading and coordinating teams to achieve project goals, fostering a collaborative and productive environment.
        </li>
        <li>
          <strong>Project Management:</strong> Overseeing projects from conception to completion, ensuring they are delivered on time and within scope.
        </li>
      </ul>
    </div>
  );
};

export default MyWorkContent;
