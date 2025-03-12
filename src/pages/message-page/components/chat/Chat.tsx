import {useEffect ,useState} from "react"
import {socket} from "../../../../socket"
import {generateRoomId} from "../../../../util/chat"
import {UseGetProfile} from "../../../../queries/userQueries"
import LabeledInput from "../../../../components/labeled-input/LabeledInput"

interface ChatProps {
  chatroomId: string | null;
}

export const Chat = ({chatroomId}: ChatProps) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const [roomId, setRoomId] = useState<string | null>(null);
  const {data: user} = UseGetProfile();

  useEffect(() => {
    if(!chatroomId) return

    if(!socket.connected) {
      socket.connect()
      console.log("socket connected")
    }

    socket.emit("join-chat", {recipientId: chatroomId})
    console.log("chatroomId:", chatroomId)

    socket.on("joined-chat", () => {
      console.log(`joined chatroom ${chatroomId}`)
      setRoomId(generateRoomId(user.id, chatroomId))
    })

    socket.on("chat-message", (message: string)=> {
      console.log(message)
      setMessages((prevMessages) => [...prevMessages, message])
    })

    socket.on("new-message", (message: string) => {
      console.log(message)
      setMessages((prevMessages) => [...prevMessages, message])
    })

    socket.on('error', (err) => {
      console.log(`Error en socket: ${err}`)
    })

    return () => {
      socket.emit("leaveChatroom", chatroomId)
      socket.off("chat-message")
      socket.disconnect()
    }
  } ,[chatroomId]);

  const sendMessage = () => {
    if (input.trim() === "" || !chatroomId) {
      return;
    }
    socket.emit('chat-message',{roomId, message: input});
    setInput("");
  }

  if(!chatroomId) {
    return (
      <div>
        Select a chatroom to start chatting!
      </div>
    )
  }

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <LabeledInput
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        title={''}
        placeholder={'Start Writing!'}
        required={false}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
