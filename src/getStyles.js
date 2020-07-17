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
  textColor
}) => {
  return `

    .text {
      font-family: 'Segoe UI', Ubuntu, Sans-Serif;
      font-size: 18px;
      fill: ${titleColor};
      animation: fadeIn 0.8s ease-in-out forwards;
    }
    
    .stagger {
      opacity: 0;
      animation: fadeIn 0.3s ease-in-out forwards;
    }
    
    .bold { font-weight: 700 }

  `;
};

module.exports = getStyles;
