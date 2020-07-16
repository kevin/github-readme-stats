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
}) => {
  return `
    .header {
      font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${titleColor}; 
      animation: fadeIn 0.8s ease-in-out forwards;
    }
    .text { 
      font: 600 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${textColor};
    }
    .stagger {
      opacity: 0;
      animation: fadeIn 0.3s ease-in-out forwards;
    }
    
    .bold { font-weight: 700 }
    .star-icon { 
      font: 600 18px 'Segoe UI', Ubuntu, Sans-Serif;
    }
    ${process.env.NODE_ENV === "test" ? "" : getAnimations()}
  `;
};

module.exports = getStyles;
