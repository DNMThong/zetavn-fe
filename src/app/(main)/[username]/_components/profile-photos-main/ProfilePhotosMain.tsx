"use client";
import React, { MouseEventHandler, useEffect, useState } from "react";
import TopPart from "../profile-part/TopPart";
import { PhotosFilterWidget } from "@/components/widgets";
import { UserProfile } from "@/types/user.type";
import { useAppSelector } from "@/redux/hooks";
import { Media } from "@/types/post.type";
import { useLazyGetPostMediaByUserIdQuery } from "@/redux/features/post/post.service";
import { MediaType } from "@/types/contants.type";
import { Fancybox } from "@/components/fancybox";

interface ProfilePhotosMainProps {
  userProfile: UserProfile;
}

const ProfilePhotosMain = ({ userProfile }: ProfilePhotosMainProps) => {
  const user = useAppSelector((selector) => selector.auth.user);
  const isSelfProfile: boolean =
    !!user &&
    (user.id === userProfile.username ||
      user.username === userProfile.username);

  const [photos, setPhotos] = useState<Media[]>([]);
  const [getMediaPost] = useLazyGetPostMediaByUserIdQuery();
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleLoadMore = (e: any) => {
    e.preventDefault();
    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const { data }: any = await getMediaPost({
        userId: userProfile.id,
        type: MediaType.IMAGE,
        pageSize: 8,
        pageNumber: page,
      }).unwrap();
      if (data?.data) {
        if (page === 0) {
          setPhotos(data?.data);
        } else {
          setPhotos((prev) => [...prev, ...data?.data]);
        }
        if (data.lastPage) setHasMore(false);
      }
      setLoading(false);
    }
    fetchData();
  }, [userProfile, page]);

  return (
    <div className="container is-custom">
      <div id="profile-about" className="view-wrap is-headless">
        <TopPart
          isSelfProfile={isSelfProfile}
          userProfile={userProfile}></TopPart>
        <div className="columns">
          <div className="column">
            <PhotosFilterWidget></PhotosFilterWidget>
            <Fancybox
              options={{
                Carousel: {
                  infinite: false,
                },
              }}>
              <div className="image-grid-custom">
                <div className="image-grid">
                  {/* <!--Grid Row--> */}
                  {photos &&
                    photos.length > 0 &&
                    photos.map((photo, index) => (
                      <div className="image-grid-item" key={index}>
                        <a
                          key={index}
                          data-fancybox={`post-image`}
                          data-lightbox-type="image"
                          href={photo.mediaPath}>
                          <img src={photo.mediaPath} alt="" />
                        </a>
                      </div>
                    ))}
                   
                  {loading && <>
                    <div className="image-grid-item" >
                        <div className="content-shape loads" style={{width: "100%",height: "100%"}}></div>
                      </div>
                      <div className="image-grid-item" >
                        <div className="content-shape loads" style={{width: "100%",height: "100%"}}></div>
                      </div>
                      <div className="image-grid-item" >
                        <div className="content-shape loads" style={{width: "100%",height: "100%"}}></div>
                      </div>
                  </>
                    }
                </div>
                {hasMore && (
                  <div className="load-more-wrap has-text-centered">
                    <a onClick={handleLoadMore} className="load-more-button">
                      Tải thêm
                    </a>
                  </div>
                )}
              </div>
            </Fancybox>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePhotosMain;
