import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { api } from '../services/api';
import { ChatMessage } from '../types';
import { SafetyNotice } from '../components/SafetyNotice';
import {
  Send,
  RotateCcw,
  Sparkles,
  User,
  Bot,
  RefreshCw,
  HelpCircle,
} from 'lucide-react';

export const ChatPage: React.FC = () => {
  const { t, language } = useLanguage();
  const [searchParams] = useSearchParams();

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = sessionStorage.getItem('bloom_chat_messages');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(() => {
    return sessionStorage.getItem('bloom_conv_id');
  });
  const [lastFailedMessage, setLastFailedMessage] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
    sessionStorage.setItem('bloom_chat_messages', JSON.stringify(messages));
    if (conversationId) {
      sessionStorage.setItem('bloom_conv_id', conversationId);
    }
  }, [messages, conversationId]);

  // Handle URL query parameter prefill
  useEffect(() => {
    const q = searchParams.get('q');
    if (q && messages.length === 0) {
      handleSend(q);
    }
  }, [searchParams]);

  const handleSend = async (messageText?: string) => {
    const textToSend = (messageText || input).trim();
    if (!textToSend || isLoading) return;

    const userMessage: ChatMessage = {
      id: 'msg-' + Date.now(),
      role: 'user',
      content: textToSend,
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setLastFailedMessage(null);

    try {
      const response = await api.sendMessage({
        message: textToSend,
        language,
        conversationId,
      });

      if (response.conversationId) {
        setConversationId(response.conversationId);
      }

      const assistantMessage: ChatMessage = {
        id: 'msg-' + (Date.now() + 1),
        role: 'assistant',
        content: response.message,
        timestamp: response.timestamp || new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err: unknown) {
      const errorMsg = (err as Error)?.message || t.chat.errorGeneric;
      setLastFailedMessage(textToSend);

      const errorMessage: ChatMessage = {
        id: 'msg-err-' + Date.now(),
        role: 'assistant',
        content: errorMsg,
        timestamp: new Date().toISOString(),
        isError: true,
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClear = () => {
    setMessages([]);
    setConversationId(null);
    setLastFailedMessage(null);
    sessionStorage.removeItem('bloom_chat_messages');
    sessionStorage.removeItem('bloom_conv_id');
  };

  const handleRetry = () => {
    if (lastFailedMessage) {
      handleSend(lastFailedMessage);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-4">
      {/* Header bar */}
      <div className="flex items-center justify-between pb-3 border-b border-mint-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-forest-950 flex items-center gap-2">
            <Bot className="w-6 h-6 text-forest-700" />
            {t.chat.title}
          </h1>
          <p className="text-xs text-gray-700">{t.chat.subtitle}</p>
        </div>

        {messages.length > 0 && (
          <button
            onClick={handleClear}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-700 hover:text-red-700 hover:bg-red-50 border border-gray-200 hover:border-red-200 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.chat.clear}</span>
          </button>
        )}
      </div>

      <SafetyNotice compact />

      {/* Messages area */}
      <div className="bg-ivory-100 rounded-2xl border border-mint-200 shadow-xs min-h-[460px] max-h-[580px] flex flex-col justify-between overflow-hidden">
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-mint-100 flex items-center justify-center text-forest-800 shadow-2xs">
                <Sparkles className="w-8 h-8 text-forest-700" />
              </div>
              <div className="max-w-md space-y-1.5">
                <h2 className="text-base font-bold text-forest-950">Welcome to Bloom Health Assistant</h2>
                <p className="text-xs text-gray-700">
                  Ask any health, symptom, or wellness questions. You can converse freely in English, Telugu, or Hindi.
                </p>
              </div>

              {/* Example Prompts */}
              <div className="w-full max-w-lg space-y-2 text-left">
                <p className="text-xs font-bold text-forest-900 flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  {t.chat.examplesTitle}
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {t.chat.examples.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSend(prompt)}
                      className="text-left p-2.5 rounded-xl bg-white hover:bg-mint-50/80 border border-mint-200/90 text-xs text-forest-900 font-medium hover:border-mint-400 transition-colors shadow-2xs"
                    >
                      &ldquo;{prompt}&rdquo;
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg) => {
                const isUser = msg.role === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-xs font-bold shadow-2xs ${
                        isUser
                          ? 'bg-forest-800 text-white'
                          : msg.isError
                          ? 'bg-red-100 text-red-700'
                          : 'bg-mint-200 text-forest-900'
                      }`}
                    >
                      {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>

                    <div
                      className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-2xs ${
                        isUser
                          ? 'bg-forest-800 text-white rounded-tr-xs'
                          : msg.isError
                          ? 'bg-red-50 text-red-900 border border-red-200 rounded-tl-xs'
                          : 'bg-white text-gray-800 border border-mint-200/90 rounded-tl-xs'
                      }`}
                    >
                      <div className="whitespace-pre-wrap">{msg.content}</div>

                      {msg.isError && lastFailedMessage && (
                        <div className="mt-3 pt-2 border-t border-red-200 flex items-center gap-2">
                          <button
                            onClick={handleRetry}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-red-100 hover:bg-red-200 text-red-800 text-xs font-semibold transition-colors"
                          >
                            <RefreshCw className="w-3 h-3" />
                            {t.chat.retry}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-mint-200 text-forest-900 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="bg-white border border-mint-200/90 rounded-2xl rounded-tl-xs px-4 py-3 shadow-2xs flex items-center gap-2.5 text-xs text-forest-900 font-medium">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-forest-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-2 h-2 bg-forest-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-2 h-2 bg-forest-600 rounded-full animate-bounce"></div>
                    </div>
                    <span>{t.chat.thinking}</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Chat input box */}
        <div className="p-3 sm:p-4 bg-white border-t border-mint-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-end gap-2"
          >
            <textarea
              ref={textareaRef}
              rows={2}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t.chat.placeholder}
              disabled={isLoading}
              className="flex-1 resize-none rounded-xl border border-mint-300 p-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-forest-600 focus:border-forest-600 bg-ivory-50 disabled:bg-gray-100 placeholder-gray-400 transition-all"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="h-12 px-4 rounded-xl bg-forest-800 hover:bg-forest-900 text-white font-bold flex items-center justify-center gap-1.5 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline text-xs">{t.chat.send}</span>
            </button>
          </form>

          {/* Quick example prompts bar below input if chat is active */}
          {messages.length > 0 && (
            <div className="mt-2 flex items-center gap-1.5 overflow-x-auto text-[11px] text-gray-500 py-1">
              <span className="font-semibold text-forest-800 shrink-0">Try:</span>
              {t.chat.examples.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(ex)}
                  className="shrink-0 px-2.5 py-0.5 rounded-full bg-ivory-200 hover:bg-mint-100 text-forest-900 font-medium truncate max-w-[200px] border border-mint-200/60"
                >
                  {ex}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
