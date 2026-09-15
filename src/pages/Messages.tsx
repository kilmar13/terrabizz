import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db, auth } from '../lib/firebase';
import { collection, query, where, orderBy, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { Send, ArrowLeft, Loader2, MessageSquare } from 'lucide-react';
import Navbar from '../components/Navbar';

export default function Messages() {
  const { session } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = location.state as { sellerId?: string, productId?: string } | null;

  const [conversations, setConversations] = useState<any[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      navigate('/login', { state: { mode: 'login', message: 'Please login to access messages.' } });
      return;
    }

    // Load conversations (chats where the user is either buyer or seller)
    // To simplify without complex queries, we'll just query all messages where user is involved
    // and group them. Since complex OR queries are limited, we do two queries:
    
    // In a real app with proper schema, we'd have a 'chats' collection
    // For this prototype, we'll create a basic chats listener if needed.
    
    // Actually let's assume a 'chats' collection structure
    const q1 = query(collection(db, 'chats'), where('participants', 'array-contains', session.user.id));
    
    const unsubscribe = onSnapshot(q1, (snapshot) => {
      const loadedChats = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setConversations(loadedChats);
      setIsLoading(false);

      // If came from marketplace with a sellerId, find or create chat
      if (locationState?.sellerId && locationState.sellerId !== session.user.id && !activeChat) {
         const existingChat = loadedChats.find((c: any) => c.participants.includes(locationState.sellerId));
         if (existingChat) {
           setActiveChat(existingChat.id);
         } else {
           // We will create the chat when the first message is sent
           setActiveChat('NEW_CHAT_PENDING');
         }
      }
    });

    return () => unsubscribe();
  }, [session, navigate, locationState]);

  useEffect(() => {
    if (!activeChat || activeChat === 'NEW_CHAT_PENDING') {
      setMessages([]);
      return;
    }

    const q = query(
      collection(db, 'chats', activeChat, 'messages'),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe();
  }, [activeChat]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !session) return;

    try {
      let chatId = activeChat;
      
      if (chatId === 'NEW_CHAT_PENDING' && locationState?.sellerId) {
        // Create new chat document
        const newChatRef = await addDoc(collection(db, 'chats'), {
          participants: [session.user.id, locationState.sellerId],
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          lastMessage: newMessage,
          productId: locationState.productId || null
        });
        chatId = newChatRef.id;
        setActiveChat(chatId);
      }

      if (chatId && chatId !== 'NEW_CHAT_PENDING') {
        await addDoc(collection(db, 'chats', chatId, 'messages'), {
          text: newMessage,
          senderId: session.user.id,
          senderName: session.user.name,
          timestamp: serverTimestamp()
        });
        setNewMessage('');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message');
    }
  };

  if (!session) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Navbar />

      <div className="flex-1 max-w-[1400px] w-full mx-auto px-6 py-12 pt-32 h-[calc(100vh-80px)]">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex h-[80vh]">
          
          {/* Conversation List Sidebar */}
          <div className="w-1/3 border-r border-slate-100 flex flex-col bg-slate-50/50">
            <div className="p-6 border-b border-slate-100 bg-white">
              <h1 className="text-xl font-black text-slate-800 tracking-tight">Messages</h1>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {isLoading ? (
                <div className="flex justify-center p-8 mt-10">
                  <div className="w-8 h-8 bg-[#10B981] rounded-lg flex items-center justify-center text-white font-black text-xl tracking-tighter">T</div>
                </div>
              ) : conversations.length === 0 && activeChat !== 'NEW_CHAT_PENDING' ? (
                <div className="text-center p-8 text-slate-500 text-sm font-medium">No messages yet.</div>
              ) : (
                <>
                  {activeChat === 'NEW_CHAT_PENDING' && (
                    <button className="w-full text-left p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                       <p className="font-bold text-slate-900 text-sm">New Conversation</p>
                       <p className="text-xs text-slate-500">Say Hello!</p>
                    </button>
                  )}
                  {conversations.map(chat => {
                    const otherParticipant = chat.participants.find((p: string) => p !== session.user.id) || 'Unknown';
                    const isActive = activeChat === chat.id;
                    return (
                      <button 
                        key={chat.id}
                        onClick={() => setActiveChat(chat.id)}
                        className={`w-full text-left p-4 rounded-2xl transition-all ${isActive ? 'bg-emerald-50 border border-emerald-200 shadow-sm' : 'bg-white border border-slate-100 hover:border-emerald-300'}`}
                      >
                        <p className="font-bold text-slate-900 text-sm truncate">User: {otherParticipant.substring(0, 8)}...</p>
                        {chat.lastMessage && <p className="text-xs text-slate-500 truncate mt-1">{chat.lastMessage}</p>}
                      </button>
                    )
                  })}
                </>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col bg-white">
            {activeChat ? (
              <>
                <div className="p-6 border-b border-slate-100 flex items-center gap-4 bg-white shadow-sm z-10">
                  <button onClick={() => setActiveChat(null)} className="md:hidden p-2 rounded-full hover:bg-slate-100 text-slate-500">
                    <ArrowLeft size={20} />
                  </button>
                  <div>
                    <h2 className="text-lg font-bold text-slate-800">Conversation</h2>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
                  {messages.map(msg => (
                    <div key={msg.id} className={`flex max-w-[80%] ${msg.senderId === session.user.id ? 'ml-auto justify-end' : 'mr-auto justify-start'}`}>
                      <div className={`p-4 rounded-2xl ${msg.senderId === session.user.id ? 'bg-slate-900 text-white rounded-br-none shadow-md' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'}`}>
                        <p className="text-sm">{msg.text}</p>
                        <p className={`text-[10px] mt-2 font-medium ${msg.senderId === session.user.id ? 'text-slate-400' : 'text-slate-400'}`}>
                          {msg.timestamp ? new Date(msg.timestamp.toDate()).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : 'Just now'}
                        </p>
                      </div>
                    </div>
                  ))}
                  {messages.length === 0 && activeChat !== 'NEW_CHAT_PENDING' && (
                    <div className="text-center p-8 text-slate-400 text-sm font-medium">Loading messages...</div>
                  )}
                </div>

                <div className="p-4 border-t border-slate-100 bg-white">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input 
                      type="text" 
                      value={newMessage}
                      onChange={e => setNewMessage(e.target.value)}
                      placeholder="Type a message..." 
                      className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-colors"
                    />
                    <button 
                      type="submit" 
                      disabled={!newMessage.trim()}
                      className="px-6 py-3 bg-emerald-500 text-slate-900 font-black tracking-widest uppercase rounded-xl hover:bg-emerald-400 transition-colors disabled:opacity-50 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                    >
                      <Send size={18} />
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400">
                <MessageSquare size={64} className="mb-4 text-slate-200" strokeWidth={1.5} />
                <p className="text-lg font-bold text-slate-600">Select a conversation</p>
                <p className="text-sm">Choose a chat from the sidebar to view messages.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
