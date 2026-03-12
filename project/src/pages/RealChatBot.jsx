import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, Stethoscope, X, RotateCcw } from "lucide-react";

export function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const formatTime = (date) =>
    date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { text: input, isUser: true, time: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    const sentInput = input;
    setInput("");

    try {
      const response = await fetch("http://localhost:5001/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: sentInput }),
      });
      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { text: data.result, isUser: false, time: new Date() },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          text: "I'm sorry, I couldn't process your request at the moment. Please try again.",
          isUser: false,
          time: new Date(),
          isError: true,
        },
      ]);
    }
    setIsLoading(false);
    inputRef.current?.focus();
  };

  const clearChat = () => setMessages([]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", minHeight: 0 }}>
      {/* Page Header */}
      <div className="page-header">
        <div className="flex items-center gap-3">
          <div
            style={{
              width: "2.5rem",
              height: "2.5rem",
              borderRadius: "0.625rem",
              background: "linear-gradient(135deg, var(--color-med-blue-500), var(--color-med-teal-500))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Stethoscope size={18} color="white" />
          </div>
          <div>
            <h1 className="page-title">AI Health Assistant</h1>
            <p className="page-subtitle">Ask any health-related questions</p>
          </div>
        </div>
        {messages.length > 0 && (
          <button
            onClick={clearChat}
            className="btn-med-secondary"
            style={{ fontSize: "0.8125rem" }}
          >
            <RotateCcw size={14} />
            Clear Chat
          </button>
        )}
      </div>

      {/* Chat Area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "1.5rem 1.75rem",
          gap: "0",
          overflow: "hidden",
          minHeight: 0,
        }}
      >
        <div
          style={{
            flex: 1,
            background: "white",
            borderRadius: "1rem",
            border: "1px solid var(--color-med-slate-200)",
            boxShadow: "var(--shadow-card)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            minHeight: 0,
          }}
        >
          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            {messages.length === 0 ? (
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  padding: "3rem 1rem",
                }}
              >
                <div
                  style={{
                    width: "5rem",
                    height: "5rem",
                    borderRadius: "1.25rem",
                    background: "linear-gradient(135deg, var(--color-med-blue-50), var(--color-med-teal-50))",
                    border: "1px solid var(--color-med-blue-100)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.25rem",
                  }}
                >
                  <MessageCircle size={32} color="var(--color-med-blue-500)" />
                </div>
                <h3
                  style={{
                    fontSize: "1.125rem",
                    fontWeight: 600,
                    color: "var(--color-med-slate-700)",
                    marginBottom: "0.5rem",
                  }}
                >
                  Start a conversation
                </h3>
                <p style={{ fontSize: "0.875rem", color: "var(--color-med-slate-400)", maxWidth: "300px" }}>
                  Ask me about symptoms, medications, health tips, or any medical questions.
                </p>
                {/* Suggestion chips */}
                <div className="flex flex-wrap justify-center gap-2" style={{ marginTop: "1.5rem" }}>
                  {[
                    "What are common cold symptoms?",
                    "How to manage stress?",
                    "Daily vitamin recommendations",
                  ].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => {
                        setInput(suggestion);
                        inputRef.current?.focus();
                      }}
                      style={{
                        padding: "0.5rem 1rem",
                        borderRadius: "9999px",
                        border: "1px solid var(--color-med-blue-200)",
                        background: "var(--color-med-blue-50)",
                        color: "var(--color-med-blue-600)",
                        fontSize: "0.8125rem",
                        fontWeight: 500,
                        cursor: "pointer",
                        transition: "all 150ms",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--color-med-blue-100)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "var(--color-med-blue-50)";
                      }}
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.isUser ? "justify-end" : "justify-start"} items-end gap-2`}
                  style={{ animation: "fadeInUp 0.3s ease" }}
                >
                  {!message.isUser && (
                    <div
                      style={{
                        width: "2rem",
                        height: "2rem",
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, var(--color-med-blue-500), var(--color-med-teal-500))",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Stethoscope size={12} color="white" />
                    </div>
                  )}
                  <div>
                    <div
                      className={
                        message.isUser ? "chat-bubble-user" : "chat-bubble-bot"
                      }
                      style={
                        message.isError
                          ? { borderColor: "#fca5a5", color: "#dc2626", background: "#fef2f2" }
                          : {}
                      }
                    >
                      {message.text}
                    </div>
                    <p
                      style={{
                        fontSize: "0.6875rem",
                        color: "var(--color-med-slate-400)",
                        marginTop: "0.25rem",
                        textAlign: message.isUser ? "right" : "left",
                      }}
                    >
                      {formatTime(message.time)}
                    </p>
                  </div>
                </div>
              ))
            )}

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex justify-start items-end gap-2">
                <div
                  style={{
                    width: "2rem",
                    height: "2rem",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--color-med-blue-500), var(--color-med-teal-500))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Stethoscope size={12} color="white" />
                </div>
                <div className="chat-bubble-bot" style={{ padding: "0.875rem 1.125rem" }}>
                  <div className="flex items-center gap-1">
                    {[0, 150, 300].map((delay) => (
                      <div
                        key={delay}
                        className="animate-bounce-typing"
                        style={{
                          width: "0.5rem",
                          height: "0.5rem",
                          borderRadius: "50%",
                          background: "var(--color-med-blue-400)",
                          animationDelay: `${delay}ms`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div
            style={{
              borderTop: "1px solid var(--color-med-slate-200)",
              padding: "1rem 1.25rem",
              background: "var(--color-med-slate-50)",
            }}
          >
            <form onSubmit={handleSubmit} className="flex gap-2 items-center">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe your symptoms or ask a health question…"
                className="med-input"
                style={{ flex: 1 }}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="btn-med-primary"
                style={{
                  padding: "0.625rem 1.125rem",
                  flexShrink: 0,
                }}
              >
                <Send size={16} />
              </button>
            </form>
            <p style={{ fontSize: "0.7rem", color: "var(--color-med-slate-400)", marginTop: "0.5rem", textAlign: "center" }}>
              For informational purposes only. Always consult a healthcare professional for medical advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
