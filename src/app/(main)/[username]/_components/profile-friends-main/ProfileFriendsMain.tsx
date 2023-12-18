"use client";
import React, { useEffect, useState } from "react";
import CardFriendReqCol4 from "../card/CardFriendReqCol4";
import { useLazyGetFriendsListByUserIdQuery } from "@/redux/features/user/user.service";
import { useParams, useSearchParams } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { UserProfile, UserShort } from "@/types/user.type";
import TopPart from "../profile-part/TopPart";
import { FriendsFilterWidget } from "@/components/widgets";
import { CardFriend } from "@/components/card";
import { FriendRequestResponse } from "@/types/response.type";
import { Pagination } from "@/components/pagination";

interface ProfileFriendsMainProps {
  userProfile: UserProfile;
}

enum Tab {
  FRIENDS = "friend",
  FOLLOWS = "follow",
  REQUESTS = "request",
}

const ProfileFriendsMain = ({ userProfile }: ProfileFriendsMainProps) => {
  const query = useSearchParams();

  const user = useAppSelector((selector) => selector.auth.user);
  const friends = useAppSelector((selector) => selector.auth.friends);
  const friendRequests = useAppSelector(
    (selector) => selector.auth.friendRequest
  );
  const isSelfProfile: boolean =
    !!user &&
    (user.id === userProfile.username ||
      user.username === userProfile.username);
  const [friendsList, setFriendsList] = useState<FriendRequestResponse[]>([]);

  const [getFriendsList] = useLazyGetFriendsListByUserIdQuery();
  const [tabQuery, setTabQuery] = useState<Tab>(
    (query.get("tab") as Tab) || Tab.FRIENDS
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    async function fetchFriendsList() {
      const response = await getFriendsList({
        userId: userProfile.id,
        pageNumber: currentPage - 1,
        pageSize: 12,
      }).unwrap();
      console.log(response);
      if (response?.code === 200 && response?.status === "OK") {
        setFriendsList(response.data.data);
        setTotalPages(response.data.totalPages);
      }
    }
    fetchFriendsList();
  }, [tabQuery, user, getFriendsList, userProfile, currentPage]);
  return (
    <div className="container is-custom">
      <div id="profile-about" className="view-wrap is-headless">
        <TopPart
          isSelfProfile={isSelfProfile}
          userProfile={userProfile}></TopPart>
        <div className="columns">
          <div className="column">
            <FriendsFilterWidget></FriendsFilterWidget>
            <div className="friends-grid">
              <div className="columns is-multiline">
                {tabQuery === Tab.FRIENDS &&
                  friendsList &&
                  friendsList.length > 0 &&
                  friendsList.map((f, index: any) => {
                    return (
                      <div className="column is-3" key={index}>
                        <CardFriend user={f.user} popOver={index}></CardFriend>
                      </div>
                    );
                  })}

                {tabQuery === Tab.REQUESTS &&
                  friendRequests &&
                  friendRequests.length > 0 &&
                  friendRequests.map((fq, index: any) => {
                    return (
                      <div className="column is-4" key={index}>
                        <CardFriendReqCol4
                          data={fq}
                          isFriend={false}></CardFriendReqCol4>
                      </div>
                    );
                  })}
              </div>
              {totalPages > 1 && (
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}></Pagination>
              )}
              {/* <!-- Load more photos --> */}
              {/* <div className="load-more-wrap has-text-centered">
                 <a
                    href="#"
                    className="load-more-button"
                    onClick={handleLoadMoreFriends}
                 >
                    Load More
                 </a>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileFriendsMain;
