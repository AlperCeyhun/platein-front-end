"use client";

import React, { useEffect, useState } from "react";

interface ShowCatGifProps {
  isCloseToGoal: boolean;
}

const ShowCatGif: React.FC<ShowCatGifProps> = ({ isCloseToGoal }) => {
  const [selectedGif, setSelectedGif] = useState<JSX.Element | null>(null);

  const closeToGoalGifs = [
    {
      id: "closeToGoal1",
      postid: "23625303",
      aspectRatio: "1",
      href: "https://tenor.com/view/cat-jump-happy-jumping-for-joy-jumping-gif-23625303",
      text: "Cat Jump Sticker",
      source: "https://tenor.com/search/cat-stickers",
      sourceText: "Cat Stickers",
    },
    {
      id: "closeToGoal2",
      postid: "14624597924205909386",
      aspectRatio: "1.02586",
      href: "https://tenor.com/view/mochi-cat-goma-happy-sparkle-gif-14624597924205909386",
      text: "Mochi Cat Goma Sticker",
      source: "https://tenor.com/search/mochi+cat-stickers",
      sourceText: "Mochi Cat Stickers",
    },
    {
      id: "closeToGoal3",
      postid: "10194018220306177183",
      aspectRatio: "1.24",
      href: "https://tenor.com/view/cat-vibing-gif-10194018220306177183",
      text: "Cat Vibing Sticker",
      source: "https://tenor.com/search/cat+vibing-stickers",
      sourceText: "Cat Vibing Stickers",
    },
  ];

  const farToGoalGifs = [
    {
      id: "farToGoal1",
      postid: "7899328576816919173",
      aspectRatio: "1",
      href: "https://tenor.com/view/catsad-sad-cat-gif-7899328576819173",
      text: "Catsad GIF",
      source: "https://tenor.com/search/catsad-gifs",
      sourceText: "Catsad GIFs",
    },
    {
      id: "farToGoal2",
      postid: "4747833581169770036",
      aspectRatio: "1",
      href: "https://tenor.com/view/gravewalker-nuncamorto-gato-cat-gato-preto-s%C3%A9rio-gif-4747833581169770036",
      text: "Gravewalker Nuncamorto GIF",
      source: "https://tenor.com/search/gravewalker-gifs",
      sourceText: "Gravewalker GIFs",
    },
    {
      id: "farToGoal3",
      postid: "13981531492986858424",
      aspectRatio: "1",
      href: "https://tenor.com/view/mad-rage-cat-ragey-meme-gif-13981531492986858424",
      text: "Mad Rage Sticker",
      source: "https://tenor.com/search/mad-stickers",
      sourceText: "Mad Stickers",
    },
  ];

  useEffect(() => {
    // Select a random GIF only on the client
    const gifs = isCloseToGoal ? closeToGoalGifs : farToGoalGifs;
    const gif = gifs[Math.floor(Math.random() * gifs.length)];

    setSelectedGif(
      <div
        key={gif.id}
        className="tenor-gif-embed"
        data-postid={gif.postid}
        data-share-method="host"
        data-aspect-ratio={gif.aspectRatio}
        data-width="100%"
      >
        <a href={gif.href}>{gif.text}</a>
        {" "}from <a href={gif.source}>{gif.sourceText}</a>
      </div>
    );

    // Inject Tenor's script after render
    const script = document.createElement("script");
    script.src = "https://tenor.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [isCloseToGoal]);

  return (
    <div className="w-full flex justify-center items-center">
      {selectedGif}
    </div>
  );
};

export default ShowCatGif;
