"use client";
import { CardUserSearch } from "@/components/card";
import { SearchUserOptionsNavbar } from "@/components/navbar";
import { SearchUserLoader } from "@/components/pageloader";
import { Pagination } from "@/components/pagination";
import { useLazySearchUsersQuery } from "@/redux/features/user/user.service";
import { useAppSelector } from "@/redux/hooks";
import { SearchUserOption } from "@/types/contants.type";
import { SearchUserData, UserShort } from "@/types/user.type";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Tooltip } from "react-tooltip";

const SearchPage = () => {
  const params = useSearchParams();
  const [optionSearch, setOptionSearch] = useState<SearchUserOption>(
    (params.get("o") as SearchUserOption) || SearchUserOption.ALL
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(params.get("p") || "1")
  );
  const [loading, setLoading] = useState(false);
  const [searchUser] = useLazySearchUsersQuery();
  const user = useAppSelector((selector) => selector.auth.user);
  const [listUserSearch, setListUserSearch] = useState<SearchUserData[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElement, setTotalElement] = useState(0);
  const route = useRouter();
  console.log(params.get("o"), params.get("p"));

  useEffect(() => {
    setCurrentPage(parseInt(params.get("p") || "1"));
    setOptionSearch(
      (params.get("o") as SearchUserOption) || SearchUserOption.ALL
    );
  }, [params]);

  useEffect(() => {
    route.push(
      `/search?q=${params.get("q") || ""}&o=${optionSearch}&p=${currentPage}`
    );
  }, [currentPage, params, route, optionSearch]);

  useEffect(() => {
    setLoading(true);
    const fetchSearchUser = async () => {
      const response = await searchUser({
        kw: params.get("q") || "",
        option: optionSearch,
        pageNumber: currentPage - 1,
        pageSize: 1,
      }).unwrap();
      if (response.code === 200) {
        setListUserSearch(response.data.data);
        setTotalPages(response.data.totalPages);
        setTotalElement(response.data.totalElements);
        setLoading(false);
      }
    };
    fetchSearchUser();
  }, [optionSearch, params, searchUser, currentPage, user]);

  const handleSetOptionSearch = (value: SearchUserOption) => {
    setCurrentPage(1);
    setOptionSearch(value);
  };

  return (
    <>
      <SearchUserOptionsNavbar
        totalElement={totalElement}
        option={optionSearch}
        setOption={handleSetOptionSearch}
      />
      <SearchUserLoader loading={loading} />
      <Tooltip id="action-friend-tooltip" place="bottom"></Tooltip>

      <div className="friends-wrapper main-container">
        <div className="card-row-wrap is-active">
          <div
            className={`card-row-placeholder ${
              listUserSearch.length > 0 ? "is-hidden" : ""
            }`}>
            No matching results
          </div>
          {listUserSearch.length > 0 && (
            <div className="card-row">
              {listUserSearch.map((item) => (
                <CardUserSearch data={item} key={item.user.id} />
              ))}
            </div>
          )}
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}></Pagination>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
