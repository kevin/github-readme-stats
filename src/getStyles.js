const getStyles = (color, nameColor, promptColor, highlightColor) => {
  return `

    .text {
      font-family: Consolas, Inconsolata, monospace;
      font-size: 18px;
      fill: ${color};
      animation: fadeIn 0.8s ease-in-out forwards;
    }

    .bold {
      font-weight: 105%;
    }

    #highlight {
      fill: ${highlightColor}
    }

    #name {
      fill: ${nameColor};
    }
    
    #prompt {
      fill: ${promptColor};
    }

    .blink {
      animation: blink-animation 1s steps(3, start) infinite;
      -webkit-animation: blink-animation 1s steps(3, start) infinite;
    }

    .stagger {
      opacity: 0;
      animation: fadeIn 0.3s ease-in-out forwards;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes blink-animation {
      to {
        visibility: hidden;
      }
    }
    @-webkit-keyframes blink-animation {
      to {
        visibility: hidden;
      }
    }
    
    .bold { font-weight: 700 }

  `;
};

module.exports = getStyles;
