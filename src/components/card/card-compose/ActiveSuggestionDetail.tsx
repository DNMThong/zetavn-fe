import React, { useEffect, useState } from "react";
import Autosuggest from "react-autosuggest";
import { FiX } from "react-icons/fi";
import ActiveSuggestionItem from "./ActiveSuggestionItem";
import { useAppDispatch } from "@/redux/hooks";
import {
  clearActivityStatusSelected,
  closeActivities,
  setActivityMood,
} from "@/redux/features/post/post.slice";
import { ActivityStatus, ActivityStatusDetail } from "@/types/post.type";

interface ActiveSuggestionDetailProps {
  activityStatusSelected: ActivityStatus;
}

const ActiveSuggestionDetail = ({
  activityStatusSelected,
}: ActiveSuggestionDetailProps) => {
  const {
    title,
    pic,
    name,
    desc,
    details: activityStatusDetails,
  } = activityStatusSelected;
  const [value, setValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<ActivityStatusDetail[]>(
    activityStatusDetails
  );
  const dispatch = useAppDispatch();

  const getSuggestions = (value: string): ActivityStatusDetail[] => {
    const inputValue: string = value.trim().toLowerCase();
    return activityStatusDetails.filter((item) =>
      item.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const getSuggestionValue = (suggestion: ActivityStatusDetail) =>
    suggestion.name;

  const onChange = (_: any, { newValue }: { newValue: string }) => {
    setValue(newValue);
  };

  const handleSuggestionsFetchRequested = ({ value }: { value: string }) => {
    setSuggestions(getSuggestions(value));
  };

  const handleSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const handleSuggestionSelected = (
    _: any,
    { suggestion }: { suggestion: ActivityStatusDetail }
  ) => {
    dispatch(
      setActivityMood({
        id: activityStatusSelected.id,
        title,
        desc,
        name,
        pic,
        detail: suggestion,
      })
    );
  };

  const inputProps = {
    placeholder: "Bạn cảm thấy như thế nào?",
    value,
    onChange: onChange,
    className: "input is-subactivity",
  };

  const handleCloseActivities = () => {
    dispatch(closeActivities());
  };

  const handleChangeActivityStatusSelected = () => {
    dispatch(clearActivityStatusSelected());
  };

  useEffect(() => {
    return () => setValue("");
  }, []);

  return (
    <div id="mood-autocpl-wrapper" className={`is-autocomplete is-activity`}>
      <div className="control has-margin">
        <Autosuggest
          alwaysRenderSuggestions
          suggestions={suggestions}
          onSuggestionsFetchRequested={handleSuggestionsFetchRequested}
          onSuggestionsClearRequested={handleSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={ActiveSuggestionItem}
          inputProps={inputProps}
          onSuggestionSelected={handleSuggestionSelected}
        />
        <div
          className="input-block"
          onClick={handleChangeActivityStatusSelected}>
          {title}
        </div>
        <div
          className="close-icon is-subactivity"
          onClick={handleCloseActivities}>
          <FiX />
        </div>
      </div>
    </div>
  );
};

export default ActiveSuggestionDetail;
