const { isValidHexColor, FlexLayout, kFormatter } = require("./utils");
const getStyles = require("./getStyles");

const createTextNode = ({ label, value, id, index }) => {
  const kValue = kFormatter(value);
  const staggerDelay = (index + 3) * 150;
  return `
    <g class="stagger" style="animation-delay: ${staggerDelay}ms" transform="translate(25, 0)">
      <text class="stat bold" y="12.5">${label}:</text>
      <text class="stat" x="135" y="12.5" data-testid="${id}">${kValue}</text> 
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
    bgcolor,
  } = options;

  const lheight = parseInt(line_height);

  const colorNormal = (isValidHexColor(color1) && `#${color1}`) || "#FFFFFF";
  const colorName =
    (isValidHexColor(color2) && `#${color2}`) || "#FFFFFF";
  const colorPrompt = (isValidHexColor(color3) && `#${color3}`) || "#FFFFFF";
  const colorBG = (isValidHexColor(bgcolor) && `#${bgcolor}`) || "#000000";

  const INFO = {
    latest: {
      label: "Latest activity: ",
      value: message + ' in ' + repo,
      id: "latestpush",
    }
  };

  const infoItems = Object.keys(INFO)
    .map((key, index) =>
      // create the text nodes, and pass index so that we can calculate the line spacing
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

  const styles = getStyles(colorNormal, colorName, colorPrompt);

  return `
    <svg width="854" height="${height}" viewBox="0 0 854 ${height}" fill="none" xmlns="http://www.w3.org/2000/svg">
      <style>
        ${styles}
      </style>
      
      <rect data-testid="card-border" x="0.5" y="0.5" width="100%" height="100%" rx="4.5" fill="${colorBG}"/>
      
      <text x="20" y="35" class="text"><tspan id="name">${name}</tspan>@github <tspan id="prompt">~ $</tspan> info ${message}</text>
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
