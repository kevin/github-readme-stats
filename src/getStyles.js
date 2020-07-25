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
      font-size: 16px;
      position: relative;
      bottom: 1px;
      -webkit-animation: 1s blink step-end infinite;
    	-moz-animation: 1s blink step-end infinite;
    	-ms-animation: 1s blink step-end infinite;
    	-o-animation: 1s blink step-end infinite;
    	animation: 1s blink step-end infinite;
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

    @keyframes "blink" {
      from, to {
        color: transparent;
      }
      50% {
        color: black;
      }
    }
    
    @-moz-keyframes blink {
      from, to {
        color: transparent;
      }
      50% {
        color: black;
      }
    }
    
    @-webkit-keyframes "blink" {
      from, to {
        color: transparent;
      }
      50% {
        color: black;
      }
    }
    
    @-ms-keyframes "blink" {
      from, to {
        color: transparent;
      }
      50% {
        color: black;
      }
    }
    
    @-o-keyframes "blink" {
      from, to {
        color: transparent;
      }
      50% {
        color: black;
      }
    }
    
    .bold { font-weight: 700 }

  `;
};

module.exports = getStyles;
