import React, { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { IoChatbubbleEllipsesSharp, IoClose, IoSend } from "react-icons/io5";
import { authDataContext } from '../context/AuthContext';
import Loading from './Loading';

function AiChatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([
        { text: "Hi! I'm DoCart AI. How can I help you today?", sender: 'ai' }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const { serverUrl } = useContext(authDataContext);
    const scrollRef = useRef();

    // Auto scroll to bottom
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { text: input, sender: 'user' };
        setMessages(prev => [...prev, userMsg]);
        const currentInput = input;
        setInput("");
        setIsTyping(true);

        try {
            const { data } = await axios.post(serverUrl + '/api/ai/chat', { message: currentInput });
            if (data.success) {
                setMessages(prev => [...prev, { text: data.reply, sender: 'ai' }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { text: "Connection error. Please try again later!", sender: 'ai' }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className='fixed bottom-24 right-6 z-[1000] font-sans'>
            {/* Chat Window */}
            {isOpen && (
                <div className='w-[320px] h-[450px] bg-[#1a1a1b] border border-white/10 shadow-2xl rounded-2xl flex flex-col overflow-hidden mb-4 animate-slide-up backdrop-blur-xl'>
                    
                    {/* Header */}
                    <div className='bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white flex justify-between items-center shadow-lg'>
                        <div className='flex items-center gap-2'>
                            <div className='w-2 h-2 bg-green-400 rounded-full animate-pulse'></div>
                            <span className='font-bold text-sm tracking-wide'>DoCart AI Assistant</span>
                        </div>
                        <IoClose className='cursor-pointer text-xl hover:scale-120 transition-all' onClick={() => setIsOpen(false)} />
                    </div>

                    {/* Messages Area */}
                    <div className='flex-1 p-4 overflow-y-auto flex flex-col gap-3 scrollbar-hide'>
                        {messages.map((m, i) => (
                            <div key={i} className={`p-3 rounded-2xl text-[13px] leading-relaxed max-w-[85%] ${
                                m.sender === 'user' 
                                ? 'bg-blue-600 text-white self-end rounded-tr-none shadow-md' 
                                : 'bg-white/10 text-gray-200 self-start rounded-tl-none border border-white/5'
                            }`}>
                                {m.text}
                            </div>
                        ))}
                        {isTyping && <div className='text-[10px] text-gray-500 italic ml-2'>AI is thinking...</div>}
                        <div ref={scrollRef}></div>
                    </div>

                    {/* Input Area */}
                    <div className='p-3 bg-black/20 border-t border-white/10 flex gap-2 items-center'>
                        <input 
                            value={input} 
                            onChange={(e) => setInput(e.target.value)} 
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()} 
                            placeholder='Ask about products...' 
                            className='flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white outline-none focus:border-blue-500/50 transition-all' 
                        />
                        <button onClick={handleSend} className='p-2 bg-blue-600 rounded-full text-white hover:bg-blue-500 transition-all active:scale-90'>
                            <IoSend size={16} />
                        </button>
                    </div>
                </div>
            )}

            {/* Floating Toggle Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className={`p-4 rounded-full shadow-2xl text-white transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center ${
                    isOpen ? 'bg-red-500 rotate-90' : 'bg-blue-600 animate-bounce-slow'
                }`}
            >
                {isOpen ? <IoClose size={28} /> : <IoChatbubbleEllipsesSharp size={28} />}
            </button>
        </div>
    );
}

export default AiChatbot;