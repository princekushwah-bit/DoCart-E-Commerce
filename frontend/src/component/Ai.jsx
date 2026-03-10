import React, { useContext, useState } from 'react';
import ai from "../assets/ai.png";
import { shopDataContext } from '../context/ShopContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import open from "../assets/open.mp3";

function Ai() {
  const { showSearch, setShowSearch } = useContext(shopDataContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeAi, setActiveAi] = useState(false);
  const openingSound = new Audio(open);

  function speak(message) {
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  if (!recognition) {
    console.log("Speech recognition not supported");
  }

  recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript.trim().toLowerCase();
    console.log("Heard:", transcript);

    // CLOSE COMMANDS
    if (transcript.includes("close collection") || transcript.includes("close products")) {
      if (location.pathname === "/collection") {
        speak("closing collection page");
        navigate("/");
        setShowSearch(false);
      } else {
        toast.error("You are on a different page");
      }
    } else if (transcript.includes("close cart")) {
      if (location.pathname === "/cart") {
        speak("closing cart page");
        navigate("/");
        setShowSearch(false);
      } else {
        toast.error("You are on a different page");
      }
    } else if (transcript.includes("close about")) {
      if (location.pathname === "/about") {
        speak("closing about page");
        navigate("/");
        setShowSearch(false);
      } else {
        toast.error("You are on a different page");
      }
    } else if (transcript.includes("close contact")) {
      if (location.pathname === "/contact") {
        speak("closing contact page");
        navigate("/");
        setShowSearch(false);
      } else {
        toast.error("You are on a different page");
      }
    } else if (transcript.includes("close order")) {
      if (location.pathname === "/order") {
        speak("closing orders page");
        navigate("/");
        setShowSearch(false);
      } else {
        toast.error("You are on a different page");
      }
    } else if (transcript.includes("close home")) {
      if (location.pathname === "/") {
        toast.error("Cannot close home page");
      } else {
        speak("closing home page");
        navigate("/");
        setShowSearch(false);
      }
    }

    // OPEN COMMANDS
    else if (transcript.includes("open search") && !showSearch) {
      speak("opening search");
      setShowSearch(true);
      navigate("/collection");
    } else if (transcript.includes("close search") && showSearch) {
      speak("closing search");
      setShowSearch(false);
    } else if (transcript.includes("collection") || transcript.includes("products")) {
      speak("opening collection page");
      navigate("/collection");
    } else if (transcript.includes("about") || transcript.includes("aboutpage")) {
      speak("opening about page");
      navigate("/about");
      setShowSearch(false);
    } else if (transcript.includes("home") || transcript.includes("homepage")) {
      speak("opening home page");
      navigate("/");
      setShowSearch(false);
    } else if (
      transcript.includes("cart") ||
      transcript.includes("kaat") ||
      transcript.includes("caat")
    ) {
      speak("opening your cart");
      navigate("/cart");
      setShowSearch(false);
    } else if (transcript.includes("contact")) {
      speak("opening contact page");
      navigate("/contact");
      setShowSearch(false);
    } else if (
      transcript.includes("order") ||
      transcript.includes("myorders") ||
      transcript.includes("orders") ||
      transcript.includes("my order")
    ) {
      speak("opening your orders page");
      navigate("/order");
      setShowSearch(false);
    } else if (transcript.includes("place order")) {
      speak("opening place order page");
      navigate("/placeorder");
      setShowSearch(false);
    } else if (transcript.includes("product")) {
      speak("opening product page");
      navigate("/product");
      setShowSearch(false);
    } else {
      toast.error("Try Again");
    }
  };

  recognition.onend = () => {
    setActiveAi(false);
  };

  return (
    <div
      className='fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%]'
      onClick={() => {
        recognition.start();
        openingSound.play();
        setActiveAi(true);
      }}
    >
      <img
        src={ai}
        alt="AI Assistant"
        className={`w-[100px] cursor-pointer ${
          activeAi ? 'translate-x-[10%] translate-y-[-10%] scale-125' : 'translate-x-[0] translate-y-[0] scale-100'
        } transition-transform`}
        style={{
          filter: `${activeAi ? "drop-shadow(0px 0px 30px #00d2fc)" : "drop-shadow(0px 0px 20px black)"}`,
        }}
      />
    </div>
  );
}

export default Ai;
