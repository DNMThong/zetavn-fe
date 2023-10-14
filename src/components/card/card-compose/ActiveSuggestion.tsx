"use client";
import React, { useEffect, useState } from "react";
import ActiveSuggestionItem from "./ActiveSuggestionItem";
import Autosuggest from "react-autosuggest";
import { IActivityStatus, activityStatus } from "@/data/activity";
import { FiSearch, FiX } from "react-icons/fi";
import { useAppDispatch } from "@/redux/hooks";
import {
  closeActivities,
  setActivityStatusSelected,
} from "@/redux/features/post/post.slice";

const ActiveSuggestion = () => {
  const [value, setValue] = useState<string>("");
  const [suggestions, setSuggestions] =
    useState<IActivityStatus[]>(activityStatus);
  const dispatch = useAppDispatch();

  const getSuggestions = (value: string): IActivityStatus[] => {
    const inputValue: string = value.trim().toLowerCase();
    return activityStatus.filter((item) => item.name.includes(inputValue));
  };

  const getSuggestionValue = (suggestion: IActivityStatus) => suggestion.name;

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
    { suggestion }: { suggestion: IActivityStatus }
  ) => {
    dispatch(setActivityStatusSelected(suggestion));
  };

  const inputProps = {
    placeholder: "Bạn đang làm gì thế?",
    value,
    onChange: onChange,
    id: "activities-autocpl",
    className: "input",
  };

  const handleCloseActivities = () => {
    dispatch(closeActivities());
  };

  useEffect(() => {
    return () => setValue("");
  }, []);

  return (
    <div id="activities-autocpl-wrapper" className={`control has-margin`}>
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
      <div className="icon">
        <FiSearch />
      </div>
      <div className="close-icon is-main" onClick={handleCloseActivities}>
        <FiX />
      </div>
    </div>
  );
};

export default ActiveSuggestion;
