import React from "react";

interface ICardPostText {
  postAction?: React.ReactNode;
}

const CardPostText = ({ postAction }: ICardPostText) => {
  return (
    <>
      <div className="post-text">
        <p>
          Yesterday with <a href="#">@Karen Miller</a> and
          <a href="#">@Marvin Stemperd</a> at the
          <a href="#">#Rock n Rolla</a> concert in LA. Was totally fantastic!
          People were really excited about this one!
        </p>
      </div>
      {postAction !== undefined && (
        <div className="post-actions">{postAction}</div>
      )}
    </>
  );
};

export default CardPostText;
