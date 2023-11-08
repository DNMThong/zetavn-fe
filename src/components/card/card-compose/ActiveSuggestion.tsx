"use client";
import React, { useEffect, useState } from "react";
import ActiveSuggestionItem from "./ActiveSuggestionItem";
import Autosuggest from "react-autosuggest";
import { FiSearch, FiX } from "react-icons/fi";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  closeActivities,
  setActivities,
  setActivityStatusSelected,
} from "@/redux/features/post/post.slice";
import { ActivityStatus } from "@/types/post.type";
import { useGetActivitiesQuery } from "@/redux/features/post/post.service";

const ActiveSuggestion = () => {
  const activities = useAppSelector((selector) => selector.post.activities);
  const { data, isLoading, isSuccess } = useGetActivitiesQuery();
  const [value, setValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<ActivityStatus[]>(activities);
  const dispatch = useAppDispatch();

  const getSuggestions = (value: string): ActivityStatus[] => {
    const inputValue: string = value.trim().toLowerCase();
    return activities.filter((item) =>
      item.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(setActivities(data.data));
    }
  }, [data, isSuccess, dispatch]);

  const getSuggestionValue = (suggestion: ActivityStatus) => suggestion.name;

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
    { suggestion }: { suggestion: ActivityStatus }
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
