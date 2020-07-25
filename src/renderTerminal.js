const { isValidHexColor, FlexLayout, kFormatter } = require("./utils");
const getStyles = require("./getStyles");

const createTextNode = ({ label, value, index }) => {
  //const kValue = kFormatter(value); // this is only for numbers i dont need to use it
  const staggerDelay = (index + 5) * 150;
  return `
    <g class="stagger" style="animation-delay: ${staggerDelay}ms" transform="translate(20, 0)">
      <text class="text" y="12.5"><tspan class="bold">${label}</tspan> ${value}</text>
    </g>
  `;
};

const renderTerminal = (info = {}, options = { languages: [] }) => {
  const {
    name,
    message,
    repo
  } = info;
  const {
    languages = [],
    line_height = 25,
    color1,
    color2,
    color3,
    color4,
    bgcolor,
  } = options;

  const lheight = parseInt(line_height);

  const colorNormal = (isValidHexColor(color1) && `#${color1}`) || "#FFFFFF";
  const colorName =
    (isValidHexColor(color2) && `#${color2}`) || "#FFFFFF";
  const colorPrompt = (isValidHexColor(color3) && `#${color3}`) || "#FFFFFF";
  const colorBG = (isValidHexColor(bgcolor) && `#${bgcolor}`) || "#000000";

  const colorHighlight =
    (isValidHexColor(color4) && `#${color4}`) || "#FFFFFF";

  const INFO = {
    latest: {
      label: "Latest activity: ",
      value: '<tspan id="highlight">' + message + '</tspan> in ' + repo
    },
    newprompt: {
      label: '<tspan id="name">${name}</tspan>@github <tspan id="prompt">~ $</tspan> ',
      value: '<tspan class="blink" style="font-size: 16px; position: relative; bottom: 1px;">█</tspan>'
    }
  };

  const infoItems = Object.keys(INFO)
    .map((key, index) =>
      createTextNode({ ...INFO[key], index})
    );

  const height = 400;

  /*const renderBorder = `
    <rect 
      data-testid="card-border"
      x="0.5"
      y="0.5"
      width="calc(100% - 1px)"
      height="calc(100% - 1px)"
      rx="4.5"
      fill="${bgColor}"
      stroke="${borderColor}"
    />
  `;*/

  const styles = getStyles(colorNormal, colorName, colorPrompt, colorHighlight);

  return `
    <svg width="854" height="${height}" viewBox="0 0 854 ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        ${styles}
      </style>
      
      <rect data-testid="card-border" x="0.5" y="0.5" width="100%" height="100%" rx="4.5" fill="${colorBG}"/>
      
      <text x="20" y="35" class="text"><tspan id="name">${name}</tspan>@github <tspan id="prompt">~ $</tspan> info</text>
      <svg x="0" y="45">
        ${FlexLayout({
          items: infoItems,
          gap: lheight,
          direction: "column",
        }).join("")}
      </svg>
    </svg>
  `;

};

module.exports = renderTerminal;
