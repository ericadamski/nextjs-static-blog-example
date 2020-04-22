import React from "react";
import Emoji from "./Emoji";

export default () => (
  <>
    <div className="footer">
      <p>
        Made with <Emoji alt="love">❤️</Emoji> by{" "}
        <a href="https://twitter.com/zealigan">Eric</a>
      </p>
      <p>
        <a href="https://github.com/ericadamski/nextjs-static-blog-example">
          View Source <Emoji alt="github">🐙</Emoji>
        </a>
      </p>
      <p>
        <a href="">
          Watch on YouTube <Emoji alt="youtube">📺</Emoji>
        </a>
      </p>
    </div>
    <style jsx>{`
      .footer > p {
        padding: 1rem 0;
      }

      .footer {
        width: calc(100% - 4rem);
        border-top: 2px solid black;
        margin: 2rem;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
      }
    `}</style>
  </>
);
