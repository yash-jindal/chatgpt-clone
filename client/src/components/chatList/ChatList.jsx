import { Link, useLocation, useNavigate } from "react-router-dom";
import "./chatList.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const ChatList = () => {
  const location = useLocation().pathname;
  const navigate = useNavigate();
  const { isPending, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (chatId) => {
      return fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ chatId }),
      }).then((res) => res.text());
    },
    onSuccess: (chatId) => {
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      console.log(location);
      if (location === `/dashboard/chats/${chatId}`) {
        navigate("/dashboard");
      }
    },
  });

  const handleDelete = (chatId) => {
    mutation.mutate(chatId);
  };
  return (
    <div className="chatList">
      <span className="title">DASHBOARD</span>
      <Link to="/dashboard">Create a new chat</Link>
      <Link to="/">Explore AI CHAT</Link>
      <Link to="/">Contact</Link>
      <hr />
      <span className="title">RECENT CHATS</span>
      <div className="list">
        {isPending
          ? "Loading..."
          : error
          ? "Something went wrong!"
          : data?.map((chat) => (
              <div key={chat._id} className="chatLink">
                <Link to={`/dashboard/chats/${chat._id}`}>{chat.title}</Link>
                <button onClick={() => handleDelete(chat._id)}>Delete</button>
              </div>
            ))}
      </div>
      <hr />
      <div className="upgrade">
        <img src="/logo.png" alt="" />
        <div className="texts">
          <span>Upgrade to AI CHAT Pro!</span>
          <span>Get unlimited access to all features</span>
        </div>
      </div>
    </div>
  );
};
