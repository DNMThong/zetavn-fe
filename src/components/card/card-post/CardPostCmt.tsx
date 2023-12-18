"use client";
import { FiAtSign, FiCamera, FiSmile, FiX } from "react-icons/fi";
import { CardComment } from "@/components/card";
import {
  useCreateCommentMutation,
  useGetCommentsQuery,
} from "@/redux/features/post/post.service";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { ChangeEvent, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { fileImageToUrl } from "@/utils/file.util";
import { useUploadImageBase64Mutation } from "@/redux/features/upload/upload.service";
import { Comment } from "@/types/post.type";

interface CardPostCmtProps {
  open: boolean;
  handleClose: () => void;
  postId: string;
}

const CardPostCmt = ({
  open = false,
  handleClose,
  postId,
}: CardPostCmtProps) => {
  const [page, setPage] = useState(0);
  const { data, isLoading: isLoadingCmt } = useGetCommentsQuery({
    postId,
    pageNumber: page,
    pageSize: 10,
  });
  const user = useAppSelector((selector) => selector.auth.user);
  const [urlPhoto, setUrlPhoto] = useState("");

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const [createComment] = useCreateCommentMutation();
  const [uploadPhoto] = useUploadImageBase64Mutation();
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (data?.data) {
      setComments((prev) => [...prev, ...data.data.data]);
    }
  }, [data]);

  const handleOpenEmojiPicker = () => {
    setShowEmojiPicker(true);
  };

  const handleCloseEmojiPicker = () => {
    setShowEmojiPicker(false);
  };

  const handleEmojiClick = (emoji: EmojiClickData) => {
    setValue((prevValue) => prevValue + emoji.emoji);
  };

  const handleChangePhoto = async (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target.files && e.target.files[0];
    try {
      if (file) {
        let invalid: boolean = false;

        if (file.size > 10 * 1024 * 1024) {
          toast.warning("Ảnh tải lên phải nhỏ hơn 10MB");
          invalid = true;
        }

        if (!invalid) {
          const urlBase64: string = await fileImageToUrl(file);
          setUrlPhoto(urlBase64);
        }
      } else {
        setUrlPhoto("");
      }
    } catch (err) {
      setUrlPhoto("");
      console.log(err);
    }
  };

  const handlePostCmt = async () => {
    setIsLoading(true);
    try {
      let photo: string | null = null;
      if (urlPhoto) {
        const responseUpload = await uploadPhoto([urlPhoto]).unwrap();
        if (responseUpload.code === 201) {
          photo = responseUpload.data[0].url;
        }
      }
      const response = await createComment({
        postId,
        comment: {
          content: value,
          path: photo,
        },
      }).unwrap();
      console.log(response);
      if (response.code === 200) {
        setComments((prev) => [response.data, ...prev]);
        setValue("");
        setUrlPhoto("");
        toast.success("Bình luận thành công");
      } else {
        toast.warning("Vui lòng thử lại");
      }
    } catch (err) {
      console.log(err);
      toast.error("Đã có lỗi xảy ra!");
    }

    setIsLoading(false);
  };

  return (
    <div className={`comments-wrap ${open ? "" : "is-hidden"}`}>
      {/* <!-- Header --> */}
      <div className="comments-heading">
        <h4>
          Bình luận <small>({data?.data.totalElements || 0})</small>
        </h4>
        <div className="close-comments" onClick={handleClose}>
          <FiX />
        </div>
      </div>

      {open && (
        <div className="comments-body has-slimscroll">
          {comments.length > 0 &&
            comments.map((item) => <CardComment key={item.id} data={item} />)}
          {data?.data && !data.data.lastPage && (
            <div className="has-text-centered">
              <button
                className="load-more-button"
                onClick={() => setPage((prevPage) => prevPage + 1)}>
                Xem thêm
              </button>
            </div>
          )}
        </div>
      )}

      {/* <!-- Comments footer --> */}
      <div className="card-footer">
        <div className="media post-comment has-emojis">
          {/* <!-- Comment Textarea --> */}
          <div className="media-content">
            <div className="field">
              <p className="control">
                <textarea
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="textarea comment-textarea"
                  rows={5}
                  placeholder="Viết bình luận..."></textarea>
              </p>
              <div className="comment-upload">
                {urlPhoto && (
                  <div className="upload-wrap">
                    <div className="upload-wrap-item">
                      <img src={urlPhoto} alt="" />
                      <span
                        className="remove-file"
                        onClick={() => setUrlPhoto("")}>
                        <FiX />
                      </span>
                    </div>
                  </div>
                )}
              </div>
              <div
                className={`is-autocomplete is-suboption ${
                  showEmojiPicker ? "" : "is-hidden"
                }`}>
                {showEmojiPicker && (
                  <div className="emoji-picker-post">
                    <button
                      className="btn-close-emoji-picker"
                      onClick={handleCloseEmojiPicker}>
                      <FiX />
                    </button>
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                  </div>
                )}
              </div>
            </div>
            {/* <!-- Additional actions --> */}
            <div className="actions">
              <div className="image is-32x32">
                <Image
                  className="is-rounded img-custom"
                  src={user?.avatar || "https://via.placeholder.com/300x300"}
                  alt=""
                  width={320}
                  height={320}
                />
              </div>
              <div className="toolbar">
                <div className="action is-auto">
                  <FiAtSign />
                </div>
                <div
                  className="action is-emoji"
                  onClick={handleOpenEmojiPicker}>
                  <FiSmile />
                </div>
                <label className="action is-upload">
                  <FiCamera />
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={handleChangePhoto}
                  />
                </label>
                <button
                  disabled={!value}
                  className={`button is-solid primary-button raised ${
                    value ? "" : "is-disabled"
                  } ${isLoading ? "is-loading" : ""}`}
                  onClick={handlePostCmt}>
                  Đăng bình luận
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Comments footer --> */}
    </div>
  );
};

export default CardPostCmt;
