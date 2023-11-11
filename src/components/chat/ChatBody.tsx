import React from "react";
import { ComposeAddDropdown } from "../dropdowns";

const ChatBody = () => {
  return (
    <div id="chat-body" className="chat-body is-opened">
      <div className="chat-body-inner has-slimscroll">
        <div className="date-divider">
          <hr className="date-divider-line" />
          <span className="date-divider-text">Today</span>
        </div>

        <div className="chat-message is-received">
          <img src="https://via.placeholder.com/300x300" alt="" />
          <div className="message-block">
            <span>8:03am</span>
            <div className="message-text">
              Hi Jenna! I made a new design, and i wanted to show it to you.
            </div>
          </div>
        </div>

        <div className="chat-message is-received">
          <img src="https://via.placeholder.com/300x300" alt="" />
          <div className="message-block">
            <span>8:03am</span>
            <div className="message-text">
              It is quite clean and it is inspired from Bulkit.
            </div>
          </div>
        </div>

        <div className="chat-message is-sent">
          <img src="https://via.placeholder.com/300x300" alt="" />
          <div className="message-block">
            <span>8:12am</span>
            <div className="message-text">Oh really??! I want to see that.</div>
          </div>
        </div>

        <div className="chat-message is-received">
          <img src="https://via.placeholder.com/300x300" alt="" />
          <div className="message-block">
            <span>8:13am</span>
            <div className="message-text">
              FYI it was done in less than a day.
            </div>
          </div>
        </div>

        <div className="chat-message is-sent">
          <img src="https://via.placeholder.com/300x300" alt="" />
          <div className="message-block">
            <span>8:17am</span>
            <div className="message-text">
              Great to hear it. Just send me the PSD files so i can have a look
              at it.
            </div>
          </div>
        </div>
        <div className="chat-message is-sent">
          <img src="https://via.placeholder.com/300x300" alt="" />
          <div className="message-block">
            <span>8:17am</span>
            <div className="message-text">
              Great to hear it. Just send me the PSD files so i can have a look
              at it.
            </div>
          </div>
        </div>
        <div className="chat-message is-sent">
          <img src="https://via.placeholder.com/300x300" alt="" />
          <div className="message-block">
            <span>8:17am</span>
            <div className="message-text">
              Great to hear it. Just send me the PSD files so i can have a look
              at it.
            </div>
          </div>
        </div>
        <div className="chat-message is-sent">
          <img src="https://via.placeholder.com/300x300" alt="" />
          <div className="message-block">
            <span>8:17am</span>
            <div className="message-text">
              Great to hear it. Just send me the PSD files so i can have a look
              at it.
            </div>
          </div>
        </div>
        <div className="chat-message is-sent">
          <img src="https://via.placeholder.com/300x300" alt="" />
          <div className="message-block">
            <span>8:17am</span>
            <div className="message-text">
              Great to hear it. Just send me the PSD files so i can have a look
              at it.
            </div>
          </div>
        </div>
        <div className="chat-message is-sent">
          <img src="https://via.placeholder.com/300x300" alt="" />
          <div className="message-block">
            <span>8:17am</span>
            <div className="message-text">
              Great to hear it. Just send me the PSD files so i can have a look
              at it.
            </div>
          </div>
        </div>

        <div className="chat-message is-sent">
          <img src="https://via.placeholder.com/300x300" alt="" />
          <div className="message-block">
            <span>8:18am</span>
            <div className="message-text">
              And if you have a prototype, you can also send me the link to it.
            </div>
          </div>
        </div>
      </div>
      {/* Compose message area */}
      <div className="chat-action">
        <div className="chat-action-inner">
          <div className="control">
            <textarea className="textarea comment-textarea" rows={1}></textarea>
            <ComposeAddDropdown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBody;
