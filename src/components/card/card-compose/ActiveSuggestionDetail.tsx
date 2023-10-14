import { IActivityStatus, IActivityStatusDetail } from "@/data/activity";
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

interface ActiveSuggestionDetailProps {
  activityStatusSelected: IActivityStatus;
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
  const [suggestions, setSuggestions] = useState<IActivityStatusDetail[]>(
    activityStatusDetails
  );
  const dispatch = useAppDispatch();

  const getSuggestions = (value: string): IActivityStatusDetail[] => {
    const inputValue: string = value.trim().toLowerCase();
    return activityStatusDetails.filter((item) =>
      item.name.includes(inputValue)
    );
  };

  const getSuggestionValue = (suggestion: IActivityStatusDetail) =>
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
    { suggestion }: { suggestion: IActivityStatusDetail }
  ) => {
    dispatch(
      setActivityMood({
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
