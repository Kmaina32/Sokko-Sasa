"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Search, Send, Inbox } from "lucide-react";

const conversations = [
    {
        id: 'convo1',
        name: 'Artisan Co.',
        avatar: 'https://picsum.photos/seed/seller1/100/100',
        listing: 'Hand-carved Wooden Elephant',
        lastMessage: 'Is it available in a darker wood?',
        time: '10:42 AM',
        unread: 1,
    },
    {
        id: 'convo2',
        name: 'Jane Smith',
        avatar: 'https://picsum.photos/seed/seller2/100/100',
        listing: 'Leather Sofa',
        lastMessage: 'Okay, thank you!',
        time: 'Yesterday',
        unread: 0,
    },
     {
        id: 'convo3',
        name: 'Music Fest',
        avatar: 'https://picsum.photos/seed/organizer1/100/100',
        listing: 'Sauti Sol Concert',
        lastMessage: 'Can I buy tickets at the gate?',
        time: '3d ago',
        unread: 0,
    },
];

const messages = [
    {
        id: 'msg1',
        sender: 'other',
        text: 'Hello, I was wondering if this is still available?',
        time: '10:40 AM',
    },
    {
        id: 'msg2',
        sender: 'me',
        text: 'Yes, it is still available.',
        time: '10:41 AM',
    },
    {
        id: 'msg3',
        sender: 'other',
        text: 'Great! Is it available in a darker wood?',
        time: '10:42 AM',
    },
];


export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(
    conversations[0]
  );

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
            {conversations.length > 0 ? (
              conversations.map((convo) => (
                <button
                  key={convo.id}
                  onClick={() => setSelectedConversation(convo)}
                  className={cn(
                    "flex w-full items-start gap-4 p-4 text-left transition-colors hover:bg-muted/50",
                    selectedConversation?.id === convo.id && "bg-muted"
                  )}
                >
                  <Avatar>
                    <AvatarImage src={convo.avatar} alt={convo.name} />
                    <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-baseline justify-between">
                      <p className="font-semibold truncate">{convo.name}</p>
                      <p className="text-xs text-muted-foreground">{convo.time}</p>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{convo.listing}</p>
                    <div className="flex justify-between items-center mt-1">
                       <p className="text-sm text-muted-foreground truncate">{convo.lastMessage}</p>
                       {convo.unread > 0 && (
                          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">{convo.unread}</span>
                       )}
                    </div>
                  </div>
                </button>
              ))
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
                    <Avatar>
                    <AvatarImage
                        src={selectedConversation.avatar}
                        alt={selectedConversation.name}
                    />
                    <AvatarFallback>
                        {selectedConversation.name.charAt(0)}
                    </AvatarFallback>
                    </Avatar>
                    <div>
                    <h3 className="font-semibold">{selectedConversation.name}</h3>
                    <p className="text-sm text-muted-foreground">
                        Regarding: {selectedConversation.listing}
                    </p>
                    </div>
                </header>

                <ScrollArea className="flex-1 p-4 lg:p-6">
                    <div className="space-y-6">
                    {messages.map((message) => (
                        <div
                        key={message.id}
                        className={cn(
                            "flex items-end gap-2",
                            message.sender === "me" && "justify-end"
                        )}
                        >
                        {message.sender === "other" && (
                            <Avatar className="h-8 w-8">
                            <AvatarImage src={selectedConversation.avatar} />
                            <AvatarFallback>{selectedConversation.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        )}
                        <div
                            className={cn(
                            "max-w-xs rounded-lg p-3 lg:max-w-md",
                            message.sender === "me"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted"
                            )}
                        >
                            <p>{message.text}</p>
                            <p className={cn("text-xs mt-1", message.sender === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground')}>
                                {message.time}
                            </p>
                        </div>
                        </div>
                    ))}
                    </div>
                </ScrollArea>

                <footer className="border-t p-4 bg-card">
                    <div className="relative">
                    <Input
                        placeholder="Type your message..."
                        className="pr-12 text-base"
                    />
                    <Button
                        type="submit"
                        size="icon"
                        className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 bg-accent hover:bg-accent/90"
                    >
                        <Send className="h-4 w-4" />
                        <span className="sr-only">Send</span>
                    </Button>
                    </div>
                </footer>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center h-full text-center p-8">
                    <Inbox className="w-16 h-16 text-muted-foreground mb-4"/>
                    <h2 className="text-2xl font-bold">Select a conversation</h2>
                    <p className="text-muted-foreground mt-2">Choose a conversation from the left panel to view messages.</p>
                </div>
            )}
        </main>
      </div>
    </div>
  );
}
