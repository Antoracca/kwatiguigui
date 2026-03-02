"use client";

import { useState, useTransition, useActionState } from "react";
import {
  Inbox,
  Send,
  Star,
  ChevronLeft,
  Reply,
  Trash2,
  Archive,
  MoreHorizontal,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

import {
  sendMessage,
  markMessageRead,
  toggleMessageStar,
  deleteMessage,
} from "@/lib/actions/messages";
import type { ActionResult } from "@/lib/auth/actions";
import { formatRelativeDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Message {
  id: string;
  from_user_id: string;
  to_user_id: string;
  subject: string;
  content: string;
  is_read: boolean;
  is_starred: boolean;
  is_archived: boolean;
  category: string;
  created_at: string;
  sender_name?: string | null;
  recipient_name?: string | null;
}

type Tab = "inbox" | "sent" | "starred";

interface MessagesClientProps {
  userId: string;
  inboxMessages: Message[];
  sentMessages: Message[];
  starredMessages: Message[];
}

const initialSendState: ActionResult = { success: false };

export function MessagesClient({
  userId,
  inboxMessages,
  sentMessages,
  starredMessages,
}: MessagesClientProps) {
  const [activeTab, setActiveTab] = useState<Tab>("inbox");
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showReply, setShowReply] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [localMessages, setLocalMessages] = useState({
    inbox: inboxMessages,
    sent: sentMessages,
    starred: starredMessages,
  });

  const [sendState, sendAction, isSending] = useActionState(
    sendMessage,
    initialSendState,
  );

  const currentList =
    activeTab === "inbox"
      ? localMessages.inbox
      : activeTab === "sent"
        ? localMessages.sent
        : localMessages.starred;

  function handleSelectMessage(msg: Message) {
    setSelectedMessage(msg);
    setShowReply(false);
    // Mark as read if inbox and unread
    if (activeTab === "inbox" && !msg.is_read) {
      startTransition(async () => {
        await markMessageRead(msg.id);
        setLocalMessages((prev) => ({
          ...prev,
          inbox: prev.inbox.map((m) =>
            m.id === msg.id ? { ...m, is_read: true } : m,
          ),
        }));
      });
    }
  }

  function handleStar(msg: Message) {
    startTransition(async () => {
      await toggleMessageStar(msg.id, msg.is_starred);
      const update = (m: Message) =>
        m.id === msg.id ? { ...m, is_starred: !m.is_starred } : m;
      setLocalMessages((prev) => ({
        inbox: prev.inbox.map(update),
        sent: prev.sent.map(update),
        starred: msg.is_starred
          ? prev.starred.filter((m) => m.id !== msg.id)
          : [...prev.starred, { ...msg, is_starred: true }],
      }));
      if (selectedMessage?.id === msg.id) {
        setSelectedMessage((prev) =>
          prev ? { ...prev, is_starred: !prev.is_starred } : prev,
        );
      }
    });
  }

  function handleDelete(msgId: string) {
    startTransition(async () => {
      await deleteMessage(msgId);
      const remove = (arr: Message[]) => arr.filter((m) => m.id !== msgId);
      setLocalMessages((prev) => ({
        inbox: remove(prev.inbox),
        sent: remove(prev.sent),
        starred: remove(prev.starred),
      }));
      if (selectedMessage?.id === msgId) setSelectedMessage(null);
    });
  }

  const unreadCount = localMessages.inbox.filter((m) => !m.is_read).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="font-heading text-fluid-3xl font-bold text-neutral-900 dark:text-neutral-100">
          Messagerie
        </h1>
        <p className="mt-1 text-fluid-sm text-neutral-500 dark:text-neutral-400">
          Communiquez avec les employeurs et chercheurs d&apos;emploi
        </p>
      </div>

      {/* Main layout */}
      <div className="flex gap-4 overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
        {/* Sidebar — hidden on mobile when message selected */}
        <div
          className={[
            "flex w-full flex-col border-r border-neutral-100 dark:border-neutral-800 lg:w-80 lg:shrink-0",
            selectedMessage ? "hidden lg:flex" : "flex",
          ].join(" ")}
        >
          {/* Tabs */}
          <div className="flex gap-1 border-b border-neutral-100 p-3 dark:border-neutral-800">
            {(
              [
                { id: "inbox" as Tab, label: "Recus", icon: Inbox, count: unreadCount },
                { id: "sent" as Tab, label: "Envoyes", icon: Send, count: undefined as number | undefined },
                { id: "starred" as Tab, label: "Favoris", icon: Star, count: undefined as number | undefined },
              ] as const
            ).map(({ id, label, icon: Icon, count }) => (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setActiveTab(id);
                  setSelectedMessage(null);
                }}
                className={[
                  "relative flex min-h-[36px] flex-1 items-center justify-center gap-1.5 rounded-full px-3 text-fluid-xs font-medium transition-all",
                  activeTab === id
                    ? "bg-primary-50 text-primary-600 dark:bg-primary-950 dark:text-primary-400"
                    : "text-neutral-500 hover:bg-neutral-50 hover:text-neutral-700 dark:hover:bg-neutral-800",
                ].join(" ")}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
                {count !== undefined && count > 0 && (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary-500 text-[10px] font-bold text-white">
                    {count > 9 ? "9+" : count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Message list */}
          <div className="flex-1 overflow-y-auto">
            {currentList.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Inbox className="mb-3 h-10 w-10 text-neutral-200 dark:text-neutral-700" />
                <p className="text-fluid-sm text-neutral-400 dark:text-neutral-500">
                  Aucun message
                </p>
              </div>
            ) : (
              currentList.map((msg) => {
                const isOwn = activeTab === "sent";
                const displayName = isOwn
                  ? (msg.recipient_name ?? "Inconnu")
                  : (msg.sender_name ?? "Inconnu");
                const isSelected = selectedMessage?.id === msg.id;

                return (
                  <button
                    key={msg.id}
                    type="button"
                    onClick={() => handleSelectMessage(msg)}
                    className={[
                      "flex w-full items-start gap-3 border-b border-neutral-50 px-4 py-3 text-left transition-colors last:border-0 dark:border-neutral-800",
                      isSelected
                        ? "bg-primary-50 dark:bg-primary-950/30"
                        : "hover:bg-neutral-50 dark:hover:bg-neutral-800/50",
                    ].join(" ")}
                  >
                    {/* Avatar */}
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-neutral-200 font-heading text-sm font-bold text-neutral-600 dark:bg-neutral-700 dark:text-neutral-300">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-1">
                        <span
                          className={[
                            "truncate text-fluid-sm",
                            !msg.is_read && !isOwn
                              ? "font-semibold text-neutral-900 dark:text-neutral-100"
                              : "font-medium text-neutral-700 dark:text-neutral-300",
                          ].join(" ")}
                        >
                          {displayName}
                        </span>
                        <span className="shrink-0 text-fluid-xs text-neutral-400">
                          {formatRelativeDate(msg.created_at)}
                        </span>
                      </div>
                      <p className="mt-0.5 truncate text-fluid-xs text-neutral-500 dark:text-neutral-400">
                        {msg.subject}
                      </p>
                      <p className="mt-0.5 truncate text-fluid-xs text-neutral-400 dark:text-neutral-500">
                        {msg.content.slice(0, 60)}...
                      </p>
                      <div className="mt-1.5 flex items-center gap-1.5">
                        {!msg.is_read && !isOwn && (
                          <div className="h-1.5 w-1.5 rounded-full bg-primary-500" />
                        )}
                        {msg.is_starred && (
                          <Star className="h-3 w-3 fill-accent-400 text-accent-400" />
                        )}
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Message content */}
        {selectedMessage ? (
          <div className="flex w-full flex-col">
            {/* Message header */}
            <div className="flex items-center justify-between border-b border-neutral-100 p-4 dark:border-neutral-800">
              <div className="flex items-center gap-2">
                {/* Back button (mobile) */}
                <button
                  type="button"
                  onClick={() => setSelectedMessage(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800 lg:hidden"
                  aria-label="Retour"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div>
                  <h3 className="font-heading text-fluid-base font-semibold text-neutral-900 dark:text-neutral-100">
                    {selectedMessage.subject}
                  </h3>
                  <p className="text-fluid-xs text-neutral-500">
                    {activeTab === "sent"
                      ? `A : ${selectedMessage.recipient_name ?? "Inconnu"}`
                      : `De : ${selectedMessage.sender_name ?? "Inconnu"}`}
                    {" — "}
                    {formatRelativeDate(selectedMessage.created_at)}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleStar(selectedMessage)}
                  disabled={isPending}
                  className={[
                    "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                    selectedMessage.is_starred
                      ? "text-accent-500"
                      : "text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800",
                  ].join(" ")}
                  aria-label={selectedMessage.is_starred ? "Retirer des favoris" : "Ajouter aux favoris"}
                >
                  <Star
                    className={[
                      "h-4 w-4",
                      selectedMessage.is_starred ? "fill-accent-500" : "",
                    ].join(" ")}
                  />
                </button>

                {activeTab === "inbox" && (
                  <button
                    type="button"
                    onClick={() => setShowReply(!showReply)}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-800"
                    aria-label="Repondre"
                  >
                    <Reply className="h-4 w-4" />
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleDelete(selectedMessage.id)}
                  disabled={isPending}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:bg-error-50 hover:text-error-500 dark:hover:bg-error-950/30"
                  aria-label="Supprimer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Message body */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="rounded-xl bg-neutral-50 p-5 text-fluid-base leading-relaxed text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
                {selectedMessage.content}
              </div>
            </div>

            {/* Reply form */}
            {showReply && (
              <div className="border-t border-neutral-100 p-4 dark:border-neutral-800">
                <form action={sendAction} className="space-y-3">
                  <input type="hidden" name="to_user_id" value={selectedMessage.from_user_id} />
                  <input
                    type="hidden"
                    name="subject"
                    value={`Re: ${selectedMessage.subject}`}
                  />
                  <input type="hidden" name="category" value={selectedMessage.category} />

                  {sendState.success && (
                    <div className="flex items-center gap-2 rounded-lg border border-secondary-200 bg-secondary-50 p-2.5 text-secondary-700 dark:border-secondary-800 dark:bg-secondary-950/30 dark:text-secondary-300">
                      <CheckCircle className="h-4 w-4 shrink-0" />
                      <span className="text-fluid-xs font-medium">Message envoye.</span>
                    </div>
                  )}

                  {sendState.error && (
                    <div className="flex items-center gap-2 rounded-lg border border-error-200 bg-error-50 p-2.5 text-error-700 dark:border-error-800 dark:bg-error-950/30 dark:text-error-300">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span className="text-fluid-xs">{sendState.error}</span>
                    </div>
                  )}

                  <Textarea
                    name="content"
                    placeholder="Votre reponse..."
                    rows={3}
                    maxLength={2000}
                    showCount
                    error={sendState.fieldErrors?.content?.[0]}
                  />

                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowReply(false)}
                    >
                      Annuler
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      size="sm"
                      loading={isSending}
                    >
                      <Send className="h-3.5 w-3.5" />
                      Envoyer
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden flex-1 flex-col items-center justify-center p-8 text-center lg:flex">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-neutral-100 dark:bg-neutral-800">
              <Inbox className="h-8 w-8 text-neutral-300 dark:text-neutral-600" />
            </div>
            <p className="mt-3 font-heading text-fluid-base font-medium text-neutral-500 dark:text-neutral-400">
              Selectionnez un message
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
