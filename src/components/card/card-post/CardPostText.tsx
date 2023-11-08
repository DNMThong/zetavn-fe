import { convertTextContent, getInfoMention } from "@/utils/text.util";
import Link from "next/link";
import React from "react";

interface ICardPostText {
  postAction?: React.ReactNode;
  content: string;
}

const CardPostText = ({ postAction, content }: ICardPostText) => {
  return (
    <>
      <div className="post-text">
        {/* <p>
          Yesterday with <a href="#">@Karen Miller</a> and
          <a href="#">@Marvin Stemperd</a> at the
          <a href="#">#Rock n Rolla</a> concert in LA. Was totally fantastic!
          People were really excited about this one!
        </p> */}

        <p>
          {convertTextContent(content).map((text, index) => {
            const mention = getInfoMention(text);
            if (mention) {
              return (
                <Link key={index} href={`/${mention.id}`}>
                  @{mention.display}
                </Link>
              );
            }
            return <span key={index}>{text}</span>;
          })}
        </p>
      </div>
      {postAction !== undefined && (
        <div className="post-actions">{postAction}</div>
      )}
    </>
  );
};

export default CardPostText;
