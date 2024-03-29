import { FriendRequestResponse } from "@/types/response.type";
import { UserImage } from "../user-image";
import { FiUserCheck, FiUserMinus, FiUserPlus } from "react-icons/fi";
import { UserShort } from "@/types/user.type";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  useAcceptFriendMutation,
  useLazyGetFriendRequestQuery,
  useLazyGetFriendsListByUserIdQuery,
  useLazyGetFriendsQuery,
  useRejectFriendMutation,
} from "@/redux/features/user/user.service";
import { useEffect, useState } from "react";
import { setFriendRequest, setFriends } from "@/redux/features/auth/auth.slice";
import { useParams } from "next/navigation";
import { ImageDefault } from "@/types/contants.type";

interface CardFriendProps {
  data: FriendRequestResponse;
}

const CardFriendRequest = ({ data }: CardFriendProps) => {
  const source = useAppSelector((selector) => selector.auth.user);

  const dispatch = useAppDispatch();
  const [acceptFriendRequest] = useAcceptFriendMutation();
  const [rejectFriendRequest] = useRejectFriendMutation();
  const [getFriendRequest] = useLazyGetFriendRequestQuery();
  const [getFriends] = useLazyGetFriendsListByUserIdQuery();
  const [action, setAction] = useState<string | null>("none");
  const { user } = data;
  const handleAcceptFriendRequest = async () => {
    const response = await acceptFriendRequest({
      userId: user?.id,
    }).unwrap();
    if (response.code == 200) {
      setAction("accept");
    } else {
      setAction("none");
    }
  };
  const handleRejectFriendRequest = async () => {
    const response = await rejectFriendRequest({
      userId: user?.id,
    }).unwrap();
    if (response.code == 200) {
      setAction("reject");
    } else {
      setAction("none");
    }
  };
  useEffect(() => {}, [dispatch, getFriendRequest, source]);

  // useEffect(() => {
  //   const fetchFriendRequest = async () => {
  //     const response = await getFriendRequest({
  //       pageNumber: 0,
  //       pageSize: 6,
  //     }).unwrap();
  //     if (response.code === 200) {
  //       const { data } = response;
  //       dispatch(setFriendRequest(data.data));
  //     }
  //   };
  //   const fetchFriendList = async () => {
  //     const response = await getFriends({
  //       userId: data.user.id,
  //       pageSize: 6,
  //     }).unwrap();
  //     if (response.code === 200) {
  //       dispatch(setFriendRequest(response.data.data));
  //     }
  //   };

  //   if (action !== null && action !== "none") {
  //     fetchFriendRequest();
  //     fetchFriendList();
  //   }
  // }, [action, dispatch, getFriendRequest, getFriends, source, data]);
  return (
    <div className="column is-6">
      <div className="friend-small-card">
        <UserImage
          id={user?.id as string}
          path={(user?.avatar as string) || ImageDefault.AVATAR}
        />
        <div className="meta">
          <span>{user?.display}</span>
          {/* <span>264 Friends</span> */}
        </div>
        <div
          className="media-right"
          style={{
            marginLeft: "auto",
            justifySelf: "flex-end",
          }}>
          <button
            className="button icon-button is-solid grey-button raised"
            onClick={handleAcceptFriendRequest}>
            <FiUserCheck />
          </button>
          <button
            className="button icon-button is-solid grey-button raised"
            onClick={handleRejectFriendRequest}>
            <FiUserMinus />
          </button>
        </div>
        {/* <!-- Dropdown --> */}
      </div>
    </div>
  );
};

export default CardFriendRequest;
