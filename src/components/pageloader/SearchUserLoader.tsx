import React from "react";

interface SearchUserLoaderProps {
  loading?: boolean;
}

const SearchUserLoader = ({ loading = false }: SearchUserLoaderProps) => {
  return (
    <div className={`subloader is-grey ${loading ? "is-active" : ""}`}>
      <div className="loader is-loading"></div>
    </div>
  );
};

export default SearchUserLoader;
