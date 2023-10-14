"use client";
import ActiveSuggestion from "./ActiveSuggestion";
import ActiveSuggestionDetail from "./ActiveSuggestionDetail";
import { useAppSelector } from "@/redux/hooks";

const CardComposeActivity = () => {
  const { activityStatusSelected, openActivities } = useAppSelector(
    (selector) => selector.post
  );
  return (
    <div id="activities-suboption" className="is-autocomplete is-suboption">
      {openActivities && !activityStatusSelected && <ActiveSuggestion />}
      {openActivities && activityStatusSelected && (
        <ActiveSuggestionDetail
          activityStatusSelected={activityStatusSelected}
        />
      )}
    </div>
  );
};

export default CardComposeActivity;
