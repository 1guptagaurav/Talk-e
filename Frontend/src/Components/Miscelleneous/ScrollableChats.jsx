import React from 'react'
import { isSameSender, isLastMessage, isSameSenderMargin } from "../../config/ChatLogic";
import useChat from '../../Context/ContextApi'
import { Avatar, Tooltip } from '@chakra-ui/react';
function ScrollableChats({messages}) {
    const {user}=useChat()
  return (
    <div>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip
                label={m.sender.fullname}
                placement="bottom-start"
                hasArrow
              >
                <Avatar
                  mt={"7px"}
                  mr={1}
                  size="sm"
                  cursor={"pointer"}
                  name={m.sender.fullname}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,

                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                marginLeft: isSameSenderMargin(messages,m,i,user._id)
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </div>
  );
}

export default ScrollableChats