"use client";

import {
  clearActivityMood,
  setOpenActivities,
} from "@/redux/features/post/post.slice";
import { useAppDispatch } from "@/redux/hooks";
import { ActivityMood } from "@/types/post.type";
import React from "react";

const MoodDisplay = ({ activityMood }: { activityMood: ActivityMood }) => {
  const dispatch = useAppDispatch();
  const handleChangeActivityMood = () => {
    dispatch(setOpenActivities(true));
    dispatch(clearActivityMood());
  };
  return (
    <div id="options-summary" className="options-summary">
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
    </div>
  );
};

export default MoodDisplay;
