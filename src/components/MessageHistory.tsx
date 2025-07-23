import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import type { Message } from '../services/api'

interface MessageHistoryProps {
  oldMessages: Message[]
  currentMessages: Message[]
  onMessageSubmit?: (message: string) => void
}

const MessageHistory = ({ oldMessages, currentMessages, onMessageSubmit }: MessageHistoryProps) => {
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>([])
  const [hasMoreMessages, setHasMoreMessages] = useState(false)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [messagesLoadedCount, setMessagesLoadedCount] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const messagesContainerRef = useRef<HTMLDivElement>(null)
  const scrollPositionRef = useRef<number>(0)

  // Combine all messages (old_messages + current_messages)
  const allMessages = useMemo(
    () => [...(oldMessages || []), ...(currentMessages || [])],
    [oldMessages, currentMessages]
  )

  // Initialize with last 10 messages
  useEffect(() => {
    const initialMessageCount = Math.min(10, allMessages.length)
    const startIndex = Math.max(0, allMessages.length - initialMessageCount)

    setDisplayedMessages(allMessages.slice(startIndex))
    setMessagesLoadedCount(initialMessageCount)
    setHasMoreMessages(startIndex > 0)
  }, [allMessages])

  // Scroll to bottom on initial load and when new messages are added to current_messages
  useEffect(() => {
    if (messagesContainerRef.current && !isLoadingMore) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight
    }
  }, [displayedMessages.length, isLoadingMore])

  // Load more messages (10 at a time from the beginning of old_messages)
  const loadMoreMessages = useCallback(() => {
    if (isLoadingMore || !hasMoreMessages) return

    setIsLoadingMore(true)

    // Save current scroll position
    if (messagesContainerRef.current) {
      scrollPositionRef.current = messagesContainerRef.current.scrollHeight
    }

    setTimeout(() => {
      const currentlyLoaded = messagesLoadedCount
      const messagesToLoad = Math.min(10, allMessages.length - currentlyLoaded)
      const newStartIndex = Math.max(0, allMessages.length - currentlyLoaded - messagesToLoad)

      if (messagesToLoad > 0) {
        const newMessages = allMessages.slice(newStartIndex, allMessages.length - currentlyLoaded)
        setDisplayedMessages(prev => [...newMessages, ...prev])
        setMessagesLoadedCount(prev => prev + messagesToLoad)
        setHasMoreMessages(newStartIndex > 0)
      }

      setIsLoadingMore(false)
    }, 500) // Simulate loading delay
  }, [allMessages, messagesLoadedCount, isLoadingMore, hasMoreMessages])

  // Handle scroll to load more messages
  const handleScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      const { scrollTop } = e.currentTarget

      // Load more when user scrolls near the top
      if (scrollTop < 100 && hasMoreMessages && !isLoadingMore) {
        loadMoreMessages()
      }
    },
    [hasMoreMessages, isLoadingMore, loadMoreMessages]
  )

  // Maintain scroll position after loading older messages (but not on initial load)
  useEffect(() => {
    if (messagesContainerRef.current && scrollPositionRef.current > 0 && isLoadingMore) {
      const newScrollHeight = messagesContainerRef.current.scrollHeight
      const heightDifference = newScrollHeight - scrollPositionRef.current
      messagesContainerRef.current.scrollTop = heightDifference
      scrollPositionRef.current = 0
    }
  }, [displayedMessages.length, isLoadingMore])

  const formatMessage = (message: Message, index: number) => {
    const isUserMessage = message.type === 'HumanMessage' || message.type === 'human'
    const isLoading = message.isLoading

    return (
      <div key={index} className={`flex mb-4 ${isUserMessage ? 'justify-end' : 'justify-start'}`}>
        <div
          className={`max-w-[80%] rounded-lg px-4 py-3 ${
            isUserMessage
              ? 'bg-blue-500 text-white rounded-br-none'
              : 'bg-gray-100 text-gray-800 rounded-bl-none border border-gray-200'
          }`}
        >
          {isLoading ? (
            <div className="text-sm leading-relaxed flex items-center">
              <i className="mi-clock mr-2 animate-pulse"></i>
              <span className="animate-pulse">Thinking...</span>
            </div>
          ) : (
            <div className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</div>
          )}
          {!isUserMessage && !isLoading && (
            <div className="text-xs text-gray-500 mt-2 flex items-center">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              AI Storyteller
            </div>
          )}
        </div>
      </div>
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue.trim() && onMessageSubmit) {
      onMessageSubmit(inputValue.trim())
      setInputValue('')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6">
        <div
          ref={messagesContainerRef}
          onScroll={handleScroll}
          className="space-y-0 min-h-[400px] max-h-[600px] overflow-y-auto"
        >
          {/* Loading indicator at top */}
          {isLoadingMore && (
            <div className="text-center py-4">
              <div className="text-sm text-gray-500">Loading older messages...</div>
            </div>
          )}

          {/* Load more button (alternative to scroll trigger) */}
          {hasMoreMessages && !isLoadingMore && (
            <div className="text-center py-4">
              <button
                onClick={loadMoreMessages}
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                Load older messages
              </button>
            </div>
          )}

          {displayedMessages.length > 0 ? (
            displayedMessages.map((message: Message, index: number) =>
              formatMessage(message, index)
            )
          ) : (
            <div className="text-center py-12 text-gray-500">
              <div className="text-lg mb-2">No messages yet</div>
              <div className="text-sm">The story is waiting to begin...</div>
            </div>
          )}
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="What do you do next?"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </form>
        <div className="flex gap-2 mt-3">
          <button className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200 transition-colors">
            Retry
          </button>
          <button className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200 transition-colors">
            Rewind
          </button>
          <button className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200 transition-colors">
            New Chapter
          </button>
        </div>
      </div>
    </div>
  )
}

export default MessageHistory
