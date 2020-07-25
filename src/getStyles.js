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
      @include animation(cursor-blink 1.25s steps(1) infinite);
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

    @include keyframes(cursor-blink) {
      0% {
        opacity: 0;
      }
      50% {
        opacity: 1;
      }
      100% {
        opacity: 0;
      }
    }
    
    .bold { font-weight: 700 }

  `;
};

module.exports = getStyles;
