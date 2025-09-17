
"use client";

import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Search, Send, Inbox, Loader2, LogIn } from "lucide-react";
import type { Conversation, Message } from "@/lib/types";
import { useAuth } from "@/context/auth-context";
import { getConversations, getMessages, sendMessage } from "@/lib/firestore";
import { formatDistanceToNow } from 'date-fns';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";


export default function MessagesPage() {
  const { user, loading: authLoading } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loadingConversations, setLoadingConversations] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    if (user) {
      setLoadingConversations(true);
      const unsubscribe = getConversations(user.uid, (convos) => {
        setConversations(convos);
        setLoadingConversations(false);
        if (!selectedConversation && convos.length > 0) {
          handleSelectConversation(convos[0]);
        } else if (convos.length === 0) {
          setSelectedConversation(null);
        }
      });
      return () => unsubscribe();
    } else if (!authLoading) {
      setLoadingConversations(false);
    }
  }, [user, authLoading, selectedConversation]);

  useEffect(() => {
    if (selectedConversation) {
      setLoadingMessages(true);
      const unsubscribe = getMessages(selectedConversation.id, (msgs) => {
        setMessages(msgs);
        setLoadingMessages(false);
        setTimeout(() => {
            const viewport = scrollAreaRef.current?.querySelector('div[data-radix-scroll-area-viewport]');
            if (viewport) {
                viewport.scrollTop = viewport.scrollHeight;
            }
        }, 0);
      });
      return () => unsubscribe();
    }
  }, [selectedConversation]);

  const handleSelectConversation = (convo: Conversation) => {
    setSelectedConversation(convo);
  };
  
  const handleSendMessage = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!newMessage.trim() || !user || !selectedConversation) return;

      const messageText = newMessage;
      setNewMessage("");

      try {
          await sendMessage(selectedConversation.id, user.uid, messageText, selectedConversation.participantIds);
      } catch (error) {
          console.error("Error sending message:", error);
          // Optionally, show a toast notification
          setNewMessage(messageText); // Put the message back in the input on failure
      }
  }
  
  if (authLoading) {
      return (
          <div className="flex justify-center items-center h-[calc(100vh-4rem)]">
              <Loader2 className="w-8 h-8 animate-spin text-primary"/>
          </div>
      )
  }

  if (!user) {
     return (
        <div className="container mx-auto max-w-3xl px-4 py-8">
            <Card className="text-center">
                <CardHeader>
                    <CardTitle>Please Log In</CardTitle>
                    <CardDescription>You need to be logged in to view your messages.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link href="/login">
                            <LogIn className="mr-2 h-4 w-4"/>
                            Login
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
     )
  }

  return (
    <div className="h-[calc(100vh-4rem)] border-t">
      <div className="grid h-full grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[350px_1fr]">
        <aside className="hidden md:flex flex-col border-r bg-card">
          <div className="p-4 border-b">
            <h2 className="font-headline text-2xl font-bold">Inbox</h2>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search conversations..." className="pl-10"/>
            </div>
          </div>
          <ScrollArea className="flex-1">
            {loadingConversations ? (
                <div className="p-4 space-y-4">
                    <div className="flex items-center gap-4 animate-pulse">
                        <div className="h-12 w-12 rounded-full bg-muted"></div>
                        <div className="flex-1 space-y-2">
                            <div className="h-4 w-3/4 rounded bg-muted"></div>
                            <div className="h-3 w-1/2 rounded bg-muted"></div>
                        </div>
                    </div>
                </div>
            ) : conversations.length > 0 ? (
              conversations.map((convo) => {
                const otherParticipantId = convo.participantIds.find(p => p !== user.uid) || '';
                const otherParticipant = convo.participants[otherParticipantId];
                const lastMessageTime = convo.lastMessage?.createdAt ? formatDistanceToNow(convo.lastMessage.createdAt.toDate(), { addSuffix: true }) : '';

                return (
                    <button
                    key={convo.id}
                    onClick={() => handleSelectConversation(convo)}
                    className={cn(
                        "flex w-full items-start gap-4 p-4 text-left transition-colors hover:bg-muted/50",
                        selectedConversation?.id === convo.id && "bg-muted"
                    )}
                    >
                    <Avatar>
                        <AvatarImage src={otherParticipant?.avatarUrl} alt={otherParticipant?.name} />
                        <AvatarFallback>{otherParticipant?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 overflow-hidden">
                        <div className="flex items-baseline justify-between">
                        <p className="font-semibold truncate">{otherParticipant?.name}</p>
                        <p className="text-xs text-muted-foreground whitespace-nowrap">{lastMessageTime}</p>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">{convo.listing.title}</p>
                        <div className="flex justify-between items-center mt-1">
                        <p className="text-sm text-muted-foreground truncate">{convo.lastMessage?.text}</p>
                        {/* {convo.unread > 0 && (
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">{convo.unread}</span>
                        )} */}
                        </div>
                    </div>
                    </button>
                )
            })
            ) : (
                <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                    <Inbox className="w-12 h-12 text-muted-foreground mb-4"/>
                    <h3 className="text-lg font-semibold">No Conversations</h3>
                    <p className="text-sm text-muted-foreground">Your message history will appear here.</p>
                </div>
            )}
          </ScrollArea>
        </aside>

        <main className="flex flex-col">
            {selectedConversation ? (
                <>
                <header className="flex items-center gap-4 border-b p-4 bg-card">
                   {(() => {
                        const otherParticipantId = selectedConversation.participantIds.find(p => p !== user.uid) || '';
                        const otherParticipant = selectedConversation.participants[otherParticipantId];
                        return (
                            <>
                            <Avatar>
                                <AvatarImage src={otherParticipant?.avatarUrl} alt={otherParticipant?.name}/>
                                <AvatarFallback>{otherParticipant?.name?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="font-semibold">{otherParticipant?.name}</h3>
                                <p className="text-sm text-muted-foreground">
                                    Regarding: {selectedConversation.listing.title}
                                </p>
                            </div>
                            </>
                        )
                   })()}
                </header>

                <ScrollArea className="flex-1 p-4 lg:p-6" ref={scrollAreaRef}>
                    <div className="space-y-6">
                    {loadingMessages ? (
                        <div className="flex justify-center items-center h-full">
                            <Loader2 className="w-6 h-6 animate-spin text-primary"/>
                        </div>
                    ) : (
                        messages.map((message) => {
                            const isMe = message.senderId === user.uid;
                            const otherParticipantId = selectedConversation.participantIds.find(p => p !== user.uid) || '';
                            const otherParticipant = selectedConversation.participants[otherParticipantId];
                            
                            return (
                                <div
                                key={message.id}
                                className={cn(
                                    "flex items-end gap-2",
                                    isMe && "justify-end"
                                )}
                                >
                                {!isMe && (
                                    <Avatar className="h-8 w-8">
                                    <AvatarImage src={otherParticipant?.avatarUrl} />
                                    <AvatarFallback>{otherParticipant?.name?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                )}
                                <div
                                    className={cn(
                                    "max-w-xs rounded-lg p-3 lg:max-w-md",
                                    isMe
                                        ? "bg-primary text-primary-foreground"
                                        : "bg-muted"
                                    )}
                                >
                                    <p>{message.text}</p>
                                    <p className={cn("text-xs mt-1", isMe ? 'text-primary-foreground/70' : 'text-muted-foreground')}>
                                        {message.createdAt ? formatDistanceToNow(message.createdAt.toDate()) : 'sending...'}
                                    </p>
                                </div>
                                </div>
                            )
                        })
                    )}
                    </div>
                </ScrollArea>

                <footer className="border-t p-4 bg-card">
                    <form onSubmit={handleSendMessage} className="relative">
                        <Input
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type your message..."
                            className="pr-12 text-base"
                            disabled={!selectedConversation}
                        />
                        <Button
                            type="submit"
                            size="icon"
                            className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 bg-accent hover:bg-accent/90"
                            disabled={!newMessage.trim() || !selectedConversation}
                        >
                            <Send className="h-4 w-4" />
                            <span className="sr-only">Send</span>
                        </Button>
                    </form>
                </footer>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                    <Inbox className="w-16 h-16 text-muted-foreground mb-4"/>
                    <h2 className="text-2xl font-bold">Select a conversation</h2>
                    <p className="text-muted-foreground mt-2">Choose a conversation from the left panel to see messages.</p>
                </div>
            )}
        </main>
      </div>
    </div>
  );
}
