"use client";

import { ActivityMood } from "@/data/activity";
import {
  clearActivityMood,
  setOpenActivities,
} from "@/redux/features/post/post.slice";
import { useAppDispatch } from "@/redux/hooks";
import React from "react";

const MoodDisplay = ({ activityMood }: { activityMood: ActivityMood }) => {
  const dispatch = useAppDispatch();
  const handleChangeActivityMood = () => {
    dispatch(setOpenActivities(true));
    dispatch(clearActivityMood());
  };
  return (
    <span className="mood-display">
      <img src={activityMood.detail.pic} />
      <span className="is-inverted" onClick={handleChangeActivityMood}>
        {activityMood.name !== "status" ? (
          <span className="action-text">{activityMood.name}</span>
        ) : (
          ""
        )}
        {activityMood.detail.name}
      </span>
    </span>
  );
};

export default MoodDisplay;
