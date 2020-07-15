const getAnimations = () => {
  return `
    /* Animations */
    @keyframes scaleIn {
      from {
        transform: translate(-5px, 5px) scale(0);
      }
      to {
        transform: translate(-5px, 5px) scale(1);
      }
    }
    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
  `;
};

const getStyles = ({
  titleColor,
  textColor,
  iconColor,
  show_icons
}) => {
  return `
    .header {
      font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${titleColor}; 
      animation: fadeIn 0.8s ease-in-out forwards;
    }
    .stat { 
      font: 600 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor};
    }
    .stagger {
      opacity: 0;
      animation: fadeIn 0.3s ease-in-out forwards;
    }
    .rank-text {
      font: 800 24px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor}; 
      animation: scaleIn 0.3s ease-in-out forwards;
    }
    
    .bold { font-weight: 700 }
    .star-icon { 
      font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
    }
    .icon {
      fill: ${iconColor};
      display: ${!!show_icons ? "block" : "none"};
    }
    
    .rank-circle-rim {
      stroke: ${titleColor};
      fill: none;
      stroke-width: 6;
      opacity: 0.2;
    }
    .rank-circle {
      stroke: ${titleColor};
      stroke-dasharray: 250;
      fill: none;
      stroke-width: 6;
      stroke-linecap: round;
      opacity: 0.8;
      transform-origin: -10px 8px;
      transform: rotate(-90deg);
      animation: rankAnimation 1s forwards ease-in-out;
    }

    ${process.env.NODE_ENV === "test" ? "" : getAnimations()}
  `;
};

module.exports = getStyles;
