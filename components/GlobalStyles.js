import React from "react";

export default () => (
  <style global jsx>{`
    @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;700&display=swap");

    :root {
      --border-radius: 10px;
    }

    *,
    * > * {
      box-sizing: border-box;
    }

    html,
    body {
      padding: 0;
      margin: 0;
      font-family: "Poppins", sans-serif;
    }

    p {
      margin: 0;
      padding: 0;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: "Playfair Display", serif;
      font-weight: bold;
    }
  `}</style>
);
