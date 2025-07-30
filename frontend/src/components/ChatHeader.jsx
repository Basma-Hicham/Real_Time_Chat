import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  // Return null if no user is selected (or show alternative UI)
  if (!selectedUser) {
    return null; 
    // Or return a placeholder:
    // return <div className="p-2.5 border-b border-base-300">No chat selected</div>
  }

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar with null check fallback */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img 
                src={selectedUser?.profilePic || "/avatar.png"} 
                alt={selectedUser?.username || "Unknown user"} 
              />
            </div>
          </div>

          {/* User info with null checks */}
          <div>
            <h3 className="font-medium">{selectedUser?.username || "Unknown"}</h3>
            <p className="text-sm text-base-content/70">
              {selectedUser?._id && onlineUsers.includes(selectedUser._id) 
                ? "Online" 
                : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button - now safe */}
        <button 
          onClick={() => setSelectedUser(null)}
          aria-label="Close chat"
        >
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;